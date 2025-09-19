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
    disabled?: boolean
}

export default function AddToCartButton({
    product,
    quantity = 1,
    onClick,
    className = '',
    disabled = false,
}: AddToCartButtonProps) {
    const { addToCart } = useCart()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return
        addToCart(product, quantity)
        if (onClick) onClick(e)
    }

    return (
        <motion.button
            onClick={handleClick}
            disabled={disabled}
            className={`${className} flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r ${disabled ? 'from-gray-400 to-gray-500 cursor-not-allowed' : 'from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700'
                } text-white shadow-md font-semibold text-sm transition active:scale-95`}
            aria-label={`${disabled ? 'Out of stock' : `Add ${product.name} to cart`}`}
            type="button"
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
        >
            <ShoppingBag className="mr-2 w-5 h-5" />
            {disabled ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
    )
}
