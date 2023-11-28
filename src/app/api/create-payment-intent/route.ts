import { NextResponse } from 'next/server'
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

export const POST = async (request: Request) => {
  const { userId } = auth()
  const { items, payment_intent_id } = await request.json()

  if (!userId) {
    const login_url = new URL('/sign-up', request.url)
    return NextResponse.redirect(login_url)
  }

  // const customer_id = 'cus_P59s9dO7e8ROtH'
  const total = calculateOrderAmount(items)
  const order_data = {
    user: { connect: { id: userId } },
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
      const update_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        },
      )

      const [existing_order] = await Promise.all([
        prisma.order.findFirst({
          where: {
            payment_intent_id,
          },
          include: { products: true },
        }),
        prisma.order.update({
          where: {
            payment_intent_id,
          },
          data: {
            amount: total,
            products: {
              delete: {},
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
      return NextResponse.json({
        status: 201,
        data: update_intent,
      })
    }
  } else {
    const payment_intent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    })
    order_data.payment_intent_id = payment_intent.id
    await prisma.order.create({
      data: order_data,
    })
    return NextResponse.json(
      {
        payment_intent,
      },
      {
        status: 201,
      },
    )
  }
}