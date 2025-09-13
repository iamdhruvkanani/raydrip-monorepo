// app/shop/page.tsx
import ShopSection from '@/components/ShopSection'

export default function ShopPage() {
    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <h1 className="text-4xl font-bold mb-8">Shop</h1>
            <ShopSection selectedSubCategory="View All Products" />
        </main>
    )
}
