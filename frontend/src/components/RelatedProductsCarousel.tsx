'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ProductCardMobile from '@/components/ProductCardMobile'
import { Product } from '@/types/product'

interface RelatedProductsCarouselProps {
    products: Product[]
    title?: string
}

export default function RelatedProductsCarousel({
    products,
    title = 'You Might Also Like'
}: RelatedProductsCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)

        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth)
            }
        }

        checkMobile()
        updateWidth()
        window.addEventListener('resize', () => {
            checkMobile()
            updateWidth()
        })

        return () => window.removeEventListener('resize', () => {
            checkMobile()
            updateWidth()
        })
    }, [])

    const updateArrows = () => {
        if (!containerRef.current) return
        setCanScrollPrev(containerRef.current.scrollLeft > 0)
        setCanScrollNext(
            containerRef.current.scrollLeft + containerWidth <
            containerRef.current.scrollWidth - 1
        )
    }

    useEffect(() => {
        updateArrows()
        const el = containerRef.current
        if (!el) return
        el.addEventListener('scroll', updateArrows)
        return () => el.removeEventListener('scroll', updateArrows)
    }, [containerWidth, products])

    if (products.length === 0) return null

    const getScrollAmount = () => {
        if (!containerRef.current) return 0
        if (window.innerWidth < 640) return containerWidth / 2 // 2 per mobile
        if (window.innerWidth < 1024) return containerWidth / 3 // 3 per tablet
        return containerWidth / 4 // 4 per desktop
    }

    const scrollBy = (numItems: number) => {
        if (!containerRef.current) return
        const cards = containerRef.current.children
        if (cards.length === 0) return

        // First card width + gap (gap-6 = 1.5rem = 24px)
        const card = cards[0] as HTMLElement
        const cardWidth = card.getBoundingClientRect().width
        const style = window.getComputedStyle(containerRef.current)
        const gap = parseFloat(style.columnGap) || 24

        const scrollAmount = (cardWidth + gap) * numItems
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        // className="w-full py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
            {/* Remove width constraints & center on ALL screens */}
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-6 md:px-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    {!isMobile && products.length > 4 && (
                        <div className="flex space-x-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-1">
                            <button
                                onClick={() => scrollBy(-1)}
                                disabled={!canScrollPrev}
                                className={`p-2 rounded-md text-gray-800 dark:text-gray-200 transition-colors ${canScrollPrev ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'opacity-40 cursor-not-allowed'
                                    }`}
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scrollBy(1)}
                                disabled={!canScrollNext}
                                className={`p-2 rounded-md text-gray-800 dark:text-gray-200 transition-colors ${canScrollNext ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'opacity-40 cursor-not-allowed'
                                    }`}
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
                {/* px-6 ensures cards don't touch browser edge on large screens */}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 py-2 px-6 md:px-12"
                    role="list"
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="snap-start flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4"
                            role="listitem"
                        >
                            {isMobile ? <ProductCardMobile product={product} /> : <ProductCard product={product} />}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
