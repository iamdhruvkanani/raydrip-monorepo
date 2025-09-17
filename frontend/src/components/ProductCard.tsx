'use client'
import React, { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimations'
import Image from 'next/image'
import { Product } from '@/types/product'
import AddCartButton from '@/components/AddToCartButton'
import toast from 'react-hot-toast'
import { getProductBadge } from '@/data/products'

interface Props {
    product: Product
}

const ProductCard = forwardRef<HTMLDivElement, Props>(({ product }, ref) => {
    const { ref: scrollRef } = useScrollAnimation()
    const badgeText = getProductBadge(product)
    const setRefs = (node: HTMLDivElement | null) => {
        if (scrollRef && typeof scrollRef === 'object' && 'current' in scrollRef) {
            (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
        if (typeof ref === 'function') {
            ref(node)
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
    }

    const getSalePrice = () => {
        if (product.isOnSale && product.originalPrice && product.salePercentage) {
            const orig = parseFloat(product.originalPrice.replace('₹', '').replace(/,/g, ''))
            const salePrice = orig * (1 - product.salePercentage / 100)
            return salePrice.toLocaleString()

        }
        return product.price
    }

    const handleAddCart = () => {
        toast.success(
            <div className="flex items-center space-x-2">
                <span className="font-semibold text-white">{product.name}</span>
                <span className="font-bold text-white drop-shadow-md">added to cart!</span>
            </div>,
            {
                duration: 1000,
                position: 'top-center',
                style: {
                    background: 'linear-gradient(90deg, #D4AF37, #FFD700)',
                    color: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px rgba(212, 175, 55, 0.5)',
                    padding: '12px 20px',
                    fontWeight: 600,
                    fontSize: 16,
                    maxWidth: 360,
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#FFD700',
                },
            }
        )
    }

    return (
        <Link
            href={`/products/${product.id}`}
            className="block sm:max-w-xs w-full mx-auto"
            tabIndex={-1}
            aria-label={`View details about ${product.name}`}
        >
            <motion.article
                ref={setRefs}
                className="group rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md flex flex-col overflow-hidden h-[430px] sm:h-[460px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden rounded-t-xl">
                    {product.isOnSale && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10 select-none">
                            -{product.salePercentage}%
                        </span>
                    )}
                    {badgeText && (
                        <span className="absolute top-3 right-3 bg-accent-gold-light dark:bg-accent-gold-dark text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg select-none z-10">
                            {badgeText}
                        </span>
                    )}
                    <Image
                        src={product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : "/placeholder-image.png"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={false}
                        className="object-contain p-4 transition-transform scale-100 duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-2 text-gray-900 dark:text-white">
                        {product.name}
                    </h3>
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm sm:text-base">
                        {product.isOnSale && product.originalPrice ? (
                            <>
                                <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">
                                    ₹{getSalePrice()}
                                </span>
                                <span className="line-through text-gray-400 dark:text-gray-500">
                                    ₹{product.originalPrice}
                                </span>
                                <span className="rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 whitespace-nowrap font-semibold mt-1 sm:mt-0">
                                    Save ₹
                                    {(
                                        parseFloat(product.originalPrice.replace('₹', '').replace(/,/g, '')) -
                                        parseFloat(getSalePrice().replace('₹', '').replace(/,/g, ''))
                                    ).toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="font-semibold text-gray-900 dark:text-white text-lg">₹{product.price}</span>
                        )}
                    </div>
                    <AddCartButton product={product} onClick={handleAddCart} className="mt-auto" />
                </div>
            </motion.article>
        </Link>
    )
})

ProductCard.displayName = 'ProductCard'
export default ProductCard
