/* eslint-disable no-useless-return */
'use client'

import { FormEvent, useEffect, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

import { useCartStore } from '@/hooks/store'
import { formatPrice } from '@/lib/utils'

interface ICheckoutForm {
  client_secret: string
}

export const CheckoutForm = ({ client_secret }: ICheckoutForm) => {
  const elements = useElements()
  const stripe = useStripe()
  const [isLoading, setIsLoading] = useState(false)
  const store = useCartStore()

  const totalPrice = store.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!
  }, 0)
  const total = formatPrice(totalPrice)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return
    try {
      setIsLoading(true)
      stripe
        .confirmPayment({
          elements,
          redirect: 'if_required',
        })
        .then((result) => {
          if (!result.error) {
            store.setCheckout('success')
          }
          setIsLoading(false)
        })
    } catch (error) {
      console.log('CHECKOUT_ERROR: ', error)
    }
  }

  useEffect(() => {
    if (!stripe) return
    if (!client_secret) return
  }, [client_secret, stripe])

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <div className="flex items-center justify-between">
        <strong className="py-4 text-lg font-bold">Total</strong>
        <span className="text-2xl font-bold text-teal-600">{total}</span>
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
      >
        {isLoading ? 'Carregando...' : 'Finalizar compra'}
      </button>
    </form>
  )
}
