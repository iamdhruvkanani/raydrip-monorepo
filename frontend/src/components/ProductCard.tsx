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
                y: -12,
                scale: 1.03,
                boxShadow: '0 25px 50px -12px rgba(201,169,110,0.4)', // subtle golden shadow
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="group bg-surface-light dark:bg-surface-dark rounded-3xl overflow-hidden shadow-xl border border-accent-gold-light/20 dark:border-accent-gold-dark/20 hover:border-accent-gold-light/40 dark:hover:border-accent-gold-dark/40 cursor-pointer flex flex-col"
            style={{ minHeight: '470px' }}
        >
            {/* Image with Parallax Effect */}
            <div className="overflow-hidden w-full aspect-[2/3] relative rounded-t-3xl">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full h-full"
                >
                    <motion.img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-3xl"
                        loading="lazy"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>

                {/* Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow justify-between">
                <motion.h3
                    className="font-serif text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2 line-clamp-2 group-hover:text-accent-gold-light dark:group-hover:text-accent-gold-dark transition-colors duration-300"
                    title={product.name}
                >
                    {product.name}
                </motion.h3>

                <p className="text-accent-gold-light dark:text-accent-gold-dark font-bold text-lg mb-6 select-none">
                    {product.price}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light px-8 py-3 rounded-full font-semibold hover:shadow-2xl active:scale-95 transition-transform duration-300 select-none"
                    aria-label={`Add ${product.name} to cart`}
                >
                    Add to Cart
                </button>
            </div>
        </motion.article>
    )
}
