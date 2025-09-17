import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-5xl mx-auto px-12 py-28 bg-gradient-to-tr from-bg-light to-surface-light dark:from-bg-dark dark:to-surface-dark rounded-3xl shadow-2xl text-text-primary-light dark:text-text-primary-dark relative overflow-hidden">

            {/* Elegant Gradient Background Accents */}
            <div className="absolute top-[-140px] right-[-140px] w-[280px] h-[280px] bg-gradient-to-tr from-accent-gold-dark to-accent-gold-light opacity-15 rounded-full blur-4xl pointer-events-none"></div>
            <div className="absolute bottom-[-140px] left-[-140px] w-[320px] h-[320px] bg-gradient-to-br from-accent-gold-light to-accent-gold-dark opacity-15 rounded-full blur-4xl pointer-events-none"></div>

            <h1 className="text-7xl font-extrabold mb-16 tracking-widest bg-gradient-to-r from-accent-gold-light to-accent-gold-dark bg-clip-text text-transparent drop-shadow-lg">
                Privacy Policy
            </h1>

            <p className="mb-12 text-lg max-w-4xl font-light leading-relaxed tracking-wide">
                At <span className="font-semibold text-accent-gold-light dark:text-accent-gold-dark">RayDrip</span>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>

            <section className="mb-16 max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                    Information We Collect
                </h2>
                <p className="text-lg font-light tracking-wide leading-relaxed">
                    We collect personal information you provide directly to us, such as your name, email address, and any messages you send. We may also collect technical data automatically through cookies and similar technologies to improve your experience.
                </p>
            </section>

            <section className="mb-16 max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                    How We Use Your Information
                </h2>
                <p className="text-lg font-light tracking-wide leading-relaxed">
                    Your personal data is used to respond to your inquiries, provide customer support, improve our services, and communicate important updates. We do not sell or rent your information to third parties.
                </p>
            </section>

            <section className="mb-16 max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                    Cookies and Tracking Technologies
                </h2>
                <p className="text-lg font-light tracking-wide leading-relaxed">
                    We use cookies to enhance your experience on our site. Cookies help us understand user patterns and tailor content. You can control cookie preferences via your browser settings.
                </p>
            </section>

            <section className="mb-16 max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                    Data Security
                </h2>
                <p className="text-lg font-light tracking-wide leading-relaxed">
                    We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                </p>
            </section>

            <section className="mb-16 max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                    Your Rights
                </h2>
                <p className="text-lg font-light tracking-wide leading-relaxed">
                    You have the right to access, correct, or delete your personal information. For any privacy-related requests or questions, please contact us using the details below.
                </p>
            </section>

            <section className="mb-16 max-w-4xl">
                <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                    Contact Us
                </h2>
                <p className="text-lg font-light tracking-wide leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please reach out to us at{' '}
                    <a href="mailto:contactraydrip.in@gmail.com" className="underline hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300">
                        contactraydrip.in@gmail.com
                    </a>.
                </p>
            </section>

        </div>
    );
};

export default PrivacyPolicy;
