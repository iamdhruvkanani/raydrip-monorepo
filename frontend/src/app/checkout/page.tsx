'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CheckoutPage() {
    const { cart, totalPrice, clear } = useCart()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const validate = () => {
        if (!name.trim() || !email.trim() || !phone.trim()) {
            setError('Name, email, and phone are required.')
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Enter a valid email address.')
            return false
        }
        const phoneRegex = /^[6-9]\d{9}$/
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            setError('Enter a valid 10-digit Indian phone number.')
            return false
        }
        if (!pincode.trim() || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
            setError('Enter a valid 6-digit PIN code.')
            return false
        }
        setError(null)
        return true
    }

    const handlePayment = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            // Integrate Razorpay "Pay Later" here
            await new Promise(res => setTimeout(res, 2000))
            setSuccess(true)
            clear()
        } catch {
            setError('Payment failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <section className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-r from-yellow-400 to-accent-gold-light rounded-3xl shadow-lg text-center font-serif">
                <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
                <p className="mb-6 text-lg">Your order was placed successfully.</p>
                <Link
                    href="/"
                    className="inline-block bg-white text-accent-gold-light rounded-xl px-6 py-3 font-semibold shadow hover:shadow-md transition"
                >
                    Continue Shopping
                </Link>
            </section>
        )
    }

    return (
        <main className="max-w-3xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
            <h1 className="text-4xl font-serif font-bold mb-8 text-text-primary-light dark:text-text-primary-dark">
                Checkout
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                    Order Summary
                </h2>
                {cart.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 p-4 max-h-64 overflow-y-auto">
                        {cart.map(item => (
                            <li key={`${item.id}-${item.selectedSize}`} className="flex justify-between py-3">
                                <div>
                                    <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{item.name}</p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        Size: {item.selectedSize} × {item.quantity}
                                    </p>
                                </div>
                                <div className="font-extrabold text-text-primary-light dark:text-text-primary-dark">
                                    ₹{(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                        <li className="flex justify-between border-t mt-4 pt-4 font-extrabold text-xl">
                            <span className="text-text-primary-light dark:text-text-primary-dark">Total</span>
                            <span className="text-text-primary-light dark:text-text-primary-dark">₹{totalPrice.toFixed(2)}</span>
                        </li>
                    </ul>
                )}
            </section>

            <form onSubmit={e => { e.preventDefault(); handlePayment() }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            Full Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            Phone<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            PIN Code<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="pincode"
                            type="text"
                            value={pincode}
                            onChange={e => setPincode(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Address (Street, Locality)
                    </label>
                    <textarea
                        id="address"
                        rows={2}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            City
                        </label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            State
                        </label>
                        <input
                            id="state"
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                        />
                    </div>
                </div>

                {error && <p className="text-red-600 font-semibold">{error}</p>}

                <button
                    type="submit"
                    disabled={loading || cart.length === 0}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white font-bold text-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing…' : 'Pay with Razorpay'}
                </button>
            </form>
        </main>
    )
}



//For Razor pay
// const options = {
//   key: 'YOUR_KEY_ID',
//   amount: orderAmount,
//   currency: 'INR',
//   name: 'Your Shop Name',
//   description: 'Order Description',
//   order_id: razorpayOrderId, // from your backend
//   prefill: {
//     name: customerName,      // optional—you can leave blank
//     email: customerEmail,    // optional
//     contact: customerPhone,  // optional
//   },
//   notes: {
//     address: shippingAddress // optional
//   },
//   theme: {
//     color: '#D4AF37'         // gold accent
//   },
//   modal: {
//     ondismiss: () => { /* handle dismiss */ },
//     escape: true,
//     backdropclose: false
//   },
//   // Enable built-in customer form fields:
//   customer: {
//     name: true,
//     email: true,
//     contact: true,
//     // address fields (line1, line2, city, state, pincode) can be enabled via `notes`
//   }
// }

// const rzp = new Razorpay(options)
// rzp.open()
