import Head from 'next/head';
import ProductDetails from '@/components/ProductDetails';
import { PRODUCTS } from '@/data/products';
import { Metadata } from 'next';

interface Params {
    id: string;
}

function convertToString(value: string | string[] | undefined): string | undefined {
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    return value;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const resolvedParams = await params;
    const product = PRODUCTS.find(p => p.id === resolvedParams.id);

    if (!product) {
        return {
            title: 'Product Not Found',
            description: 'Product does not exist',
        };
    }

    const description = convertToString(product.description) ?? '';
    const subCategory = convertToString(product.subCategory) ?? '';

    return {
        title: `${product.name} | RayDrip`,
        description: `Shop ${product.name} - ${subCategory}`,
        openGraph: {
            title: product.name,
            description: description || subCategory,
            images: product.imageUrl?.[0] ? [{ url: product.imageUrl[0] }] : [],
            siteName: 'RayDrip',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: description || subCategory,
            images: product.imageUrl ?? [],
        },
    };
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const product = PRODUCTS.find(p => p.id === resolvedParams.id);

    if (!product) {
        return <p>Product not found</p>;
    }

    const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.imageUrl,
        description: convertToString(product.description) || convertToString(product.subCategory),
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'RayDrip',
        },
        offers: {
            '@type': 'Offer',
            url: `https://raydrip.com/products/${product.id}`,
            priceCurrency: 'USD',
            price: product.price?.toString() ?? '0',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    key="product-jsonld"
                />
            </Head>
            <ProductDetails product={product} allProducts={PRODUCTS} />
        </>
    );
}
