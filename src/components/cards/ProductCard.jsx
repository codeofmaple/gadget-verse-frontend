"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";

export default function ProductCard({ product }) {
    const { _id, title, shortDesc, description, price, image, category, priority, date } = product || {};

    return (
        <Card className="flex flex-col overflow-hidden">
            {/* Image */}
            <div className="relative w-full aspect-[16/10] bg-gray-50">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={false}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow">
                            <span className="text-white">📦</span>
                        </div>
                    </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                    {priority === "featured" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-100">
                            ⭐ Featured
                        </span>
                    )}
                    {category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {category}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">{title}</h3>

                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{shortDesc || description}</p>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="text-lg font-bold text-gray-900">${price ?? "—"}</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/products/${_id}`}
                            className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow hover:scale-105 transition-transform"
                            aria-label={`View details for ${title}`}
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}
