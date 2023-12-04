'use client'

import { useCartStore } from '@/hooks/store'
import { useEffect } from 'react'

export const OrderCompleted = () => {
  const store = useCartStore()

  const handleBackToStore = () => {
    setTimeout(() => {
      store.setCheckout('cart')
    }, 1000)
    store.toggleCart()
  }

  useEffect(() => {
    store.setPaymentIntent('')
    store.clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Pedido concluído com sucesso</h1>
      <button
        className="rounded-md bg-teal-600 px-4 py-2 text-white"
        onClick={handleBackToStore}
      >
        Voltar para loja e fechar o carrinho
      </button>
    </div>
  )
}
