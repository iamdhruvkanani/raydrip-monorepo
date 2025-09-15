'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'

interface AccountDropdownProps {
    onLogout?: () => void
}

export default function AccountDropdown({ onLogout }: AccountDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    // Detect click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('raydrip_token'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('raydrip_token')
        setIsLoggedIn(false)
        setIsOpen(false)
        if (onLogout) onLogout()
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                aria-label="Account menu"
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 rounded-full bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300"
            >
                <User size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-light dark:bg-bg-dark border border-accent-gold-light/30 dark:border-accent-gold-dark/30 rounded-md shadow-lg z-50">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/login"
                                className="block px-4 py-2 hover:bg-accent-gold-light/20 dark:hover:bg-accent-gold-dark/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="block px-4 py-2 hover:bg-accent-gold-light/20 dark:hover:bg-accent-gold-dark/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/profile"
                                className="block px-4 py-2 hover:bg-accent-gold-light/20 dark:hover:bg-accent-gold-dark/20"
                                onClick={() => setIsOpen(false)}
                            >
                                My Account
                            </Link>
                            <Link
                                href="/orders"
                                className="block px-4 py-2 hover:bg-accent-gold-light/20 dark:hover:bg-accent-gold-dark/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Past Orders
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-accent-gold-light/20 dark:hover:bg-accent-gold-dark/20"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
