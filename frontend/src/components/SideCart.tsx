'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface SideCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />

          {/* Side cart drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart ({totalItems})</h2>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="text-gray-700 dark:text-gray-300 hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors"
              >
                <X size={24} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</p>
              ) : (
                cart.map((item) => {
                  const price = item.isOnSale && item.originalPrice && item.salePercentage
                    ? parseFloat(item.originalPrice.replace(/₹|,/g, '')) * (1 - item.salePercentage / 100)
                    : parseFloat(item.price.replace(/₹|,/g, ''))

                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          &times;
                        </button>
                        <div className="mt-1 font-semibold text-gray-900 dark:text-white">
                          ₹{(price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center py-3 bg-accent-gold-light dark:bg-accent-gold-dark text-white rounded-lg font-semibold shadow hover:bg-yellow-500 dark:hover:bg-yellow-400 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
