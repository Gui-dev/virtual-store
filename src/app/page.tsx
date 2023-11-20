import { IProductProps } from './../types/product-props'
import { Product } from './components/product'

export default async function Home() {
  const response = await fetch(
    'https://fakestoreapi.com/products?offset=0&limit=10',
  )
  const products = await response.json()

  return (
    <div className="mx-auto max-w-7xl px-8 py-8 xl:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {products.map((product: IProductProps) => {
          return <Product key={String(product.id)} product={product} />
        })}
      </div>
    </div>
  )
}

// https://fakestoreapi.com/products
// https://api.escuelajs.co/api/v1/products
