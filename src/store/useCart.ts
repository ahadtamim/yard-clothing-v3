import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product: any, size: string) => 
        set((state: any) => ({
          items: [...state.items, { ...product, selectedSize: size }]
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'yard-cart-storage' } // This saves the bag even if they refresh
  )
)