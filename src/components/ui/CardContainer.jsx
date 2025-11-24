import React from "react";

export default function CardContainer({
    children,
    cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    gap = "gap-6",
    maxW = "max-w-7xl",
    className = "",
}) {
    return (
        <div className={`grid ${cols} ${gap} ${maxW} mx-auto ${className}`}>
            {children}
        </div>
    );
}
