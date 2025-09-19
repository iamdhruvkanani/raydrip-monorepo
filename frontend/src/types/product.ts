export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Product {
    id: string
    name: string
    price: string
    originalPrice?: string
    imageUrl?: string[]
    isOnSale?: boolean
    salePercentage?: number
    badge?: string
    category: 'bestSeller' | 'newArrival' | 'shop'

    subCategory?: string[]
    description?: string
    features?: string[]

    isBestSeller: boolean
    isNewArrival: boolean

    // Stock keyed by defined size literals
    stock?: Partial<Record<Size, number>>
    rating?: number
}
