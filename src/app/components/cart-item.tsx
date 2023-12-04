import Image from 'next/image'
import { PlusIcon, MinusIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import { IProductProps } from '@/types/product-props'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/hooks/store'

interface ICartItem {
  product: IProductProps
}

export const CartItem = ({ product }: ICartItem) => {
  const store = useCartStore()
  const formattedPrice = formatPrice(product.price)

  const handleIncreaseQuantity = () => {
    store.addProduct(product)
  }

  const handleDecreaseQuantity = () => {
    store.removeProduct(product)
  }

  return (
    <motion.div className="flex gap-4 py-4" layout>
      <Image
        src={product.image}
        alt={product.name}
        height={100}
        width={100}
        className="w-24 object-cover"
      />
      <div className="flex flex-col gap-2">
        <h1 className="w-42 truncate">{product.name}</h1>
        <div className="flex flex-row items-center gap-2">
          <button
            className="h-6 rounded-sm border px-2 text-sm"
            onClick={handleDecreaseQuantity}
          >
            <MinusIcon />
          </button>
          <p className="flex h-6 w-16 items-center justify-center rounded-sm border border-gray-100 text-sm ">
            {product.quantity}
          </p>
          <button
            className="h-6 rounded-sm border px-2 text-sm"
            onClick={handleIncreaseQuantity}
          >
            <PlusIcon />
          </button>
        </div>
        <p className="text-sm font-bold text-teal-600">{formattedPrice}</p>
      </div>
    </motion.div>
  )
}
