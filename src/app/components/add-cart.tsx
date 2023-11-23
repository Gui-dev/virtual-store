'use client'

import { useCartStore } from '@/hooks/store'
import { IProductProps } from '@/types/product-props'

type AddCartProps = {
  product: IProductProps
}

export const AddCart = ({ product }: AddCartProps) => {
  const store = useCartStore()

  const handleAddProduct = () => {
    store.addProduct(product)
  }

  return (
    <button
      className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm text-white"
      onClick={handleAddProduct}
    >
      Comprar
    </button>
  )
}
