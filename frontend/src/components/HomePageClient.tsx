'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'

const newArrivalProducts = [
    {
        id: 'na1',
        name: 'Elegant Silk Saree',
        price: '',
        originalPrice: '1500',
        imageUrl:
            'https://images.jdmagicbox.com/quickquotes/images_main/printed-kurti-for-women-2008003957-dy21qvl1.jpg',
        isOnSale: true,
        salePercentage: 33,

    },
    {
        id: 'na2',
        name: 'Handcrafted Leather Bag',
        price: '₹7999',
        imageUrl:
            'https://sutionline.in/cdn/shop/files/18403MISTEDYELLOW1.webp?v=1722076201&width=1200',
        badge: 'Best Seller'
    },
    {
        id: 'na3',
        name: 'Luxury Watch',
        price: '₹14999',
        imageUrl:
            'https://kanooda.com/wp-content/uploads/2024/04/PIK03230.webp',
    },
    {
        id: 'na4',
        name: 'Silk Scarf',
        price: '₹1299',
        imageUrl:
            'https://nayoclothing.com/cdn/shop/products/BER3118_1_1080x.jpg?v=1754029498',
    },
]

const heroSlides = [
    {
        id: 1,
        imageUrl:
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2370&auto=format&fit=crop',


        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
    {
        id: 2,
        imageUrl:
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2370&auto=format&fit=crop',
        // 'https://www.jaipuriadaah.com/cdn/shop/files/navratra_banner_2025_2200x.png?v=1756545057',
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
    {
        id: 3,
        imageUrl:
            'https://plus.unsplash.com/premium_photo-1714226832576-f4356d4ab92b?q=80&w=2370&auto=format&fit=crop',
        title: 'RayDrip',
        subtitle: 'Wear Your Moment',
    },
]

const slideVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
}

const featuredProducts = [
    {
        id: 'p1',
        name: 'Cyan Anarkali',
        price: '₹2299',
        imageUrl:
            // 'https://images.unsplash.com/photo-1673042949295-e931c9f76126?q=80&w=1288&auto=format&fit=crop',
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg'
    },
    {
        id: 'p2',
        name: 'Navy Blue Kurti',
        price: '₹599',
        imageUrl:
            // 'https://plus.unsplash.com/premium_photo-1666264200743-d216de5a4996?q=80&w=1287&auto=format&fit=crop',
            'https://www.shoplibas.com/cdn/shop/files/29655_1_main.jpg?v=1748424427&width=1080',
    }, {
        id: 'p3',
        name: 'Embroidered Rani Rayon Floor Length Kurti',
        price: '₹1500',
        imageUrl:
            // 'https://images.unsplash.com/photo-1578693082747-50c396cacd81?q=80&w=1315&auto=format&fit=crop',
            'https://kajols.com/cdn/shop/products/embroidered-rani-rayon-floor-length-kurti-256862-1000x1375.jpg?v=1685001609'
    },
    {
        id: 'p4',
        name: 'White Short Kurti',
        price: '₹1200',
        imageUrl:
            // 'https://plus.unsplash.com/premium_photo-1673367751802-ed858d3950d2?q=80&w=1287&auto=format&fit=crop',
            'https://assets0.mirraw.com/images/12091953/A911388_1_zoom.jpg?1701933379',
    },
]



export default function HomePage() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
    }, [])

    // const prevSlide = useCallback(() => {
    //     setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    // }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide()
        }, 5000)
        return () => clearTimeout(timer)
    }, [currentIndex, nextSlide])

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[80vh] md:h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-bg-light via-surface-light to-bg-light dark:from-bg-dark dark:via-surface-dark dark:to-bg-dark px-4">
                <div className="absolute w-full h-full">
                    <AnimatePresence initial={false} mode="wait">
                        {heroSlides.map(
                            (slide, index) =>
                                index === currentIndex && (
                                    <motion.img
                                        key={slide.id}
                                        src={slide.imageUrl}
                                        alt={`Slide ${slide.id}`}
                                        className="absolute inset-0 w-full h-full object-cover brightness-75 dark:brightness-50"
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.8 }}
                                        loading="lazy"
                                    />
                                )
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
                    {/* <div className="mx-auto max-w-5xl px-4 md:px-0 text-center relative z-10">
                        <Image
                            src="/logo-tagline.png"  // Path in /public folder
                            alt="RayDrip Logo"
                            width={400}      // Adjust size as needed
                            height={150}     // Maintain aspect ratio
                            priority={true}
                            quality={90}
                            className="mx-auto select-none"
                        />
                    </div> */}



                    <h1
                        className="
      text-4xl sm:text-6xl md:text-8xl font-serif font-extrabold tracking-tight mb-6
      text-text-primary-dark dark:text-text-primary-dark
      drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]
      sm:drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]
      "
                        style={{
                            letterSpacing: '-0.02em',
                            lineHeight: '1.1',
                        }}
                    >
                        {heroSlides[currentIndex].title}
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
                        {heroSlides[currentIndex].subtitle}
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



                {/* Navigation Buttons */}
                {/* <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 md:p-4 z-30"
                >
                    &#8592;
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 md:p-4 z-30"
                >
                    &#8594;
                </button> */}
            </section>

            {/* Featured Products Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 bg-bg-light dark:bg-bg-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                            Featured Products
                        </h2>
                        <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-accent-gold-light to-accent-sage-light dark:from-accent-gold-dark dark:to-accent-sage-dark" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals */}

            <section className="py-16 md:py-24 px-6 md:px-12 bg-bg-light dark:bg-bg-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                            New Arrivals
                        </h2>
                        <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-accent-gold-light to-accent-sage-light dark:from-accent-gold-dark dark:to-accent-sage-dark" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {newArrivalProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
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
                        onClick={() => alert('Shop Now clicked!')}
                        className="bg-text-primary-light dark:bg-text-primary-dark text-bg-light dark:text-bg-dark px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 select-none"
                    >
                        Shop Now
                    </button>
                </div>
            </section>
        </>
    )
}
