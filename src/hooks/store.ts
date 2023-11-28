import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProductProps } from '@/types/product-props'

type CartState = {
  cart: IProductProps[]
  isOpen: boolean
  onCheckout: 'cart' | 'checkout'
  paymentIntent: string
  removeProduct: (product: IProductProps) => void
  addProduct: (product: IProductProps) => void
  toggleCart: () => void
  setCheckout: (checkout: 'cart' | 'checkout') => void
  setPaymentIntent: (paymentIntent: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      onCheckout: 'cart',
      paymentIntent: '',
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
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
    }),
    {
      name: 'cart-storage',
    },
  ),
)
