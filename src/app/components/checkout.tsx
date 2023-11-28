'use client'

import { useEffect } from 'react'

import { useCartStore } from '@/hooks/store'

export const Checkout = () => {
  const store = useCartStore()
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
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('DATA: ', data)
      })
  }, [store.cart, store.paymentIntent])

  return (
    <div className="flex">
      <h1>CHECKOUT</h1>
    </div>
  )
}
