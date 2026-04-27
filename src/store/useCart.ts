import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  productImages: { url: string }[]
  selectedSize: string
  [key: string]: any 
}

interface CartState {
  items: CartItem[]
  addItem: (product: any, size: string) => void
  removeItem: (index: number) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      // Adds a product to the bag
      addItem: (product, size) => 
        set((state) => ({
          items: [...state.items, { ...product, selectedSize: size }]
        })),

      // Removes a specific item by its position in the list
      removeItem: (index) =>
        set((state) => ({
          items: state.items.filter((_, i) => i !== index)
        })),

      // Empties the whole bag (useful after successful checkout)
      clearCart: () => set({ items: [] }),
    }),
    { 
      name: 'yard-cart-storage' // This name is the key in the browser's LocalStorage
    }
  )
)