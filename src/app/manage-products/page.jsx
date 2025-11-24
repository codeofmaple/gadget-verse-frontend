'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import Image from 'next/image';

// API functions
async function getProducts() {
    try {
        const res = await fetch('http://localhost:5000/api/products', {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// Product Card Component - Responsive Grid
function ProductCard({ product, onDelete, loadingId }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageError, setImageError] = useState(false);

    const categoryData = { emoji: '📦', color: 'bg-gray-100 text-gray-600' };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(product._id);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
            {/* Product Image */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {product.image && !imageError ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className={`w-16 h-16 ${categoryData.color} rounded-xl flex items-center justify-center shadow-sm`}>
                            <span className="text-2xl">{categoryData.emoji}</span>
                        </div>
                    </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-block px-2 py-1 text-xs font-medium ${categoryData.color.replace('text-', 'bg-').replace('-600', '-100')} ${categoryData.color} rounded-full backdrop-blur-sm`}>
                        {product.category}
                    </span>
                </div>
                {/* Priority Badge */}
                {product.priority && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full backdrop-blur-sm">
                            {product.priority}
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-6">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 text-sm sm:text-base mb-2">
                        {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {product.description}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                    <div className="text-xs text-gray-500">
                        {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.location.href = `/products/${product._id}`}
                        className="flex-1 text-xs sm:text-sm"
                    >
                        View Details
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-3 text-xs sm:text-sm"
                    >
                        {isDeleting ? (
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span className="hidden sm:inline">Deleting</span>
                            </div>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Products Grid Component
function ProductsGrid({ products, onDelete, loadingId }) {
    if (products.length === 0) {
        return (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                    You havent added any products yet. Start building your catalog.
                </p>
                <Button
                    variant="primary"
                    onClick={() => window.location.href = '/add-product'}
                    className="shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                    Add Your First Product
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={onDelete}
                    loadingId={loadingId}
                />
            ))}
        </div>
    );
}

// Search and Filter Component
function SearchFilter({ onSearch, onFilter, products }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Extract unique categories from products
    const categories = ['All Categories', ...new Set(products.map(p => p.category))];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        onFilter(value === 'All Categories' ? '' : value);
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search Products
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by product name or description..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-400">🔍</span>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="sm:w-64">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default function ManageProductsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loadingId, setLoadingId] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            loadProducts();
        }
    }, [status, router]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoadingId(id);
        try {
            await deleteProduct(id);
            setProducts(prev => prev.filter(product => product._id !== id));
            setFilteredProducts(prev => prev.filter(product => product._id !== id));
        } catch (err) {
            setError('Failed to delete product');
            console.error('Error deleting product:', err);
        } finally {
            setLoadingId(null);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleFilter = (category) => {
        if (!category) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your products...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return null;
    }

    const totalValue = products.reduce((sum, product) => sum + Number(product.price || 0), 0);
    const categoryCount = new Set(products.map(p => p.category)).size;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-3">
                            Manage Products
                        </h1>
                        <p className="text-gray-600 text-lg">
                            View, manage, and organize your product catalog
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => router.push('/add-product')}
                        className="shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                    >
                        <span className="flex items-center space-x-2">
                            <span>+</span>
                            <span>Add New Product</span>
                        </span>
                    </Button>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-sm">⚠️</span>
                            </div>
                            <span className="text-red-700 font-medium">{error}</span>
                        </div>
                        <button
                            onClick={loadProducts}
                            className="text-red-700 hover:text-red-800 font-medium text-sm underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Stats */}
                {products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 text-sm sm:text-lg">📦</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Total Products</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{products.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 text-sm sm:text-lg">🏷️</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Categories</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{categoryCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 text-sm sm:text-lg">💰</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Total Value</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and Filter */}
                <SearchFilter
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    products={products}
                />

                {/* Products Count */}
                {products.length > 0 && (
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600 text-sm sm:text-base">
                            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                            {filteredProducts.length !== products.length && ` of ${products.length}`}
                        </p>
                    </div>
                )}

                {/* Products Grid */}
                <ProductsGrid
                    products={filteredProducts}
                    onDelete={handleDelete}
                    loadingId={loadingId}
                />
            </div>
        </div>
    );
}