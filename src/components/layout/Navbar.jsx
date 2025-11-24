'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActiveRoute = (path) => {
        if (path === '/') return pathname === path;
        return pathname.startsWith(path);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            // Close mobile menu if open
            setIsMobileMenuOpen(false);
            // Redirect to home page after logout
            router.push('/');
            router.refresh(); // Refresh to update the session state
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    if (loading) {
        return (
            <nav className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-white/20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">GV</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                GadgetVerse
                            </span>
                        </div>
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-white/20 transition-all duration-300 hover:bg-white/90">
            <div className="container mx-auto px-4">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-between items-center py-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <span className="text-white font-bold">GV</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            GadgetVerse
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActiveRoute(item.href)
                                    ? 'text-blue-600 bg-blue-50 shadow-inner'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-3">
                        {user ? (
                            <div className="relative group">
                                <button
                                    className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 hover:border-blue-300 transition-all duration-200"
                                    disabled={isLoggingOut}
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-gray-700 font-medium">{user.name}</span>
                                    <span className={`text-gray-400 transition-transform group-hover:rotate-180 ${isLoggingOut ? 'opacity-50' : ''}`}>
                                        {isLoggingOut ? '⋯' : '▼'}
                                    </span>
                                </button>

                                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-white/30">
                                    <div className="px-4 py-2 border-b border-white/20">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/add-product"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        Add Product
                                    </Link>
                                    <Link
                                        href="/manage-products"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        Manage Products
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className={`flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-white/20 mt-2 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <div className="flex justify-between items-center py-3">
                        {/* Mobile Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">GV</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                GadgetVerse
                            </span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 transition-colors"
                        >
                            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                                <span className={`block h-0.5 w-5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                <span className={`block h-0.5 w-5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block h-0.5 w-5 bg-gray-600 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="absolute left-0 right-0 top-full bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-xl rounded-b-2xl mx-4 overflow-hidden">
                            {/* Navigation Links */}
                            <div className="py-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-6 py-3 font-medium transition-all duration-200 ${isActiveRoute(item.href)
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-white/70'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* User Section */}
                            <div className="border-t border-white/20 py-2">
                                {user ? (
                                    <div className="space-y-1 px-6">
                                        <div className="flex items-center space-x-3 py-3 border-b border-white/20">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/add-product"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-3 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            Add Product
                                        </Link>
                                        <Link
                                            href="/manage-products"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-3 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            Manage Products
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className={`block w-full py-3 text-red-600 hover:text-red-700 transition-colors border-t border-white/20 text-left ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2 px-6 py-2">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-center py-3 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-center py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}