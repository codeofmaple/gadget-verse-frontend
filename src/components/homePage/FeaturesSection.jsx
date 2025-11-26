"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Clock, Cpu, Headphones, ShieldCheck } from "lucide-react";

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const defaultFeatures = [
    {
        title: "Verified Quality",
        description: "In-depth, hands-on testing and community feedback ensure every product meets high standards.",
        icon: <Zap size={22} />,
    },
    {
        title: "Smart Pricing",
        description: "Our proprietary deal tracker finds the best, most timely prices and discounts for you.",
        icon: <TrendingUp size={22} />,
    },
    {
        title: "Future-Proof Tech",
        description: "We focus on devices built to last, providing recommendations that stay relevant longer.",
        icon: <Clock size={22} />,
    },
];

export default function FeaturesSection({ features = defaultFeatures }) {
    return (
        <section
            className="relative "
            aria-labelledby="features-heading"
            style={{ overflow: "visible" }}
        >
            <div className="absolute inset-0  -z-10 [mask-image:radial-gradient(ellipse_at_top_right,transparent_40%,white)]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    id="features-heading"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-extrabold mb-4
                     bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent leading-tight text-center"
                >
                    Built on Trust. Driven by Tech.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center text-lg text-gray-500 max-w-2xl mx-auto mb-16"
                >
                    We’re more than a marketplace. We’re your trusted partner for high-quality, long-lasting gadgets.
                </motion.p>


                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 container px-4 mx-auto "
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            className="group p-6 sm:p-8 rounded-2xl  shadow-xl border border-gray-100 bg-white transition-all duration-300
                            hover:shadow-2xl hover:border-blue-300 hover:scale-[1.02]"
                            role="article"
                            aria-labelledby={`feature-title-${index}`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl 
                                    bg-gradient-to-br from-blue-600 to-indigo-700 
                                    flex items-center justify-center text-white text-3xl mb-4 sm:mb-6 shadow-xl shadow-blue-500/30 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105"
                                    aria-hidden
                                >
                                    {/* icon */}
                                    <span className="transform translate-y-px">{feature.icon}</span>
                                </div>

                                <h3
                                    id={`feature-title-${index}`}
                                    className="text-xl sm:text-2xl font-bold mb-3 text-gray-900"
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-base text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}