'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types/product'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (product: Product, quantity = 1) => {
        console.log('Adding to cart:', product.id, quantity)
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
                )
            }
            return [...prev, { ...product, quantity }]
        })
    }


    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCart((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    const totalPrice = cart.reduce((sum, item) => {
        // Use sale price if applicable, otherwise price
        const price = item.isOnSale && item.originalPrice && item.salePercentage
            ? parseFloat(item.originalPrice.replace(/₹|,/g, '')) * (1 - (item.salePercentage / 100))
            : parseFloat(item.price.replace(/₹|,/g, ''))

        return sum + price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}
