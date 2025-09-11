'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            // Debug raw text to catch non-JSON error pages:
            const text = await res.text()
            let data
            try {
                data = JSON.parse(text)
            } catch {
                throw new Error('Received non-JSON response:\n' + text)
            }

            if (!res.ok) throw new Error(data.message || 'Login failed')

            localStorage.setItem('raydrip_token', data.token)
            router.push('/profile')
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-[#1f1f1f] rounded-md shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Login</h2>
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
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-3 bg-primary text-background font-semibold rounded hover:bg-yellow-500 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    )
}
