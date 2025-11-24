import Link from 'next/link';
import Button from '../components/ui/Button';
import Image from 'next/image';
import HeroSection from '@/components/homePage/HeroSection';
import FeaturesSection from '@/components/homePage/FeaturesSection';
import ProductCard from "@/components/cards/ProductCard";
import CardContainer from "@/components/ui/CardContainer";

// API function to fetch recent products
async function getRecentProducts() {
    try {
        const res = await fetch('https://gadget-verse-backend.vercel.app/api/products/recent', {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching recent products:', error);
        return [];
    }
}

// Feature Card Component
function FeatureCard({ icon, title, description, gradient }) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-blue-200 hover:scale-105 group">
            <div className={`w-20 h-20 ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="text-3xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-center leading-relaxed">{description}</p>
        </div>
    );
}

// Testimonial Card Component
function TestimonialCard({ name, role, content, avatar, color }) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-blue-200 group">
            <div className="flex items-center mb-6">
                <div className={`size-14 ${color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{avatar}</span>
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-lg">{name}</p>
                    <p className="text-gray-500 text-sm">{role}</p>
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg italic">{content}</p>
        </div>
    );
}

export default async function HomePage() {
    const featuredProducts = await getRecentProducts();

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Tech Enthusiast",
            content: "Amazing selection of gadgets! Fast shipping and great customer service. Highly recommended!",
            avatar: "⭐",
            color: "bg-gradient-to-br from-blue-100 to-blue-200"
        },
        {
            name: "Mike Chen",
            role: "Gaming Expert",
            content: "Best prices I've found online. The product quality exceeded my expectations. Will definitely shop here again!",
            avatar: "🎮",
            color: "bg-gradient-to-br from-green-100 to-green-200"
        },
        {
            name: "Emma Davis",
            role: "Student",
            content: "Great customer support and fast delivery. Found exactly what I was looking for at an affordable price!",
            avatar: "📚",
            color: "bg-gradient-to-br from-purple-100 to-purple-200"
        }
    ];

    return (
        <div className=' space-y-20'>
            {/* Hero Section */}
            <HeroSection></HeroSection>

            {/* Feature Section */}
            <FeaturesSection></FeaturesSection>

            {/* HOt Products Section */}
            <section className=" bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-extrabold text-center mb-16 
                    bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text 
                    text-transparent
                     sm:text-4xl md:text-5xl lg:text-5xl leading-tight
                    ">
                        🔥 Hot Products
                    </h2>

                    <>
                        {/* Hot Products */}
                        <CardContainer cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" gap="gap-8" maxW="container mx-auto px-4">
                            {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
                        </CardContainer>


                        <div className="text-center mt-12">
                            <Link href="/products">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white
                                     hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-102 
                                      transition-all transition-transform duration-300"
                                >
                                    View All Products
                                </Button>
                            </Link>
                        </div>
                    </>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-gradient-to-br py-20 from-blue-50 to-purple-50 relative">
                <div className="container mx-auto px-4">

                    {/* Title */}
                    <h2
                        className="
                text-3xl font-extrabold text-center mb-16
                bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text
                text-transparent
                sm:text-4xl md:text-5xl lg:text-5xl leading-tight
            "
                    >
                        Why Shop With Us?
                    </h2>

                    {/* Stats Grid */}
                    <div
                        className="
                grid grid-cols-2 md:grid-cols-4 
                gap-10 max-w-4xl mx-auto
            "
                    >
                        {[
                            { value: `${featuredProducts.length}+`, label: "Products" },
                            { value: `${new Set(featuredProducts.map(p => p.category)).size}+`, label: "Categories" },
                            { value: `$${Math.min(...featuredProducts.map(p => p.price))}`, label: "Starting From" },
                            { value: "24/7", label: "Support" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div
                                    className="
                            text-5xl font-extrabold mb-3
                            bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                            group-hover:scale-110 transition-transform duration-300
                        "
                                >
                                    {stat.value}
                                </div>

                                <div className="text-gray-700 font-medium text-lg tracking-wide">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


            {/* Testimonials Section */}
            <section className="bg-white relative">
                <div className="container mx-auto px-4">

                    {/* Title */}
                    <h2
                        className="
                text-3xl font-extrabold text-center mb-16 
                bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text 
                text-transparent
                sm:text-4xl md:text-5xl lg:text-5xl leading-tight
            "
                    >
                        What Our Customers Say
                    </h2>

                    {/* Testimonials Grid */}
                    <div
                        className="
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                gap-8
            "
                    >
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>

                </div>
            </section>


            {/* CTA Banner */}
            <section className="bg-gradient-to-r py-20 from-blue-600 via-purple-600 to-blue-800 text-white relative">
                <div className="container mx-auto px-4 text-center">

                    {/* Title */}
                    <h2
                        className="
                text-3xl font-extrabold text-center mb-6
                bg-gradient-to-r from-white to-gray-200 bg-clip-text
                text-transparent
                sm:text-4xl md:text-5xl lg:text-5xl leading-tight
            "
                    >
                        Ready to Explore?
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/90">
                        Join {featuredProducts.length * 50}+ satisfied customers and discover amazing tech today.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                        <Link href="/products">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="
                        bg-white text-blue-700
                        shadow-xl
                        transform hover:scale-102
                        transition-all transition-transform
                        font-semibold
                    "
                            >
                                🛍️ Browse Products
                            </Button>
                        </Link>

                        <Link href="/register">
                            <Button
                                variant="primary"
                                size="lg"
                                className="
                        border border-white/70
                        text-white hover:scale-102 transition-transform
                        hover:bg-white/10
                        backdrop-blur-sm
                        font-semibold
                    "
                            >
                                ✨ Create Account
                            </Button>
                        </Link>

                    </div>
                </div>
            </section>

        </div>
    );
}