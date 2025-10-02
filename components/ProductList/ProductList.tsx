'use client'
import { useEffect, useState } from "react"
import api from '@/lib/axios'
import ProductCard from './ProductCard'

type Product = { id:number, title:string, price:number, thumbnail?:string }

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        api.get('/products?limit=12')
            .then(res => { if (mounted) setProducts(res.data.products) })
            .catch(console.error)
            .finally(() => { if (mounted) setLoading(false)})
        return () => { mounted = false }
    }, [])
   
    if (loading) return <p>Cargando productos...</p>

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </section>
  )
}