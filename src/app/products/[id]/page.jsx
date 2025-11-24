import Link from 'next/link';
import Image from 'next/image';
import Button from '../../../components/ui/Button';

async function getProductById(id) {
    try {
        const res = await fetch(`https://gadget-verse-backend.vercel.app/api/products/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch product');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default async function ProductDetail({ params }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
                <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border border-white/50 transition-all duration-500 ease-out">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-transform duration-300 hover:scale-105">
                        <span className="text-white text-2xl md:text-3xl">⚠️</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 transition-all duration-300">
                        Product Not Found
                    </h1>
                    <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed transition-colors duration-300">
                        The product youre looking for doesnt exist or may have been removed.
                    </p>
                    <Link href="/products" className="inline-block transition-transform duration-300 hover:scale-105">
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
                        >
                            🛍️ Browse Products
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 md:py-8 transition-all duration-500">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <div className="mb-6 md:mb-8 transition-all duration-300">
                    <Link href="/products" className="inline-block transition-transform duration-300 hover:scale-105">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 ease-out px-4 py-3"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform duration-200 ease-out">←</span>
                            <span className="ml-2">Back to Products</span>
                        </Button>
                    </Link>
                </div>

                {/* Main Product Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 hover:shadow-3xl transition-all duration-500 ease-out">
                    {/* Product Image Section */}
                    <div className="relative w-full aspect-video md:aspect-[21/9] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden transition-all duration-500">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                                priority
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-4 transition-all duration-300">
                                <div className="text-center">
                                    <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl transition-transform duration-300 hover:scale-105">
                                        <span className="text-white text-3xl md:text-5xl">
                                            {product.category === 'smartphone' && '📱'}
                                            {product.category === 'laptop' && '💻'}
                                            {product.category === 'tablet' && '📟'}
                                            {product.category === 'Audio' && '🎧'}
                                            {product.category === 'Wearables' && '⌚'}
                                            {product.category === 'Gaming' && '🎮'}
                                            {product.category === 'Storage' && '💾'}
                                            {product.category === 'Video' && '📹'}
                                            {product.category === 'Accessories' && '🔌'}
                                            {!['smartphone', 'laptop', 'tablet', 'Audio', 'Wearables', 'Gaming', 'Storage', 'Video', 'Accessories'].includes(product.category) && '📦'}
                                        </span>
                                    </div>
                                    <span className="text-gray-500 font-medium bg-white/80 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-lg transition-all duration-300">
                                        {product.category || 'Product Image'}
                                    </span>
                                </div>
                            </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-500" />
                    </div>

                    {/* Product Details */}
                    <div className="p-6 md:p-8 lg:p-12 transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 md:gap-8 transition-all duration-300">
                            {/* Main Info */}
                            <div className="flex-1 transition-all duration-300">
                                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6 transition-all duration-300">
                                    {product.priority === 'featured' && (
                                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105">
                                            ⭐ Featured Product
                                        </span>
                                    )}
                                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105">
                                        {product.category}
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight transition-all duration-300">
                                    {product.title}
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed font-medium transition-colors duration-300">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 transition-all duration-300">
                                    <span className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transition-all duration-300">
                                        ${product.price}
                                    </span>
                                    <div className="h-6 md:h-8 w-px bg-gradient-to-b from-gray-300 to-gray-200 transition-all duration-300"></div>
                                    <div className="flex items-center gap-2 transition-all duration-300">
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse transition-all duration-300"></div>
                                        <span className="text-green-600 font-semibold text-sm md:text-base transition-colors duration-300">In Stock</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Section */}
                            <div className="lg:w-80 xl:w-96 transition-all duration-300">
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
                                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 text-center transition-all duration-300">
                                        Get This Product
                                    </h3>
                                    <div className="space-y-3 md:space-y-4 transition-all duration-300">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-base md:text-lg font-semibold py-3 md:py-4
                                            transition-transform"
                                        >
                                            🛒 Add to Cart
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-pink-300 text-gray-700 hover:text-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-base md:text-lg font-semibold py-3 md:py-4
                                            transition-transform"
                                        >
                                            💝 Add to Wishlist
                                        </Button>
                                    </div>
                                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-blue-200/50 transition-all duration-300">
                                        <div className="space-y-2 md:space-y-3 transition-all duration-300">
                                            <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-all duration-300 ease-out">
                                                <span className="font-medium">🚚 Free shipping</span>
                                                <span className="text-green-600 font-semibold">Included</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-all duration-300 ease-out">
                                                <span className="font-medium">↩️ 30-day returns</span>
                                                <span className="text-green-600 font-semibold">Guaranteed</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-all duration-300 ease-out">
                                                <span className="font-medium">🔒 Secure payment</span>
                                                <span className="text-green-600 font-semibold">Protected</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Description */}
                        {product.fullDescription && (
                            <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-gray-200/50 transition-all duration-300">
                                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 transition-all duration-300">
                                    Product Details
                                </h2>
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-gray-200/50 transition-all duration-300 hover:shadow-lg">
                                    <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium transition-colors duration-300">
                                        {product.fullDescription}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Tech Specs */}
                        <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-gray-200/50 transition-all duration-300">
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8 transition-all duration-300">
                                Tech Specs
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 transition-all duration-300">
                                <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 ease-out group">
                                    <span className="text-gray-600 font-medium text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">Category</span>
                                    <span className="font-semibold text-gray-800 bg-white px-2 py-1 md:px-3 md:py-1 rounded-full border border-blue-200 text-xs md:text-sm transition-all duration-300">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 ease-out group">
                                    <span className="text-gray-600 font-medium text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">Price</span>
                                    <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sm md:text-base transition-all duration-300">
                                        ${product.price}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 ease-out group">
                                    <span className="text-gray-600 font-medium text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">Status</span>
                                    <span className={`font-semibold text-sm md:text-base transition-all duration-300 ${product.priority === 'featured'
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'
                                        : 'text-green-600'
                                        }`}>
                                        {product.priority === 'featured' ? '⭐ Featured' : '✅ Available'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 ease-out group">
                                    <span className="text-gray-600 font-medium text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">Shipping</span>
                                    <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 md:px-3 md:py-1 rounded-full border border-green-200 text-xs md:text-sm transition-all duration-300">
                                        🚚 Free
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Actions */}
                        <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-gray-200/50 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 transition-all duration-300">
                                <Link href="/products" className="flex-1">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 shadow-lg hover:shadow-xl transform hover:scale-101 transition-all duration-300 ease-out text-base md:text-lg font-semibold py-3 md:py-4 transition-transform transition-colors"
                                    >
                                        🔍 Browse More
                                    </Button>
                                </Link>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-101 transition-all duration-300 ease-out text-base md:text-lg font-semibold py-3 md:py-4 transition-transform"
                                >
                                    💳 Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    try {
        const res = await fetch('https://gadget-verse-backend.vercel.app/api/products');
        if (!res.ok) return [];
        const products = await res.json();
        return products.map((product) => ({ id: product._id.toString() }));
    } catch (error) {
        return [];
    }
}

export const dynamicParams = true;