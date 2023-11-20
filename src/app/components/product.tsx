import { IProductProps } from '@/types/product-props'
import Link from 'next/link'
import { ProductImage } from './product-image'

interface IProduct {
  product: IProductProps
}

export const Product = ({ product }: IProduct) => {
  return (
    <div className="flex h-96 flex-col bg-slate-800 p-5 shadow-lg">
      <Link href="/" key={product.id}>
        <div className="relative h-56 flex-1">
          <ProductImage product={product} fillProps />
        </div>
        <div className="my-3 flex justify-between">
          <h1 className="w-40 truncate text-sm font-bold text-gray-300">
            {product.title}
          </h1>
          <p className="text-md text-teal-300">{product.price}</p>
        </div>
      </Link>
      <button className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm text-white">
        Comprar
      </button>
    </div>
  )
}
