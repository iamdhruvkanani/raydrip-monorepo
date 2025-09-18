'use client'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function OtpLogin() {
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'request' | 'verify'>('request');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const requestOtp = async () => {
        setError('');
        if (!identifier) {
            setError('Please enter email or phone');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/check-and-send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
            setSuccess(data.message);
            setStep('verify');
            toast.success(data.message);
        } catch (e: any) {
            setError(e.message);
        }
        setLoading(false);
    };

    const verifyOtp = async () => {
        setError('');
        if (otp.length !== 6) {
            setError('Enter a valid 6 digit OTP');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, code: otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'OTP verification failed');
            setSuccess('Logged in successfully!');
            toast.success('Logged in successfully');
            // Handle token/storage or redirect here
        } catch (e: any) {
            setError(e.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 rounded shadow bg-white mt-20">
            <h1 className="text-center text-2xl font-bold mb-6">Login with OTP</h1>
            {error && <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>}
            {success && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{success}</div>}
            {step === 'request' ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter email or phone"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full p-3 border rounded mb-4"
                        disabled={loading}
                    />
                    <button
                        onClick={requestOtp}
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded font-semibold"
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-3 border rounded mb-4"
                        disabled={loading}
                    />
                    <button
                        onClick={verifyOtp}
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded font-semibold"
                    >
                        {loading ? 'Verifying OTP...' : 'Verify OTP'}
                    </button>
                    <button
                        onClick={() => {
                            setStep('request');
                            setOtp('');
                            setSuccess('');
                            setError('');
                        }}
                        className="mt-2 w-full text-center text-yellow-600 underline"
                    >
                        Resend OTP
                    </button>
                </>
            )}
        </div>
    );
}
