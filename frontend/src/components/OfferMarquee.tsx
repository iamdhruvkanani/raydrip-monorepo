'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface OfferMarqueeProps {
    isVisible: boolean
}

export default function OfferMarquee({ isVisible }: OfferMarqueeProps) {
    if (!isVisible) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: -36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -36 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-60 h-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 dark:from-yellow-700 dark:via-yellow-600 dark:to-yellow-700 shadow-md border-b border-yellow-600 dark:border-yellow-500 overflow-hidden"
        >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-yellow-500 dark:from-yellow-700 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-yellow-500 dark:from-yellow-700 to-transparent pointer-events-none z-10" />

            <div className="h-full whitespace-nowrap flex items-center animate-marquee px-4 select-none">
                <span className="mx-10 font-semibold tracking-wide text-black dark:text-white text-sm">
                    🚚 Enjoy FREE Shipping on Orders Over ₹1000! &nbsp;&nbsp; 🎁 Exclusive Offers on Premium Collection! &nbsp;&nbsp; ✨ Hurry, Limited Time Deals!
                </span>
                <span className="mx-10 font-semibold tracking-wide text-black dark:text-white text-sm">
                    🚚 Enjoy FREE Shipping on Orders Over ₹1000! &nbsp;&nbsp; 🎁 Exclusive Offers on Premium Collection! &nbsp;&nbsp; ✨ Hurry, Limited Time Deals!
                </span>
            </div>
        </motion.div>
    )
}
