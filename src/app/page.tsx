import { IProductProps } from './../types/product-props'

export default async function Home() {
  const response = await fetch(
    'https://api.escuelajs.co/api/v1/products?offset=0&limit=10',
  )
  const products = await response.json()

  console.log('PRODUCTS: ', products)

  return (
    <div className="mx-auto max-w-7xl px-8 pt-8 xl:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {products.map((product: IProductProps) => {
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// https://fakestoreapi.com/products
// https://api.escuelajs.co/api/v1/products
