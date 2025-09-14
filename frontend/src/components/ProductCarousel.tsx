// components/ProductCarousel.tsx
'use client'

import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductCarouselProps {
    title: string
    children: React.ReactNode
}

export default function ProductCarousel({ title, children }: ProductCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        mode: 'snap',
        slides: {
            perView: 1.8,
            spacing: 15,
        },
        breakpoints: {
            '(min-width: 640px)': { slides: { perView: 2.5, spacing: 20 } },
            '(min-width: 768px)': { slides: { perView: 3.5, spacing: 20 } },
            '(min-width: 1024px)': { slides: { perView: 4.5, spacing: 24 } },
        },
        slideChanged(s) {
            setCurrentSlide(s.track.details.rel)
        },
    })

    return (
        <section className="py-10 px-4 md:px-10 relative select-none overflow-visible">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary-light dark:text-text-primary-dark text-center">
                {title}
            </h2>

            {slider.current && (
                <>
                    <button
                        type="button"
                        onClick={() => slider.current?.prev()}
                        disabled={currentSlide === 0}
                        aria-label="Previous Slide"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 md:flex hidden
    p-2 rounded-full shadow-lg bg-accent-gold-light text-text-primary-light
    hover:bg-accent-gold-dark dark:bg-accent-gold-dark dark:text-text-primary-dark
    dark:hover:bg-accent-gold-light transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        type="button"
                        onClick={() => slider.current?.next()}
                        disabled={currentSlide === slider.current.track.details.max}
                        aria-label="Next Slide"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 md:flex hidden
    p-2 rounded-full shadow-lg bg-accent-gold-light text-text-primary-light
    hover:bg-accent-gold-dark dark:bg-accent-gold-dark dark:text-text-primary-dark
    dark:hover:bg-accent-gold-light transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={24} />
                    </button>

                </>
            )}

            <div ref={sliderRef} className="keen-slider">
                {React.Children.map(children, (child, idx) => (
                    <div className="keen-slider__slide" key={(child as React.ReactElement)?.key ?? idx}>
                        {child}
                    </div>
                ))}
            </div>

            {/* Optional: Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
                {slider.current &&
                    [...Array(slider.current.track.details.slides.length).keys()].map(idx => (
                        <button
                            aria-label={`Go to slide ${idx + 1}`}
                            key={idx}
                            onClick={() => slider.current?.moveToIdx(idx)}
                            className={`w-3 h-3 rounded-full transition ${currentSlide === idx
                                ? 'bg-accent-gold-light dark:bg-accent-gold-dark'
                                : 'bg-gray-300 dark:bg-gray-700'
                                }`}
                        />
                    ))}
            </div>
        </section>
    )
}
