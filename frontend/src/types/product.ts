
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

}

