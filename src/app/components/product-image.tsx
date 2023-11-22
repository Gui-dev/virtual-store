/* eslint-disable prettier/prettier */
'use client'

import { useState } from 'react'
import Image from 'next/image'

import { IProductProps } from '@/types/product-props'

interface IProductImage {
  product: IProductProps
  fillProps?: boolean
}

export const ProductImage = ({ product, fillProps }: IProductImage) => {
  const [loading, setLoading] = useState(true)

  return fillProps ? (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className={`object-cover ${loading ? 'scale-110 blur-3xl grayscale' : 'scale-100 blur-0 grayscale-0'}`}
      onLoad={() => setLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      alt={product.name}
      height={400}
      width={700}
      className={`object-cover ${loading
        ? 'scale-110 blur-3xl grayscale'
        : 'scale-100 blur-0 grayscale-0'
        }`}
      onLoad={() => setLoading(false)}
    />
  )
}
