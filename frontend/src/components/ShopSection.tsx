// components/ShopSection.tsx
'use client'
import React from 'react'
import ProductCard from '@/components/ProductCard'
import { getAllProducts, getProductsBySubCategoryNormalized } from '@/data/products'

interface ShopSectionProps {
    selectedSubCategory: string
}

export default function ShopSection({ selectedSubCategory }: ShopSectionProps) {
    const products =
        selectedSubCategory === 'View All Products'
            ? getAllProducts()
            : getProductsBySubCategoryNormalized(selectedSubCategory)

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
