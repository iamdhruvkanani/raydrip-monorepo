// data/products.ts
import { Product } from '@/types/product'

function normalizeString(str: string): string {
    return str.toLowerCase().replace(/[-_]/g, ' ').trim()
}

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Cyan Anarkali',
        price: '2299',
        originalPrice: '2999',
        imageUrl:
            ['https://kasthuribaicompany.com/wp-content/uploads/2021/04/5416-1.jpg'],
        isOnSale: true,
        salePercentage: 23,
        isBestSeller: false,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Floral Kurtis', 'Backless Kurtis'],
        stock: {
            XS: 0,
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            XXL: 0,
        },
        rating: 4.5
    },
    {
        id: 'p2',
        name: 'Navy Blue Kurti',
        price: '599',
        imageUrl:
            ['https://www.shoplibas.com/cdn/shop/files/29655_1_main.jpg?v=1748424427&width=1080'],

        isBestSeller: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Backless Kurtis'],
        description: "Navy Blue Kurti Test Description. Halterneck Kurtis are the perfect blend of modern style and traditional charm, designed for women who love to make a bold fashion statement. Featuring a flattering neckline and chic silhouette, these kurtis are ideal for festive occasions, parties, or casual outings. Crafted from premium fabrics, they offer unmatched comfort and elegance while keeping you on-trend. Pair them with palazzos, skirts, or jeans to create a versatile and stylish ethnic look.",
        stock: {
            XS: 0,
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            XXL: 0,
        },
        rating: 4
    },
    {
        id: 'p3',
        name: 'Elegant Blue Full Sleeve Kurti',
        price: '1005',
        originalPrice: '1500',
        imageUrl:
            ['https://images.jdmagicbox.com/quickquotes/images_main/printed-kurti-for-women-2008003957-dy21qvl1.jpg'],
        isOnSale: true,
        salePercentage: 33,
        isBestSeller: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Full Sleeves Short Kurtis', 'Backless Kurtis'],
        stock: {
            XS: 2,
            S: 8,
            M: 2,
            L: 5,
            XL: 8,
            XXL: 0,
        },
        // rating: 5
    },
    {
        id: 'p4',
        name: 'White Short Kurti',
        price: '1200',
        imageUrl:
            ['https://assets0.mirraw.com/images/12091953/A911388_1_zoom.jpg?1701933379'],
        isBestSeller: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Bell Sleeves Kurtis', 'Halter Neck Kurtis', 'Backless Kurtis'],
        stock: {
            XS: 5,
            S: 10,
            M: 15,
            L: 12,
            XL: 8,
            XXL: 0,
        },
        rating: 3.5
    },
    {
        id: 'p5',
        name: 'White Full Sleeves Kurti',
        price: '7999',
        imageUrl:
            ['https://sutionline.in/cdn/shop/files/18403MISTEDYELLOW1.webp?v=1722076201&width=1200'],

        isBestSeller: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Full Sleeves Short Kurtis'],
        stock: {
            XS: 5,
            S: 10,
            M: 15,
            L: 12,
            XL: 8,
            XXL: 0,
        },
        rating: 3
    },
    {
        id: 'p6',
        name: 'Short Blue Kurti',
        price: '14999',
        imageUrl: ['https://kanooda.com/wp-content/uploads/2024/04/PIK03230.webp'],
        isBestSeller: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Backless Kurtis'],
        stock: {
            XS: 0,
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            XXL: 0,
        },
        rating: 4.5
    },
    {
        id: 'p7',
        name: 'Sleeveless Blue Kurti',
        price: '1299',
        imageUrl:
            ['https://nayoclothing.com/cdn/shop/products/BER3118_1_1080x.jpg?v=1754029498'],
        isBestSeller: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Backless Kurtis'],
        stock: {
            XS: 0,
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            XXL: 0,
        },
        rating: 4
    },



    {
        id: 'p8',
        name: 'Grey Straight Sleeve',
        price: '2299',
        originalPrice: '2999',
        imageUrl:
            ['https://www.suratfabric.com/wp-content/uploads/2024/07/Kalaroop-Kriti-by-Kajree-VIscose-Kurti-Catalog-6-Pcs-3.jpeg'],
        isOnSale: true,
        salePercentage: 25,
        isBestSeller: true,
        isNewArrival: false,
        category: 'shop',
        subCategory: ['Straight Sleeves Kurtis'],
        stock: {
            XS: 5,
            S: 10,
            M: 15,
            L: 12,
            XL: 8,
            XXL: 0,
        },
        rating: 4
    },
    {
        id: 'p9',
        name: 'Blue Long Kurti',
        price: '2299',
        originalPrice: '2100',
        imageUrl:
            ['https://www.suratfabric.com/wp-content/uploads/2024/07/Kalaroop-Kriti-by-Kajree-VIscose-Kurti-Catalog-6-Pcs-5.jpeg'],
        isOnSale: false,
        salePercentage: 23,
        isBestSeller: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Long Kurtis'],
        stock: {
            XS: 0,
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            XXL: 0,
        },
        rating: 4
    },
    {
        id: 'p10',
        name: 'Green Kurti',
        price: '1500',
        originalPrice: '1500',
        imageUrl:
            ['https://www.suratfabric.com/wp-content/uploads/2024/07/Kalaroop-Kriti-by-Kajree-VIscose-Kurti-Catalog-6-Pcs-2.jpeg', 'https://www.suratfabric.com/wp-content/uploads/2024/07/Kalaroop-Kriti-by-Kajree-VIscose-Kurti-Catalog-6-Pcs-5.jpeg'],
        isOnSale: true,
        salePercentage: 40,
        isBestSeller: false,
        isNewArrival: true,

        category: 'shop',
        subCategory: ['Halter Neck Kurtis'],
        stock: {
            XS: 0,
            S: 0,
            M: 0,
            L: 2,
            XL: 0,
            XXL: 0,
        },
        rating: 3
    },
    {
        id: 'p11',
        name: 'Pink Kurti',
        price: '2299',
        originalPrice: '799',
        imageUrl:
            ['https://textileattire.com//images/product/2024/07/kriti-series-13915-to-13920-kurti-by-kalaroop-designer-with-work-viscose-kurtis-are-available-at-wholesale-price-2024-07-27_17_02_03.jpeg'],
        isOnSale: false,
        salePercentage: 23,

        isBestSeller: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Full Sleeves Kurtis'],
        stock: {
            XS: 5,
            S: 10,
            M: 2,
            L: 12,
            XL: 8,
            XXL: 0,
        },
        rating: 3.5
    },
    {
        id: 'p12',
        name: 'White And Blue Kurti',
        price: '2299',
        originalPrice: '2999',
        imageUrl:
            ['https://chidiyaa.com/cdn/shop/files/jpeg-optimizer_IMG_7684.jpg?v=1746013991&width=1533'],
        isOnSale: false,
        salePercentage: 23,
        isBestSeller: false,
        isNewArrival: true,
        category: 'shop',
        subCategory: ['Full Sleeves Kurtis'],
        stock: {
            XS: 5,
            S: 2,
            M: 15,
            L: 3,
            XL: 8,
            XXL: 0,
        },
        rating: 4.5
    },
]

export function getProductBadge(product: Product): string | undefined {
    if (product.isBestSeller) return 'Best Seller'
    if (product.isNewArrival) return 'New Arrival'
    return product.badge
}

export function getBestSellerProducts(): Product[] {
    return PRODUCTS.filter((p) => p.isBestSeller)
}

export function getNewArrivalProducts(): Product[] {
    return PRODUCTS.filter((p) => p.isNewArrival)
}

export function getAllProducts(): Product[] {
    return PRODUCTS
}


export function getProductsBySubCategoryNormalized(subCategoryNormalized: string): Product[] {
    const normalizedParam = normalizeString(subCategoryNormalized)
    return PRODUCTS.filter(
        (p) => p.subCategory && p.subCategory.some(sub => normalizeString(sub) === normalizedParam)
    )
}
