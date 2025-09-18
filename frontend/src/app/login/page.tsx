'use client'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function CombinedLogin() {
    const [input, setInput] = useState('')
    const [step, setStep] = useState<'input' | 'otp'>('input')
    const [otp, setOtp] = useState('')
    const [existingUser, setExistingUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const checkUserAndSendOtp = async () => {
        setLoading(true)
        setError('')
        try {
            // Call to your API to check user
            const res = await fetch('/api/auth/check-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: input }),
            })
            if (!res.ok) throw new Error('Failed to check user')
            const data = await res.json()
            setExistingUser(data.exists)
            // Then send OTP (create user if not exist)
            const otpRes = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: input }),
            })
            if (!otpRes.ok) throw new Error('Failed to send OTP')
            setSuccess(`OTP sent to ${input}`)
            setStep('otp')
        } catch (e) {
            setError(String(e))
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async () => {
        setLoading(true)
        setError('')
        try {
            // Verify OTP API call
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: input, otp }),
            })
            if (!res.ok) throw new Error('OTP verification failed')
            setSuccess('Login successful')
            // Redirect or update user session here
        } catch (e) {
            setError(String(e))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-xl mt-20'>
            <h1 className='text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text'>Welcome Back</h1>
            {error && <div className='mb-4 p-3 text-red-600 bg-red-100 rounded'>{error}</div>}
            {success && <div className='mb-4 p-3 text-green-600 bg-green-100 rounded'>{success}</div>}

            {step === 'input' && (
                <form onSubmit={e => { e.preventDefault(); checkUserAndSendOtp(); }}>
                    <input
                        type='text'
                        placeholder='Enter email or mobile number'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        required
                        className='w-full p-3 mb-4 border border-gray-300 rounded'
                        disabled={loading}
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-black rounded hover:brightness-110 transition'
                    >
                        {loading ? 'Processing...' : 'Send OTP'}
                    </button>
                </form>
            )}

            {step === 'otp' && (
                <form onSubmit={e => { e.preventDefault(); verifyOtp(); }}>
                    <input
                        type='text'
                        placeholder='Enter OTP'
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                        className='w-full p-3 mb-4 border border-gray-300 rounded'
                        disabled={loading}
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-black rounded hover:brightness-110 transition'
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            )}
        </div>
    )
}
