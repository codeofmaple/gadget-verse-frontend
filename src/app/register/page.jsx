"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                "https://gadget-verse-backend.vercel.app/api/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "Registration failed");
            }

            toast.success("Registration Successful");

            // auto sign-in
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error("Auto-login failed. Please sign in manually.");
                router.push("/login");
            } else {
                toast.success("Welcome!");
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            setLoading(true);
            toast.info("Redirecting to Google...");
            await signIn("google", { callbackUrl: "/" });
        } catch (err) {
            toast.error("Google sign-up failed");
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
                    {/* Accent glow */}
                    <div className="absolute -inset-0.5 rounded-2xl blur-xl opacity-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <div className="relative bg-[#071026]/80 border border-[#162033] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                        {/* header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-3 justify-center group">
                                <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 shadow-xl  transition-all duration-500 flex items-center justify-center">
                                    <span className="text-white font-black text-xl">G</span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0  transition-opacity duration-300 pointer-events-none" />
                                </div>

                                <div className="text-left">
                                    <h1 className="text-white text-2xl font-semibold">Create account</h1>
                                    <p className="text-sm text-gray-300">Start your GadgetVerse journey</p>
                                </div>
                            </div>
                        </div>

                        {/* error */}
                        {error && (
                            <div className="bg-red-600/10 border border-red-700/20 text-red-200 px-4 py-2 rounded-md mb-4">
                                {error}
                            </div>
                        )}

                        {/* form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* name */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Full name</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FiUser className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={loading}
                                        placeholder="Your full name"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    />
                                </div>
                            </div>

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
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={loading}
                                        placeholder="Create a strong password"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Password must be at least 6 characters</p>
                            </div>

                            {/* actions */}
                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-99 transition-transform"
                                >
                                    {loading ? (
                                        <>
                                            <FiLoader className="w-5 h-5 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>

                                <div className="text-center">
                                    <Link href="/login" className="text-sm text-indigo-300 hover:underline">
                                        Already have an account? Login
                                    </Link>
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
                                onClick={handleGoogleSignUp}
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-[#0b1320] border border-[#163047] flex items-center justify-center gap-3 text-gray-100 hover:bg-[#0e1726] transition"
                            >
                                <FcGoogle className="w-6 h-6" />
                                <span className="font-medium">Continue with Google</span>
                            </button>
                        </div>

                        {/* footer */}
                        <div className="mt-6 text-center text-gray-400 text-sm">
                            By creating an account you agree to our{" "}
                            <Link href="/terms" className="text-indigo-300 hover:underline">
                                Terms
                            </Link>
                            .
                        </div>
                    </div>
                </div>
            </motion.div >
        </div >
    );
}
