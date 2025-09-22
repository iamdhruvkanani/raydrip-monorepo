'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, Size } from '@/types/product'
import AddCartButton from '@/components/AddToCartButton'
import toast from 'react-hot-toast'
import { getProductBadge } from '@/data/products'
import { useCart } from '@/context/CartContext'

interface Props {
    product: Product
}

export default function ProductCardMobile({ product }: Props) {
    const badgeText = getProductBadge(product)
    const { addToCart } = useCart();

    // Check if ANY size is available
    const hasStock =
        product.stock &&
        Object.values(product.stock).some((qty) => (qty ?? 0) > 0);

    const getSalePrice = () => {
        if (product.isOnSale && product.originalPrice && product.salePercentage) {
            const orig = parseFloat(product.originalPrice.replace('₹', '').replace(/,/g, ''))
            const salePrice = orig * (1 - product.salePercentage / 100)
            return salePrice.toLocaleString()
        }
        return product.price
    }

    const handleAddCart = (e: React.MouseEvent) => {
        // Prevent both bubbling and navigation
        e.preventDefault();
        e.stopPropagation();

        if (!hasStock) {
            toast.error(
                <span>
                    <strong>{product.name}</strong> is out of stock.
                </span>
            );
            return;
        }
        addToCart(product, 1, undefined);
        toast.success(
            <div>
                <span className="font-semibold text-white">{product.name}</span>
                <span className="ml-2 font-bold text-white">added to cart!</span>
                <div className="text-xs text-yellow-300 mt-1">Select size in cart before checkout</div>
            </div>
        );
    };


    return (
        <Link
            href={`/products/${product.id}`}
            className="block w-full max-w-xs mx-auto"
            tabIndex={-1}
            aria-label={`View details about ${product.name}`}
        >
            <article className="group rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md flex flex-col overflow-hidden h-[380px]">
                <div className="relative w-full h-[220px] bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-t-lg flex items-center justify-center">
                    {product.isOnSale && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold select-none z-10">
                            -{product.salePercentage}%
                        </span>
                    )}
                    {badgeText && (
                        <span className="absolute bottom-2 left-2 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded font-semibold z-10 select-none">
                            {badgeText}
                        </span>
                    )}
                    <Image
                        src={product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : "/placeholder-image.png"}
                        alt={product.name}
                        fill
                        sizes="95vw"
                        priority={false}
                        className="object-contain p-1 sm:p-2 transition-transform scale-100 duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                    <h3 className="font-semibold text-base line-clamp-2 mb-1 text-gray-900 dark:text-white">
                        {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-yellow-600 dark:text-yellow-400 font-bold mb-2">
                        {product.isOnSale && product.originalPrice ? (
                            <>
                                <span>₹{getSalePrice()}</span>
                                <span className="line-through text-gray-400 dark:text-gray-500">₹{product.originalPrice}</span>
                            </>
                        ) : (
                            <span className="font-semibold text-gray-900 dark:text-white">₹{product.price}</span>
                        )}
                    </div>
                    <AddCartButton
                        product={product}
                        quantity={1}
                        onClick={handleAddCart}
                        className="mt-auto"
                        disabled={!hasStock}
                    />

                </div>
            </article>
        </Link>
    )
}
