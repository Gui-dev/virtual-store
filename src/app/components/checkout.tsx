'use client'

import { useCallback, useEffect, useState } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { useCartStore } from '@/hooks/store'
import { CheckoutForm } from './checkout-form'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

export const Checkout = () => {
  const store = useCartStore()
  const [clientSecret, setClientSecret] = useState('')

  const fetchLoadPaymentIntent = useCallback(async () => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: store.cart,
        payment_intent_id: store.paymentIntent,
      }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        store.setPaymentIntent(data.payment_intent.id)
        setClientSecret(data.payment_intent?.client_secret)
      })
  }, [store, store.cart, store.paymentIntent])

  useEffect(() => {
    fetchLoadPaymentIntent()
  }, [fetchLoadPaymentIntent])

  console.log(clientSecret)

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      labels: 'floating',
    },
  }

  return (
    <div className="flex">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm client_secret={clientSecret} />
      </Elements>
      {/* {clientSecret ? (
      ) : (
        <div>
          <p>Carregando...</p>
        </div>
      )} */}
    </div>
  )
}
