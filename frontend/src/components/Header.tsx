'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, ShoppingCart } from 'lucide-react' // Added ShoppingCart icon
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'  // Import cart context
import SideCart from '@/components/SideCart'
export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isShrunk, setIsShrunk] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname() || '/'
    const { totalItems } = useCart() // Get total items from cart context



    const [mobileShopOpen, setMobileShopOpen] = useState(false)
    const [shopOpen, setShopOpen] = useState(false)

    const handleShopToggle = () => setShopOpen((prev) => !prev)
    const handleShopClose = () => setShopOpen(false)

    const shopCategories = [
        { label: "View All Products", href: "/shop" },
        { label: "Backless Kurtis", href: "/shop/backless-kurtis" },
        { label: "Full Sleeves Short Kurtis", href: "/shop/full-sleeves-short-kurtis" },
        { label: "Floral Kurtis", href: "/shop/floral-kurtis" },
        { label: "Bell Sleeves Kurtis", href: "/shop/bell-sleeves-kurtis" },
    ]

    useEffect(() => {
        setMounted(true)

        const handleScroll = () => {
            setIsShrunk(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => setIsOpen(!isOpen)

    const normalizePath = (path: string) => {
        if (!path) return '/'
        if (path === '/') return '/'
        return path.endsWith('/') ? path.slice(0, -1) : path
    }

    const currentPath = normalizePath(pathname)

    const isShopButtonActive = currentPath === '/shop' || currentPath.startsWith('/shop/')

    const isActive = (href: string) => {
        const normalizedHref = normalizePath(href)
        return currentPath === normalizedHref
    }

    // Side cart state to show/hide cart drawer
    const [sideCartOpen, setSideCartOpen] = useState(false)

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed w-full z-50 top-0 left-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-accent-gold-light/20 dark:border-accent-gold-dark/20 transition-all duration-300 ${isShrunk ? 'py-1.5 shadow-lg' : 'py-3'
                    }`}
            >
                {/* Logo and nav container */}
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Link href="/" className="inline-flex items-center space-x-3 m-0 p-0">
                            <Image
                                src="/raydrip-logo.png"
                                alt="RayDrip Logo"
                                height={36}
                                width={120}
                                className="w-auto select-none transform scale-150 h-14"
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        {['Home', 'About', 'Contact'].map((item, index) => {
                            const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                            return (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.5 }}
                                >
                                    <Link
                                        href={href}
                                        className={`relative font-medium transition-colors duration-300 cursor-pointer ${isActive(href)
                                            ? 'text-accent-gold-light dark:text-accent-gold-dark'
                                            : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark'
                                            }`}
                                    >
                                        {item}
                                        {isActive(href) && (
                                            <motion.span
                                                layoutId="underline"
                                                className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-gold-light dark:bg-accent-gold-dark"
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            )
                        })}

                        {/* Shop dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShopOpen(true)}
                            onMouseLeave={() => setShopOpen(false)}
                        >
                            <motion.button
                                onClick={handleShopToggle}
                                className={`font-medium cursor-pointer flex items-center gap-1 ${isShopButtonActive
                                    ? 'text-accent-gold-light dark:text-accent-gold-dark'
                                    : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark'
                                    }`}
                                aria-haspopup="true"
                                aria-expanded={shopOpen}
                            >
                                Shop
                                <svg width="14" height="14" fill="none" stroke="currentColor" className="mt-1">
                                    <path d="M2 5l5 5 5-5" />
                                </svg>
                            </motion.button>

                            <AnimatePresence>
                                {shopOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ duration: 0.18, ease: 'easeOut' }}
                                        className="absolute left-1/2 -translate-x-1/2 mt-3 min-w-[220px] bg-bg-light/95 dark:bg-bg-dark/95 border border-accent-gold-light/20 dark:border-accent-gold-dark/20 rounded-lg shadow-2xl z-50"
                                        onClick={handleShopClose}
                                    >
                                        {shopCategories.map(cat => (
                                            <Link
                                                key={cat.href}
                                                href={cat.href}
                                                className={`block px-6 py-3 font-medium whitespace-nowrap ${isActive(cat.href)
                                                    ? 'text-accent-gold-light dark:text-accent-gold-dark font-semibold'
                                                    : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark hover:bg-accent-gold-light/[0.07] dark:hover:bg-accent-gold-dark/[0.07]'
                                                    }`}
                                                onClick={() => setShopOpen(false)}
                                            >
                                                {cat.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    {/* Right side: Theme toggle, cart icon, mobile menu */}
                    <div className="flex items-center space-x-4">
                        {mounted && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                aria-label="Toggle theme"
                                className="p-2 rounded-full bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>
                        )}

                        {/* Cart Icon with badge (opens side cart) */}
                        <button
                            onClick={() => setSideCartOpen(true)}
                            aria-label="Open cart"
                            className="relative text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors"
                            type="button"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[18px] min-h-[18px] leading-[18px] px-1.5 rounded-full font-semibold text-center select-none"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <motion.button
                            className="md:hidden relative w-8 h-8 flex flex-col justify-center"
                            onClick={toggleMenu}
                            aria-expanded={isOpen}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence initial={false}>
                                {isOpen ? (
                                    <X key="close" className="w-6 h-6 text-accent-gold-light dark:text-accent-gold-dark" />
                                ) : (
                                    <Menu key="open" className="w-6 h-6 text-accent-gold-light dark:text-accent-gold-dark" />
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-surface-light dark:bg-surface-dark border-t border-accent-gold-light/20 dark:border-accent-gold-dark/20"
                        >
                            <div className="px-6 py-6 space-y-4">
                                {['Home', 'About', 'Contact'].map((item, index) => {
                                    const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                                    return (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={href}
                                                className={`block font-medium py-2 transition-colors duration-300 ${isActive(href)
                                                    ? 'text-accent-gold-light dark:text-accent-gold-dark'
                                                    : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark'
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item}
                                            </Link>
                                        </motion.div>
                                    )
                                })}

                                <div>
                                    <button
                                        onClick={() => setMobileShopOpen(!mobileShopOpen)}
                                        className={`font-medium w-full text-left flex justify-between items-center py-2 transition-colors duration-300 ${isShopButtonActive
                                            ? 'text-accent-gold-light dark:text-accent-gold-dark'
                                            : ''
                                            }`}
                                        aria-expanded={mobileShopOpen}
                                        aria-controls="mobile-shop-submenu"
                                    >
                                        Shop
                                        <svg
                                            className={`w-4 h-4 transform transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <AnimatePresence>
                                        {mobileShopOpen && (
                                            <motion.div
                                                id="mobile-shop-submenu"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                className="pl-4 mt-2 flex flex-col space-y-1 overflow-hidden"
                                            >
                                                {shopCategories.map(cat => (
                                                    <Link
                                                        key={cat.href}
                                                        href={cat.href}
                                                        className={`block py-2 text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300 font-medium ${isActive(cat.href) ? 'text-accent-gold-light dark:text-accent-gold-dark font-semibold' : ''
                                                            }`}
                                                        onClick={() => {
                                                            setIsOpen(false)
                                                            setMobileShopOpen(false)
                                                        }}
                                                    >
                                                        {cat.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* SideCart Drawer Component */}
            <SideCart isOpen={sideCartOpen} onClose={() => setSideCartOpen(false)} />
        </>
    )
}

// SideCart Component

// function SideCart({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
//     const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 0.5 }}
//                         exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         className="fixed inset-0 bg-black z-40 cursor-pointer"
//                     />

//                     <motion.aside
//                         initial={{ x: '100%' }}
//                         animate={{ x: 0 }}
//                         exit={{ x: '100%' }}
//                         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                         className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
//                     >
//                         <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//                             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart ({totalItems})</h2>
//                             <button
//                                 onClick={onClose}
//                                 aria-label="Close cart"
//                                 className="text-gray-700 dark:text-gray-300 hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors"
//                             >
//                                 <X size={24} />
//                             </button>
//                         </header>

//                         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                             {cart.length === 0 ? (
//                                 <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</p>
//                             ) : (
//                                 cart.map(item => (
//                                     <div key={item.id} className="flex items-center space-x-4">
//                                         <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                                         <div className="flex-1">
//                                             <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
//                                             <div className="flex items-center space-x-2 mt-1">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
//                                                     className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                                                     aria-label={`Decrease quantity of ${item.name}`}
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <span>{item.quantity}</span>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                                     className="px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                                                     aria-label={`Increase quantity of ${item.name}`}
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeFromCart(item.id)}
//                                                 className="text-red-600 hover:text-red-800"
//                                                 aria-label={`Remove ${item.name} from cart`}
//                                             >
//                                                 &times;
//                                             </button>
//                                             <div className="mt-1 font-semibold text-gray-900 dark:text-white">
//                                                 ₹{item.quantity * parseFloat(item.price.replace(/₹|,/g, '')) || 0}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>

//                         {cart.length > 0 && (
//                             <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                                 <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                                     <span>Total</span>
//                                     <span>₹{totalPrice.toFixed(2)}</span>
//                                 </div>
//                                 <Link
//                                     href="/checkout"
//                                     onClick={onClose}
//                                     className="block w-full text-center py-3 bg-accent-gold-light dark:bg-accent-gold-dark text-white rounded-lg font-semibold shadow hover:bg-yellow-500 dark:hover:bg-yellow-400 transition"
//                                 >
//                                     Proceed to Checkout
//                                 </Link>
//                             </div>
//                         )}
//                     </motion.aside>
//                 </>
//             )}
//         </AnimatePresence>
//     )
// }
