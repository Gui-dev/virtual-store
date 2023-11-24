import { ProductImage } from '@/app/components/product-image'
import { formatPrice } from '@/lib/utils'
import { AddCart } from '@/app/components/add-cart'
import { stripe } from '@/lib/stripe'

type ProductDetailsProps = {
  params: {
    id: string
  }
}

const getProduct = async (id: string) => {
  const response = await stripe.products.retrieve(id)
  const price = await stripe.prices.list({
    product: response.id,
  })
  return {
    id: response.id,
    name: response.name,
    price: price.data[0].unit_amount,
    image: response.images[0],
    description: response.description,
    currency: price.data[0].currency,
  }
}

const ProductDetails = async ({ params: { id } }: ProductDetailsProps) => {
  const product = await getProduct(id)
  const formattedPrice = formatPrice(product.price)

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-8 py-4 md:flex-row">
      <div className="h-[300px] w-[400px] rounded-sm">
        <ProductImage product={product} />
      </div>
      <div className="flex max-w-lg flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
          <h2 className="text-xl font-bold text-teal-600">{formattedPrice}</h2>
        </div>
        <div className="pb-4">
          <p className="text-sm text-gray-400">{product.description}</p>
        </div>
        <AddCart product={product} />
      </div>
    </section>
  )
}

export default ProductDetails
