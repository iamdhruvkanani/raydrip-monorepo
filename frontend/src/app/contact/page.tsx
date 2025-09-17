'use client'
import React, { useState } from 'react';

const getActive = (value: string, focused: boolean) => (value || focused);

const FloatingLabelInput = ({
    type = "text",
    name,
    value,
    onChange,
    error,
    label,
}: {
    type?: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    error?: string,
    label: string,
}) => {
    const [focused, setFocused] = useState(false);
    const isActive = getActive(value, focused);

    return (
        <label className="relative block">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder=" "
                autoComplete="off"
                className={`peer w-full rounded-2xl border px-6 py-5 text-lg sm:text-xl transition 
          ${error ? 'border-red-500 focus:ring-red-400' : 'border-accent-gold-light focus:ring-accent-gold-light'}
          bg-white text-neutral-900 placeholder-transparent dark:bg-[#232326] dark:text-white dark:placeholder-transparent dark:border-accent-gold-light dark:focus:ring-accent-gold-dark shadow-inner
        `}
            />
            <span
                className={`absolute left-6 
          ${isActive ? 'top-2 text-sm text-accent-gold-light dark:text-accent-gold-dark backdrop-blur' : 'top-5 text-lg text-text-secondary-dark dark:text-text-secondary-light'} 
          font-semibold pointer-events-none transition-all duration-200
        `}
            >
                {label}
            </span>
            {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
        </label>
    );
};

const FloatingLabelTextarea = ({
    name,
    value,
    onChange,
    error,
    label,
}: {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    error?: string,
    label: string,
}) => {
    const [focused, setFocused] = useState(false);
    const isActive = getActive(value, focused);

    return (
        <label className="relative block">
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder=" "
                rows={6}
                autoComplete="off"
                className={`peer w-full rounded-2xl border px-6 py-5 text-lg sm:text-xl resize-none transition 
          ${error ? 'border-red-500 focus:ring-red-400' : 'border-accent-gold-light focus:ring-accent-gold-light'}
          bg-white text-neutral-900 placeholder-transparent dark:bg-[#232326] dark:text-white dark:placeholder-transparent dark:border-accent-gold-light dark:focus:ring-accent-gold-dark shadow-inner
        `}
            />
            <span
                className={`absolute left-6
          ${isActive ? 'top-2 text-sm text-accent-gold-light dark:text-accent-gold-dark backdrop-blur' : 'top-5 text-lg text-text-secondary-dark dark:text-text-secondary-light'}
          font-semibold pointer-events-none transition-all duration-200
        `}
            >
                {label}
            </span>
            {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
        </label>
    );
};

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const validate = () => {
        const newErrors: { name?: string; email?: string; message?: string } = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validate()) {
            return;
        }
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
        } catch {
            setSubmitError("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen max-w-4xl mx-auto px-6 py-16 sm:px-12 sm:py-28 bg-gradient-to-tr from-bg-light to-surface-light dark:from-bg-dark dark:to-surface-dark rounded-3xl shadow-2xl text-neutral-900 dark:text-text-primary-light relative overflow-hidden">
            {/* Elegant Gradient Background Accents */}
            <div className="absolute top-[-140px] right-[-140px] w-[280px] h-[280px] bg-gradient-to-tr from-accent-gold-dark to-accent-gold-light opacity-15 rounded-full blur-4xl pointer-events-none"></div>
            <div className="absolute bottom-[-140px] left-[-140px] w-[320px] h-[320px] bg-gradient-to-br from-accent-gold-light to-accent-gold-dark opacity-15 rounded-full blur-4xl pointer-events-none"></div>
            <h1 className="relative text-5xl sm:text-7xl font-extrabold mb-16 tracking-widest bg-gradient-to-r from-accent-gold-light to-accent-gold-dark bg-clip-text text-transparent drop-shadow-lg">
                Contact Us
            </h1>
            {!submitted ? (
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative z-10 bg-white dark:bg-bg-dark bg-opacity-90 dark:bg-opacity-90 p-10 sm:p-16 rounded-3xl shadow-2xl border border-accent-gold-light dark:border-accent-gold-dark space-y-10 max-w-full mx-auto backdrop-blur-md"
                >
                    <FloatingLabelInput
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <FloatingLabelInput
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FloatingLabelTextarea
                        name="message"
                        label="Message"
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                    />
                    {submitError && (
                        <p className="text-red-600 text-center mb-4 font-medium">{submitError}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-xl sm:text-2xl font-semibold rounded-3xl bg-gradient-to-r from-accent-gold-light to-accent-gold-dark shadow-lg hover:brightness-110 transition duration-350 text-bg-dark dark:text-bg-light drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            ) : (
                <div className="relative z-10 p-20 sm:p-24 bg-bg-light dark:bg-bg-dark rounded-3xl shadow-2xl text-center text-3xl sm:text-4xl font-semibold text-accent-gold-light dark:text-accent-gold-dark drop-shadow-xl transition duration-350">
                    <svg
                        className="mx-auto mb-6 h-12 w-12 text-accent-gold-light dark:text-accent-gold-dark"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you for reaching out! We will get back to you soon.
                </div>
            )}
            <section className="mt-28 relative z-10 max-w-lg mx-auto space-y-7 text-lg font-light text-text-secondary-dark dark:text-text-secondary-light border-t border-accent-gold-light dark:border-accent-gold-dark pt-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-accent-gold-light dark:text-accent-gold-dark tracking-wide mb-5">
                    Other ways to reach us
                </h2>
                <p>
                    <strong>Email:</strong>{' '}
                    <a
                        href="mailto:contactraydrip.in@gmail.com"
                        className="underline hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition duration-350"
                    >
                        contactraydrip.in@gmail.com
                    </a>
                </p>
                <p>
                    <strong>Phone:</strong> +91 9106976047
                </p>
                <p>
                    <strong>Address:</strong> RayDrip, Ahmedabad, Gujarat, India
                </p>
            </section>
        </div>
    );
};

export default ContactPage;
