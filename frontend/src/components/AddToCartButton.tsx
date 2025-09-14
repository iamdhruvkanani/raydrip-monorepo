'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/types/product'
import { useCart } from '@/context/CartContext'

interface AddToCartButtonProps {
    product: Product
    quantity?: number
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
}

export default function AddToCartButton({
    product,
    quantity = 1,
    onClick,
    className = ''
}: AddToCartButtonProps) {
    const { addToCart } = useCart()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product, quantity)
        if (onClick) onClick(e)
    }

    return (
        <motion.button
            onClick={handleClick}
            className={`${className} flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md font-semibold text-sm transition hover:from-yellow-500 hover:to-yellow-700 active:scale-95`}
            aria-label={`Add ${product.name} to cart`}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <ShoppingBag className="mr-2 w-5 h-5" />
            Add to Cart
        </motion.button>
    )
}
