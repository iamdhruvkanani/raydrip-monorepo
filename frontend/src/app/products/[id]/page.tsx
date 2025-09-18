import Head from 'next/head';
import ProductDetails from '@/components/ProductDetails';
import { PRODUCTS } from '@/data/products';

interface Params {
    id: string
}

export default function ProductPage({ params }: { params: Params }) {
    const product = PRODUCTS.find(p => p.id === params.id);

    if (!product) {
        // Handle 404 here
        return <p>Product not found</p>;
    }

    const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.imageUrl,
        description: product.description ?? product.subCategory,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'RayDrip'
        },
        offers: {
            '@type': 'Offer',
            url: `https://raydrip.com/products/${product.id}`,
            priceCurrency: 'USD',
            price: product.price?.toString() ?? '0',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        }
    };

    return (
        <>
            <Head>
                <title>{product.name} | RayDrip</title>
                <meta name="description" content={`Shop ${product.name} - ${product.subCategory}`} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    key="product-jsonld"
                />
            </Head>
            <ProductDetails product={product} />
        </>
    );
}
