import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">GadgetVerse</h3>
                        <p className="text-gray-400">
                            Your one-stop destination for the latest tech gadgets and electronics.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Smartphones</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Laptops</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tablets</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: support@gadgetverse.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Tech Street, Digital City</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; 2024 GadgetVerse. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}