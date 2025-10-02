import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
    id: number
    title: string
    price: number
    quantity: number
    thumbnail?: string
}

type CartState = {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
    removeItem: (id: number) => void
    increase: (id: number) => void
    decrease: (id: number) => void
    clearCart: () => void
    subtotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, qty = 1) => {
                set((state) => {
                    const exists = state.items.find(i => i.id === product.id)
                    if (exists) {
                        return {
                            items: state.items.map(i =>
                                i.id === product.id ? { ...i, quantity: i.quantity + qty } : i                             
                            )
                        }
                    }
                    return { items: [...state.items, { ...product, quantity: qty }]}
                })
            },
            removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
            increase: (id) => set(state => ({ items: state.items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) })),
            decrease: (id) => set(state => ({ items: state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)})),
            clearCart: () => set({ items: [] }),
            subtotal: () => get().items.reduce((s, it) => s + it.price * it.quantity, 0)
        }),
        { name: 'sle-cart' }
    )
)