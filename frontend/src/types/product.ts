import { SiElevenlabs, SiEljueves } from "react-icons/si"

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
    // subCategory?: 'Backless Kurtis' | 'Full Sleeves Short Kurtis' | 'Floral Kurtis' | 'Bell Sleeves Kurtis' | string
    subCategory?: string[]
    description?: string
    features?: string[]
    isFeatured: boolean
    isNewArrival: boolean
}



// Backless Kurtis (only include backless)
// Full Sleeves (include bell and straight)
// Floral (only floral)
// Bell Sleeve (only bell sleeve)
// Long Kurti (only long)
// Straight Sleeve (only straight)
// Halter Neck (only halter)