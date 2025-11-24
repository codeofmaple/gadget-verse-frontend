"use client";

import React from "react";

export default function Card({
    as: Component = "div",
    className = "",
    children,
    role = "group",
    ...props
}) {
    return (
        <Component
            role={role}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm transition-transform duration-300
                  hover:shadow-2xl focus-within:shadow-2xl transform hover:-translate-y-1 focus:outline-none ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}
