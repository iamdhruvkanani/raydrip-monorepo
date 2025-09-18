'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Lock, User, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InputProps {
    label: string
    type?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    disabled?: boolean
    required?: boolean
    options?: string[]
    isTextArea?: boolean
}

function Input({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false,
    options,
    isTextArea = false,
}: InputProps) {
    return (
        <div className="flex flex-col space-y-1 mb-5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    rows={3}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
            ) : options && options.length > 0 ? (
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="">Select</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
            )}
        </div>
    )
}

export function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // TODO: Implement registration backend integration
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if (!name || !email || !phone || !password || !confirmPassword) {
            setError('Please fill all fields')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setSuccess('Registration successful (mock)')
        toast.success('Registration successful')
    }

    return (
        <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-20">
            <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg text-center">
                Create an Account
            </h1>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 mb-4 rounded bg-red-100 text-red-700"
                    >
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 mb-4 rounded bg-green-100 text-green-700"
                    >
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>
            <form onSubmit={handleRegister}>
                <Input label="Full Name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                <Input
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Input label="Phone" placeholder="+1234567890" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                <Input
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <Input
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:brightness-110 font-semibold text-black transition"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export function LoginPage() {
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState<'request' | 'verify'>('request')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [otpSentTo, setOtpSentTo] = useState('')

    const [showOtp, setShowOtp] = useState(false)

    // Simulate OTP request
    const requestOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if (!phone) {
            setError('Please enter your phone number')
            return
        }
        setLoading(true)
        // TODO: Add real API call
        await new Promise(res => setTimeout(res, 1500))
        setLoading(false)
        setOtpSentTo(phone)
        setSuccess(`OTP sent to ${phone}`)
        setStep('verify')
        toast.success('OTP sent')
    }

    // Simulate OTP verify
    const verifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if (otp.length !== 6) {
            setError('Enter valid 6-digit OTP')
            return
        }
        setLoading(true)
        // TODO: Add real API call
        await new Promise(res => setTimeout(res, 1500))
        setLoading(false)
        setSuccess('Logged in successfully')
        toast.success('Welcome back!')
        // TODO: Redirect after login
    }

    return (
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-20">
            <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg text-center">
                Login with OTP
            </h1>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 mb-4 rounded bg-red-100 text-red-700"
                    >
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 mb-4 rounded bg-green-100 text-green-700"
                    >
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>
            {step === 'request' ? (
                <form onSubmit={requestOtp}>
                    <Input
                        label="Phone Number"
                        placeholder="+1234567890"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        type="tel"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:brightness-110 font-semibold text-black transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={verifyOtp}>
                    <Input
                        label={`Enter OTP sent to ${otpSentTo}`}
                        placeholder="123456"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        type={showOtp ? 'text' : 'number'}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowOtp(v => !v)}
                        className="mb-2 text-sm text-blue-600 underline"
                    >
                        {showOtp ? 'Hide OTP' : 'Show OTP'}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:brightness-110 font-semibold text-black transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setStep('request')
                            setOtp('')
                            setSuccess('')
                            setError('')
                        }}
                        className="mt-4 text-center text-sm text-blue-600 underline"
                    >
                        Resend OTP
                    </button>
                </form>
            )}
        </div>
    )
}
