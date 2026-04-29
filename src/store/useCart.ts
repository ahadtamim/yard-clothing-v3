import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  productImages: string[] // Changed to match the flattened array from your ProductPage
  selectedSize: string
  [key: string]: any 
}

interface CartState {
  items: CartItem[]
  addItem: (product: any, size: string) => void
  removeItem: (id: string, size: string) => void // Updated to use ID + Size
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

      // Removes a specific item by its ID and Size
      // This is better than index because it prevents removing the wrong item if the list shifts
      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.selectedSize === size))
        })),

      // Empties the whole bag (useful after successful checkout)
      clearCart: () => set({ items: [] }),
    }),
    { 
      name: 'yard-cart-storage' 
    }
  )
)