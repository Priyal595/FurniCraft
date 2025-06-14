// src/stores/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ──────────────────────────────────────────────
// Shape of items (for reference only):
// {
//   id: string,
//   name: string,
//   price: number,
//   image: string,
//   quantity: number
// }
// ──────────────────────────────────────────────

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, i) => total + i.price * i.quantity,
          0
        );
      },
    }),
    { name: 'cart-storage' }
  )
);
