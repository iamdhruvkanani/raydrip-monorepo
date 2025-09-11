// src/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="border-t border-gold/30 py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-gray-warm">
                <p className="text-sm">© {new Date().getFullYear()} Ray Drip. All rights reserved.</p>
                <div className="w-full h-px my-4 bg-gold/20 md:hidden" />
                <nav className="flex space-x-6 text-sm">
                    <a href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-gold transition-colors">Terms of Service</a>
                    <a href="/contact" className="hover:text-gold transition-colors">Contact</a>
                </nav>
            </div>
        </footer>
    )
}
