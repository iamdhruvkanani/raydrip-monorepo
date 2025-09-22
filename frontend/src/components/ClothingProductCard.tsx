// components/RedesignedProductCard.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import toast from 'react-hot-toast'
import { Heart, Star, Eye } from 'lucide-react'
import { getProductBadge } from '@/data/products'

interface Props {
    product: Product
}

function toNumber(price: string | number): number {
    return typeof price === 'number' ? price : parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

function formatINR(n: number): string {
    return n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export default function RedesignedProductCard({ product }: Props) {
    const badge = getProductBadge(product)
    const originalPrice = product.originalPrice ? toNumber(product.originalPrice) : toNumber(product.price)
    const salePrice = product.isOnSale ? Math.round(originalPrice * (1 - (product.salePercentage ?? 0) / 100)) : toNumber(product.price)
    const savings = product.isOnSale ? originalPrice - salePrice : 0

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toast.success('Added to wishlist!')
    }

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toast('Quick view coming soon 👁️')
    }

    return (
        <Link href={`/products/${product.id}`} aria-label={product.name} className="group block rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 max-w-xs mx-auto">
            <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                transition={{ type: 'spring', stiffness: 260 }}
                className="flex flex-col h-[460px]"
            >
                {/* Image container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl bg-gray-50 dark:bg-gray-800">
                    <Image
                        src={product.imageUrl?.[0] || '/placeholder-image.png'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={false}
                    />
                    {/* Sale badge top-left */}
                    {product.isOnSale && (
                        <span className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full font-semibold text-xs shadow-md select-none">
                            -{product.salePercentage}%
                        </span>
                    )}
                    {/* Badge below sale */}
                    {badge && (
                        <span className="absolute top-12 left-4 z-20 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-xs shadow-md select-none">
                            {badge}
                        </span>
                    )}
                    {/* Rating bottom-left */}
                    {product.rating && (
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white rounded-full px-2 py-1 flex items-center space-x-1 text-xs shadow-md select-none">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span>{product.rating.toFixed(1)}</span>
                        </div>
                    )}
                    {/* Wishlist and Quick View icons top-right */}
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                        <button onClick={handleWishlist} aria-label="Add to wishlist" className="p-2 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-md hover:text-red-600 transition">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button onClick={handleQuickView} aria-label="Quick View" className="p-2 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-md hover:text-gray-800 dark:hover:text-gray-200 transition">
                            <Eye className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="mt-3 flex items-center space-x-3 max-w-full overflow-hidden">
                        <span className="text-xl font-bold text-gray-900 dark:text-white truncate whitespace-nowrap">
                            ₹{formatINR(salePrice)}
                        </span>
                        {product.isOnSale && (
                            <>
                                <span className="text-sm line-through text-gray-400 dark:text-gray-500 whitespace-nowrap">
                                    ₹{formatINR(originalPrice)}
                                </span>
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400 whitespace-nowrap truncate max-w-[90px]">
                                    Save ₹{formatINR(savings)}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
