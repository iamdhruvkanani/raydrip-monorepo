import React from 'react';

const TermsOfService = () => {
    return (
        <div className="max-w-5xl mx-auto px-12 py-28 bg-gradient-to-tr from-bg-light to-surface-light dark:from-bg-dark dark:to-surface-dark rounded-3xl shadow-2xl text-text-primary-light dark:text-text-primary-dark relative overflow-hidden">

            {/* Elegant Gradient Background Accents */}
            <div className="absolute top-[-140px] right-[-140px] w-[280px] h-[280px] bg-gradient-to-tr from-accent-gold-dark to-accent-gold-light opacity-15 rounded-full blur-4xl pointer-events-none"></div>
            <div className="absolute bottom-[-140px] left-[-140px] w-[320px] h-[320px] bg-gradient-to-br from-accent-gold-light to-accent-gold-dark opacity-15 rounded-full blur-4xl pointer-events-none"></div>

            <h1 className="text-7xl font-extrabold mb-16 tracking-widest bg-gradient-to-r from-accent-gold-light to-accent-gold-dark bg-clip-text text-transparent drop-shadow-lg">
                Terms of Service
            </h1>

            <p className="mb-12 text-xs uppercase tracking-widest font-semibold text-accent-gold-light dark:text-accent-gold-dark">
                Last updated: <time dateTime="2025-09-18">September 18, 2025</time>
            </p>

            <p className="mb-20 text-lg leading-relaxed max-w-4xl font-light tracking-wide">
                Welcome to <span className="font-semibold text-accent-gold-light dark:text-accent-gold-dark">RayDrip</span>! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using{' '}
                <a
                    href="https://www.raydrip.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300"
                >
                    www.raydrip.in
                </a>, you agree to these Terms. If you do not agree, please do not use our website.
            </p>

            {[{
                title: "1. Acceptance of Terms",
                content: "By using our website, you accept and agree to be bound by these Terms and our Privacy Policy. These apply to all visitors, users, and others who access the service."
            },
            {
                title: "2. Use of Website",
                contentList: [
                    "You must be at least 18 years old or have reached the age of majority in your jurisdiction to use our services.",
                    "You agree to use the website only for lawful purposes and not to violate any applicable laws.",
                    "You agree not to engage in behavior that harms or disrupts our services or other users."
                ]
            },
            {
                title: "3. Intellectual Property",
                content: "All content, trademarks, and intellectual property displayed on the website belong to RayDrip or its licensors. You may not use, reproduce, or distribute content without prior written permission."
            },
            {
                title: "4. User Content",
                content: "You are responsible for any content you submit. By submitting content, you grant us a license to use, reproduce, and display it within the website and promotional materials."
            },
            {
                title: "5. Disclaimer and Limitation of Liability",
                content: "The website and services are provided \"as is\" without warranties of any kind. We are not liable for any damages arising from your use of the website."
            },
            {
                title: "6. Termination",
                content: "We reserve the right to suspend or terminate your access if you violate these Terms."
            },
            {
                title: "7. Changes to Terms",
                content: "We may update these Terms at any time. Continued use of the site means you accept the changes."
            },
            {
                title: "8. Governing Law",
                content: "These Terms are governed by the laws of Ahmedabad, Gujarat, India."
            },
            {
                title: "9. Contact Us",
                content: (
                    <>
                        If you have questions about these Terms, contact us at{' '}
                        <a href="mailto:contactraydrip.in@gmail.com" className="underline hover:text-accent-gold-light dark:hover:text-accent-gold-dark transition-colors duration-300">
                            contactraydrip.in@gmail.com
                        </a>.
                    </>
                )
            }
            ].map(({ title, content, contentList }, idx) => (
                <section key={idx} className="mb-16 max-w-4xl">
                    <h2 className="text-3xl font-semibold mb-6 border-b border-accent-gold-light dark:border-accent-gold-dark pb-4 tracking-wide">
                        {title}
                    </h2>
                    {contentList ? (
                        <ul className="list-disc list-inside space-y-5 text-lg font-light tracking-wide leading-relaxed">
                            {contentList.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-lg font-light tracking-wide leading-relaxed">{content}</p>
                    )}
                </section>
            ))}
        </div>
    );
};

export default TermsOfService;
