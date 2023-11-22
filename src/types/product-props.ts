export interface IProductProps {
  id: string
  name: string
  price: number | null
  quantity?: number | 1
  image: string
  description: string | null
  currency?: string
}
