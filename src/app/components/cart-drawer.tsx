'use client'

import { motion } from 'framer-motion'

import { IProductProps } from '@/types/product-props'
import { CartItem } from './cart-item'
import { useCartStore } from '@/hooks/store'
import { formatPrice } from '@/lib/utils'
import { CheckoutButton } from './checkout-button'
import { Checkout } from './checkout'
import { OrderCompleted } from './order-completed'

interface ICartDrawer {
  products: IProductProps[]
}

export const CartDrawer = ({ products }: ICartDrawer) => {
  const store = useCartStore()
  const totalPrice = store.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!
  }, 0)
  const formattedTotalPrice = formatPrice(totalPrice)

  return (
    <motion.div
      className="flex flex-col px-8"
      initial={{ opacity: 0, rotateZ: -10, scale: 0.5 }}
      animate={{ opacity: 0.75, rotateZ: 0, scale: 1 }}
      exit={{ opacity: 0, rotateZ: -10, scale: 0.5 }}
    >
      {products.length === 0 && (
        <div className="mt-6 flex items-center justify-center">
          <p>Carrinho vazio</p>
        </div>
      )}
      {products.length > 0 && store.onCheckout === 'cart' && (
        <div className="flex flex-col justify-center">
          {products.map((product) => {
            return <CartItem key={product.id} product={product} />
          })}
        </div>
      )}

      {store.cart.length > 0 && store.onCheckout === 'cart' && (
        <CheckoutButton totalPrice={formattedTotalPrice} />
      )}

      {store.onCheckout === 'checkout' && <Checkout />}
      {store.onCheckout === 'success' && <OrderCompleted />}
    </motion.div>
  )
}
