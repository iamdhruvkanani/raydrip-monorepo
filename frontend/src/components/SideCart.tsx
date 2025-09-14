'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, AlertTriangle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface SideCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  const { cart, removeFromCart, updateQuantity, updateSize, clear, totalItems, totalPrice } = useCart()

  const handleClearAll = () => {
    if (confirm('Clear all items?')) clear()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.aside
            className="
    fixed right-0 top-0 bottom-0
    max-w-xs w-full         /* max width about 320px on mobile */
    sm:max-w-md sm:w-96     /* wider on larger screens */
    bg-white dark:bg-gray-900
    shadow-2xl z-50 flex flex-col overflow-x-hidden rounded-l-3xl border-l border-gray-200 dark:border-gray-700
  "
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-accent-gold-light dark:text-accent-gold-dark" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{totalItems} items</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {cart.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-red-600 dark:text-red-400 text-xs font-medium hover:underline"
                  >
                    Clear All
                  </button>
                )}
                <button onClick={onClose} aria-label="Close cart" className="p-2">
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-32">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <ShoppingBag className="mx-auto mb-4 w-12 h-12" />
                  <p className="font-semibold">Your cart is empty</p>
                  <p className="mt-2">Add items to get started.</p>
                </div>
              ) : (
                cart.map((item) => {
                  const unitPrice = item.isOnSale && item.originalPrice && item.salePercentage
                    ? parseFloat(item.originalPrice.replace(/[^0-9.]/g, '')) * (1 - item.salePercentage / 100)
                    : parseFloat(item.price.replace(/[^0-9.]/g, ''))
                  return (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg"
                    >
                      <img src={item.imageUrl} alt={item.name}
                        className=" w-20 h-20 rounded-lg object-contain flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white line-clamp-2">{item.name}</p>
                        <select
                          value={item.selectedSize || ''}
                          onChange={e => updateSize(item.id, e.target.value, item.selectedSize)}
                          className="mt-2 w-full text-sm p-2 border rounded bg-white dark:bg-gray-700"
                        >
                          <option value="" disabled>Select size</option>
                          {SIZES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                              className="w-8 h-8 border rounded text-gray-600"
                            >−</button>
                            <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                              className="w-8 h-8 border rounded text-gray-600"
                            >+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="p-1 text-red-600">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="mt-2 font-semibold text-gray-900 dark:text-white">₹{(unitPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>

            {cart.length > 0 && !cart.every(i => i.selectedSize) && (
              <div className="px-4 pb-4">
                <p className="flex items-center text-sm text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" /> Select sizes for all items
                </p>
              </div>
            )}

            {cart.length > 0 && cart.every(i => i.selectedSize) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-x-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">₹{totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center py-3 bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light dark:text-text-primary-dark rounded-lg font-semibold hover:opacity-90 transition"
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
