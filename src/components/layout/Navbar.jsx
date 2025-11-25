'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Down icon
const ChevronDown = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

// user setting
const getUserInitials = (user) => {
    if (!user) return '';
    const displayString = user.name || user.email || '';
    const parts = displayString.trim().split(' ');

    if (parts.length > 1) {
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return displayString.charAt(0).toUpperCase();
};

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // ROUTES
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Shop All', href: '/products' },
        { name: 'About Us', href: '/about' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Support', href: '/contact' },
    ];

    // control scrooling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActiveRoute = (path) => {
        if (path === '/') return pathname === path;
        return pathname.startsWith(path);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            setIsMobileMenuOpen(false);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    if (loading) return null;

    const userInitials = user ? getUserInitials(user) : '';

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl py-1.5'
                : 'bg-white/70 backdrop-blur-lg border-b border-transparent py-2'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 shadow-xl group-hover:shadow-blue-600/50 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                            <span className="text-white font-black text-xl">G</span>
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                            GadgetVerse
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1 p-1 bg-gray-100/50 rounded-full shadow-inner border border-gray-200/50">
                        {navigation.map((item) => {
                            const active = isActiveRoute(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${active
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/70'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop User Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-right hidden xl:block">
                                            <p className="text-sm font-bold text-gray-800 leading-tight">{user.name || 'Account'}</p>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180 hidden xl:block" />
                                    </div>

                                    {/* User Circle */}
                                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                        {userInitials}
                                    </div>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-4 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-3 group-hover:translate-y-0 origin-top-right">
                                    <div className="p-4 bg-blue-50/50 border-b border-blue-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <Link href="/add-product" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group">
                                            <span className="mr-3 text-blue-400 group-hover:text-blue-600"></span> + Add Product
                                        </Link>
                                        <Link href="/manage-products" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group">
                                            <span className="mr-3 text-blue-400 group-hover:text-blue-600"></span> Manage Inventory
                                        </Link>
                                        <div className="h-px bg-gray-100 my-2" />
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            <span className="mr-3"></span> {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors
                                 py-2.5 px-3 rounded-full hover:bg-gray-50">
                                    Log In
                                </Link>
                                <Link href="/register" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all duration-300 shadow-xl shadow-blue-500/25 transform hover:scale-[1.02]">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActiveRoute(item.href) ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2 space-y-1">
                            {user ? (
                                <>
                                    <div className="px-4 py-2 mb-1 bg-blue-50/50 rounded-lg">
                                        <p className="font-bold text-gray-900">{user.name || 'Account'}</p>
                                        <p className="text-xs text-blue-600">{user.email}</p>
                                    </div>
                                    <Link href="/add-product" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">+ Add Product</Link>
                                    <Link href="/manage-products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"> Manage Products</Link>
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                                    >
                                        {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Log In</Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/30 hover:bg-blue-700">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}