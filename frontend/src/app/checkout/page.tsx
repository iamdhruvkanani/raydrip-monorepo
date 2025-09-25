'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import Link from 'next/link';
import PaymentButton from '@/components/PaymentButton';

export default function CheckoutPage() {
    const { cart, totalPrice, clear } = useCart();
    const { user, login, addOrderToUser } = useAuth();
    const { addOrder } = useOrders();

    const [isMounted, setIsMounted] = useState(false);
    const [fields, setFields] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [verifyPrompt, setVerifyPrompt] = useState(false);
    const [otpCode, setOtpCode] = useState('');

    useEffect(() => {
        setIsMounted(true);
        // Update fields if user logs in
        if (user) {
            setFields(prev => ({
                ...prev,
                name: user.name,
                email: user.email,
                phone: user.phone
            }));
        }
    }, [user]);

    const validate = () => {
        const { name, email, phone, pincode } = fields;
        if (!name.trim() || !email.trim() || !phone.trim()) {
            setError('Name, email, and phone are required.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Enter a valid email address.');
            return false;
        }
        if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
            setError('Enter a valid 10-digit Indian phone number.');
            return false;
        }
        if (!pincode.trim() || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
            setError('Enter a valid 6-digit PIN code.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSaveOrder = (paymentDetails: any) => {
        const order = {
            id: paymentDetails.razorpay_order_id,
            cart: [...cart],
            ...fields,
            totalPrice,
            placedAt: new Date().toISOString(),
            razorpay_payment_id: paymentDetails.razorpay_payment_id
        };

        if (user) {
            // Logged in user
            addOrderToUser(order);
            addOrder(order);
            clear(); // Clear cart
            setSuccess(true);
            setLoading(false);
        } else {
            // Guest checkout - prompt for account creation
            setVerifyPrompt(true);
            // Store order temporarily
            localStorage.setItem('pending_guest_order', JSON.stringify(order));
            setLoading(false);
        }
    };

    const handleGuestVerification = () => {
        if (otpCode.length === 6) {
            // Create account for guest
            const guestUser = {
                id: fields.email,
                name: fields.name,
                email: fields.email,
                phone: fields.phone,
                orders: [] as any[]
            };

            // Get pending order
            const pendingOrder = JSON.parse(localStorage.getItem('pending_guest_order') || '{}');

            // Add order to user and save user
            guestUser.orders = [pendingOrder];

            // Save to demo storage
            const existingUsers = JSON.parse(localStorage.getItem('raydrip_all_users') || '[]');
            existingUsers.push(guestUser);
            localStorage.setItem('raydrip_all_users', JSON.stringify(existingUsers));

            // Log user in and save order
            login(guestUser);
            addOrder(pendingOrder);

            // Clean up
            localStorage.removeItem('pending_guest_order');
            clear(); // Clear cart
            setSuccess(true);
            setVerifyPrompt(false);
        } else {
            setError("Please enter the 6-digit verification code.");
        }
    };

    const handlePaymentFail = (msg: string) => {
        setPaymentError(msg);
        setLoading(false);
    };

    if (success) {
        return (
            <section className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-r from-accent-gold-light via-yellow-400 to-accent-gold-light rounded-3xl shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-white">Thank You!</h1>
                <p className="mb-6 text-lg text-white">Your order has been placed successfully.</p>
                <div className="space-y-3">
                    <Link
                        href="/profile"
                        className="block bg-white text-accent-gold-light rounded-xl px-6 py-3 font-semibold shadow hover:shadow-md transition"
                    >
                        View Orders
                    </Link>
                    <Link
                        href="/shop"
                        className="block bg-transparent border-2 border-white text-white rounded-xl px-6 py-3 font-semibold hover:bg-white hover:text-accent-gold-light transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </section>
        );
    }

    if (verifyPrompt) {
        return (
            <section className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow text-center">
                <h2 className="text-2xl mb-4 font-bold text-text-primary-light dark:text-text-primary-dark">Create Your Account</h2>
                <p className="mb-6 text-text-secondary-light dark:text-text-secondary-dark">
                    Enter the verification code to create your account and track your order.
                </p>
                <input
                    className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark text-center text-2xl tracking-widest"
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                />
                <button
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white font-bold text-lg hover:shadow-xl transition"
                    onClick={handleGuestVerification}
                >
                    Verify & Create Account
                </button>
                {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
                <p className="text-center text-xs text-gray-500 mt-4">
                    Demo code: <span className="font-mono font-bold">123456</span>
                </p>
            </section>
        );
    }

    return (
        <main className="max-w-3xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
            <h1 className="text-4xl font-serif font-bold mb-8 text-text-primary-light dark:text-text-primary-dark">
                Checkout
            </h1>

            {/* User Status */}
            {user ? (
                <div className="mb-6 p-4 bg-gradient-to-r from-accent-gold-light/10 to-yellow-500/10 rounded-xl border border-accent-gold-light/20">
                    <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                        Welcome back, <span className="text-accent-gold-light">{user.name}</span>!
                    </p>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-text-primary-light dark:text-text-primary-dark mb-2">
                        <strong>Guest Checkout</strong> - You can create an account after placing your order.
                    </p>
                    <Link
                        href="/auth"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                        Or login to your existing account →
                    </Link>
                </div>
            )}

            {/* Order Summary */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
                    Order Summary
                </h2>
                {!isMounted ? (
                    <p>Loading...</p>
                ) : cart.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty.</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-accent-gold-light text-white px-6 py-2 rounded-xl hover:bg-accent-gold-light/90 transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
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

            {isMounted && cart.length > 0 && (
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["name", "email", "phone", "pincode"].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id={field}
                                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                                    value={fields[field as keyof typeof fields]}
                                    onChange={e => setFields(f => ({ ...f, [field]: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">
                            Address (Street, Locality)
                        </label>
                        <textarea
                            id="address"
                            rows={2}
                            value={fields.address}
                            onChange={e => setFields(f => ({ ...f, address: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">City</label>
                            <input
                                id="city"
                                type="text"
                                value={fields.city}
                                onChange={e => setFields(f => ({ ...f, city: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 font-semibold text-text-primary-light dark:text-text-primary-dark">State</label>
                            <input
                                id="state"
                                type="text"
                                value={fields.state}
                                onChange={e => setFields(f => ({ ...f, state: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-gold-light dark:focus:ring-accent-gold-dark"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-600 font-semibold">{error}</p>}
                    {paymentError && <p className="text-red-600 font-semibold">{paymentError}</p>}

                    <PaymentButton
                        disabled={loading || cart.length === 0}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-gold-light to-yellow-500 dark:from-accent-gold-dark dark:to-yellow-600 text-white font-bold text-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        name={fields.name}
                        email={fields.email}
                        phone={fields.phone}
                        address={fields.address}
                        city={fields.city}
                        state={fields.state}
                        pincode={fields.pincode}
                        cart={cart}
                        totalPrice={totalPrice}
                        onValidation={validate}
                        onSaveOrder={handleSaveOrder}
                        onPaymentFail={handlePaymentFail}
                        setLoading={setLoading}
                    >
                        {loading ? 'Processing Payment...' : `Pay ₹${totalPrice.toFixed(2)} with Razorpay`}
                    </PaymentButton>
                </form>
            )}
        </main>
    );
}
