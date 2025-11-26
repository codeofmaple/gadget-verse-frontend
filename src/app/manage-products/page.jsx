'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import Swal from 'sweetalert2';

// API functions
async function getProducts() {
    try {
        const res = await fetch('https://gadget-verse-backend.vercel.app/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`https://gadget-verse-backend.vercel.app/api/products/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete product');
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// Product Card
function ProductCard({ product, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            setIsDeleting(true);
            try {
                await onDelete(product._id);
                Swal.fire({ title: "Deleted!", text: "Product has been deleted.", icon: "success", timer: 1500, showConfirmButton: false });
            } catch {
                Swal.fire({ title: "Error!", text: "Failed to delete product.", icon: "error", timer: 1500, showConfirmButton: false });
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleImageError = () => setImageError(true);

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {product.image && !imageError ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 dark:from-gray-700 to-gray-200 dark:to-gray-800">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-2xl">📦</span>
                        </div>
                    </div>
                )}
                <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full backdrop-blur-sm">
                        {product.category}
                    </span>
                </div>
                {product.priority && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full backdrop-blur-sm">
                            {product.priority}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors line-clamp-1 text-sm sm:text-base mb-2">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">{product.description}</p>

                <div className="flex items-center justify-between my-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${product.price}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}</div>
                </div>

                <div className="flex space-x-2">
                    <Button variant="primary" size="sm" onClick={() => window.location.href = `/products/${product._id}`} className="flex-1 text-xs sm:text-sm">
                        View Details
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleDelete} disabled={isDeleting} className="px-3 text-xs sm:text-sm">
                        {isDeleting ? <div className="flex items-center space-x-1"><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /><span className="hidden sm:inline">Deleting</span></div> : 'Delete'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Grid
function ProductsGrid({ products, onDelete }) {
    if (!products.length) {
        return (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 dark:from-gray-900 to-blue-50 dark:to-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No Products Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">You haven't added any products yet.</p>
                <Button variant="primary" onClick={() => window.location.href = '/add-product'}>
                    Add Your First Product
                </Button>
            </div>
        );
    }

    return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{products.map(p => <ProductCard key={p._id} product={p} onDelete={onDelete} />)}</div>;
}

// Search/Filter
function SearchFilter({ onSearch, onFilter, products }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['All Categories', ...new Set(products.map(p => p.category))];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Products</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by product name or description..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); onSearch(e.target.value); }}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">🔍</div>
                    </div>
                </div>
                <div className="sm:w-64">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => { setSelectedCategory(e.target.value); onFilter(e.target.value === 'All Categories' ? '' : e.target.value); }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
}

// Manage Products Page
export default function ManageProductsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
        else if (status === 'authenticated') loadProducts();
    }, [status, router]);

    const loadProducts = async () => {
        try { setLoading(true); setError(''); const data = await getProducts(); setProducts(data); setFilteredProducts(data); }
        catch { setError('Failed to load products'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        try { await deleteProduct(id); setProducts(prev => prev.filter(p => p._id !== id)); setFilteredProducts(prev => prev.filter(p => p._id !== id)); }
        catch { setError('Failed to delete product'); }
    };

    const handleSearch = (term) => setFilteredProducts(products.filter(p => p.title.toLowerCase().includes(term.toLowerCase()) || p.description.toLowerCase().includes(term.toLowerCase())));
    const handleFilter = (category) => setFilteredProducts(category ? products.filter(p => p.category === category) : products);

    if (status === 'loading' || loading) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-blue-50 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center"><div className="w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600 dark:text-gray-300 font-medium">Loading your products...</p></div>
        </div>
    );

    const totalValue = products.reduce((sum, p) => sum + Number(p.price || 0), 0);
    const categoryCount = new Set(products.map(p => p.category)).size;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-blue-50 dark:to-gray-800 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:text-left text-center lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 dark:from-gray-100 to-blue-600 bg-clip-text text-transparent mb-3">Manage Products</h1>
                        <p className="text-lg md:text-left text-center text-gray-500 dark:text-gray-300">View, manage, and organize your product catalog</p>
                    </div>
                    <Button variant="primary" onClick={() => router.push('/add-product')} className="shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow">+ Add New Product</Button>
                </div>

                {error && <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-4 mb-6 flex items-center justify-between text-red-700 dark:text-red-300"><span>{error}</span><button onClick={loadProducts} className="underline">Try Again</button></div>}

                {products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">📦</div>
                            <div><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Products</p><p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{products.length}</p></div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">🏷️</div>
                            <div><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Categories</p><p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{categoryCount}</p></div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center space-x-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">💰</div>
                            <div><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Value</p><p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">${totalValue.toFixed(2)}</p></div>
                        </div>
                    </div>
                )}

                <SearchFilter onSearch={handleSearch} onFilter={handleFilter} products={products} />

                {products.length > 0 && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6">Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}{filteredProducts.length !== products.length && ` of ${products.length}`}</p>
                )}

                <ProductsGrid products={filteredProducts} onDelete={handleDelete} />
            </div>
        </div>
    );
}
