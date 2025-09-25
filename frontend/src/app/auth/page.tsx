'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function OTPAuthPage() {
    const { login } = useAuth()
    const [identifier, setIdentifier] = useState('')
    const [stage, setStage] = useState<'input' | 'otp' | 'details'>('input')
    const [otp, setOTP] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    // Demo OTP generation
    const [sentOTP, setSentOTP] = useState('')

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!identifier.trim()) {
            setError('Please enter email or phone')
            return
        }

        // Basic validation
        const isEmail = identifier.includes('@')
        const isPhone = /^[6-9]\d{9}$/.test(identifier.replace(/\D/g, ''))

        if (!isEmail && !isPhone) {
            setError('Please enter a valid email or 10-digit phone number')
            return
        }

        // Generate demo OTP
        const code = (Math.floor(Math.random() * 900000) + 100000).toString()
        setSentOTP(code)
        setStage('otp')
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (otp.length !== 6) {
            setError('Please enter the 6-digit code')
            return
        }

        if (otp !== sentOTP) {
            setError('Invalid code. Please try again.')
            return
        }

        // Check if user exists (demo: check localStorage for existing users)
        const existingUsers = JSON.parse(localStorage.getItem('raydrip_all_users') || '[]')
        const existingUser = existingUsers.find((u: any) =>
            u.email === identifier || u.phone === identifier
        )

        if (existingUser) {
            // User exists, log them in
            login(existingUser)
            router.push('/profile')
        } else {
            // New user, ask for name
            setStage('details')
        }
    }

    const handleSaveUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }

        // Create new user
        const newUser = {
            id: identifier,
            name: name.trim(),
            email: identifier.includes('@') ? identifier : "",
            phone: identifier.match(/^\d{10}$/) ? identifier : "",
            orders: []
        }

        // Save to localStorage demo storage
        const existingUsers = JSON.parse(localStorage.getItem('raydrip_all_users') || '[]')
        existingUsers.push(newUser)
        localStorage.setItem('raydrip_all_users', JSON.stringify(existingUsers))

        // Log user in
        login(newUser)
        router.push('/profile')
    }

    return (
        <main className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
            <h1 className="text-3xl font-serif font-bold mb-6 text-center text-text-primary-light dark:text-text-primary-dark">
                {stage === 'input' ? 'Welcome to RayDrip' : stage === 'otp' ? 'Verify Code' : 'Complete Profile'}
            </h1>

            {stage === 'input' && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            Email or Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your email or phone"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                            required
                        />
                    </div>
                    {error && <p className="text-red-600 font-semibold">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white font-bold text-lg hover:shadow-xl transition"
                    >
                        Send OTP
                    </button>
                </form>
            )}

            {stage === 'otp' && (
                <div>
                    <p className="mb-4 text-center text-text-secondary-light dark:text-text-secondary-dark">
                        We've sent a 6-digit code to <strong>{identifier}</strong>
                    </p>
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div>
                            <label className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={otp}
                                onChange={e => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark text-center text-2xl tracking-widest"
                                maxLength={6}
                                required
                            />
                        </div>
                        {error && <p className="text-red-600 font-semibold">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white font-bold text-lg hover:shadow-xl transition"
                        >
                            Verify & Continue
                        </button>
                        {/* Demo OTP display */}
                        <p className="text-center text-xs text-gray-500 mt-2">
                            Demo OTP: <span className="font-mono font-bold">{sentOTP}</span>
                        </p>
                    </form>
                </div>
            )}

            {stage === 'details' && (
                <div>
                    <p className="mb-4 text-center text-text-secondary-light dark:text-text-secondary-dark">
                        Just one more step to complete your account
                    </p>
                    <form onSubmit={handleSaveUser} className="space-y-4">
                        <div>
                            <label className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                                required
                            />
                        </div>
                        {error && <p className="text-red-600 font-semibold">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white font-bold text-lg hover:shadow-xl transition"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            )}
        </main>
    )
}
