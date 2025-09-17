import React from 'react'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'
import { PRODUCTS } from '@/data/products'
import { Metadata } from 'next'

type Params = { id: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { id } = await params
    const product = PRODUCTS.find((p) => p.id === id)

    if (!product) {
        return { title: 'Product Not Found' }
    }

    return {
        title: `${product.name} | RayDrip`,
        description: `Shop ${product.name} - Premium fashion at its finest. ${product.subCategory} collection.`,
        openGraph: {
            title: product.name,
            description: `Shop ${product.name} - Premium fashion at its finest`,
            images: product.imageUrl && product.imageUrl.length > 0 ? [product.imageUrl[0]] : []

        },
    }
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { id } = await params
    const product = PRODUCTS.find((p) => p.id === id)

    if (!product) {
        notFound()
    }

    return <ProductDetails product={product} />
}
