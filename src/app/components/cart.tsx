'use client'

import { ShoppingBasket } from 'lucide-react'

import { useCartStore } from '@/hooks/store'
import { CartPainel } from './cart-painel'

export const Cart = () => {
  const store = useCartStore()
  const quantity = store.cart.length

  const handleToggleCart = () => {
    store.toggleCart()
  }

  return (
    <>
      <div className="relative flex items-center">
        <button type="button" onClick={handleToggleCart}>
          <ShoppingBasket className="h-5 w-5" />
        </button>
        {quantity > 0 && (
          <span className="absolute bottom-3 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-sm font-bold">
            {quantity}
          </span>
        )}
      </div>
      {store.isOpen && (
        <CartPainel products={store.cart} onToggleCart={handleToggleCart} />
      )}
    </>
  )
}
