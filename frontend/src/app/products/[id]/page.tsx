// app/products/[id]/page.tsx (Product details page)
import React from 'react'
import ProductDetails from '@/components/ProductDetails'
import { PRODUCTS } from '@/data/products'

type Params = { id: string }

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { id } = await params
    const product = PRODUCTS.find((p) => p.id === id)

    if (!product) {
        return <p className="p-6 text-center text-red-600">Product not found.</p>
    }

    return <ProductDetails product={product} />
}
