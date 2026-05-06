import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: any, size: string) => void
  removeItem: (id: string, size: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size) => 
        set((state) => {
          let cleanId = typeof product.id === 'object' 
            ? (product.id?.id || product.id?._id || product.id) 
            : (product.id || product._id || '');
          
          if (cleanId && typeof cleanId === 'object') {
            cleanId = Object.values(cleanId)[0] || '';
          }

          const cleanImage = Array.isArray(product.productImages) 
            ? product.productImages[0] 
            : (product.image || product.productImages || '/placeholder.jpg');

          const newItem: CartItem = {
            id: String(cleanId).trim(),
            name: product.name,
            price: Number(product.price),
            image: String(cleanImage),
            size: size,
            quantity: 1
          };

          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id && item.size === size
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
            return { items: newItems };
          }

          return { items: [...state.items, newItem] };
        }),

      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size))
        })),

      clearCart: () => set({ items: [] }),
    }),
    { 
      name: 'yard-cart-storage' 
    }
  )
)