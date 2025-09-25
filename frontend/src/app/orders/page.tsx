'use client';
import React from "react";
import { useOrders } from '@/context/OrderContext';
import Link from "next/link";

export default function OrdersPage() {
    const { orders } = useOrders();

    return (
        <main className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl">
            <h1 className="text-4xl font-serif font-bold mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <ul className="divide-y rounded-xl border p-4 max-h-64 overflow-y-auto">
                    {orders.map(order => (
                        <li key={order.id} className="py-3">
                            <div className="mb-2 font-bold">Order #{order.id}</div>
                            <div className="mb-1 text-sm">Placed: {new Date(order.placedAt).toLocaleString()}</div>
                            <div className="text-sm mb-1">Name: {order.name}</div>
                            <div className="mb-1">Email: {order.email}</div>
                            <div>
                                <span>Items:</span>
                                <ul className="ml-4">
                                    {order.cart.map((item: any, i: number) => (
                                        <li key={i}>- {item.name} (Size: {item.selectedSize}) x{item.quantity}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-1 font-bold">Total: ₹{order.totalPrice.toFixed(2)}</div>
                        </li>
                    ))}
                </ul>
            )}
            <Link href="/checkout" className="mt-8 block text-center bg-yellow-500 rounded-xl text-white py-2 font-bold">
                Back to Checkout
            </Link>
        </main>
    );
}
