// context/CartContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types/product'

export interface CartItem extends Product {
    quantity: number
    selectedSize?: string
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product, quantity?: number, size?: string) => void
    removeFromCart: (productId: string, size?: string) => void
    updateQuantity: (productId: string, quantity: number, size?: string) => void
    updateSize: (productId: string, newSize: string, oldSize?: string) => void
    clear: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (product: Product, quantity = 1, size?: string) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.id === product.id && item.selectedSize === size
            )
            if (existingIndex >= 0) {
                const updated = [...prev]
                updated[existingIndex].quantity += quantity
                return updated
            }
            return [...prev, { ...product, quantity, selectedSize: size }]
        })
    }

    const removeFromCart = (productId: string, size?: string) => {
        setCart((prev) =>
            prev.filter((item) => !(item.id === productId && item.selectedSize === size))
        )
    }

    const updateQuantity = (productId: string, quantity: number, size?: string) => {
        if (quantity <= 0) {
            removeFromCart(productId, size)
            return
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId && item.selectedSize === size ? { ...item, quantity } : item
            )
        )
    }

    const updateSize = (productId: string, newSize: string, oldSize?: string) => {
        setCart((prev) => {
            const indexOld = prev.findIndex(
                (item) => item.id === productId && item.selectedSize === oldSize
            )
            if (indexOld === -1) return prev

            const oldItem = prev[indexOld]
            let updated = prev.filter((_, i) => i !== indexOld)

            const indexNew = updated.findIndex(
                (item) => item.id === productId && item.selectedSize === newSize
            )
            if (indexNew >= 0) {
                updated[indexNew].quantity += oldItem.quantity
            } else {
                updated.push({ ...oldItem, selectedSize: newSize })
            }
            return updated
        })
    }

    const clear = () => setCart([])

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    const totalPrice = cart.reduce((sum, item) => {
        const price =
            item.isOnSale && item.originalPrice && item.salePercentage
                ? parseFloat(item.originalPrice.replace(/₹|,/g, '')) * (1 - item.salePercentage / 100)
                : parseFloat(item.price.replace(/₹|,/g, ''))

        return sum + price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, updateSize, clear, totalItems, totalPrice }}
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
