import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  image: string // Consistent with your CartPage.tsx usage
  size: string  // Using 'size' to match your removeItem calls
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

      // Adds a product to the bag with defensive ID cleaning
      addItem: (product, size) => 
        set((state) => {
          // 1. EXTRACT THE ID: Ensure we get the string, not the full object
          const cleanId = typeof product.id === 'object' 
            ? (product.id.id || product.id._id || product.id) 
            : (product.id || product._id);

          // 2. EXTRACT THE IMAGE: Handle single string or array
          const cleanImage = Array.isArray(product.productImages) 
            ? product.productImages[0] 
            : (product.image || product.productImages || '/placeholder.jpg');

          const newItem: CartItem = {
            id: String(cleanId), // Force to string
            name: product.name,
            price: Number(product.price),
            image: cleanImage,
            size: size,
            quantity: 1
          };

          // 3. CHECK FOR DUPLICATES: Update quantity if same ID and Size
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

      // Removes a specific item by its string ID and Size
      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size))
        })),

      // Empties the whole bag after successful checkout
      clearCart: () => set({ items: [] }),
    }),
    { 
      name: 'yard-cart-storage' 
    }
  )
)