'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface SideCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  const { cart, removeFromCart, updateQuantity, updateSize, totalItems, totalPrice } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
          {/* Side cart drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Shopping Cart ({totalItems})
              </h2>
              <button onClick={onClose} aria-label="Close cart" className="text-gray-700 dark:text-gray-300">
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
                    <div key={`${item.id}-${item.selectedSize ?? 'none'}`} className="flex items-center space-x-4">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>

                        <select
                          aria-label={`Select size for ${item.name}`}
                          value={item.selectedSize ?? ''}
                          onChange={(e) => updateSize(item.id, e.target.value, item.selectedSize)}
                          className="mt-2 w-full p-2 border rounded"
                        >
                          <option value="" disabled>
                            Select size
                          </option>
                          {SIZES.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>

                        <div className="mt-2 flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                            className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                            className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-red-600 hover:text-red-800"
                          aria-label={`Remove ${item.name}`}
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

            {cart.length > 0 && !cart.every(item => item.selectedSize) && (
              <div className="p-4 border-t border-red-500 dark:border-red-700 text-red-600 dark:text-red-400 font-semibold text-center">
                Please select size for all items to proceed.
              </div>
            )}

            {cart.length > 0 && cart.every(item => item.selectedSize) && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href={cart.every(item => item.selectedSize) ? '/checkout' : '#'}
                  onClick={(e) => {
                    if (!cart.every(item => item.selectedSize)) e.preventDefault()
                    else onClose()
                  }}
                  className={`block text-center py-3 rounded-lg font-semibold transition duration-300 ${cart.every(item => item.selectedSize)
                      ? 'bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light dark:text-text-primary-dark hover:bg-yellow-500 dark:hover:bg-yellow-600 cursor-pointer'
                      : 'bg-gray-400 dark:bg-gray-700 text-gray-200 dark:text-gray-400 cursor-not-allowed opacity-60'
                    }`}
                  aria-disabled={!cart.every(item => item.selectedSize)}
                >
                  Proceed to Checkout
                </Link>

                {!cart.every(item => item.selectedSize) && (
                  <p className="mt-2 text-center font-semibold text-red-600 dark:text-red-400">
                    Please select size for all items to proceed.
                  </p>
                )}


              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
