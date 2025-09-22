'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SizeModal } from '@/components/SizeModal'

import RelatedProductsCarousel from '@/components/RelatedProductsCarousel'

import {
    Heart,
    Share2,
    ShoppingBag,
    Truck,
    Shield,
    RotateCcw,
    ChevronRight,
    Plus,
    Minus,
    BadgeInfo,
    Ruler,
    Package,
    PencilRuler,
    X,
    ShieldUser,
    Handshake,
    WashingMachine,
    Slash

} from 'lucide-react'
import { Product, Size } from '@/types/product'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'
import { getProductBadge } from '@/data/products'

interface ProductDetailsProps {
    product: Product
    allProducts: Product[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
}
const availableSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductDetails({ product, allProducts }: ProductDetailsProps) {

    const relatedProducts = allProducts.filter(
        (p) => {
            // Handle string array for subCategory
            const productSubCategories = Array.isArray(product.subCategory)
                ? product.subCategory
                : [product.subCategory]
            const pSubCategories = Array.isArray(p.subCategory)
                ? p.subCategory
                : [p.subCategory]

            return productSubCategories.some(subCat =>
                pSubCategories.some(pSubCat =>
                    pSubCat?.toLowerCase().trim() === subCat?.toLowerCase().trim()
                )
            ) && p.id !== product.id
        }
    )


    const [isSizeOpen, setIsSizeOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const badgeText = getProductBadge(product)
    const { addToCart } = useCart()
    const [selectedSize, setSelectedSize] = useState<Size | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState<'details' | 'care' | 'delivery'>('details')
    const [isWishlisted, setIsWishlisted] = useState(false)
    const stock = product.stock || {}

    const getSalePrice = () => {
        if (product.isOnSale && product.originalPrice && product.salePercentage) {
            const originalAmount = parseFloat(product.originalPrice.replace(/[^0-9.]/g, ''))
            const saleAmount = originalAmount * (1 - product.salePercentage / 100)
            return `${saleAmount.toLocaleString()}`
        }
        return product.price
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size')
            return
        }
        if ((stock[selectedSize] || 0) < quantity) {
            toast.error(`Only ${stock[selectedSize] || 0} items are available in size ${selectedSize}`)
            return
        }
        addToCart(product, quantity, selectedSize)
        toast.success(
            <div>
                <span className="font-semibold text-white">{product.name}</span>
                <span className="ml-2 font-bold text-white">added to cart!</span>
                {/* <div className="text-xs text-yellow-300 mt-1">Select size in cart before checkout.</div> */}
            </div>
        );

    }

    const handleBuyNow = () => {
        if (!selectedSize) {
            toast.error('Please select a size')
            return
        }
        if ((stock[selectedSize] || 0) < quantity) {
            toast.error(`Only ${stock[selectedSize] || 0} items are available in size ${selectedSize}`)
            return
        }
        addToCart(product, quantity, selectedSize)
        window.location.href = '/checkout'
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gradient-to-br from-bg-light to-surface-light dark:from-bg-dark dark:to-surface-dark"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <motion.nav variants={itemVariants} className="flex items-center space-x-2 text-sm mb-8">
                    <Link href="/" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark">
                        Home
                    </Link>
                    <ChevronRight className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                    <Link href="/shop" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark">
                        Shop
                    </Link>
                    <ChevronRight className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">{product.name}</span>
                </motion.nav>

                <SizeModal open={isSizeOpen} onClose={() => setIsSizeOpen(false)} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Images */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
                            <Image
                                src={
                                    product.imageUrl && product.imageUrl.length > 0
                                        ? product.imageUrl[selectedImageIndex]
                                        : '/placeholder-image.png'
                                }
                                alt={product.name}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {product.isOnSale && product.salePercentage && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    -{product.salePercentage}% OFF
                                </div>
                            )}
                            {badgeText && (
                                <div className="absolute bottom-4 left-4 bg-accent-gold-light dark:bg-accent-gold-dark text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    {badgeText}
                                </div>
                            )}

                            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300'
                                        }`}
                                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 shadow-lg backdrop-blur-sm"
                                    aria-label="Share product"
                                >
                                    <Share2 className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-2">
                            {(product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl : ['/placeholder-image.png']).map(
                                (img, idx) => (
                                    <div
                                        key={img + idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent-gold-light dark:hover:ring-accent-gold-dark transition-all ${selectedImageIndex === idx ? 'ring-2 ring-accent-gold-light dark:ring-accent-gold-dark' : ''
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            width={100}
                                            height={100}
                                            className="object-contain w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div variants={itemVariants} className="space-y-6">

                        {/* Title, Rating & Stock Status - Refined Premium Version */}
                        <div className="space-y-8">
                            <div className="relative inline-block max-w-full">
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark leading-snug tracking-wide">
                                    {product.name}
                                </h1>
                                <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-accent-gold-light to-accent-gold-dark rounded-full">
                                </div>
                                <span className="block mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-400 tracking-widest">
                                    Premium Quality
                                </span>
                            </div>


                            {/* Premium Metrics Container */}
                            <div className="flex flex-wrap items-center gap-8">

                                {/* Ultra-Modern Rating – No Fire Emoji */}
                                {(() => {
                                    const rating = product.rating ?? 0
                                    const hasRatings = rating > 0

                                    return hasRatings ? (
                                        <div className="flex items-center space-x-4">
                                            {/* Numeric Rating Badge */}
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent-gold-light/30 to-accent-gold-dark/30 backdrop-blur-md border-2 border-accent-gold-light/40 dark:border-accent-gold-dark/40 flex items-center justify-center">
                                                    <span className="text-3xl font-bold text-accent-gold-light dark:text-accent-gold-dark">
                                                        {rating.toFixed(1)}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-gold-light/20 to-accent-gold-dark/20 blur-2xl -z-10"></div>
                                            </div>

                                            {/* Rating Bar Visualization */}
                                            <div className="flex flex-col space-y-2">
                                                <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                                                    Customer Rating
                                                </span>
                                                <div className="flex space-x-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <div
                                                            key={star}
                                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${star <= Math.round(rating)
                                                                ? 'bg-accent-gold-light dark:bg-accent-gold-dark shadow-md'
                                                                : 'bg-gray-300 dark:bg-gray-600'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="w-36 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-accent-gold-light to-accent-gold-dark rounded-full transition-all duration-700 ease-out"
                                                        style={{ width: `${(rating / 5) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                    Based on customer reviews
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-3xl bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-md border-2 border-gray-300/40 dark:border-gray-600/40 flex items-center justify-center">
                                                    <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
                                                        New
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                                                    No Reviews Yet
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                    Be the first to review
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })()}

                                {/* Premium Stock Status – Fire Only Here */}
                                {(() => {
                                    const totalStock = product.stock
                                        ? Object.values(product.stock).reduce((sum, qty) => sum + (qty || 0), 0)
                                        : 0
                                    const isOverallInStock = totalStock > 0

                                    if (!isOverallInStock) {
                                        return (
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/30 to-red-600/30 backdrop-blur-md border-2 border-red-500/40 flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-xl animate-pulse -z-10"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-red-500 dark:text-red-400">
                                                        Sold Out
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Currently unavailable
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (selectedSize && product.stock && selectedSize in product.stock) {
                                        const qty = product.stock[selectedSize] || 0
                                        const isLowStock = qty > 0 && qty < 5
                                        const stockPercentage = Math.min((qty / 10) * 100, 100)

                                        return (
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <div
                                                        className={`w-14 h-14 rounded-2xl backdrop-blur-md border-2 flex items-center justify-center ${isLowStock
                                                            ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-500/40'
                                                            : 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500/40'
                                                            }`}
                                                    >
                                                        <svg
                                                            className={`w-6 h-6 ${isLowStock ? 'text-yellow-500' : 'text-green-500'}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        className={`absolute inset-0 rounded-2xl blur-xl -z-10 ${isLowStock ? 'bg-yellow-500/20' : 'bg-green-500/20'
                                                            }`}
                                                    ></div>
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <span
                                                        className={`text-lg font-bold ${isLowStock ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                                                            }`}
                                                    >
                                                        {isLowStock ? '🔥 Limited Stock' : 'In Stock'}
                                                    </span>
                                                    <div className="w-28 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${isLowStock
                                                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                                                : 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                                }`}
                                                            style={{ width: `${stockPercentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        Size {selectedSize}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-gold-light/30 to-accent-gold-dark/30 backdrop-blur-md border-2 border-accent-gold-light/40 dark:border-accent-gold-dark/40 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-accent-gold-light dark:text-accent-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div className="absolute inset-0 rounded-2xl bg-accent-gold-light/20 blur-xl -z-10"></div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-accent-gold-light dark:text-accent-gold-dark">
                                                    Available Now
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Multiple sizes in stock
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-wrap items-baseline gap-3">
                            <span className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                                ₹{getSalePrice()}
                            </span>
                            {product.originalPrice && product.isOnSale && (
                                <>
                                    <span className="text-xl text-gray-400 dark:text-gray-500 line-through">₹{product.originalPrice}</span>
                                    <span className="text-lg text-green-600 dark:text-green-400 font-semibold">
                                        Save ₹
                                        {(
                                            parseFloat(product.originalPrice.replace(/[^0-9.]/g, '')) -
                                            parseFloat(getSalePrice().replace(/[^0-9.]/g, ''))
                                        ).toLocaleString()}
                                    </span>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">MRP inclusive of all taxes</p>

                        {/* Size Selection */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Size</label>
                                <button
                                    type="button"
                                    onClick={() => setIsSizeOpen(true)}
                                    className="text-sm text-accent-gold-light dark:text-accent-gold-dark hover:underline flex items-center"
                                >
                                    <PencilRuler className="w-4 h-4 mr-1" />
                                    Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {availableSizes.map((size) => {
                                    const inStock = (stock[size] || 0) > 0
                                    const isSelected = selectedSize === size
                                    return (
                                        <button
                                            key={size}
                                            type="button"
                                            disabled={!inStock}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
        relative flex items-center justify-center py-3 px-4 border-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-gold-light dark:focus-visible:ring-accent-gold-dark
        ${isSelected
                                                    ? 'border-yellow-500 bg-yellow-500 text-white shadow-lg shadow-yellow-400/50'
                                                    : inStock
                                                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-text-primary-light dark:text-text-primary-dark hover:border-yellow-500 dark:hover:border-yellow-500'
                                                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                                }
      `}
                                            aria-pressed={isSelected}
                                            aria-label={`${size} size${inStock ? '' : ' out of stock'}`}
                                            tabIndex={inStock ? 0 : -1}
                                        >
                                            <span className={`${inStock ? '' : 'opacity-100'}`}>{size}</span>
                                            {!inStock && (
                                                <span
                                                    className="
            absolute inset-0 rounded-lg bg-gray-700/10
            flex items-center justify-center
            text-xs font-semibold tracking-wide text-yellow-400
            uppercase select-none pointer-events-none
            shadow-[0_0_6px_rgba(255,207,64,0.8)]
          "
                                                >
                                                    <Minus />
                                                </span>
                                            )}
                                        </button>
                                    )
                                })}


                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4 block tracking-wide">
                                Quantity
                            </label>
                            <div className="inline-flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm shadow-gray-200 dark:shadow-black/30">
                                <button
                                    type="button"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 rounded-l-lg border-r border-gray-300 dark:border-gray-700 text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="px-6 py-3 font-semibold text-center min-w-[60px] text-lg text-text-primary-light dark:text-text-primary-dark select-none">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const maxStock = selectedSize ? stock[selectedSize] || 0 : Infinity
                                        setQuantity((q) => (q < maxStock ? q + 1 : q))
                                    }}
                                    className="p-3 rounded-r-lg border-l border-gray-300 dark:border-gray-700 text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>


                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                                className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-lg tracking-wide transition ${selectedSize
                                    ? 'bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-text-primary-light dark:text-text-primary-dark hover:shadow-xl'
                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                aria-label="Add to cart"
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Add to Cart
                            </button>

                            <button
                                onClick={handleBuyNow}
                                disabled={!selectedSize}
                                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition ${selectedSize
                                    ? 'border-2 border-accent-gold-light dark:border-accent-gold-dark text-accent-gold-light dark:text-accent-gold-dark hover:bg-accent-gold-light dark:hover:bg-accent-gold-dark hover:text-white'
                                    : 'border-2 border-gray-300 dark:border-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                aria-label="Buy now"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3 text-sm">
                                <Truck className="w-5 h-5 text-accent-gold-light dark:text-accent-gold-dark" />
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">Free Delivery</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <Package className="w-5 h-5 text-accent-gold-light dark:text-accent-gold-dark" />
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">Easy Returns</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <Handshake className="w-5 h-5 text-accent-gold-light dark:text-accent-gold-dark" />
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">Secure Payment</span>
                            </div>
                        </div>


                    </motion.div>

                    {/* Product Details Tabs */}
                    <motion.div variants={itemVariants} >
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex space-x-8 overflow-x-auto scrollbar-none">
                                {[
                                    { id: 'details', label: 'Product Details', icon: BadgeInfo },
                                    { id: 'care', label: 'Care Instructions', icon: WashingMachine },
                                    { id: 'delivery', label: 'Delivery & Returns', icon: Truck },
                                ].map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setActiveTab(id as any)}
                                        className={`relative py-4 font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-colors ${activeTab === id
                                            ? 'border-b-2 border-accent-gold-light dark:border-accent-gold-dark text-accent-gold-light dark:text-accent-gold-dark'
                                            : 'border-b border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="py-8"
                            >
                                {activeTab === 'details' && (
                                    <div className="prose dark:prose-invert max-w-none">
                                        {product.description ? (
                                            <ul className="list-disc list-inside text-text-primary-light dark:text-text-primary-dark mb-6 space-y-1">
                                                {product.description
                                                    .split('. ')
                                                    .filter((point) => point.trim().length > 0)
                                                    .map((point, idx) => (
                                                        <li key={idx}>{point.trim().endsWith('.') ? point.trim() : point.trim() + '.'}</li>
                                                    ))}
                                            </ul>
                                        ) : (
                                            <p className="text-text-primary-light dark:text-text-primary-dark leading-relaxed mb-6">
                                                Elegant and comfortable kurti crafted with premium materials. Features include adjustable elements, high-quality stitching, and a modern silhouette that flatters all body types.
                                            </p>
                                        )}
                                        {product.features && product.features.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Features</h4>
                                                    <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                                        {product.features.map((feature, idx) => (
                                                            <li key={idx}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'care' && (
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Care Instructions</h4>
                                        <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                            <li>• Always hand wash or machine wash on a gentle cycle in cold water to prevent shrinking and color fading.</li>
                                            <li>• Use a mild detergent to protect the fabric. Avoid harsh chemicals and bleach.</li>
                                            <li>• Separate light and dark colors to avoid color bleeding.</li>
                                            <li>• Avoid soaking the kurti for a long time and do not rub or scrub aggressively.</li>
                                            <li>• Rinse well and avoid wringing or twisting the fabric to maintain its shape.</li>
                                            <li>• Dry the kurti in the shade, away from direct sunlight to prevent color fading.</li>
                                            <li>• Iron on a medium heat setting, preferably turning the kurti inside out and using a cloth over embroidery or prints.</li>
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'delivery' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Delivery Information</h4>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">We deliver all days, including bank holidays</p>
                                            <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                                <li>• Standard Delivery: 2-7 business days</li>
                                                <li>• Express Delivery: 1-2 business days</li>
                                                <li>• Free delivery on orders above ₹999</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Return Policy</h4>
                                            <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                                <li>• 30-day return window</li>
                                                <li>• Free returns and exchanges</li>
                                                <li>• Items must be in original condition</li>
                                                <li>• Refund processed within 5-7 business days</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                    </motion.div>


                </div>


                {relatedProducts.length > 0 && (
                    <RelatedProductsCarousel
                        products={relatedProducts}
                        title="You Might Also Like"
                    />
                )}
            </div>
        </motion.div>
    )
}
