'use client'
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function OTPAuthPage() {
    const { login } = useAuth()
    const [identifier, setIdentifier] = useState('')
    const [stage, setStage] = useState<'input' | 'otp' | 'details'>('input')
    const [otp, setOTP] = useState('')
    const [sentOTP, setSentOTP] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [resendIn, setResendIn] = useState(0)
    const router = useRouter()

    // Autofocus refs
    const inputRef = useRef<HTMLInputElement | null>(null)
    const otpRef = useRef<HTMLInputElement | null>(null)
    const nameRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (stage === 'input') inputRef.current?.focus()
        if (stage === 'otp') otpRef.current?.focus()
        if (stage === 'details') nameRef.current?.focus()
    }, [stage])

    // Resend OTP timer
    useEffect(() => {
        if (stage !== 'otp' || resendIn === 0) return
        const handle = setInterval(() => setResendIn(v => v > 0 ? v - 1 : 0), 1000)
        return () => clearInterval(handle)
    }, [stage, resendIn])

    const handleSendOTP = async (e?: React.FormEvent) => {
        e?.preventDefault()
        setError('')
        const cleaned = identifier.trim()
        if (!cleaned) return setError('Please enter email or phone')
        const isEmail = cleaned.includes('@')
        const isPhone = /^[6-9]\d{9}$/.test(cleaned.replace(/\D/g, ''))
        if (!isEmail && !isPhone) return setError('Please enter a valid email or 10-digit phone number')

        const code = (Math.floor(Math.random() * 900000) + 100000).toString()
        setSentOTP(code)
        setStage('otp')
        setResendIn(30)
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (otp.length !== 6) return setError('Please enter the 6-digit code')
        if (otp !== sentOTP) return setError('Invalid code. Please try again.')

        const existingUsers = JSON.parse(localStorage.getItem('raydrip_all_users') || '[]')
        const match = existingUsers.find((u: any) =>
            u.email === identifier || u.phone === identifier
        )
        if (match) {
            login(match)
            router.push('/profile')
        } else {
            setStage('details')
        }
    }

    const handleSaveUser = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!name.trim()) return setError('Please enter your name')
        const newUser = {
            id: identifier,
            name: name.trim(),
            email: identifier.includes('@') ? identifier : "",
            phone: identifier.match(/^\d{10}$/) ? identifier : "",
            orders: []
        }
        // Avoid duplicates
        let allUsers: any[] = JSON.parse(localStorage.getItem('raydrip_all_users') || '[]')
        allUsers = allUsers.filter((u: any) => u.email !== newUser.email && u.phone !== newUser.phone)
        allUsers.push(newUser)
        localStorage.setItem('raydrip_all_users', JSON.stringify(allUsers))
        login(newUser)
        router.push('/profile')
    }

    return (
        <main className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">
                {stage === 'input' && 'Sign In / Join RayDrip'}
                {stage === 'otp' && 'Verify OTP'}
                {stage === 'details' && 'Complete Profile'}
            </h1>
            {stage === 'input' && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                    <label className="block mb-2 font-semibold">Email or Phone Number</label>
                    <input
                        ref={inputRef}
                        type="text"
                        autoComplete="username"
                        placeholder="Enter your email or phone"
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border"
                    />
                    {error && <p className="text-red-600 font-semibold">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg"
                    >
                        Send OTP
                    </button>
                </form>
            )}
            {stage === 'otp' && (
                <div>
                    <p className="mb-3 text-center">A 6-digit code was sent to <strong>{identifier}</strong>.</p>
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <input
                            ref={otpRef}
                            type="text"
                            autoComplete="one-time-code"
                            placeholder="6-digit code"
                            maxLength={6}
                            value={otp}
                            onChange={e => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full px-4 py-3 rounded-xl border text-center text-2xl tracking-widest"
                            required
                        />
                        {error && <p className="text-red-600 font-semibold">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg"
                        >
                            Verify & Continue
                        </button>
                        <div className="text-center text-xs text-gray-500 space-y-1">
                            <div>Demo OTP: <span className="font-mono font-bold">{sentOTP}</span></div>
                            <button
                                type="button"
                                disabled={resendIn > 0}
                                onClick={handleSendOTP}
                                className="underline text-blue-500 disabled:text-gray-400"
                            >
                                {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend Code"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {stage === 'details' && (
                <form onSubmit={handleSaveUser} className="space-y-4">
                    <label className="block mb-2 font-semibold">Full Name</label>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border"
                        required
                    />
                    {error && <p className="text-red-600 font-semibold">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg"
                    >
                        Create Account
                    </button>
                </form>
            )}
        </main>
    )
}
