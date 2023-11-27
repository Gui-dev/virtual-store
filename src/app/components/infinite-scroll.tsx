'use client'

import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Loader } from 'lucide-react'
import colors from 'tailwindcss/colors'

import { IProductProps } from '@/types/product-props'
import { Product } from './product'
import { fetchProducts } from '../actions'

interface IInfiniteScroll {
  initial_products: IProductProps[]
}

export const InfiniteScroll = ({ initial_products }: IInfiniteScroll) => {
  const [products, setProducts] = useState<IProductProps[]>(initial_products)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  const last_product_id = products[products.length - 1].id
  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true)
    const { products, has_more } = await fetchProducts({
      last_product_id,
    })
    if (products) {
      setProducts((prev) => [...prev, ...products])
      setHasMore(has_more)
    }
    setIsLoading(false)
  }, [last_product_id])

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts()
    }
  }, [hasMore, inView, isLoading, loadMoreProducts])

  if (!products) {
    return <div>carregando...</div>
  }

  return (
    <>
      {products.map((product) => {
        return <Product key={String(product.id)} product={product} />
      })}
      {hasMore && (
        <div
          ref={ref}
          className="col-span-4 my-5 flex items-center justify-center"
        >
          <Loader size={32} color={colors.teal[600]} className="animate-spin" />
        </div>
      )}
    </>
  )
}
