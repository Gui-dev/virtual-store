import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

const handler = async (request: NextRequest) => {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature') || ''

  if (!sig) {
    return NextResponse.json({
      status: 400,
      message: 'No Signature',
    })
  }
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: `Webhook Error: ${error}`,
    })
  }

  switch (event.type) {
    case 'payment_intent.created':
      const payment_intent_created = event.data.object as Stripe.PaymentIntent
      console.log(payment_intent_created)
      break
    case 'charge.succeeded':
      const charge_succeeded = event.data.object as Stripe.Charge
      if (typeof charge_succeeded.payment_intent === 'string') {
        await prisma.order.update({
          where: {
            payment_intent_id: charge_succeeded.payment_intent,
          },
          data: {
            status: 'complete',
          },
        })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({
    status: 200,
  })
}

export const GET = handler
export const POST = handler
export const PUT = handler
