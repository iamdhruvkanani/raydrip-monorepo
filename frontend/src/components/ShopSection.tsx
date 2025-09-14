// components/ShopSection.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { getAllProducts, getProductsBySubCategoryNormalized } from '@/data/products'

interface ShopSectionProps {
    selectedSubCategory: string
}

function titleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 10,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
}

export default function ShopSection({ selectedSubCategory }: ShopSectionProps) {
    const products =
        selectedSubCategory === 'View All Products'
            ? getAllProducts()
            : getProductsBySubCategoryNormalized(selectedSubCategory)

    return (
        <div className="min-h-screen bg-gradient-to-br from-bg-light to-surface-light dark:from-bg-dark dark:to-surface-dark">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                    {selectedSubCategory === 'View All Products'
                        ? 'All Products'
                        : titleCase(selectedSubCategory.replace(/-/g, ' '))}

                </h2>
                <div className="w-24 h-1 bg-accent-gold-light dark:bg-accent-gold-dark mx-auto rounded-full"></div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4 max-w-2xl mx-auto">
                    Discover our curated collection of premium fashion pieces crafted with elegance and style
                </p>
            </motion.div>

            {/* Responsive 2-column grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-8 md:gap-12"
            >
                {products.map((product) => (
                    <motion.div key={product.id} variants={cardVariants}>
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {products.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <div className="text-6xl mb-4">🛍️</div>
                    <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                        No products found
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        We couldn't find any products in this category.
                    </p>
                </motion.div>
            )}
        </div>
    )
}
