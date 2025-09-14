'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { getFeaturedProducts, getNewArrivalProducts } from '@/data/products'

const desktopSlides = [
    {
        id: 1,
        imageUrl: '/banner1-desktop.jpeg', // Use separate desktop banner images in public folder
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2370&auto=format&fit=crop',
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
    {
        id: 3,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1714226832576-f4356d4ab92b?q=80&w=2370&auto=format&fit=crop',
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
]

const mobileSlides = [
    {
        id: 1,
        imageUrl: '/banner1.jpeg', // Use separate mobile banner images in public folder
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
    {
        id: 2,
        imageUrl: '/banner2.jpeg',
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
    {
        id: 3,
        imageUrl: '/banner3.jpeg',
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
]

const slideVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
}

function useWindowWidth() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(window.innerWidth)
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return width
}

export default function HomePageClient() {
    const width = useWindowWidth()
    const isMobile = width > 0 && width < 768 // breakpoint for mobile

    const slides = isMobile ? mobileSlides : desktopSlides

    const [currentIndex, setCurrentIndex] = useState(0)

    const getImageSrc = (src: string) => {
        if (src.startsWith('http') || src.startsWith('https')) {
            return src // external URL
        } else {
            return `/${src.replace(/^\/+/, '')}` // local public file
        }
    }

    const featuredProducts = getFeaturedProducts()
    const newArrivalProducts = getNewArrivalProducts()

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, [slides.length])

    useEffect(() => {
        if (slides.length === 0) return
        const timer = setTimeout(() => nextSlide(), 5000)
        return () => clearTimeout(timer)
    }, [currentIndex, nextSlide, slides.length])

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: featuredProducts.map((product, index) => ({
            '@type': 'Product',
            position: index + 1,
            name: product.name,
            image: product.imageUrl.trimEnd(),
            url: `https://your-domain.com/products/${product.id}`,
            offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price: product.isOnSale
                    ? (
                        parseFloat(product.originalPrice!.replace(/[^0-9.]/g, '')) *
                        (1 - product.salePercentage! / 100)
                    ).toFixed(0)
                    : product.price.replace(/[^0-9.]/g, ''),
                availability: 'https://schema.org/InStock',
            },
        })),
    }

    return (
        <>
            <Head>
                <title>RayDrip • Premium Ethnic Apparel & Accessories</title>
                <meta
                    name="description"
                    content="Shop RayDrip’s curated collection of premium ethnic apparel. Discover featured products, new arrivals, seasonal sales, and best-sellers with exclusive discounts."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://your-domain.com/" />

                <meta property="og:title" content="RayDrip • Premium Ethnic Apparel" />
                <meta
                    property="og:description"
                    content="Shop RayDrip’s premium ethnic wear. Featured products, new arrivals, sale badges, and exclusive discounts."
                />
                <meta property="og:url" content="https://your-domain.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://your-domain.com/og-image.jpg" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="RayDrip • Premium Ethnic Apparel" />
                <meta
                    name="twitter:description"
                    content="Shop RayDrip’s premium ethnic wear with exclusive discounts and new arrivals."
                />
                <meta name="twitter:image" content="https://your-domain.com/og-image.jpg" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    key="product-jsonld"
                />
            </Head>

            <main>
                {/* Hero Section */}
                <section
                    className="relative h-[80vh] md:h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-bg-light via-surface-light to-bg-light dark:from-bg-dark dark:via-surface-dark dark:to-bg-dark px-4"
                    aria-label="Hero banner slideshow"
                >
                    <div className="absolute w-full h-full">
                        <AnimatePresence initial={false} mode="wait">
                            {slides.map(
                                (slide, index) =>
                                    index === currentIndex && (
                                        <motion.img
                                            key={slide.id}
                                            src={getImageSrc(slide.imageUrl)}
                                            alt={`Slide ${slide.id}`}
                                            className="absolute inset-0 w-full h-full object-cover brightness-75"
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.8 }}
                                            loading="lazy"
                                        />
                                    ),
                            )}
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    </div>

                    <motion.div
                        className="relative z-10 max-w-5xl text-center mx-auto px-4 md:px-0"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
                    >
                        <h1
                            className="
              text-4xl sm:text-6xl md:text-8xl font-serif font-extrabold tracking-tight mb-6
              text-text-primary-dark dark:text-text-primary-dark
              drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]
              sm:drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]
            "
                            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
                        >
                            {slides[currentIndex].title}
                        </h1>

                        <p
                            className="
              text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light
              text-accent-gold-light dark:text-accent-gold-dark
              drop-shadow-md sm:drop-shadow-lg
              tracking-wide
              mb-12
              px-2
            "
                            style={{ letterSpacing: '0.015em' }}
                        >
                            {slides[currentIndex].subtitle}
                        </p>

                        <button
                            onClick={() => alert('Explore collection clicked!')}
                            className="
              inline-block bg-accent-gold-light dark:bg-accent-gold-dark
              text-text-primary-light dark:text-text-primary-dark
              px-10 py-4 rounded-full font-semibold text-lg hover:shadow-[0_8px_20px_rgba(201,169,110,0.6)]
              active:scale-95 transition-transform duration-300
              shadow-lg
              select-none
              ring-2 ring-transparent hover:ring-accent-gold-light dark:hover:ring-accent-gold-dark
              focus:outline-none focus-visible:ring-accent-gold-light dark:focus-visible:ring-accent-gold-dark
            "
                            aria-label="Explore Collection"
                        >
                            Explore Collection
                        </button>
                    </motion.div>
                </section>

                {/* Featured Products Section */}
                <section aria-labelledby="featured-heading" className="py-16 md:py-24 px-6 md:px-12 bg-bg-light dark:bg-bg-dark">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            id="featured-heading"
                            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-6 text-center"
                        >
                            Featured Products
                        </h2>
                        <div role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {featuredProducts.map((product) => (
                                <article role="listitem" key={product.id}>
                                    <ProductCard product={product} />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* New Arrivals Section */}
                <section aria-labelledby="newarrivals-heading" className="py-16 md:py-24 px-6 md:px-12 bg-bg-light dark:bg-bg-dark">
                    <div className="max-w-7xl mx-auto">
                        <h2
                            id="newarrivals-heading"
                            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-6 text-center"
                        >
                            New Arrivals
                        </h2>
                        <div role="list" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {newArrivalProducts.map((product) => (
                                <article role="listitem" key={product.id}>
                                    <ProductCard product={product} />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="bg-surface-light dark:bg-surface-dark py-20 px-6 md:px-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h3 className="text-4xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-8">
                            About RayDrip
                        </h3>
                        <p className="text-lg md:text-xl max-w-4xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                            RayDrip is a premium brand dedicated to crafting timeless apparel that lets you wear your moment with style
                            and confidence. Every piece is carefully designed and made from the finest fabrics for unmatched comfort and
                            durability.
                        </p>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-16 px-6 md:px-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h3 className="text-3xl md:text-5xl font-serif font-extrabold text-text-primary-light dark:text-text-primary-dark mb-6">
                            Ready to Upgrade Your Style?
                        </h3>
                        <button
                            onClick={() => alert('Shop Now clicked!')}
                            className="bg-text-primary-light dark:bg-text-primary-dark text-bg-light dark:text-bg-dark px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 select-none"
                        >
                            Shop Now
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}
