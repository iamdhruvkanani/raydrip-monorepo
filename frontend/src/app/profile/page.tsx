'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'


import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
    User,
    Lock,
    MapPin,
    ShoppingBag,
    Heart,
    Bell,
    CreditCard,
    Upload,
    Edit3,
    Save,
    Eye,
    EyeOff,
    Shield,
    Camera,
    Check,
    X
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'



export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'addresses' | 'orders' | 'wishlist'>('profile')
    const [isMobile, setIsMobile] = useState(false)
    const { user } = useAuth()
    // Profile states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('user@example.com')
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')

    // Password states
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })

    // UI states
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const avatarInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const updateIsMobile = () => setIsMobile(window.innerWidth < 768)
        updateIsMobile()
        window.addEventListener('resize', updateIsMobile)
        return () => window.removeEventListener('resize', updateIsMobile)
    }, [])

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User, shortLabel: 'Profile' },
        { id: 'password', label: 'Security', icon: Lock, shortLabel: 'Security' },
        { id: 'addresses', label: 'Addresses', icon: MapPin, shortLabel: 'Address' },
        { id: 'orders', label: 'Orders', icon: ShoppingBag, shortLabel: 'Orders' },
        { id: 'wishlist', label: 'Wishlist', icon: Heart, shortLabel: 'Wishlist' },

    ]

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB')
            return
        }

        const url = URL.createObjectURL(file)
        setAvatarUrl(url)
        toast.success('Avatar updated! Don\'t forget to save your changes.')
    }

    const handleSaveProfile = () => {
        if (!name.trim()) {
            setError('Name is required')
            return
        }

        setSuccess('Profile updated successfully!')
        setError('')
        setIsEditing(false)
        toast.success('Profile saved!')
    }

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All password fields are required')
            return
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match')
            return
        }

        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long')
            return
        }

        setSuccess('Password changed successfully!')
        setError('')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        toast.success('Password updated!')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Mobile Header */}
            {isMobile && (
                <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    name ? name.charAt(0).toUpperCase() : '?'
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                    {name || 'Account Settings'}
                                </h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {tabs.find(tab => tab.id === activeTab)?.label}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`${isMobile ? 'px-0 py-0' : 'py-8 px-4'}`}>
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Header */}
                    {!isMobile && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-4 drop-shadow-sm">
                                Account Settings
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                                Manage your profile information, security settings, and preferences all in one place
                            </p>
                        </motion.div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
                        {/* Desktop Sidebar Navigation */}
                        {!isMobile && (
                            <motion.nav
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:w-80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8"
                            >
                                {/* Profile Summary Card */}
                                <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-800/30">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    name ? name.charAt(0).toUpperCase() : '?'
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-900 dark:text-slate-100 truncate">
                                                {name || 'Welcome!'}
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                                {email}
                                            </p>
                                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Online</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Tabs */}
                                <div className="space-y-2">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id as any)}
                                                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-xl scale-105'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:scale-102'
                                                    }`}
                                            >
                                                <Icon className="w-6 h-6 flex-shrink-0" />
                                                <span className="font-semibold text-left">{tab.label}</span>
                                                {activeTab === tab.id && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="ml-auto w-2 h-2 bg-white rounded-full"
                                                    />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.nav>
                        )}

                        {/* Main Content */}
                        <motion.main
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex-1 ${isMobile
                                ? 'bg-white dark:bg-slate-800 min-h-screen pb-32'
                                : 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50'
                                } p-6 lg:p-8`}
                        >
                            {/* Alert Messages */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="mb-6 lg:mb-8 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 px-4 lg:px-6 py-3 lg:py-4 rounded-r-xl shadow-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <X className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                                            <span className="font-medium text-sm lg:text-base">{error}</span>
                                        </div>
                                    </motion.div>
                                )}

                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="mb-6 lg:mb-8 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-800 dark:text-green-300 px-4 lg:px-6 py-3 lg:py-4 rounded-r-xl shadow-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Check className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                                            <span className="font-medium text-sm lg:text-base">{success}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6 lg:space-y-8"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                        <div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                                Profile Information
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-base">
                                                Update your personal information and profile settings
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="flex items-center justify-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 text-sm lg:text-base"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            <span className="font-medium">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                                        </motion.button>
                                    </div>

                                    {/* Avatar Section */}
                                    <div className="flex flex-col items-center space-y-4 lg:space-y-6 p-6 lg:p-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl">
                                        <div className="relative group">
                                            <div
                                                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold text-3xl lg:text-5xl cursor-pointer overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl transition-transform duration-200 group-hover:scale-105"
                                                onClick={() => avatarInputRef.current?.click()}
                                            >
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    name ? name.charAt(0).toUpperCase() : '?'
                                                )}
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center cursor-pointer"
                                            >
                                                <Camera className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                                            </motion.div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={avatarInputRef}
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-slate-600 dark:text-slate-400 mb-1 text-sm lg:text-base">
                                                Click to upload a new profile picture
                                            </p>
                                            <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-500">
                                                JPG, PNG or GIF • Maximum file size: 5MB
                                            </p>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-4 lg:space-y-6">
                                        <div className="grid grid-cols-1 gap-4 lg:gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base lg:text-lg"
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    disabled
                                                    className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-400 cursor-not-allowed text-base lg:text-lg"
                                                />
                                                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base lg:text-lg"
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={dob}
                                                        onChange={(e) => setDob(e.target.value)}
                                                        disabled={!isEditing}
                                                        className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base lg:text-lg"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    Gender
                                                </label>
                                                <select
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base lg:text-lg"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    Address
                                                </label>
                                                <textarea
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    disabled={!isEditing}
                                                    rows={4}
                                                    className="w-full px-3 lg:px-4 py-3 lg:py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed resize-none text-base lg:text-lg"
                                                    placeholder="Enter your address"
                                                />
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 lg:pt-6"
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 text-sm lg:text-base"
                                                >
                                                    Cancel
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit"
                                                    className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm lg:text-base"
                                                >
                                                    <Save className="w-4 h-4 lg:w-5 lg:h-5" />
                                                    <span>Save Changes</span>
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </form>
                                </motion.div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'password' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6 lg:space-y-8"
                                >
                                    <div>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                            Security Settings
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-base">
                                            Keep your account secure by updating your password regularly
                                        </p>
                                    </div>

                                    <div className="p-6 lg:p-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl">
                                        <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }} className="space-y-4 lg:space-y-6 max-w-xl mx-auto">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    Current Password *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.current ? "text" : "password"}
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-full px-3 lg:px-4 py-3 lg:py-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 text-base lg:text-lg"
                                                        placeholder="Enter current password"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-1"
                                                    >
                                                        {showPasswords.current ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    New Password *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.new ? "text" : "password"}
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full px-3 lg:px-4 py-3 lg:py-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 text-base lg:text-lg"
                                                        placeholder="Enter new password"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-1"
                                                    >
                                                        {showPasswords.new ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                                                    </button>
                                                </div>
                                                <p className="text-xs lg:text-sm text-slate-500 mt-2">Password must be at least 8 characters long</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 lg:mb-3">
                                                    Confirm New Password *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.confirm ? "text" : "password"}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full px-3 lg:px-4 py-3 lg:py-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 text-base lg:text-lg"
                                                        placeholder="Confirm new password"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-1"
                                                    >
                                                        {showPasswords.confirm ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full px-4 lg:px-6 py-3 lg:py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2 text-base lg:text-lg"
                                            >
                                                <Lock className="w-4 h-4 lg:w-5 lg:h-5" />
                                                <span>Update Password</span>
                                            </motion.button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}

                            {/* Other tabs with enhanced coming soon */}

                            {activeTab === 'orders' ? (
                                <section className="mt-8">
                                    <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
                                    {user?.orders && user.orders.length > 0 ? (
                                        <div className="space-y-4">
                                            {user.orders.map(order => (
                                                <div key={order.id} className="border rounded-xl p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <p className="font-semibold">Order #{order.id.slice(-8)}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {new Date(order.placedAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <p className="font-bold">₹{order.totalPrice.toFixed(2)}</p>
                                                    </div>
                                                    <div className="text-sm">
                                                        {order.cart.map((item, i) => (
                                                            <p key={i}>• {item.name} (Size: {item.selectedSize}) x{item.quantity}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No orders yet. <Link href="/shop" className="text-blue-600 hover:underline">Start shopping</Link></p>
                                    )}
                                </section>
                            ) : (
                                ['addresses', 'wishlist'].includes(activeTab) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-16 lg:py-20"
                                    >
                                        <div className="max-w-md mx-auto">
                                            <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                                                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || User, { className: "w-8 h-8 lg:w-10 lg:h-10 text-white" })}
                                            </div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 lg:mb-4">
                                                {tabs.find(tab => tab.id === activeTab)?.label}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 mb-6 lg:mb-8 text-sm lg:text-base">
                                                This feature is coming soon! We're working hard to bring you an amazing experience.
                                            </p>
                                            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-4 lg:p-6 border border-yellow-200/50 dark:border-yellow-800/30">
                                                <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                                                    Want to be notified when this feature launches? We'll send you an email as soon as it's ready.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </motion.main>
                    </div>
                </div>
            </div>

            {/* Modern Mobile Bottom Navigation */}
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 px-4 pb-6 pt-2"
                >
                    <div className="flex items-center justify-around">
                        {tabs.slice(0, 5).map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <motion.button
                                    key={tab.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg scale-110'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                        }`}
                                >
                                    <Icon className={`${isActive ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-200`} />
                                    <span className={`text-xs font-medium mt-1 ${isActive ? 'text-white' : ''}`}>
                                        {tab.shortLabel}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="mobileActiveIndicator"
                                            className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                                        />
                                    )}
                                </motion.button>
                            )
                        })}


                    </div>
                </motion.div>
            )}
        </div>
    )
}
