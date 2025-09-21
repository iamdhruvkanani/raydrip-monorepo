'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, ShoppingCart, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import SideCart from '@/components/SideCart'
import { debounce } from 'lodash'
import OfferMarquee from '@/components/OfferMarquee'
import { useRouter } from 'next/navigation'

import AccountDropdown from '@/components/AccountDropdown'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isShrunk, setIsShrunk] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname() || '/'
    const { totalItems } = useCart()
    // const [loginModalOpen, setLoginModalOpen] = useState(false)
    const router = useRouter()

    const [mobileShopOpen, setMobileShopOpen] = useState(false)
    const [shopOpen, setShopOpen] = useState(false)

    const handleShopToggle = () => setShopOpen((prev) => !prev)
    const handleShopClose = () => setShopOpen(false)

    const shopCategories = [
        { label: 'View All Products', href: '/shop' },
        { label: 'Backless Kurtis', href: '/shop/backless-kurtis' },
        { label: 'Full Sleeves Kurtis', href: '/shop/full-sleeves-kurtis' },
        { label: 'Floral Kurtis', href: '/shop/floral-kurtis' },
        { label: 'Bell Sleeves Kurtis', href: '/shop/bell-sleeves-kurtis' },
        { label: 'Straight Sleeves Kurtis', href: '/shop/straight-sleeves-kurtis' },
        { label: 'Long Kurtis', href: '/shop/long-kurtis' },
        { label: 'Halter Neck Kurtis', href: '/shop/halter-neck-kurtis' },
    ]

    useEffect(() => {
        setMounted(true)

        const handleScroll = debounce(() => {
            setIsShrunk(window.scrollY > 50)
        }, 100)

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

    // Updated isActive supports prefix matching for subcategories
    const isActive = (href: string) => {
        const normalizedHref = normalizePath(href)
        if (normalizedHref === '/shop') {
            // Only active if exactly on /shop (view all products)
            return currentPath === '/shop'
        }
        // For other categories, active if exact or prefix match
        return currentPath === normalizedHref || currentPath.startsWith(normalizedHref + '/')
    }


    // Side cart state to show/hide cart drawer
    const [sideCartOpen, setSideCartOpen] = useState(false)

    const handleShopKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setShopOpen((prev) => !prev)
        }
    }

    return (
        <>



            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={mounted ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}

                className={`fixed top-0 w-full z-50 left-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-accent-gold-light/20 dark:border-accent-gold-dark/20 transition-all duration-300 ${isShrunk ? 'py-1.5 shadow-lg' : 'py-3'}`}
            // className={`fixed w-full z-50 top-0 left-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-accent-gold-light/20 dark:border-accent-gold-dark/20 transition-all duration-300 ${isShrunk ? 'py-1.5 shadow-lg' : 'py-3'}`}
            >
                {/* Separate Marquee Component */}
                < AnimatePresence >
                    <OfferMarquee isVisible={!isShrunk} />
                </AnimatePresence >

                {/* Logo and nav container */}
                < div className=" max-w-7xl mx-auto flex justify-between items-center px-6 pt-4 -mb-3" >
                    {/* Logo */}
                    < motion.div
                        initial={{ scale: 2 }}
                        animate={{ scale: 2 }}
                        whileHover={{ scale: 2.2 }}
                        transition={{ duration: 0.2 }}
                        className='pt-1 pb-0'
                    >
                        <Link href="/" className="inline-flex items-center space-x-3 m-0 p-0">
                            <Image
                                src="/raydrip-logo.png"
                                alt="RayDrip Logo"
                                height={36}
                                width={120}
                                className="w-auto select-none h-14"
                                priority
                            />
                        </Link>
                    </motion.div >

                    {/* Desktop Menu */}
                    < nav className="hidden md:flex space-x-8" >
                        {
                            ['Home', 'About', 'Contact'].map((item, index) => {
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
                            })
                        }

                        {/* Shop dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShopOpen(true)}
                            onMouseLeave={() => setShopOpen(false)}
                        >
                            <motion.button
                                onClick={handleShopToggle}
                                onKeyDown={handleShopKeyDown}
                                tabIndex={0}
                                aria-haspopup="true"
                                aria-expanded={shopOpen}
                                className={`font-medium cursor-pointer flex items-center gap-1 ${isShopButtonActive
                                    ? 'text-accent-gold-light dark:text-accent-gold-dark'
                                    : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark'
                                    }`}
                            >
                                Shop
                                <svg
                                    width="14"
                                    height="14"
                                    fill="none"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="mt-1"
                                >
                                    <path d="M2 5l5 5 5-5" />
                                </svg>
                            </motion.button>

                            <AnimatePresence>
                                {shopOpen && (
                                    <motion.div
                                        role="menu"
                                        aria-label="Shop submenu"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ duration: 0.18, ease: 'easeOut' }}
                                        className="absolute left-1/2 -translate-x-1/2 mt-3 min-w-[220px] bg-bg-light/95 dark:bg-bg-dark/95 border border-accent-gold-light/20 dark:border-accent-gold-dark/20 rounded-lg shadow-2xl z-50"
                                        onClick={handleShopClose}
                                    >
                                        {shopCategories.map((cat) => (
                                            <Link
                                                key={cat.href}
                                                href={cat.href}
                                                role="menuitem"
                                                className={`block px-6 py-3 font-medium whitespace-nowrap ${isActive(cat.href)
                                                    ? 'text-accent-gold-light dark:text-accent-gold-dark font-bold'
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
                    </nav >

                    {/* Right side: Theme toggle, cart icon, mobile menu */}
                    < div className="flex items-center space-x-4" >
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

                        {/* Account Icon */}
                        <AccountDropdown onLogout={() => router.push('/login')} />




                        {/* Cart Icon with badge (opens side cart) */}
                        <button
                            onClick={() => setSideCartOpen(true)}
                            aria-label="Open cart"
                            className="relative p-2 rounded-full bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300"
                            type="button"
                        >
                            <ShoppingCart size={20} />
                            {mounted && totalItems > 0 && (
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
                                    <Menu key="open" className="w-6 h-6 text-text-primary-light dark:text-text-primary-dark" />
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div >
                </div >

                {/* Mobile menu */}
                <AnimatePresence>
                    {
                        isOpen && (
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
                                            className={`font-medium w-full text-left flex justify-between items-center py-2 transition-colors duration-300 ${isShopButtonActive ? 'text-accent-gold-light dark:text-accent-gold-dark' : ''
                                                }`}
                                            aria-expanded={mobileShopOpen}
                                            aria-controls="mobile-shop-submenu"
                                        >
                                            Shop
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <AnimatePresence>
                                            {mobileShopOpen && (
                                                <motion.div
                                                    id="mobile-shop-submenu"
                                                    role="menu"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                    className="pl-4 mt-2 flex flex-col space-y-1 overflow-hidden"
                                                >
                                                    {shopCategories.map((cat) => {
                                                        const active = isActive(cat.href)
                                                        // console.log('Checking activity:', cat.href, '->', active, 'currentPath:', currentPath);

                                                        return (
                                                            <Link
                                                                key={cat.href}
                                                                href={cat.href}
                                                                role="menuitem"
                                                                className={`block py-2 font-medium whitespace-nowrap transition-colors duration-300 ${active
                                                                    ? 'text-accent-gold-light dark:text-accent-gold-dark font-bold'
                                                                    : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark hover:bg-accent-gold-light/[0.07] dark:hover:bg-accent-gold-dark/[0.07]'
                                                                    }`}
                                                                onClick={() => {
                                                                    setIsOpen(false)
                                                                    setMobileShopOpen(false)
                                                                }}
                                                            >
                                                                {cat.label}
                                                            </Link>
                                                        )
                                                    })}
                                                </motion.div>
                                            )}


                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.nav>
                        )
                    }
                </AnimatePresence >
            </motion.header >

            {/* SideCart Drawer Component */}
            < SideCart isOpen={sideCartOpen} onClose={() => setSideCartOpen(false)} />
        </>
    )
}
