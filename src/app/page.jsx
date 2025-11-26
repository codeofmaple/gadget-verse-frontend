import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/homePage/HeroSection';
import FeaturesSection from '@/components/homePage/FeaturesSection';
import ProductCard from "@/components/cards/ProductCard";
import CardContainer from "@/components/ui/CardContainer";

const API_URL = 'https://gadget-verse-backend.vercel.app';

async function getRecentProducts() {
    try {
        const res = await fetch(`${API_URL}/api/products/recent`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch recent products: Status ${res.status}`);
            throw new Error('Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching recent products:', error);
        return [];
    }
}

const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-16 max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent leading-tight">
            {title}
        </h2>
        {subtitle && <p className="text-gray-500 text-lg md:text-xl">{subtitle}</p>}
    </div>
);

export default async function HomePage() {
    const featuredProducts = await getRecentProducts();

    return (
        <div className="bg-gray-50/50 overflow-hidden space-y-20">

            <title>Home | GadgetVerse</title>

            {/* 1. HERO */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply" />
                </div>
                <HeroSection />
            </div>

            {/* 2. LOGO CLOUD */}
            <div className=" backdrop-blur-sm pt-5">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Trusted by tech lovers everywhere</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Sony', 'Apple', 'Samsung', 'Logitech', 'Asus'].map(brand => (
                            <span key={brand} className="text-xl md:text-2xl font-black font-serif">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. HOT PRODUCTS */}
            <section className="container mx-auto px-4">
                <SectionHeader
                    title="Trending Now"
                    subtitle="Our latest arrivals and top-selling gadgets selected just for you."
                />

                {featuredProducts.length > 0 ? (
                    <CardContainer cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" gap="gap-8">
                        {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
                    </CardContainer>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No products found. Add some from the dashboard!</p>
                    </div>
                )}

                <div className="text-center mt-16">
                    <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:shadow-xl hover:-translate-y-1">
                        View All Products
                    </Link>
                </div>
            </section>

            {/* 4. FEATURES */}
            <section className=" bg-white relative">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <FeaturesSection />
            </section>

            {/* 5. STATS */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        {[
                            { val: "2k+", label: "Products" },
                            { val: "500+", label: "Happy Clients" },
                            { val: "24/7", label: "Support" },
                            { val: "99%", label: "Satisfaction" },
                        ].map((s, i) => (
                            <div key={i} className="p-4">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">{s.val}</div>
                                <div className="text-gray-400 text-sm tracking-wider uppercase">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CTA BANNER */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-[2.5rem] overflow-hidden 
                    bg-gradient-to-r from-blue-600 to-purple-700 
                    px-6 py-16 md:px-16 md:py-24 text-center shadow-2xl">

                        {/* circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
                            Ready to upgrade your setup?
                        </h2>
                        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
                            Join thousands of tech enthusiasts who trust GadgetVerse for their daily drivers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Link href="/products" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Start Shopping
                            </Link>
                            <Link href="/register" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}