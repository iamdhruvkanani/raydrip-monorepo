import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'  // <-- import your CartProvider
import { Toaster } from 'react-hot-toast' // import Toaster
import OfferMarquee from '@/components/OfferMarquee'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'RayDrip',
  description: 'Premium fashion for the modern soul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CartProvider>

            <div className="pt-[5.5rem] min-h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">

              <Header />
              {children}
              <Footer />
              {/*Toaster at the root for toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 1000,
                  style: {
                    background: 'linear-gradient(90deg, #D4AF37, #FFD700)', // premium gold gradient
                    color: '#1a202c', // dark text for contrast
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px rgba(212, 175, 55, 0.5)',
                    padding: '16px 24px',
                    fontWeight: '600',
                    fontSize: '16px',
                    maxWidth: '400px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#1a202c',
                      secondary: '#FFD700',
                    },
                  },
                }}
              />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
