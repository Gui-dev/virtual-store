'use client'

import { useCartStore } from '@/hooks/store'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface ICheckoutButton {
  totalPrice: string
}

export const CheckoutButton = ({ totalPrice }: ICheckoutButton) => {
  const navigation = useRouter()
  const { user } = useUser()
  const store = useCartStore()

  console.log('USER: ', user)

  const handleCheckout = () => {
    if (!user) {
      store.toggleCart()
      navigation.push(`/sign-in?redirect_url='/'`)
      return
    }
    store.setCheckout('checkout')
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-gray-300">Total</p>
        <p className="text-2xl font-bold text-teal-600">{totalPrice}</p>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-10 flex h-8 items-center justify-center rounded-sm border border-teal-300 bg-teal-600 transition-colors hover:bg-teal-700"
      >
        Finalizar compra
      </button>
    </>
  )
}
