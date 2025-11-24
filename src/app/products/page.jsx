"use client";

import { useState, useEffect } from "react";
import CardContainer from "@/components/ui/CardContainer";
import ProductCard from "@/components/cards/ProductCard";
import Link from "next/link";
import Button from "@/components/ui/Button";

async function getProductsAPI(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.category && filters.category !== "all") params.append("category", filters.category);
        if (filters.search) params.append("search", filters.search);

        const url = `https://gadget-verse-backend.vercel.app/api/products${params.toString() ? `?${params.toString()}` : ""}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getProductsAPI({ category, search });
                if (!mounted) return;
                setProducts(data);
            } catch {
                setError("Failed to load products");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const id = setTimeout(fetchProducts, 250);
        return () => {
            mounted = false;
            clearTimeout(id);
        };
    }, [category, search]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        All Products
                    </h1>
                    <p className="text-gray-600 text-lg">Discover our collection of tech innovations</p>
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full md:w-56 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition"
                        >
                            {["all", "smartphone", "laptop", "tablet", "Audio", "Wearables", "Gaming", "Storage", "Video", "Accessories"].map((c) => (
                                <option value={c} key={c}>
                                    {c === "all" ? "All Categories" : c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-center">
                        ⚠️ {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl p-6 h-72" />
                        ))}
                    </div>
                ) : (
                    <>
                        (
                        <>
                            <div className="mb-4 text-gray-600">
                                Showing {products.length} product{products.length !== 1 ? "s" : ""}
                                {search && ` for "${search}"`}
                                {category !== "all" && ` in ${category}`}
                            </div>

                            <CardContainer cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" gap="gap-6">
                                {products.map((p) => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </CardContainer>
                        </>
                        )
                    </>
                )}
            </div>
        </div>
    );
}
