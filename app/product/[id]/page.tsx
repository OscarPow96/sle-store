import ProductDetail from '@/components/ProductDetail/ProductDetail'

export default function ProductPage({ params }: { params: { id: string }}) {
    return (
        <main className="container mx-auto p-6">
            <ProductDetail id={params.id} />
        </main>
    )
}