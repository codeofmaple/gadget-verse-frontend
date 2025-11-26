"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

export default function SupportPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("https://gadget-verse-backend.vercel.app/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) throw new Error("Failed to send message");

            toast.success("Message sent! Our support team will contact you soon.");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-800 p-6 flex flex-col items-center">

            <title>Support | GadgetVerse</title>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Support</h1>
                <p className="text-gray-300 text-lg md:text-xl">
                    Need help? Our support team is here to assist you. Fill out the form or reach us directly.
                </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-[#071026]/70 backdrop-blur-sm rounded-2xl shadow-lg border border-[#162033] p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiSend className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiMail className="w-5 h-5" />
                        </span>
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={loading}
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl bg-[#061426] border border-[#123045] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.01] active:scale-99 transition-transform"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 w-full max-w-2xl text-center space-y-3"
            >
                <p className="text-gray-300 text-sm">
                    You can also reach us directly via:
                </p>
                <p className="text-gray-300 flex items-center justify-center gap-2">
                    <FiMail /> support@gadgetverse.com
                </p>
                <p className="text-gray-300 flex items-center justify-center gap-2">
                    <FiPhone /> +1 234 567 890
                </p>
            </motion.div>
        </div>
    );
}
