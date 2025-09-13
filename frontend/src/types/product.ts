export interface Product {
    id: string
    name: string
    description?: string  // question mark means optional
    price: string
    originalPrice?: string
    imageUrl: string
    isOnSale?: boolean
    salePercentage?: number
    badge?: string
    features?: string[]
}
