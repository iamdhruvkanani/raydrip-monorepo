// app/shop/[id]/page.tsx
import ShopSection from '@/components/ShopSection'

type Params = {
    id: string
}

export default async function SubCategoryPage({ params }: { params: Promise<Params> }) {
    const { id } = await params
    // example: 'backless-kurtis' => 'backless kurtis' (normalized in filter)
    const subCategory = id

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <h1 className="text-3xl font-semibold mb-6 capitalize">{subCategory.replace(/-/g, ' ')}</h1>
            <ShopSection selectedSubCategory={subCategory} />
        </main>
    )
}
