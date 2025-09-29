'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToasterClient from '@/components/ToasterClient'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    return (
        <div className="pt-[5.5rem] min-h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
            {!isAdmin && <Header />}
            {children}
            {!isAdmin && <Footer />}
            <ToasterClient />
        </div>
    )
}
