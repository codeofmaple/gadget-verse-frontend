"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
    {
        question: "What kind of gadgets do you sell?",
        answer:
            "We offer a curated selection of tech products including smart devices, accessories, and innovative gadgets for everyday use.",
    },
    {
        question: "Do you ship internationally?",
        answer:
            "Yes, we provide worldwide shipping. Shipping fees and delivery times vary depending on location.",
    },
    {
        question: "What is your return policy?",
        answer:
            "You can return products within 14 days of delivery. The product must be in original condition and packaging.",
    },
    {
        question: "Can I track my order?",
        answer:
            "Absolutely! Once your order is shipped, you will receive a tracking number via email to monitor delivery.",
    },
    {
        question: "Do you offer warranty on products?",
        answer:
            "Yes, most of our products come with a manufacturer warranty. Warranty details are provided on each product page.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 p-6 flex flex-col items-center">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
                <p className="text-gray-300 text-lg md:text-xl">
                    Find answers to common questions about GadgetVerse products, shipping, and policies.
                </p>
            </motion.div>

            {/* FAQ Accordion */}
            <div className="w-full max-w-4xl space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="bg-[#071026]/70 backdrop-blur-sm rounded-2xl shadow-lg border border-[#162033] cursor-pointer overflow-hidden"
                    >
                        <div
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between items-center px-6 py-4 hover:bg-[#0c1a36]/60 transition-colors"
                        >
                            <h3 className="text-white font-medium text-lg">{faq.question}</h3>
                            {openIndex === index ? (
                                <FiChevronUp className="text-gray-300 w-6 h-6" />
                            ) : (
                                <FiChevronDown className="text-gray-300 w-6 h-6" />
                            )}
                        </div>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-4 text-gray-300 text-sm"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
