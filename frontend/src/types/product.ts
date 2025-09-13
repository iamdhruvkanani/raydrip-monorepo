export interface Product {
    id: string
    name: string
    price: string
    originalPrice?: string
    imageUrl: string
    isOnSale?: boolean
    salePercentage?: number
    badge?: string
    category: 'featured' | 'newArrival' | 'shop'
    subCategory?: 'Backless Kurtis' | 'Full Sleeves Short Kurtis' | 'Floral Kurtis' | 'Bell Sleeves Kurtis' | string
    description?: string
    features?: string[]
    isFeatured: boolean
    isNewArrival: boolean
}