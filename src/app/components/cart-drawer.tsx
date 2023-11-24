'use client'

import { IProductProps } from '@/types/product-props'
import { CartItem } from './cart-item'
import { useCartStore } from '@/hooks/store'
import { formatPrice } from '@/lib/utils'

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
      {products.length > 0 && (
        <div className="flex flex-col justify-center">
          {products.map((product) => {
            return <CartItem key={product.id} product={product} />
          })}
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-gray-300">Total</p>
            <p className="text-2xl font-bold text-teal-600">
              {formattedTotalPrice}
            </p>
          </div>
          <button className="mt-10 flex h-8 items-center justify-center rounded-sm border border-teal-300 bg-teal-600 transition-colors hover:bg-teal-700">
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  )
}
