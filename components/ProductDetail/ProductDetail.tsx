'use client'
import { useEffect, useState } from "react"
import api from '@/lib/axios'
import { useCartStore } from "@/store/cart"

export default function ProductDetail({ id }: { id: string }) {
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const addItem = useCartStore(s => s.addItem)

    useEffect(() => {
        setLoading(true)
        api.get(`/products/${id}`)
        .then(r => setProduct(r.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p>Cargando...</p>
    if (!product) return <p>Producto no encontrado</p>

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <img src={product.thumbnail} alt={product.title} className="w-full h-96 object-cover rounded-xl shadow-lg border border-white/30"/>
            <div className="flex flex-col gap-4 p-6 bg-gray-900 rounded-xl shadow-lg border border-white/30 text-white">
                <h1 className="text-3xl font-bold text-center border-b border-white/20 pb-2">{product.title}</h1>
                <p className="mt-2 text-gray-200 border-b border-white/20 pb-2">{product.description}</p>
                <p className="text-xl font-semibold text-green-400 border-b border-white/20 pb-2">${product.price}</p>
                <div className="mt-auto">
                <button className="mt-2 px-4 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-md 
                               hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-150" onClick={() => addItem({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail })}>
                    Agregar al carrito
                </button>
                </div>
            </div>
        </div>
    )
}