'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { getBestSellerProducts, getNewArrivalProducts } from '@/data/products'
import { useRouter } from 'next/navigation'
import ProductCarousel from '@/components/ProductCarousel'

const desktopSlides = [
    { id: 1, imageUrl: '/banner1.jpeg', title: 'RayDrip', subtitle: 'Wear Your Moment' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2370&auto=format&fit=crop', title: 'RayDrip', subtitle: 'Wear Your Moment' },
    { id: 3, imageUrl: 'https://plus.unsplash.com/premium_photo-1714226832576-f4356d4ab92b?q=80&w=2370&auto=format&fit=crop', title: 'RayDrip', subtitle: 'Wear Your Moment' },
]

const mobileSlides = [
    { id: 1, imageUrl: '/banner1.jpeg', title: 'RayDrip', subtitle: 'Wear Your Moment' },
    { id: 2, imageUrl: '/banner2.jpeg', title: 'RayDrip', subtitle: 'Wear Your Moment' },
    { id: 3, imageUrl: '/banner3.jpeg', title: 'RayDrip', subtitle: 'Wear Your Moment' },
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

    useEffect(() => {
        // Load Instagram embed script once when component mounts
        if (!(window as any).instgrm) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.instagram.com/embed.js';
            document.body.appendChild(script);
        } else {
            // If already loaded, process embeds
            (window as any).instgrm.Embeds.process();
        }
    }, []);

    const router = useRouter()
    const width = useWindowWidth()
    const isMobile = width > 0 && width < 768

    const slides = isMobile ? mobileSlides : desktopSlides

    const [currentIndex, setCurrentIndex] = useState(0)

    const getImageSrc = (src: string) => (src.startsWith('http') ? src : `/${src.replace(/^\/+/, '')}`)

    const bestSellerProducts = getBestSellerProducts()
    const newArrivalProducts = getNewArrivalProducts()

    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % slides.length)
    }, [slides.length])

    useEffect(() => {
        if (slides.length === 0) return
        const timer = setTimeout(() => nextSlide(), 5000)
        return () => clearTimeout(timer)
    }, [currentIndex, nextSlide, slides.length])

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: bestSellerProducts.map((product, index) => ({
            '@type': 'Product',
            position: index + 1,
            name: product.name,
            image: product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0].trimEnd() : '',
            url: `https://raydrip.in/products/${product.id}`,
            offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price: product.isOnSale
                    ? (parseFloat(product.originalPrice!.replace(/[^0-9.]/g, '')) * (1 - product.salePercentage! / 100)).toFixed(0)
                    : product.price.replace(/[^0-9.]/g, ''),
                availability: 'https://schema.org/InStock',
            },
        })),
    }

    const navigateToShop = () => router.push('/shop')

    return (
        <>
            <Head>
                <title>RayDrip • Premium Ethnic Wear</title>
                <meta name="description" content="Shop RayDrip’s curated collection of premium ethnic apparel. Discover BestSeller products, new arrivals, seasonal sales, and best-sellers with exclusive discounts." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://your-domain.com/" />

                <meta property="og:title" content="RayDrip • Premium Ethnic Apparel" />
                <meta property="og:description" content="Shop RayDrip’s premium ethnic wear. BestSeller products, new arrivals, sale badges, and exclusive discounts." />
                <meta property="og:url" content="https://your-domain.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://your-domain.com/og-image.jpg" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="RayDrip • Premium Ethnic Apparel" />
                <meta name="twitter:description" content="Shop RayDrip’s premium ethnic wear with exclusive discounts and new arrivals." />
                <meta name="twitter:image" content="https://your-domain.com/og-image.jpg" />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} key="product-jsonld" />
            </Head>

            <main>
                {/* Hero Section */}
                <section className="relative h-[80vh] md:h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-bg-light via-surface-light to-bg-light dark:from-bg-dark dark:via-surface-dark dark:to-bg-dark px-4" aria-label="Hero banner slideshow">
                    <div className="absolute w-full h-full">
                        <AnimatePresence initial={false} mode="wait">
                            {slides.map((slide, index) =>
                                index === currentIndex ? (
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
                                ) : null
                            )}
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    </div>

                    <motion.div className="relative z-10 max-w-5xl text-center mx-auto px-4 md:px-0" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}>
                        <h1
                            className="text-4xl sm:text-6xl md:text-8xl font-serif font-extrabold tracking-tight mb-6 text-text-primary-dark dark:text-text-primary-dark drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] sm:drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]"
                            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
                        >
                            {slides[currentIndex].title}
                        </h1>

                        <p
                            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light text-accent-gold-light dark:text-accent-gold-dark drop-shadow-md sm:drop-shadow-lg tracking-wide mb-12 px-2"
                            style={{ letterSpacing: '0.015em' }}
                        >
                            {slides[currentIndex].subtitle}
                        </p>

                        <button
                            onClick={navigateToShop}
                            className="inline-block bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light dark:text-text-primary-dark px-10 py-4 rounded-full font-semibold text-lg hover:shadow-[0_8px_20px_rgba(201,169,110,0.6)] active:scale-95 transition-transform duration-300 shadow-lg select-none ring-2 ring-transparent hover:ring-accent-gold-light dark:hover:ring-accent-gold-dark focus:outline-none focus-visible:ring-accent-gold-light dark:focus-visible:ring-accent-gold-dark"
                            aria-label="Explore Collection"
                        >
                            Explore Collection
                        </button>
                    </motion.div>
                </section>

                {/* BestSeller */}
                <ProductCarousel title="Best Sellers">
                    {bestSellerProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ProductCarousel>

                {/* NewArrival */}
                <ProductCarousel title="New Arrivals">
                    {newArrivalProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ProductCarousel>

                {/* Reel Section */}

                {/* Improved Reel Section */}
                <section className="relative bg-gradient-to-br from-accent-gold-light/20 via-surface-light to-accent-gold-light/10 dark:from-accent-gold-dark/20 dark:via-surface-dark dark:to-accent-gold-dark/10 py-20 px-6 md:px-12 overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-5">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full mb-6">
                                <svg className="w-8 h-8 text-text-primary-light dark:text-text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m2 6h1a3 3 0 100-6h-1m-2 6v6m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-text-primary-light dark:text-text-primary-dark mb-6 leading-tight">
                                Style Tutorial
                            </h3>
                            <div className="w-24 h-1 bg-accent-gold-light dark:bg-accent-gold-dark mx-auto mb-6 rounded-full"></div>
                            <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-accent-gold-light dark:text-accent-gold-dark mb-4">
                                How to Tie a Stylish Kurti Knot
                            </h4>
                            <p className="text-lg md:text-xl max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                Master the art of tying a kurti knot with our exclusive step-by-step tutorial.
                                <span className="text-accent-gold-light dark:text-accent-gold-dark font-semibold"> Elevate your ethnic style</span> and make every moment count.
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Instagram Reel */}
                            <div className="order-2 lg:order-1">
                                <div className="relative bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-2xl border border-accent-gold-light/20 dark:border-accent-gold-dark/20">
                                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full"></div>
                                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full"></div>
                                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full"></div>
                                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full"></div>

                                    <div className="instagram-reel-embed">
                                        <blockquote
                                            className="instagram-media"
                                            data-instgrm-permalink="https://www.instagram.com/reel/DOfi57MCdE1/"
                                            data-instgrm-version="14"
                                            style={{
                                                background: 'transparent',
                                                borderRadius: '12px',
                                                margin: '0 auto',
                                                maxWidth: '540px',
                                                width: '100%',
                                                minHeight: '400px'
                                            }}
                                        ></blockquote>
                                    </div>
                                </div>
                            </div>

                            {/* Feature List */}
                            <div className="order-1 lg:order-2 space-y-6">
                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg border border-accent-gold-light/20 dark:border-accent-gold-dark/20">
                                    <div className="flex items-center mb-3">
                                        <div className="w-3 h-3 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full mr-3"></div>
                                        <h5 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Easy to Follow</h5>
                                    </div>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Step-by-step instructions perfect for beginners</p>
                                </div>

                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg border border-accent-gold-light/20 dark:border-accent-gold-dark/20">
                                    <div className="flex items-center mb-3">
                                        <div className="w-3 h-3 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full mr-3"></div>
                                        <h5 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Professional Styling</h5>
                                    </div>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Get that perfect ethnic look every time</p>
                                </div>

                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg border border-accent-gold-light/20 dark:border-accent-gold-dark/20">
                                    <div className="flex items-center mb-3">
                                        <div className="w-3 h-3 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full mr-3"></div>
                                        <h5 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">RayDrip Exclusive</h5>
                                    </div>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">Styling tips from our fashion experts</p>
                                </div>

                                {/* CTA Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={() => window.open('https://www.instagram.com/raydrip.in/', '_blank')}
                                        className="w-full bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light dark:text-text-primary-dark px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-accent-gold-light dark:hover:border-accent-gold-dark"
                                    >
                                        Follow More Tutorials
                                        <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>

                            </div>
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
                            RayDrip is a premium brand dedicated to crafting timeless apparel that lets you wear your moment with style and confidence. Every piece is carefully designed and made from the finest fabrics for unmatched comfort and durability.
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
                            onClick={navigateToShop}
                            className="bg-text-primary-light dark:bg-text-primary-dark text-bg-light dark:text-bg-dark px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 select-none"
                            aria-label="Shop Now"
                        >
                            Shop Now
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}
