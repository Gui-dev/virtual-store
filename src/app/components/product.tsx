import Link from 'next/link'

import { IProductProps } from '@/types/product-props'
import { ProductImage } from './product-image'
import { formatPrice } from '@/lib/utils'

interface IProduct {
  product: IProductProps
}

export const Product = ({ product }: IProduct) => {
  const formattedPrice = formatPrice(product.price)

  return (
    <div className="flex h-96 flex-col bg-slate-800 p-5 shadow-lg">
      <Link href="/" key={product.id}>
        <div className="relative h-56 flex-1">
          <ProductImage product={product} fillProps />
        </div>
        <div className="my-3 flex justify-between">
          <h1 className="w-40 truncate text-sm font-bold text-gray-300">
            {product.name}
          </h1>
          <p className="text-md text-teal-300">{formattedPrice}</p>
        </div>
      </Link>
      <button className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm text-white">
        Comprar
      </button>
    </div>
  )
}
