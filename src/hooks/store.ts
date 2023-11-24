import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProductProps } from '@/types/product-props'

type CartState = {
  cart: IProductProps[]
  addProduct: (product: IProductProps) => void
  removeProduct: (product: IProductProps) => void
  isOpen: boolean
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addProduct: (item) =>
        set((state) => {
          const product = state.cart.find((p) => p.id === item.id)
          if (product) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return {
                  ...p,
                  quantity: p.quantity ? p.quantity + 1 : 1,
                }
              }
              return p
            })
            return { cart: updatedCart }
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            }
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const product = state.cart.find((p) => p.id === item.id)
          if (product && product.quantity! > 1) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return { ...p, quantity: p.quantity! - 1 }
              }
              return p
            })
            return { cart: updatedCart }
          } else {
            const filteredCart = state.cart.filter((p) => p.id !== item.id)
            return { cart: filteredCart }
          }
        }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'cart-storage',
    },
  ),
)
