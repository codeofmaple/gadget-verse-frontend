'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCredentialsLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signIn('google', { callbackUrl: '/' });
        } catch (error) {
            setError('Google sign-in failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={loading}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login with Email'}
                </Button>
            </form>

            <div className="my-6 text-center">
                <div className="border-t border-gray-300 relative">
                    <span className="bg-white px-3 absolute -top-3 left-1/2 transform -translate-x-1/2 text-gray-500">
                        OR
                    </span>
                </div>
            </div>

            <Button
                onClick={handleGoogleLogin}
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={loading}
            >
                Login with Google
            </Button>

            <p className="text-center mt-4 text-sm text-gray-600">
                Dont have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
}