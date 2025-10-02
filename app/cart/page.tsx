'use client'
import { useCartStore } from "@/store/cart"

export default function CartPage() {
  const items = useCartStore(s => s.items)
  const increase = useCartStore(s => s.increase)
  const decrease = useCartStore(s => s.decrease)
  const removeItem = useCartStore(s => s.removeItem)
  const clearCart = useCartStore(s => s.clearCart)
  const subtotal = useCartStore(s => s.subtotal)

    return (
        <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Tu carrito</h2>
      {items.length === 0 ? <p>Carrito vacío</p> : (
        <>
          <ul className="space-y-4">
            {items.map(i => (
              <li key={i.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={i.thumbnail} alt={i.title} className="w-20 h-20 object-cover"/>
                  <div>
                    <p className="font-semibold">{i.title}</p>
                    <p>${i.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decrease(i.id)} className="px-2 border rounded">-</button>
                  <span>{i.quantity}</span>
                  <button onClick={() => increase(i.id)} className="px-2 border rounded">+</button>
                  <button onClick={() => removeItem(i.id)} className="ml-4 text-red-600">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="font-bold">Total: ${subtotal().toFixed(2)}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold shadow-md 
             hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all duration-150" onClick={() => clearCart()}>Vaciar carrito</button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md 
             hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-150">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
    )
}