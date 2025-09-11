'use client'
import { useTheme } from '@/providers/ThemeProvider'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    return (
        <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="fixed top-4 right-4 rounded-full p-2 bg-accent-gold-light dark:bg-accent-gold-dark text-ivory shadow-lg hover:scale-110 transition-transform"
        >
            {theme === 'dark' ? '🌞' : '🌙'}
        </button>
    )
}
