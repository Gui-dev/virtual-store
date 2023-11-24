import { X } from 'lucide-react'

import { IProductProps } from '@/types/product-props'
import { CartDrawer } from './cart-drawer'

interface ICartPainel {
  products: IProductProps[]
  onToggleCart: () => void
}

export const CartPainel = ({ products, onToggleCart }: ICartPainel) => {
  return (
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-black/25">
      <div className="absolute right-0 top-0 h-screen w-1/3 overflow-auto bg-slate-600 py-12">
        <div className="flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-gray-300">Meu Carrinho</h1>
          <button onClick={onToggleCart} className="text-3xl text-teal-600">
            <X />
          </button>
        </div>
        <div className="my-4 border-t border-gray-400" />
        <CartDrawer products={products} />
      </div>
    </div>
  )
}
