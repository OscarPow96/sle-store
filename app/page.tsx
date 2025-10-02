import ProductList from '@/components/ProductList/ProductList'

export default function Page() {
  return (
    <main className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-extrabold mb-8 
                   bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent 
                   transition-all duration-500
                   hover:from-yellow-300 hover:to-pink-300">Catálogo</h1>
      <ProductList/>
    </main>
  )
}
