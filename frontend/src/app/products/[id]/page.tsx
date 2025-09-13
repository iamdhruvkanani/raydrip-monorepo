// app/products/[id]/page.tsx
import React from 'react'
import ProductDetails from '@/components/ProductDetails'
import { Product } from '@/types/product'

const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Cyan Anarkali',
        description: 'Elegant hand-embroidered Anarkali with gold detailing.',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl: 'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        features: ['100% Cotton', 'Hand-wash only', 'Available in all sizes'],
    },
    // Add more products here
]

type Params = {
    id: string
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { id } = await params
    const product = PRODUCTS.find((p) => p.id === id)

    if (!product) {
        return <p className="p-6 text-center text-red-600">Product not found.</p>
    }

    return <ProductDetails product={product} />
}
