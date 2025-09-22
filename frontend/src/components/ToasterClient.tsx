// components/ToasterClient.tsx
'use client'
import { Toaster } from 'react-hot-toast'

export default function ToasterClient() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 1500,
                style: {
                    background: 'linear-gradient(135deg, #23272e, #433C18 80%)',
                    color: '#EBAF00',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '16px',
                    boxShadow: '0 8px 32px rgba(235,175,0,0.19)',
                    border: '1px solid #EBAF00',
                    padding: '16px 24px',
                    maxWidth: '400px',
                },
                success: {
                    iconTheme: {
                        primary: '#EBAF00', // gold
                        secondary: '#23272e', // dark
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ef4444', // error red
                        secondary: '#23272e',
                    },
                },
            }}
        />
    )
}
