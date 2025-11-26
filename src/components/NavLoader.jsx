'use client';

import { useEffect, useState } from "react";
import Router from "next/router";
import Spinner from "./ui/Spinner";

export default function NavLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => setLoading(true);
        const end = () => setLoading(false);

        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);

        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 z-9999 flex items-center justify-center
            bg-black/30 backdrop-blur-sm transition-opacity duration-300
            ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div className="p-4 bg-white rounded-2xl shadow-xl">
                <Spinner size={48} />
            </div>
        </div>
    );
}
