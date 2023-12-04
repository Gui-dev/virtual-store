'use client'

import { useCartStore } from '@/hooks/store'
import { useEffect } from 'react'

export const OrderCompleted = () => {
  const store = useCartStore()
  useEffect(() => {
    store.setPaymentIntent('')
    store.clearCart()
    store.setCheckout('cart')
  }, [store])

  return (
    <div className="flex items-center justify-center">
      <h1>Pedido concluído com sucesso</h1>
    </div>
  )
}
