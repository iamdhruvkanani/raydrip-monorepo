'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, AlertTriangle, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import type { Size } from '@/types/product'
import { toast } from 'react-hot-toast'
import ConfirmModal from '@/components/ConfirmModal'


const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface SideCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  const { cart, removeFromCart, updateQuantity, updateSize, clear, totalItems, totalPrice } = useCart()


  const [showConfirm, setShowConfirm] = useState(false)

  const openConfirm = () => setShowConfirm(true)
  const closeConfirm = () => setShowConfirm(false)

  const handleClearConfirmed = () => {
    clear() // your clear cart action
    closeConfirm()
    toast.success('Cart cleared!')
    // toast.error('There was a problem with your cart!')

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
              fixed inset-y-0 right-0
              max-w-xs w-full sm:max-w-md sm:w-96
              bg-white dark:bg-gray-900
              ring-1 ring-gray-200 dark:ring-gray-700
              shadow-2xl z-50 flex flex-col overflow-x-hidden
              rounded-l-3xl border-l-2 border-gray-200 dark:border-gray-700
            "
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <header className="flex justify-between items-center px-6 py-5 bg-surface-light dark:bg-surface-dark border-b border-divider-light dark:border-divider-dark">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-accent-light dark:text-accent-dark" />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark">
                    Your Cart
                  </h2>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {totalItems} items
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {cart.length > 0 && (
                  <button
                    onClick={openConfirm}
                    className="text-sm text-error-light dark:text-error-dark hover:underline"
                  >
                    Clear All
                  </button>
                )}

                <ConfirmModal
                  isOpen={showConfirm}
                  message="Are you sure you want to clear all items from the cart?"
                  onConfirm={handleClearConfirmed}
                  onCancel={closeConfirm}
                />


                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 rounded-full hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors"
                >
                  <X className="w-6 h-6 text-text-primary-light dark:text-text-primary-dark" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-32">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 space-y-6">
                  <ShoppingBag className="mx-auto w-12 h-12 opacity-50" />
                  <p className="font-medium">Your cart is empty</p>
                  <p>Add items to get started.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-accent-gold-light dark:bg-accent-gold-dark text-white rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => {
                  const unitPrice =
                    item.isOnSale && item.originalPrice && item.salePercentage
                      ? parseFloat(item.originalPrice.replace(/[^0-9.]/g, '')) * (1 - item.salePercentage / 100)
                      : parseFloat(item.price.replace(/[^0-9.]/g, ''))
                  return (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex space-x-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
                    >
                      {item.isOnSale && item.salePercentage && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{item.salePercentage}%
                        </span>
                      )}
                      <img
                        src={
                          item.imageUrl && item.imageUrl.length > 0
                            ? item.imageUrl[0]
                            : "/placeholder-image.png"
                        }
                        alt={item.name}
                        className="object-top w-20 h-20 rounded-2xl object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">{item.name}</p>
                        {/* Size Selector showing only available sizes */}
                        <select
                          value={item.selectedSize || ''}
                          onChange={e => updateSize(item.id, e.target.value as Size, item.selectedSize)}
                          className="mt-2 w-full text-sm p-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark transition"
                        >
                          <option value="" disabled>
                            Select size
                          </option>
                          {SIZES.filter(s => (item.stock?.[s] ?? 0) > 0).map(s => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)
                              }
                              className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                              className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-end items-baseline space-x-2">
                          {item.isOnSale && item.originalPrice && (
                            <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                              ₹{(parseFloat(item.originalPrice.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                            </span>
                          )}
                          <span className="font-extrabold text-xl text-gray-900 dark:text-white">
                            ₹{(unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>

            {cart.length > 0 && !cart.every(i => i.selectedSize) && (
              <div className="px-6 pb-6">
                <p className="flex items-center text-sm text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" /> Select sizes for all items
                </p>
              </div>
            )}

            {cart.length > 0 && cart.every(i => i.selectedSize) && (
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-white dark:bg-gray-900 ring-t ring-gray-200 dark:ring-gray-700 border-t rounded-t-2xl shadow-inner overflow-x-hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-serif font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center py-3 bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
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
