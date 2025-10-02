'use client'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'

export default function ProductCard({ product }: any) {
    const addItem = useCartStore(s => s.addItem)
    return (
        <article className="border rounded-lg p-4 bg-gray-900 text-white shadow-md">
            <Link href={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-3 rounded-md" />
            </Link>
            <h3 className="font-semibold text-lg border-b border-white/20 pb-2 mb-2">{product.title}</h3>
            <p className="text-green-400 font-semibold border-b border-white/20 pb-2 mb-3">${product.price}</p>
            <div className="mt-2 flex gap-2">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md 
             hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-150" onClick={() => addItem({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail })}>
                    Agregar al carrito
                </button>
                <Link href={`/product/${product.id}`} className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold shadow-md 
             hover:bg-slate-700 hover:shadow-lg active:scale-95 transition-all duration-150">Ver</Link>
            </div>
        </article>
    )
}
