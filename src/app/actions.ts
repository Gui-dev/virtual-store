'use server'
import { stripe } from '@/lib/stripe'
import { IProductProps } from '@/types/product-props'

type fetchProductsProps = {
  last_product_id?: string | undefined
}

type fetchProductsResponse = {
  products: IProductProps[]
  has_more: boolean
}

export const fetchProducts = async ({
  last_product_id,
}: fetchProductsProps): Promise<fetchProductsResponse> => {
  const params = last_product_id
    ? { starting_after: last_product_id, limit: 8 }
    : { limit: 8 }
  const { data, has_more } = await stripe.products.list(params)
  const products: IProductProps[] = await Promise.all(
    data.map(async (product) => {
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

  return {
    products,
    has_more,
  }
}
