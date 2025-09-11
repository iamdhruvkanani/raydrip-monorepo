'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, type Attribute } from 'next-themes'

interface ThemeContextType {
    theme: string
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
})

interface CustomThemeProviderProps {
    children: React.ReactNode
    attribute?: Attribute | Attribute[]
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
}

export function ThemeProvider({
    children,
    attribute = 'class',
    defaultTheme = 'light',
    enableSystem = true,
    disableTransitionOnChange = false,
}: CustomThemeProviderProps) {
    const [theme, setTheme] = useState<string>(defaultTheme)

    const toggleTheme = () => {
        setTheme(current => {
            const newTheme = current === 'dark' ? 'light' : 'dark'
            // Also update html class via next-themes's internal logic
            document.documentElement.classList.toggle('dark', newTheme === 'dark')
            return newTheme
        })
    }

    // Sync theme state with html class and localStorage (next-themes handles this internally as well)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initialTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            setTheme(initialTheme)
            document.documentElement.classList.toggle('dark', initialTheme === 'dark')
        }
    }, [])

    return (
        <NextThemesProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
            disableTransitionOnChange={disableTransitionOnChange}
        >
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </NextThemesProvider>
    )
}

// Hook to consume theme context
export const useTheme = () => useContext(ThemeContext)
