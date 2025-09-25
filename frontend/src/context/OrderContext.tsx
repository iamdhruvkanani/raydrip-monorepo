"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Order {
    id: string;
    cart: any[];
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    totalPrice: number;
    placedAt: string;
}

const OrderContext = createContext<{
    orders: Order[];
    addOrder: (order: Order) => void;
} | undefined>(undefined);

export function useOrders() {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error("OrderContext not found");
    return ctx;
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Hydrate from localStorage/database
        const saved = typeof window !== "undefined" ? localStorage.getItem("orders") : null;
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    const addOrder = (order: Order) => {
        setOrders(prev => {
            const updated = [order, ...prev];
            localStorage.setItem("orders", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
