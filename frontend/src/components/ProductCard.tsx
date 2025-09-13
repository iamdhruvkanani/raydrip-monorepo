'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimations'

interface Product {
    id: string
    name: string
    price: string
    imageUrl: string
}

export default function ProductCard({ product }: { product: Product }) {
    const { ref, isInView } = useScrollAnimation()

    const handleAddToCart = () => {
        alert(`${product.name} added to cart`)
    }

    return (
        <motion.article
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: '0 8px 32px -4px rgba(201,169,110,0.15)', // subtle golden shadow
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="group bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-md border border-accent-gold-light/20 dark:border-accent-gold-dark/20 hover:border-accent-gold-light/40 dark:hover:border-accent-gold-dark/40 cursor-pointer flex flex-col h-full"
        >
            <div className="aspect-square w-full bg-white flex items-center justify-center overflow-hidden rounded-2xl">
                <motion.div
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full h-full"
                >
                    <motion.img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-top object-cover rounded-t-2xl"
                        loading="lazy"
                        initial={{ scale: 1.07, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
                {/* Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
            </div >
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <motion.h3
                    className="font-serif text-base sm:text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-1 line-clamp-2 group-hover:text-accent-gold-light dark:group-hover:text-accent-gold-dark transition-colors duration-300"
                    title={product.name}
                >
                    {product.name}
                </motion.h3>
                <p className="text-accent-gold-light dark:text-accent-gold-dark font-bold text-sm sm:text-lg mb-4 select-none">
                    {product.price}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light w-full rounded-full py-2 sm:py-3 font-semibold hover:shadow-xl active:scale-95 transition duration-200 select-none"
                    aria-label={`Add ${product.name} to cart`}
                >
                    Add to Cart
                </button>
            </div>
        </motion.article >
    )
}
