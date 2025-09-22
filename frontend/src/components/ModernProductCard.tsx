// components/PremiumProductCard.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import toast from 'react-hot-toast'
import { Heart, Star } from 'lucide-react'
import { getProductBadge } from '@/data/products'

interface Props { product: Product }

function toNumber(x: string | number) {
    return typeof x === 'number' ? x : parseFloat(x.replace(/[^0-9.]/g, '')) || 0
}
function fmtINR(n: number) {
    return n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export default function ModernProductCard({ product }: Props) {
    const badge = getProductBadge(product)    // Best Seller / New Arrival
    const original = product.originalPrice ? toNumber(product.originalPrice) : toNumber(product.price)
    const sale = product.isOnSale
        ? Math.round(original * (1 - (product.salePercentage || 0) / 100))
        : toNumber(product.price)
    const save = product.isOnSale ? original - sale : 0

    const onWishlist = (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation()
        toast.success('Added to wishlist!')
    }

    return (
        <Link href={`/products/${product.id}`} className="group block" aria-label={product.name}>
            <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative h-[400px] flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
            >
                <div className="relative h-2/3 w-full overflow-hidden ">
                    <Image
                        src={product.imageUrl?.[0] || '/placeholder-image.png'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    // className=" object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Sale Badge */}
                    {product.isOnSale && (
                        <div className="absolute top-1 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            -{product.salePercentage}%
                        </div>
                    )}
                    {/* Custom Badge */}
                    {badge && (
                        <div className="absolute top-1 right-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                            {badge}
                        </div>
                    )}
                    {/* Rating */}
                    {product.rating && (
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded-full px-2 py-0.5 flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span>{product.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="mt-2 space-y-1">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                ₹{fmtINR(sale)}
                            </span>
                            {product.isOnSale && (
                                <>
                                    <span className="text-xs text-gray-400 line-through">
                                        ₹{fmtINR(original)}
                                    </span>
                                    <span className="text-xs text-green-600">
                                        Save ₹{fmtINR(save)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onWishlist}
                        className="mt-4 flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 transition"
                        aria-label="Add to wishlist"
                    >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">Wishlist</span>
                    </button>
                </div>
            </motion.div>
        </Link>
    )
}
