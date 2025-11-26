'use client';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-center p-6">
            <h1 className="text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
                Oops! Page not found.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
                Go Back Home
            </Link>
        </div>
    );
}
