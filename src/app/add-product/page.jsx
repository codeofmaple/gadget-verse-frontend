'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';

export default function AddProductPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fullDescription: '',
        price: '',
        category: '',
        image: '',
        priority: 'normal'
    });

    // validation state
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            const msg = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: msg }));
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'title':
                if (!value || value.trim() === '') return 'Title is required.';
                if (value.trim().length < 3) return 'Title must be at least 3 characters.';
                return '';
            case 'description':
                if (!value || value.trim() === '') return 'Short description is required.';
                if (value.trim().length > 140) return 'Short description must be 140 characters or less.';
                return '';
            case 'fullDescription':
                if (value && value.trim().length > 0 && value.trim().length < 10) return 'Full description must be at least 10 characters if provided.';
                return '';
            case 'price':
                if (value === '' || value === null) return 'Price is required.';
                const num = Number(value);
                if (Number.isNaN(num)) return 'Price must be a number.';
                if (num < 0) return 'Price must be a positive number.';
                return '';
            case 'category':
                if (!value || value.trim() === '') return 'Category is required.';
                return '';
            default:
                return '';
        }
    };

    const validateAll = () => {
        const toValidate = ['title', 'description', 'fullDescription', 'price', 'category', 'image', 'priority'];
        const newErrors = {};
        toValidate.forEach((key) => {
            const msg = validateField(key, formData[key]);
            if (msg) newErrors[key] = msg;
        });
        return newErrors;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const msg = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: msg }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const newErrors = validateAll();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrField = Object.keys(newErrors)[0];
            const el = document.querySelector(`[name="${firstErrField}"]`);
            if (el) el.focus();
            toast.error('Please fix the highlighted errors and try again.');
            return;
        }

        setLoading(true);
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                createdAt: new Date().toISOString()
            };

            const response = await fetch('https://gadget-verse-backend.vercel.app/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (!response.ok) throw new Error('Failed to add product');

            toast.success("Product added successfully!")

            setTimeout(() => {
                router.push('/products');
            }, 2000);
        } catch (error) {
            setError('Failed to add product. Please try again.');
            toast.error("Failed to add product. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (status === 'unauthenticated') return null;

    const inputClass = (fieldName) =>
        `w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">

            <title>Add Products | GadgetVerse</title>

            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4
                     bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent leading-tight text-center">
                        Add New Product
                    </h1>
                    <p className="text-center text-lg text-gray-500">Add amazing products to your GadgetVerse store</p>
                </div>

                {/* Product Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={inputClass('title')}
                                    required
                                    disabled={loading}
                                    placeholder="Enter product name"
                                    aria-invalid={errors.title ? 'true' : 'false'}
                                    aria-describedby={errors.title ? 'title-error' : undefined}
                                />
                                {errors.title && <p id="title-error" className="mt-1 text-sm text-red-500">{errors.title}</p>}
                            </div>

                            {/* Price & Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    step="0.01"
                                    min="0"
                                    className={inputClass('price')}
                                    required
                                    disabled={loading}
                                    placeholder="0.00"
                                    aria-invalid={errors.price ? 'true' : 'false'}
                                    aria-describedby={errors.price ? 'price-error' : undefined}
                                />
                                {errors.price && <p id="price-error" className="mt-1 text-sm text-red-500">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={inputClass('category')}
                                    required
                                    disabled={loading}
                                    aria-invalid={errors.category ? 'true' : 'false'}
                                    aria-describedby={errors.category ? 'category-error' : undefined}
                                >
                                    <option value="">Select Category</option>
                                    <option value="smartphone">Smartphone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Wearables">Wearables</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Storage">Storage</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                                {errors.category && <p id="category-error" className="mt-1 text-sm text-red-500">{errors.category}</p>}
                            </div>

                            {/* Short Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Short Description *
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={inputClass('description')}
                                    required
                                    disabled={loading}
                                    placeholder="Brief product description"
                                    aria-invalid={errors.description ? 'true' : 'false'}
                                    aria-describedby={errors.description ? 'description-error' : undefined}
                                />
                                {errors.description && <p id="description-error" className="mt-1 text-sm text-red-500">{errors.description}</p>}
                            </div>

                            {/* Full Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Description
                                </label>
                                <textarea
                                    required
                                    name="fullDescription"
                                    value={formData.fullDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows="4"
                                    className={inputClass('fullDescription') + ' resize-none'}
                                    disabled={loading}
                                    placeholder="Detailed product description..."
                                    aria-invalid={errors.fullDescription ? 'true' : 'false'}
                                    aria-describedby={errors.fullDescription ? 'fullDescription-error' : undefined}
                                />
                                {errors.fullDescription && <p id="fullDescription-error" className="mt-1 text-sm text-red-500">{errors.fullDescription}</p>}
                            </div>

                            {/* Image URL & Priority */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    className={inputClass('image')}
                                    disabled={loading}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.image && <p id="image-error" className="mt-1 text-sm text-red-500">{errors.image}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    className={inputClass('priority')}
                                    disabled={loading}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="featured">Featured</option>
                                </select>
                                {errors.priority && <p id="priority-error" className="mt-1 text-sm text-red-500">{errors.priority}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Adding Product...
                                </div>
                            ) : (
                                'Add Product'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
