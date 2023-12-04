import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import { stripe } from '@/lib/stripe'
import { IProductProps } from '@/types/product-props'
import { prisma } from '@/lib/prisma'

const calculateOrderAmount = (products: IProductProps[]): number => {
  const totalPrice = products.reduce((acc, item) => {
    return acc + item.price! * item.quantity!
  }, 0)
  return totalPrice
}

export const POST = async (request: NextRequest) => {
  const { userId } = auth()
  const { items, payment_intent_id } = await request.json()

  if (!userId) {
    const login_url = new URL('/sign-up', request.url)
    return NextResponse.redirect(login_url)
  }

  const current_user = await prisma.user.findUnique({
    where: {
      external_id: userId,
    },
  })

  if (!current_user) {
    const login_url = new URL('/sign-up', request.url)
    return NextResponse.redirect(login_url)
  }

  const total = calculateOrderAmount(items)
  const orderData = {
    user: { connect: { id: current_user.id } },
    amount: total,
    currency: 'brl',
    status: 'pending',
    payment_intent_id,
    products: {
      create: items.map((item: IProductProps) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    },
  }

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id,
    )

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        },
      )

      // eslint-disable-next-line no-unused-vars
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { payment_intent_id },
          include: { products: true },
        }),
        prisma.order.update({
          where: { payment_intent_id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: IProductProps) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
              })),
            },
          },
        }),
      ])

      if (!existing_order) {
        return NextResponse.json({
          status: 404,
          message: 'Order not found',
        })
      }

      return NextResponse.json(
        { payment_intent: updated_intent },
        { status: 200 },
      )
    }
  } else {
    const payment_intent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    })

    orderData.payment_intent_id = payment_intent.id

    await prisma.order.create({
      data: orderData,
    })

    return NextResponse.json({ payment_intent }, { status: 200 })
  }
}
