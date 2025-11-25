'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {

    const featuredProduct = {
        name: "Razer Blade 15",
        description: "Experience professional gaming performance with the powerful and sleek Razer Blade 15.",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=450&fit=crop",
        slug: "razer-blade-15"
    };

    const productLink = `/products/${featuredProduct.slug}`;

    return (
        <section className="relative bg-linear-to-br from-blue-700 via-indigo-700 to-purple-800 text-white py-28 md:py-32 overflow-hidden">

            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            <div className="absolute -right-32 -top-20 w-96 h-96 rounded-full bg-white/10 blur-3xl opacity-50 transform rotate-12" aria-hidden />
            <div className="absolute -left-40 bottom-0 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl opacity-60" aria-hidden />

            {/* Main Content Container */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Copy & CTAs */}
                    <div className="lg:col-span-7 text-center lg:text-left">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
                            Unleash Your Potential with{' '}
                            <span className="bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                GadgetVerse
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                            The ultimate destination to discover, review, and buy the most cutting-edge tech gadgets and innovative electronics. Stay ahead of the curve.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            {/* Primary CTA Button */}
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-lg font-bold bg-white text-blue-700 shadow-2xl shadow-blue-500/50 transform transition duration-300 hover:scale-[1.03] hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 w-full sm:w-auto"
                            >
                                <Sparkles className="w-5 h-5 mr-3 fill-blue-500 text-blue-700" />
                                Explore Gadgets
                            </Link>

                            {/* Secondary CTA Button */}
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-lg font-medium border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition focus:outline-none focus:ring-4 focus:ring-white/20 w-full sm:w-auto"
                            >
                                Learn About Our Mission
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>

                        {/* Small feature badges */}
                        <div className="mt-12 flex flex-wrap gap-4 justify-center lg:justify-start">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-sm font-medium border border-white/20">
                                ⚡ Next-Gen Tech
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-sm font-medium border border-white/20">
                                📝 Curated Reviews
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-sm font-medium border border-white/20">
                                🔥 Exclusive Deals
                            </span>
                        </div>
                    </div>

                    {/* Right: Product Visual */}
                    <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end mt-12 lg:mt-0">
                        <div className="relative w-80 md:w-96 transform hover:scale-[1.01] transition-transform duration-500 cursor-pointer">
                            {/* Enhanced Glass Card */}
                            <div className="rounded-3xl p-6 bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl shadow-black/40 hover:shadow-white/20 transition-shadow duration-300">
                                <Link href={productLink} className="block">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-white/10 flex items-center justify-center">

                                            {/* Product image */}
                                            <Image
                                                src={featuredProduct.image}
                                                alt={featuredProduct.name}
                                                width={1600}
                                                height={900}
                                                className="object-cover w-full h-full"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="text-center w-full">
                                            <h3 className="text-xl font-bold mb-1">{featuredProduct.name}</h3>
                                            <p className="text-base text-white/80 max-w-sm mx-auto">{featuredProduct.description}</p>
                                            <span className="mt-4 inline-block text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition">
                                                View Details &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            {/* Soft glow under card */}
                            <div className="absolute inset-x-0 bottom-0 h-1/4 rounded-b-3xl bg-linear-to-t from-white/30 to-transparent blur-xl opacity-20" aria-hidden />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}