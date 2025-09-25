"use client";
import Script from "next/script";
import axios from "axios";
import { useState } from "react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PaymentButtonProps {
    disabled?: boolean;
    className?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    cart: any[];
    totalPrice: number;
    children?: React.ReactNode;
    onValidation: () => boolean;
    onSaveOrder: (details: any) => void;
    onPaymentFail: (msg: string) => void;
    setLoading: (loading: boolean) => void;
}

export default function PaymentButton({
    disabled,
    className,
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    cart,
    totalPrice,
    onValidation,
    onSaveOrder,
    onPaymentFail,
    setLoading,
    children,
}: PaymentButtonProps) {
    const [sdkLoaded, setSdkLoaded] = useState(false);

    const handlePayment = async () => {
        if (disabled || !sdkLoaded) return;
        if (!onValidation()) return;

        setLoading(true);

        try {
            const orderRes = await axios.post("/razor/api/createOrder", {
                amount: totalPrice * 100,
                currency: "INR"
            });
            const orderId = orderRes.data.orderId;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: totalPrice * 100,
                currency: "INR",
                name: "RayDrip",
                description: "Fashion Order Payment",
                order_id: orderId,
                handler: async (response: any) => {
                    try {
                        // Save payment details to backend
                        await axios.post("/razor/api/savePayment", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            name,
                            email,
                            phone,
                            address,
                            city,
                            state,
                            pincode,
                            cart,
                            totalPrice,
                            orderId
                        });
                        onSaveOrder({
                            ...response,
                            name,
                            email,
                            phone,
                            address,
                            city,
                            state,
                            pincode,
                            cart,
                            totalPrice,
                            orderId
                        });
                    } catch (error) {
                        onPaymentFail("Payment processed but order save failed. Please contact support.");
                    }
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                        onPaymentFail('Payment was cancelled.');
                    }
                },
                prefill: {
                    name,
                    email,
                    contact: phone
                },
                notes: {
                    address,
                    city,
                    state,
                    pincode
                },
                theme: {
                    color: "#D4AF37" // Gold theme matching RayDrip
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err: any) {
            setLoading(false);
            onPaymentFail("Unable to process payment. Please try again.");
        }
    };

    return (
        <>
            <button
                onClick={handlePayment}
                disabled={disabled || !sdkLoaded}
                className={className}
                type="button"
            >
                {children ? children : "Pay Now"}
            </button>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setSdkLoaded(true)}
            />
        </>
    );
}
