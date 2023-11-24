import { IProductProps } from './../types/product-props'
import { Product } from './components/product'
import { stripe } from '@/lib/stripe'

export default async function Home() {
  const response = await stripe.products.list()
  const products: IProductProps[] = await Promise.all(
    response.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      })
      return {
        id: product.id,
        name: product.name,
        price: price.data[0].unit_amount,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      }
    }),
  )

  return (
    <div className="mx-auto max-w-7xl px-8 py-8 xl:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {products.map((product) => {
          return <Product key={String(product.id)} product={product} />
        })}
      </div>
    </div>
  )
}
