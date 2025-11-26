"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 p-6 flex flex-col items-center">

            <title>About | GadgetVerse</title>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                    About GadgetVerse
                </h1>
                <p className="text-gray-300 text-lg md:text-xl">
                    At GadgetVerse, we bring the latest tech and gadget products right to your fingertips.
                    Our mission is to provide innovative, high-quality products for tech enthusiasts and everyday users alike.
                </p>
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-[#071026]/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#162033] hover:scale-105 transition-transform"
                >
                    <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
                    <p className="text-gray-300">
                        To provide top-notch gadgets and tech products that enhance your lifestyle, combining
                        innovation with reliability and excellent customer experience.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#071026]/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#162033] hover:scale-105 transition-transform"
                >
                    <h2 className="text-xl font-semibold text-white mb-3">Our Vision</h2>
                    <p className="text-gray-300">
                        To become the go-to destination for tech lovers, delivering innovative gadgets and
                        exceptional service, while staying at the forefront of technology trends.
                    </p>
                </motion.div>
            </div>

            {/* Why Choose Us */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-4xl w-full text-center"
            >
                <h2 className="text-3xl font-bold text-white mb-6">Why Choose GadgetVerse?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[#071026]/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-[#162033] hover:scale-105 transition-transform">
                        <h3 className="text-xl font-semibold text-white mb-2">Premium Products</h3>
                        <p className="text-gray-300 text-sm">
                            Carefully curated tech and gadgets with top quality standards.
                        </p>
                    </div>
                    <div className="bg-[#071026]/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-[#162033] hover:scale-105 transition-transform">
                        <h3 className="text-xl font-semibold text-white mb-2">Trusted Service</h3>
                        <p className="text-gray-300 text-sm">
                            Reliable support and a seamless shopping experience for all customers.
                        </p>
                    </div>
                    <div className="bg-[#071026]/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-[#162033] hover:scale-105 transition-transform">
                        <h3 className="text-xl font-semibold text-white mb-2">Innovative Tech</h3>
                        <p className="text-gray-300 text-sm">
                            Always updating our catalog with the latest tech and gadget trends.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
