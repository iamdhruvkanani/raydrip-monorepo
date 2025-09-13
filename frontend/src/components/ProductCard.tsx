'use client'
import React, { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimations'
import Image from 'next/image'
import { Product } from '@/types/product'

interface Props {
    product: Product
}

const ProductCard = forwardRef<HTMLDivElement, Props>(({ product }, ref) => {
    const { ref: scrollRef, isInView } = useScrollAnimation()

    // Combine refs for animation and forwarded ref
    const setRefs = (node: HTMLDivElement | null) => {
        if (scrollRef && typeof scrollRef === "object" && "current" in scrollRef) {
            (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
        if (typeof ref === "function") {
            ref(node)
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
    }


    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        alert(`${product.name} added to cart`)
    }

    const getSalePrice = () => {
        if (product.isOnSale && product.originalPrice && product.salePercentage) {
            const originalAmount = parseFloat(
                product.originalPrice.replace('₹', '').replace(',', '')
            )
            const saleAmount =
                originalAmount - (originalAmount * product.salePercentage) / 100
            return `₹${saleAmount.toLocaleString()}`
        }
        return product.price
    }

    return (
        <Link
            href={`/products/${product.id}`}
            className="block h-full cursor-pointer"
            tabIndex={-1}
            aria-label={`View details for ${product.name}`}
        >
            <motion.article
                ref={setRefs}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    {product.isOnSale && product.salePercentage && (
                        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                            -{product.salePercentage}%
                        </div>
                    )}
                    {product.badge && !product.isOnSale && (
                        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                            {product.badge}
                        </div>
                    )}
                    <div className="w-full h-full flex items-center justify-center p-6">
                        <Image
                            src={product.imageUrl.trimEnd()}
                            alt={product.name}
                            width={300}
                            height={375}
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out filter group-hover:brightness-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={false}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-900">
                    <h3
                        className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 mb-3 min-h-[2.5rem] leading-snug group-hover:text-accent-gold-light dark:group-hover:text-accent-gold-dark transition-colors duration-300"
                        title={product.name}
                    >
                        {product.name}
                    </h3>

                    <div className="flex flex-wrap items-baseline gap-2 mb-5">
                        {product.isOnSale && product.originalPrice ? (
                            <>
                                <span className="font-bold text-accent-gold-light dark:text-accent-gold-dark text-lg sm:text-xl">
                                    {getSalePrice()}
                                </span>
                                <span className="text-gray-400 dark:text-gray-500 text-sm line-through font-medium">
                                    {product.originalPrice}
                                </span>
                                <span className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    Save ₹
                                    {(
                                        parseFloat(
                                            product.originalPrice.replace('₹', '').replace(',', '')
                                        ) -
                                        parseFloat(getSalePrice().replace('₹', '').replace(',', ''))
                                    ).toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                                {product.price}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="mt-auto w-full bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:from-accent-gold-dark hover:to-yellow-600 dark:hover:from-accent-gold-light dark:hover:to-yellow-500 transition-all duration-300 active:scale-95 transform"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
            </motion.article>
        </Link>
    )
})

ProductCard.displayName = 'ProductCard'
export default ProductCard
