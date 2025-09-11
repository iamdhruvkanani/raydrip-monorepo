'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.message || 'Registration failed')

            // On success, optionally redirect to login
            alert('Registration successful. Please log in.')
            router.push('/login')
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError(String(err)) // fallback for non-Error throwables
            }
        }

    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-[#1f1f1f] rounded-md shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded bg-background text-foreground border border-gray-600 focus:border-primary outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded bg-background text-foreground border border-gray-600 focus:border-primary outline-none"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded bg-background text-foreground border border-gray-600 focus:border-primary outline-none"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-3 bg-primary text-background font-semibold rounded hover:bg-yellow-500 transition"
                >
                    Register
                </button>
            </form>
        </div>
    )
}
