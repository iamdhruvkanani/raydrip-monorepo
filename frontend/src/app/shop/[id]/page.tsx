import ShopSection from '@/components/ShopSection'
import { Metadata } from 'next'
type Params = {
    id: string
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { id } = await params
    const categoryName = id.replace(/-/g, ' ')
    return {
        title: `${categoryName} | RayDrip Shop`,
        description: `Browse our ${categoryName} collection`,
    }
}
export default async function SubCategoryPage({ params }: { params: Promise<Params> }) {
    const { id } = await params
    const subCategory = id
    return (
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-4">
            <ShopSection selectedSubCategory={subCategory} />
        </main>
    )
}