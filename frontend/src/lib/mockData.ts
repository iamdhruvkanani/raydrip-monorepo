export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    subCategory: string
    images: string[]
    sizes: Size[]
    colors: string[]
    stock: Partial<Record<Size, number>>
    featured: boolean
    active: boolean
    createdAt: string
    updatedAt: string
}

export interface Order {
    id: string
    customerName: string
    customerEmail: string
    customerPhone: string
    shippingAddress: string
    city: string
    state: string
    pincode: string
    items: Array<{
        id: string
        name: string
        size: Size
        quantity: number
        price: number
    }>
    total: number
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
    createdAt: string
}

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Floral Print Kurti',
        description: 'Beautiful floral print kurti perfect for casual wear',
        price: 1299,
        category: 'Kurtis',
        subCategory: 'Floral',
        images: ['/images/kurti-1.jpg', '/images/kurti-1-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Pink', 'White'],
        stock: { S: 5, M: 10, L: 5, XL: 0 },
        featured: true,
        active: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    {
        id: '2',
        name: 'Backless Designer Kurti',
        description: 'Stylish backless kurti for special occasions',
        price: 1899,
        category: 'Kurtis',
        subCategory: 'Backless',
        images: ['/images/kurti-2.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Maroon'],
        stock: { S: 5, M: 6, L: 4 },
        featured: false,
        active: true,
        createdAt: '2024-01-14T10:00:00Z',
        updatedAt: '2024-01-14T10:00:00Z'
    }
]

export const mockOrders: Order[] = [
    {
        id: 'ORD001',
        customerName: 'Priya Sharma',
        customerEmail: 'priya@example.com',
        customerPhone: '9876543210',
        shippingAddress: '123 MG Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380001',
        items: [
            { id: '1', name: 'Floral Print Kurti', size: 'M', quantity: 1, price: 1299 }
        ],
        total: 1299,
        status: 'confirmed',
        createdAt: '2024-01-16T10:00:00Z'
    },
    {
        id: 'ORD002',
        customerName: 'Anita Patel',
        customerEmail: 'anita@example.com',
        customerPhone: '9876543211',
        shippingAddress: '456 SG Highway',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380015',
        items: [
            { id: '2', name: 'Backless Designer Kurti', size: 'L', quantity: 2, price: 1899 }
        ],
        total: 3798,
        status: 'shipped',
        createdAt: '2024-01-15T10:00:00Z'
    }
]

// Local Storage Helpers
export const getProductsFromStorage = (): Product[] => {
    if (typeof window === 'undefined') return mockProducts
    const stored = localStorage.getItem('admin-products')
    return stored ? JSON.parse(stored) : mockProducts
}

export const saveProductsToStorage = (products: Product[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('admin-products', JSON.stringify(products))
    }
}

export const getOrdersFromStorage = (): Order[] => {
    if (typeof window === 'undefined') return mockOrders
    const stored = localStorage.getItem('admin-orders')
    return stored ? JSON.parse(stored) : mockOrders
}

export const saveOrdersToStorage = (orders: Order[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('admin-orders', JSON.stringify(orders))
    }
}
