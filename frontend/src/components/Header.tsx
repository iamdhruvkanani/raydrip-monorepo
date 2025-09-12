'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isShrunk, setIsShrunk] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()

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
            if (window.scrollY > 50) {
                setIsShrunk(true)
            } else {
                setIsShrunk(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed w-full z-50 top-0 left-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-accent-gold-light/20 dark:border-accent-gold-dark/20 transition-all duration-300 ${isShrunk ? 'py-2 shadow-lg' : 'py-4'
                }`}
        >
            {/* Logo */}
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/" className="inline-flex items-center space-x-3">
                        <span className="text-2xl font-serif text-accent-gold-light dark:text-accent-gold-dark font-bold">
                            RAYDRIP
                        </span>
                        {/* <Image
                            src="/raydrip-logo-3.png"
                            alt="RayDrip Logo"
                            width={100}
                            height={50}
                            priority={true}
                            quality={90}
                            className="select-none"
                        /> */}
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8">
                    {/* Render non-Shop nav items */}
                    {['Home', 'About', 'Contact'].map((item, index) => {
                        const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                        const isActive = pathname === href
                        return (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                            >
                                <Link
                                    href={href}
                                    className={`relative font-medium transition-colors duration-300 cursor-pointer ${isActive
                                            ? 'text-accent-gold-light dark:text-accent-gold-dark'
                                            : 'text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark'
                                        }`}
                                >
                                    {item}
                                    {isActive && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-gold-light dark:bg-accent-gold-dark"
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        )
                    })}

                    {/* Shop dropdown menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShopOpen(true)}
                        onMouseLeave={() => setShopOpen(false)}
                    >
                        <motion.button
                            onClick={handleShopToggle}
                            className={`font-medium cursor-pointer flex items-center gap-1 ${pathname.startsWith('/shop')
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
                                            className="block px-6 py-3 font-medium text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark hover:bg-accent-gold-light/[0.07] dark:hover:bg-accent-gold-dark/[0.07] whitespace-nowrap"
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

                {/* Theme Toggle + Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
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

                    {/* Mobile Hamburger */}
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

            {/* Mobile Menu */}
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
                            {/* Mobile nav items except Shop */}
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
                                            className="block text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300 font-medium py-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                            {/* Mobile Shop Section */}
                            <div>
                                <button
                                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                                    className="font-medium text-accent-gold-light dark:text-accent-gold-dark w-full text-left flex justify-between items-center py-2"
                                    aria-expanded={mobileShopOpen}
                                    aria-controls="mobile-shop-submenu"
                                >
                                    Shop
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""
                                            }`}
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
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="pl-4 mt-2 flex flex-col space-y-1 overflow-hidden"
                                        >
                                            {shopCategories.map(cat => (
                                                <Link
                                                    key={cat.href}
                                                    href={cat.href}
                                                    className="block text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300 font-medium py-2"
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
    )
}
