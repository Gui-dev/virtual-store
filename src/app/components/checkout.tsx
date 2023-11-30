'use client'

import { useEffect, useState } from 'react'

import { useCartStore } from '@/hooks/store'

export const Checkout = () => {
  const store = useCartStore()
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
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
      .then((response) => response.json())
      .then((data) => {
        store.setPaymentIntent(data.paymentIntent)
        setClientSecret(data.clientSecret)
        console.log('DATA: ', data)
      })
  }, [store, store.cart, store.paymentIntent])

  console.log('SECRET: ', clientSecret)

  return (
    <div className="flex">
      <h1>CHECKOUT</h1>
    </div>
  )
}
