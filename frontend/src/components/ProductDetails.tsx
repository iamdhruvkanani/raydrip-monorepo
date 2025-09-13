// components/ProductDetails.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'

interface ProductDetailsProps {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const salePrice =
        product.isOnSale && product.originalPrice && product.salePercentage
            ? `₹${Math.round(
                parseFloat(product.originalPrice.replace(/[^0-9.]/g, '')) *
                (1 - product.salePercentage / 100)
            ).toLocaleString()}`
            : product.price

    return (
        <main className="max-w-5xl mx-auto p-6 md:p-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl overflow-hidden shadow-lg"
                >
                    <Image
                        src={product.imageUrl.trimEnd()}
                        alt={product.name}
                        width={600}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </motion.div>

                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-serif font-extrabold"
                    >
                        {product.name}
                    </motion.h1>

                    <div className="flex flex-wrap items-baseline gap-4">
                        {product.isOnSale && product.originalPrice ? (
                            <>
                                <span className="text-2xl md:text-3xl font-bold text-accent-gold-light dark:text-accent-gold-dark">
                                    {salePrice}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 line-through">
                                    {product.originalPrice}
                                </span>
                                <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                    Save {product.salePercentage}%
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl md:text-3xl font-bold">{product.price}</span>
                        )}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-base md:text-lg leading-relaxed"
                    >
                        {product.description ?? 'No description available.'}
                    </motion.p>

                    {product.features?.length ? (
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="list-disc list-inside space-y-2"
                        >
                            {product.features.map((feature, idx) => (
                                <li key={idx} className="text-sm md:text-base">
                                    {feature}
                                </li>
                            ))}
                        </motion.ul>
                    ) : null}

                    <motion.button
                        onClick={() => alert(`${product.name} added to cart`)}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="w-full md:w-auto bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-transform active:scale-95"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </motion.button>
                </div>
            </div>
        </main>
    )
}
