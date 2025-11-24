import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 sm:py-28 overflow-hidden">
            {/* subtle dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {/* decorative blurred shapes */}
            <div className="absolute -right-32 -top-20 w-96 h-96 rounded-full bg-white/10 blur-3xl opacity-60 transform rotate-12" aria-hidden />
            <div className="absolute -left-40 bottom-8 w-80 h-80 rounded-full bg-purple-400/10 blur-2xl opacity-50" aria-hidden />

            <div className="container mx-auto px-4 relative z-10">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left: copy */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                GadgetVerse
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-2xl">
                            Discover the latest tech gadgets and innovative electronics that will transform your digital lifestyle.
                            Curated reviews, real-world testing, and hand-picked deals — all in one place.
                        </p>

                        <div className="flex flex-col lg:flex-row items-center lg:justify-start gap-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold bg-white text-blue-600 shadow-xl transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
                            >
                                🚀 Explore Products
                            </Link>


                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium border border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition focus:outline-none focus:ring-4 focus:ring-white/20"
                            >
                                Learn More
                            </Link>

                        </div>

                        {/* small feature badges */}
                        <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm">
                                <strong className="font-semibold">New:</strong>
                                Daily gadget picks
                            </span>

                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm">
                                Honest reviews
                            </span>

                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm">
                                Curated deals
                            </span>
                        </div>
                    </div>

                    {/* Right: productl */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative hidden lg:block w-64 sm:w-72 md:w-80 lg:w-96">
                            {/* glass card */}
                            <div className="rounded-3xl p-6 bg-white/6 backdrop-blur-sm border border-white/6 shadow-2xl">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="size-64 rounded-2xl bg-gradient-to-br from-white/10 to-white/6 flex items-center justify-center">
                                        <Image
                                            src={`https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=450&fit=crop`}
                                            alt="img"
                                            width={800}
                                            height={450}
                                            className=" object-cover aspect-square rounded-sm"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold">Featured: PlayStation 5</h3>
                                        <p className="text-sm text-white/70">Ultra-High-Speed SSD · DualSense Wireless Controller Immersion · Powerful Graphics and 3D Audio</p>
                                    </div>
                                </div>
                            </div>

                            {/* soft glow under card */}
                            <div className="absolute left-4 right-4 -bottom-6 h-6 rounded-md bg-gradient-to-r from-purple-400/30 to-blue-400/20 blur-lg opacity-60" aria-hidden />
                        </div>
                    </div>
                </div>
            </div>

            {/* subtle animated wave at the bottom */}
            <svg
                className="absolute left-0 right-0 bottom-0 w-full"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                aria-hidden
            >
                <path fill="rgba(255,255,255,0.03)" d="M0,80 C240,120 360,40 720,60 C1080,80 1200,20 1440,60 L1440 120 L0 120 Z" />
            </svg>
        </section>
    );
}
