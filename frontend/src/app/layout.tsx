import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { CartProvider } from '@/context/CartContext'
import { OrderProvider } from '@/context/OrderContext'
import { AuthProvider } from '@/context/AuthContext'
import { AdminProvider } from '@/context/AdminContext'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'RayDrip',
  description: 'Premium fashion for the modern soul',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <AdminProvider>
            <AuthProvider>
              <CartProvider>
                <OrderProvider>
                  <ClientLayout>
                    {children}
                  </ClientLayout>
                </OrderProvider>
              </CartProvider>
            </AuthProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
