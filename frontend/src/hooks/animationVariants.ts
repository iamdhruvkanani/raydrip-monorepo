import { Variants, easeOut } from 'framer-motion'

export const scrollVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: easeOut,
            staggerChildren: 0.2,
        },
    },
}

export const staggerChildren: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut },
    },
}
