"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product, Size } from '@/types/product'
import { getAllProducts, getProductsBySubCategoryNormalized } from '@/data/products'
import { ChevronUp, Filter, SortAsc, SortDesc, Search, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useCart } from '@/context/CartContext'
import ProductCard from './ProductCard'
import ProductCardMobile from './ProductCardMobile'

interface ShopSectionProps {
    selectedSubCategory: string
}

function capitalizeWords(str: string) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function toNumber(x: string | number) {
    return typeof x === 'number' ? x : parseFloat(x.replace(/[^0-9.]/g, '')) || 0
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightSearch(text: string | undefined, term: string) {
    if (!text || !term) return text;
    const re = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return text.split(re).map((t, i) =>
        t.toLowerCase() === term.toLowerCase()
            ? <span key={i} className="bg-yellow-300 dark:bg-yellow-600 rounded px-1 font-medium">{t}</span>
            : t
    );
}

export default function ShopSection({ selectedSubCategory }: ShopSectionProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [displayed, setDisplayed] = useState<Product[]>([])
    const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'rating'>('rating')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchActive, setSearchActive] = useState(false)
    const [page, setPage] = useState(1)
    const loaderRef = useRef<HTMLDivElement>(null)
    const searchBarRef = useRef<HTMLDivElement>(null)

    const { addToCart } = useCart();

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        onResize()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        const all = selectedSubCategory === 'View All Products'
            ? getAllProducts()
            : getProductsBySubCategoryNormalized(selectedSubCategory)
        setProducts(all)
        setDisplayed(all.slice(0, 12))
        setPage(1)
    }, [selectedSubCategory])

    const filtered = products.filter(p => {
        const searchArea =
            (p.name?.toLowerCase() || '') + ' ' +
            (p.description?.toLowerCase() || '') + ' ' +
            (p.category?.toLowerCase() || '') + ' ' +
            (Array.isArray(p.subCategory) ? p.subCategory.join(' ').toLowerCase() : '')
        return searchArea.includes(searchTerm.toLowerCase());
    }).filter(p => {
        const price = toNumber(p.price)
        return price >= priceRange[0] && price <= priceRange[1]
    })
    const sorted = filtered.sort((a, b) => {
        if (sortBy === 'priceAsc') return toNumber(a.price) - toNumber(b.price)
        if (sortBy === 'priceDesc') return toNumber(b.price) - toNumber(a.price)
        return (b.rating || 0) - (a.rating || 0)
    })

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && displayed.length < sorted.length) {
                setPage(p => p + 1)
            }
        },
        [displayed, sorted]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        })
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [handleObserver])

    useEffect(() => {
        setDisplayed(sorted.slice(0, page * 12))
    }, [page, sortBy, priceRange, searchTerm, products])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    function totalStock(product: Product) {
        return product.stock
            ? Object.values(product.stock).reduce((a, b) => a + b, 0)
            : 0;
    }

    function handleAddToCart(product: Product, e?: React.MouseEvent) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        const availableSizes = Object.keys(product.stock || {}).filter(sz => (product.stock?.[sz as Size] ?? 0) > 0);
        if (!availableSizes.length) {
            toast.error(<span><strong>{product.name}</strong> is out of stock.</span>);
            return;
        }
        addToCart(product, 1, undefined);
        toast.success(
            <div>
                <span className="font-semibold text-white">{product.name}</span>
                <span className="ml-2 font-bold text-white">added to cart!</span>
                <div className="text-xs text-yellow-300 mt-1">Select size in cart before checkout.</div>
            </div>
        );
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target as HTMLElement)) {
                setSearchActive(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="w-full px-3 md:px-8 lg:px-12">
            {/* Header Section */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-6 md:mb-12 relative">
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white">
                    {selectedSubCategory === 'View All Products' ? 'All Products' : capitalizeWords(selectedSubCategory)}
                </h1>
            </motion.div>
            {/* Controls (Search/filter/sort) */}
            <motion.div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl py-4 md:py-6 mb-4 md:mb-8 rounded-xl md:rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <div className="px-3 md:px-6">
                    {/* Search Bar */}
                    <div ref={searchBarRef} className="relative mb-4 md:mb-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setPage(1)
                                    setSearchActive(true)
                                }}
                                onFocus={() => setSearchActive(true)}
                                className="w-full pl-10 pr-10 py-3 md:py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm md:text-base focus:border-accent-gold-light focus:ring-1 focus:ring-accent-gold-light/20 transition-all"
                            />
                            {searchTerm && (
                                <button onClick={() => { setSearchTerm(''); setSearchActive(false) }} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"><X className="w-4 h-4 text-gray-400" /></button>
                            )}
                        </div>
                        {/* Search Dropdown */}
                        {searchActive && searchTerm && (
                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-72 overflow-hidden z-40">
                                <div className="overflow-y-auto max-h-72">
                                    {filtered.length === 0 ? (
                                        <div className="p-6 text-center"><Search className="w-8 h-8 mx-auto text-gray-300 mb-2" /><p className="text-gray-500 text-sm">No products found</p></div>
                                    ) : (
                                        filtered.slice(0, 5).map(p => (
                                            <Link key={p.id} href={`/products/${p.id}`} className="block">
                                                <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                                    <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                        <Image src={p.imageUrl?.[0] || '/placeholder-image.png'} alt={p.name} fill className="object-cover" sizes="48px" />
                                                    </div>
                                                    <div className="flex-1 ml-3 min-w-0">
                                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{highlightSearch(p.name, searchTerm)}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="font-bold text-sm text-gray-900 dark:text-white">₹{p.price}</span>
                                                            {p.isOnSale && (<span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs">Sale</span>)}
                                                        </div>
                                                        {totalStock(p) === 0 ? (<span className="text-xs text-gray-500 mt-1">Out of stock</span>) : totalStock(p) < 5 ? (<span className="text-xs text-yellow-600">Low stock</span>) : null}
                                                    </div>
                                                    <button onClick={(e) => handleAddToCart(p, e)} disabled={totalStock(p) === 0} className={`ml-2 p-2 rounded-lg text-sm transition-all ${totalStock(p) === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-accent-gold-light to-accent-gold-dark text-white shadow-md hover:scale-105'}`}>
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                    {/* Filters */}
                    <div className="mt-2 flex items-center justify-between gap-3 md:justify-start md:gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                onChange={(e) => {
                                    const val = e.target.value
                                    setPriceRange(val === 'all' ? [0, Infinity] : val === '0-500' ? [0, 500] : val === '500-1000' ? [500, 1000] : [1000, Infinity])
                                    setPage(1)
                                }}
                                className="bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-xs md:text-sm focus:border-accent-gold-light"
                            >
                                <option value="all">All Prices</option>
                                <option value="0-500">₹0–₹500</option>
                                <option value="500-1000">₹500–₹1000</option>
                                <option value="1000+">₹1000+</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setSortBy(sortBy === 'priceAsc' ? 'priceDesc' : sortBy === 'priceDesc' ? 'rating' : 'priceAsc')}
                            className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-accent-gold-light hover:text-white rounded-lg transition-all"
                        >
                            {sortBy === 'priceAsc' ? <SortAsc className="w-4 h-4" /> : sortBy === 'priceDesc' ? <SortDesc className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </motion.div>
            {/* Product grid */}
            <motion.div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                <AnimatePresence>
                    {displayed.map((p) => (
                        <motion.div
                            key={p.id}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            whileHover={isMobile ? {} : { y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobile ? <ProductCardMobile product={p} /> : <ProductCard product={p} />}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            <div ref={loaderRef} className="h-8"></div>
            <motion.button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 p-3 md:p-4 bg-gradient-to-r from-accent-gold-light to-accent-gold-dark text-white rounded-xl shadow-lg transform hover:scale-110 transition-all z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
            >
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
        </div>
    )
}
