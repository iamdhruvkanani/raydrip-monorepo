// data/products.ts
import { Product } from '@/types/product'

function normalizeString(str: string): string {
    return str.toLowerCase().replace(/[-_]/g, ' ').trim()
}

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p2',
        name: 'Navy Blue Kurti',
        price: '₹599',
        imageUrl:
            'https://www.shoplibas.com/cdn/shop/files/29655_1_main.jpg?v=1748424427&width=1080',
        badge: 'Best Seller',
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Backless Kurtis'],
    },
    {
        id: 'p3',
        name: 'Elegant Blue Full Sleeve Kurti',
        price: '₹1005',
        originalPrice: '₹1500',
        imageUrl:
            'https://images.jdmagicbox.com/quickquotes/images_main/printed-kurti-for-women-2008003957-dy21qvl1.jpg',
        isOnSale: true,
        salePercentage: 33,
        isFeatured: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Full Sleeves Short Kurtis'],
    },
    {
        id: 'p4',
        name: 'White Short Kurti',
        price: '₹1200',
        imageUrl:
            'https://assets0.mirraw.com/images/12091953/A911388_1_zoom.jpg?1701933379',
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Bell Sleeves Kurtis', 'Halter Neck Kurtis'],
    },
    {
        id: 'p5',
        name: 'White Full Sleeves Kurti',
        price: '₹7999',
        imageUrl:
            'https://sutionline.in/cdn/shop/files/18403MISTEDYELLOW1.webp?v=1722076201&width=1200',
        badge: 'Best Seller',
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Full Sleeves Short Kurtis'],
    },
    {
        id: 'p6',
        name: 'Short Blue Kurti',
        price: '₹14999',
        imageUrl: 'https://kanooda.com/wp-content/uploads/2024/04/PIK03230.webp',
        isFeatured: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Backless Kurtis'],
    },
    {
        id: 'p7',
        name: 'Sleeveless Blue Kurti',
        price: '₹1299',
        imageUrl:
            'https://nayoclothing.com/cdn/shop/products/BER3118_1_1080x.jpg?v=1754029498',
        isFeatured: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Backless Kurtis'],
    },



    {
        id: 'p8',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p9',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p10',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p11',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p12',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p13',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p14',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },
    {
        id: 'p15',
        name: 'Cyan Anarkali',
        price: '₹2299',
        originalPrice: '₹2999',
        imageUrl:
            'https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg',
        isOnSale: true,
        salePercentage: 23,
        isFeatured: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis'],
    },



]

export function getFeaturedProducts(): Product[] {
    return PRODUCTS.filter((p) => p.isFeatured)
}

export function getNewArrivalProducts(): Product[] {
    return PRODUCTS.filter((p) => p.isNewArrival)
}

export function getAllProducts(): Product[] {
    return PRODUCTS
}

// export function getProductsBySubCategoryNormalized(subCategoryNormalized: string): Product[] {
//     const normalizedParam = normalizeString(subCategoryNormalized)
//     return PRODUCTS.filter(
//         (p) => p.subCategory && normalizeString(p.subCategory) === normalizedParam
//     )
// }
export function getProductsBySubCategoryNormalized(subCategoryNormalized: string): Product[] {
    const normalizedParam = normalizeString(subCategoryNormalized)
    return PRODUCTS.filter(
        (p) => p.subCategory && p.subCategory.some(sub => normalizeString(sub) === normalizedParam)
    )
}
