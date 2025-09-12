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

    // On mount, force light mode and clear stored theme to always start light
    useEffect(() => {
        setTheme('light')
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }, [])

    // Toggle function updates state, html class, and localStorage synchronously
    const toggleTheme = () => {
        setTheme(current => {
            const newTheme = current === 'dark' ? 'light' : 'dark'
            document.documentElement.classList.toggle('dark', newTheme === 'dark')
            localStorage.setItem('theme', newTheme)
            return newTheme
        })
    }

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
