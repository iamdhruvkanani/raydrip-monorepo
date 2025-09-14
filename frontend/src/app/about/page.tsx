'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ExternalLink } from 'lucide-react'

// Dynamically import framer-motion components disabling SSR to bypass export * issue
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false })
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false })

const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

const instagramProfiles = [
    {
        label: "Aarushi Shah",
        url: "https://www.instagram.com/aarushishah912/",
        description: "Connect with Aarushi Shah — bold ideas, deep connections, and a huge wardrobe.",
    },
    {
        label: "RayDrip",
        url: "https://www.instagram.com/raydrip.in/",
        description: "Explore RayDrip's latest collections, style tips, and community.",
    },
]

export default function AboutPage() {
    const paragraphs = [
        <>Hi! I’m <span className="font-semibold">Aarushi Shah</span> — a Gujju girl with a love for bold ideas, deeper connections, and a huge wardrobe 🌸</>,
        <>Growing up, I was always on the studious side — focused, disciplined, and walking a very structured path. But in 2018 something shifted. I realised life is so much more than just books and routines — it’s about experiencing, expressing, and evolving.</>,
        <>That’s when I started truly living — travelling, meeting new people, sharing thoughts, exchanging perspectives, and embracing a completely new way of thinking.</>,
        <>What started as curiosity turned into creativity. I began experimenting with content, discovered my passion for content creation, and slowly built a space where I could be fully myself. Along the way, I made meaningful friendships and collaborated with 70+ brands.</>,
        <>And now, I’m channeling all of that energy, learning, and love into something I’ve always dreamed of — <span className="font-semibold italic">my own clothing brand</span>.</>,
        <>This is me. This is my journey. And this is just the beginning. 💫</>,
    ]

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-bg-light dark:bg-bg-dark py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto rounded-lg shadow-xl relative overflow-hidden"

        >
            {/* Decorative golden shape */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-72 rounded-3xl bg-gradient-to-tr from-accent-gold-light/40 to-transparent blur-3xl opacity-60" />

            <AnimatePresence>
                <div className="max-w-5xl mx-auto space-y-16 relative z-10">
                    {/* Section Title */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-text-primary-light dark:text-text-primary-dark drop-shadow-md">
                            About Aarushi Shah
                        </h2>
                    </MotionDiv>

                    {/* Main Profile Block */}
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-12 gap-10 md:gap-0">
                        {/* Image - floats top center on mobile, left on desktop, smaller size */}
                        <MotionDiv
                            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                            className="mx-auto md:mx-0 flex-shrink-0 mb-4 md:mb-0 md:block"
                        >
                            <div className="relative rounded-full overflow-hidden shadow-xl ring-2 ring-accent-gold-light dark:ring-accent-gold-dark w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                                <Image
                                    src="/aarushi-shah-profile.png"
                                    alt="Aarushi Shah"
                                    fill
                                    sizes="(max-width: 768px) 128px, (max-width: 1200px) 160px, 192px"
                                    className="object-cover w-full h-full select-none"
                                    draggable={false}
                                    priority
                                />
                            </div>
                        </MotionDiv>

                        {/* Text Content */}
                        <div className="flex-1 text-text-primary-light dark:text-text-primary-dark space-y-7 text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide">
                            {paragraphs.map((p, i) => (
                                <MotionDiv
                                    key={i}
                                    variants={textVariant}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        delay: i * 0.14,
                                        duration: 0.6,
                                        ease: 'easeOut',
                                    }}
                                    className="whitespace-pre-line"
                                >
                                    {p}
                                </MotionDiv>
                            ))}

                            <MotionDiv
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: paragraphs.length * 0.13 }}
                                className="mt-2 italic font-semibold text-center md:text-left text-accent-gold-light dark:text-accent-gold-dark max-w-sm"
                            >
                                “Fashion is more than fabric – it’s a story we tell about ourselves. <span className="font-bold italic">Wear Your Moment</span>”
                            </MotionDiv>

                            <MotionDiv
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: paragraphs.length * 0.18 }}
                            >
                                <button className="mt-8 px-8 py-3 bg-accent-gold-light dark:bg-accent-gold-dark text-bg-dark dark:text-bg-light rounded-full font-semibold shadow-md hover:bg-accent-gold-dark dark:hover:bg-accent-gold-light transition-colors duration-300 mx-auto md:mx-0 block">
                                    Explore Collection
                                </button>
                            </MotionDiv>
                        </div>
                    </div>

                    {/* Instagram Profiles Section */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.0 }}
                        className="mt-5"
                    >
                        <h3 className="text-2xl font-semibold mb-8 text-text-primary-light dark:text-text-primary-dark text-center md:text-left">
                            Follow on Instagram
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto md:mx-0">
                            {instagramProfiles.map(({ label, url, description }) => (
                                <Link
                                    key={url}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative hover:-translate-y-1 transition-transform duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-accent-gold-light dark:focus-visible:ring-accent-gold-dark"
                                    aria-label={`Visit the Instagram profile for ${label}`}
                                >
                                    <div className="flex flex-col items-center justify-between h-full bg-white dark:bg-bg-dark border border-accent-gold-light dark:border-accent-gold-dark rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 px-6 py-8 text-center min-h-[210px]">
                                        <div className="mb-3 flex items-center justify-center">
                                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold-light to-accent-gold-dark shadow-lg">
                                                <Instagram className="w-6 h-6 text-bg-light dark:text-bg-dark" />
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="block text-xl font-extrabold font-serif text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-gold-dark dark:group-hover:text-accent-gold-light">{label}</span>
                                        </div>
                                        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                            {description}
                                        </div>
                                        <span className="absolute top-3 right-3 opacity-70">
                                            <ExternalLink className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </MotionDiv>
                </div>
            </AnimatePresence>
        </MotionDiv>
    )
}
