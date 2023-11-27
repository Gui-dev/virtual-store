'use client'

import { IProductProps } from '@/types/product-props'
import { CartItem } from './cart-item'
import { useCartStore } from '@/hooks/store'
import { formatPrice } from '@/lib/utils'
import { CheckoutButton } from './checkout-button'
import { Checkout } from './checkout'

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
    <div className="flex flex-col px-8">
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
          <CheckoutButton totalPrice={formattedTotalPrice} />
        </div>
      )}

      {store.onCheckout === 'checkout' && <Checkout />}
    </div>
  )
}
