'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    Heart,
    Share2,
    ShoppingBag,
    Truck,
    Shield,
    RotateCcw,
    Star,
    ChevronRight,
    Plus,
    Minus,
    Info,
    Ruler,
    Package
} from 'lucide-react'
import { Product } from '@/types/product'

interface ProductDetailsProps {
    product: Product
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
    },
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedSize, setSelectedSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('details')
    const [isWishlisted, setIsWishlisted] = useState(false)

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const getSalePrice = () => {
        if (product.isOnSale && product.originalPrice && product.salePercentage) {
            const originalAmount = parseFloat(product.originalPrice.replace('₹', '').replace(',', ''))
            const saleAmount = originalAmount - (originalAmount * product.salePercentage) / 100
            return `₹${saleAmount.toLocaleString()}`
        }
        return product.price
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size')
            return
        }
        alert(`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart`)
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
                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                        {product.name}
                    </span>
                </motion.nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Images */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden relative group">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Badges */}
                            {product.isOnSale && product.salePercentage && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    -{product.salePercentage}% OFF
                                </div>
                            )}

                            {product.badge && !product.isOnSale && (
                                <div className="absolute top-4 left-4 bg-accent-gold-light dark:bg-accent-gold-dark text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    {product.badge}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${isWishlisted
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300'
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
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent-gold-light dark:hover:ring-accent-gold-dark transition-all">
                                    <Image
                                        src={product.imageUrl}
                                        alt={`${product.name} view ${i}`}
                                        width={100}
                                        height={100}
                                        className="object-contain  w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* Title & Rating */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                                    ))}
                                    <span className="ml-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        4.2 (127 reviews)
                                    </span>
                                </div>

                                <span className="text-sm text-accent-gold-light dark:text-accent-gold-dark font-medium">
                                    In Stock
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-wrap items-baseline gap-3">
                            <span className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                                {getSalePrice()}
                            </span>
                            {product.originalPrice && product.isOnSale && (
                                <>
                                    <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                                        {product.originalPrice}
                                    </span>
                                    <span className="text-lg text-green-600 dark:text-green-400 font-semibold">
                                        Save ₹{(parseFloat(product.originalPrice.replace('₹', '').replace(',', '')) - parseFloat(getSalePrice().replace('₹', '').replace(',', ''))).toLocaleString()}
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            MRP inclusive of all taxes
                        </p>

                        {/* Size Selection */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                                    Size
                                </label>
                                <button
                                    className="text-sm text-accent-gold-light dark:text-accent-gold-dark hover:underline flex items-center"
                                    type="button"
                                >
                                    <Ruler className="w-4 h-4 mr-1" />
                                    Size Guide
                                </button>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 px-4 border-2 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                            ? 'border-accent-gold-light dark:border-accent-gold-dark bg-accent-gold-light dark:bg-accent-gold-dark text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-text-primary-light dark:text-text-primary-dark hover:border-accent-gold-light dark:hover:border-accent-gold-dark'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-3 block">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-2 font-medium min-w-[60px] text-center">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="w-full bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                                type="button"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span>Add to Cart</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full border-2 border-accent-gold-light dark:border-accent-gold-dark text-accent-gold-light dark:text-accent-gold-dark py-4 rounded-xl font-bold text-lg hover:bg-accent-gold-light dark:hover:bg-accent-gold-dark hover:text-white transition-all"
                                type="button"
                            >
                                Buy Now
                            </motion.button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3 text-sm">
                                <Truck className="w-5 h-5 text-accent-gold-light dark:text-accent-gold-dark" />
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">Free Delivery</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <RotateCcw className="w-5 h-5 text-accent-gold-light dark:text-accent-gold-dark" />
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">Easy Returns</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <Shield className="w-5 h-5 text-accent-gold-light dark:text-accent-gold-dark" />
                                <span className="text-text-secondary-light dark:text-text-secondary-dark">Secure Payment</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Product Details Tabs */}
                <motion.div variants={itemVariants} className="mt-16">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8 overflow-x-auto scrollbar-none">
                            {[
                                { id: 'details', label: 'Product Details', icon: Info },
                                { id: 'care', label: 'Care Instructions', icon: Package },
                                { id: 'delivery', label: 'Delivery & Returns', icon: Truck },
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setActiveTab(id)}
                                    className={`relative py-4 font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-colors ${activeTab === id
                                        ? 'border-b-2 border-accent-gold-light dark:border-accent-gold-dark text-accent-gold-light dark:text-accent-gold-dark'
                                        : 'border-b border-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{label}</span>

                                    {/* {activeTab === id && (
                                        <span
                                            className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-accent-gold-light to-accent-gold-dark rounded-full"
                                            style={{ transition: 'width 0.3s ease' }}
                                        />
                                    )} */}
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
                                    <p className="text-text-primary-light dark:text-text-primary-dark leading-relaxed mb-6">
                                        Elegant and comfortable kurti crafted with premium materials. Features include adjustable elements,
                                        high-quality stitching, and a modern silhouette that flatters all body types.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Specifications</h4>
                                            <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                                <li>Material: Premium Cotton Blend</li>
                                                <li>Fit: Regular</li>
                                                <li>Length: Knee Length</li>
                                                <li>Sleeve: Full Sleeves</li>
                                                <li>Pattern: {product.subCategory}</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Features</h4>
                                            <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                                <li>Breathable fabric</li>
                                                <li>Fade resistant colors</li>
                                                <li>Pre-shrunk material</li>
                                                <li>Comfortable fit</li>
                                                <li>Easy to maintain</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'care' && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Care Instructions</h4>
                                    <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                        <li>• Machine wash at 30°C</li>
                                        <li>• Use mild detergent</li>
                                        <li>• Do not bleach</li>
                                        <li>• Iron on medium heat</li>
                                        <li>• Dry in shade</li>
                                        <li>• Dry clean if needed</li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'delivery' && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Delivery Information</h4>
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                                            We deliver all days, including bank holidays
                                        </p>
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
        </motion.div>
    )
}
