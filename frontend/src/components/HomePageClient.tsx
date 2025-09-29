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
                <section className="bg-surface-light dark:bg-surface-dark py-20 px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Header Section - Matching your other sections */}
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-8">
                                Style Tutorial
                            </h3>
                            <h4 className="text-2xl sm:text-3xl font-serif font-semibold text-accent-gold-light dark:text-accent-gold-dark mb-6">
                                How to Tie a Stylish Kurti Knot
                            </h4>
                            <p className="text-lg md:text-xl max-w-4xl mx-auto text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                Master the art of tying a kurti knot with our exclusive step-by-step tutorial.
                                <span className="text-accent-gold-light dark:text-accent-gold-dark font-semibold"> Elevate your ethnic style</span> and make every moment count with RayDrip.
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Instagram Reel */}
                            <div className="order-2 lg:order-1">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold-light to-accent-gold-dark dark:from-accent-gold-dark dark:to-accent-gold-light rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative bg-bg-light dark:bg-bg-dark rounded-2xl p-6 shadow-2xl">
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
                            </div>

                            {/* Feature List */}
                            <div className="order-1 lg:order-2 space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">1</span>
                                        </div>
                                        <div>
                                            <h5 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Easy to Follow</h5>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                                Step-by-step instructions perfect for beginners and fashion enthusiasts alike.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">2</span>
                                        </div>
                                        <div>
                                            <h5 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Professional Styling</h5>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                                Get that perfect ethnic look every time with expert techniques and tips.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-accent-gold-light dark:bg-accent-gold-dark rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">3</span>
                                        </div>
                                        <div>
                                            <h5 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">RayDrip Exclusive</h5>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                                Styling tips and techniques from our fashion experts and designers.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="pt-6">
                                    <button
                                        onClick={() => window.open('https://www.instagram.com/raydrip.in/', '_blank')}
                                        className="
                            bg-accent-gold-light dark:bg-accent-gold-dark
                            text-text-primary-light dark:text-text-primary-dark
                            px-10 py-4 rounded-full font-semibold text-lg 
                            hover:shadow-[0_8px_20px_rgba(201,169,110,0.6)]
                            active:scale-95 transition-transform duration-300
                            shadow-lg select-none
                            ring-2 ring-transparent hover:ring-accent-gold-light dark:hover:ring-accent-gold-dark
                            focus:outline-none focus-visible:ring-accent-gold-light dark:focus-visible:ring-accent-gold-dark
                            flex items-center justify-center w-full sm:w-auto
                        "
                                    >
                                        Follow More Tutorials
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Call-to-Action - Matching your other sections */}
                        <div className="text-center mt-16 pt-12 border-t border-accent-gold-light/20 dark:border-accent-gold-dark/20">
                            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
                                Want to see more styling tutorials and behind-the-scenes content?
                            </p>
                            <button
                                onClick={() => window.open('https://www.instagram.com/raydrip.in/', '_blank')}
                                className="
                    inline-flex items-center text-accent-gold-light dark:text-accent-gold-dark 
                    font-semibold hover:underline transition-all duration-300
                "
                            >
                                Follow @raydrip.in on Instagram
                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </button>
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
