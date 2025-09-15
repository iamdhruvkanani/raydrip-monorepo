'use client'
import React, { useState, useEffect } from 'react'

export default function ProfilePage() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        async function fetchProfile() {
            setError('')
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('raydrip_token')}`,
                    },
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Failed to fetch profile')
                setEmail(data.email)
                setName(data.name || '')
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError(String(err)) // fallback for non-Error throwables
                }
            }

        }
        fetchProfile()
    }, [])

    async function handleSave() {
        setError('')
        setSuccess('')
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('raydrip_token')}`,
                },
                body: JSON.stringify({ name }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Failed to update profile')
            setSuccess('Profile updated successfully')
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-[#1f1f1f] rounded-md shadow-lg">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Your Profile</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="space-y-4">
                <div>
                    <label className="block text-textSecondary mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded bg-background text-foreground border border-gray-600 focus:border-primary outline-none"
                    />
                </div>
                <div>
                    <label className="block text-textSecondary mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full p-3 rounded bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-primary text-background font-semibold rounded hover:bg-yellow-500 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    )
}
