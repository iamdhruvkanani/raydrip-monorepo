'use client';
import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    orders: Order[];
};

export type Order = {
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
    razorpay_payment_id?: string;
};

const AuthContext = createContext<{
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    addOrderToUser: (order: Order) => void;
} | undefined>(undefined);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("AuthContext not found");
    return ctx;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Hydrate from localStorage on mount
        const savedUser = typeof window !== "undefined" ? localStorage.getItem("raydrip_user") : null;
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (u: User) => {
        localStorage.setItem("raydrip_user", JSON.stringify(u));
        setUser(u);
    };

    const logout = () => {
        localStorage.removeItem("raydrip_user");
        setUser(null);
    };

    const addOrderToUser = (order: Order) => {
        if (user) {
            const updatedUser = { ...user, orders: [order, ...user.orders] };
            localStorage.setItem("raydrip_user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, addOrderToUser }}>
            {children}
        </AuthContext.Provider>
    );
};
