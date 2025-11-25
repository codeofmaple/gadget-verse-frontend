"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (!res?.error) {
                toast.success("Signed in successfully");
                router.push("/");
            } else {
                toast.error("Invalid credentials");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            toast.info("Redirecting to Google...");
            await signIn("google", { callbackUrl: "/" });
        } catch (err) {
            toast.error("Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md"
            >
                <div className="relative">
                    <div className="absolute -inset-0.5 rounded-2xl blur-xl opacity-30 
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <div className="relative bg-[#071026]/90 border border-[#162033] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-3 justify-center">

                                <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 shadow-xl group-hover:shadow-blue-600/50 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                                    <span className="text-white font-black text-xl">G</span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>

                                <div className="text-left">
                                    <h1 className="text-white text-2xl font-semibold">Welcome back</h1>
                                    <p className="text-sm text-gray-300">Sign in to continue to GadgetVerse</p>
                                </div>
                            </div>
                        </div>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* email */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Email</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FiMail className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        placeholder="you@company.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            {/* password */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FiLock className="w-5 h-5" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        placeholder="Your secure password"
                                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* actions */}
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-99 transition-transform"
                                >
                                    {loading ? (
                                        <>
                                            <FiLoader className="w-5 h-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign in'
                                    )}
                                </button>

                                <div className="text-center">
                                    <Link href="/forgot" className="text-sm text-indigo-300 hover:underline">Forgot password?</Link>
                                </div>
                            </div>
                        </form>

                        {/* divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow h-px bg-[#123045]" />
                            <span className="px-3 text-sm text-gray-400">Or continue with</span>
                            <div className="flex-grow h-px bg-[#123045]" />
                        </div>

                        {/* google */}
                        <div>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-[#0b1320] border border-[#163047] flex items-center justify-center gap-3 text-gray-100 hover:bg-[#0e1726] transition"
                            >
                                <FcGoogle className="w-6 h-6" />
                                <span className="font-medium">Continue with Google</span>
                            </button>
                        </div>

                        {/* footer */}
                        <div className="mt-6 text-center text-gray-400 text-sm">
                            Don’t have an account?{' '}
                            <Link href="/register" className="text-indigo-300 font-medium hover:underline">Create one</Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
