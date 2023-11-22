import { X } from 'lucide-react'

import { IProductProps } from '@/types/product-props'

interface ICartPainel {
  products: IProductProps[]
  onToggleCart: () => void
}

export const CartPainel = ({ products, onToggleCart }: ICartPainel) => {
  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-black/25">
      <div className="absolute right-0 top-0 h-screen w-1/3 bg-slate-600 p-12">
        <button onClick={onToggleCart} className="absolute right-5 top-5">
          <X />
        </button>
        <h1>Meu Carrinho</h1>
        {products.map((product) => {
          return <div key={product.id}>{product.name}</div>
        })}
      </div>
    </div>
  )
}
