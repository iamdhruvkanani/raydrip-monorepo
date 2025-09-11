const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light mode
                'bg-light': '#FFFFFF',
                'surface-light': '#F8F9FA',
                'text-primary-light': '#1C1C1E',
                'text-secondary-light': '#6B7280',
                'accent-gold-light': '#C9A96E',
                'accent-sage-light': '#8FA68E',

                // Dark mode
                'bg-dark': '#0D0D0D',
                'surface-dark': '#1A1A1A',
                'text-primary-dark': '#F5F5F7',
                'text-secondary-dark': '#A1A1AA',
                'accent-gold-dark': '#D4AF37',
                'accent-sage-dark': '#9CAF88',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                noise: "url('/textures/noise.png')",
            },
            keyframes: {
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '0.4' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                },
            },
            animation: {
                ripple: 'ripple 0.6s ease-out',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.line-clamp-2': {
                    display: '-webkit-box',
                    '-webkit-line-clamp': '2',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                },
            })
        }),
    ],
}
