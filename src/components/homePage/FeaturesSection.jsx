"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Headphones, ShieldCheck } from "lucide-react";

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
        title: "Honest Reviews",
        description: "In-depth, hands-on testing so you know what performs in the real world.",
        icon: <Headphones size={22} />,
    },
    {
        title: "Curated Deals",
        description: "Hand-picked offers that save you time and money without the filler.",
        icon: <Cpu size={22} />,
    },
    {
        title: "Trusted Recommendations",
        description: "Expert picks backed by data and real usage insights.",
        icon: <ShieldCheck size={22} />,
    },
];

export default function FeaturesSection({ features = defaultFeatures }) {
    return (
        <section
            className="relative"
            aria-labelledby="features-heading"
            style={{ overflow: "visible" }}
        >

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    id="features-heading"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-center mb-16 leading-tight
                     bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent z-20 relative"
                >
                    Why Choose GadgetVerse?
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 container px-4 mx-auto"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            className="group p-6 sm:p-8 rounded-2xl bg-white/60 shadow-md backdrop-blur-sm border border-white/60
                         hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                            role="article"
                            aria-labelledby={`feature-title-${index}`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500
                             flex items-center justify-center text-white text-2xl mb-4 sm:mb-5 shadow-lg"
                                    aria-hidden
                                >
                                    {/* icon */}
                                    <span className="transform translate-y-px">{feature.icon}</span>
                                </div>

                                <h3
                                    id={`feature-title-${index}`}
                                    className="text-lg sm:text-xl font-semibold mb-2 text-gray-800"
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
