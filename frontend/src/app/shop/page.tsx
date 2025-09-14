import ShopSection from '@/components/ShopSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Shop | RayDrip - Premium Fashion Collection',
    description: 'Explore our curated collection of premium fashion pieces',
}

export default function ShopPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <ShopSection selectedSubCategory="View All Products" />
        </main>
    )
}
