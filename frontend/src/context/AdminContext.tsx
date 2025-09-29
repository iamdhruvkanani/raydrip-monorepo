'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminUser {
    id: string
    username: string
    name: string
}

interface AdminContextType {
    user: AdminUser | null
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
    isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const adminUser = localStorage.getItem('admin-user')
        if (adminUser) {
            setUser(JSON.parse(adminUser))
            setIsAuthenticated(true)
        }
    }, [])

    const login = async (username: string, password: string): Promise<boolean> => {
        if (username === 'admin' && password === 'admin123') {
            const adminUser = {
                id: '1',
                username: 'admin',
                name: 'Admin User'
            }

            setUser(adminUser)
            setIsAuthenticated(true)
            localStorage.setItem('admin-user', JSON.stringify(adminUser))

            return true
        }

        return false
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('admin-user')
    }

    return (
        <AdminContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider')
    }
    return context
}
