'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
// import Image from 'next/image'


export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isShrunk, setIsShrunk] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()

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

    const navItems = ['Home', 'Shop', 'About', 'Contact']

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed w-full z-50 top-0 left-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-accent-gold-light/20 dark:border-accent-gold-dark/20 transition-all duration-300 ${isShrunk ? 'py-2 shadow-lg' : 'py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/" className="text-2xl font-serif text-accent-gold-light dark:text-accent-gold-dark font-bold">
                        RAYDRIP
                    </Link>

                </motion.div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item, index) => {
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
                            {navItems.map((item, index) => {
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
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
