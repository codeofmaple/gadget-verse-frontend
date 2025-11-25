'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Social Icon component
const SocialIcon = ({ Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white transition-all duration-300 shadow-md"
        aria-label={`Link to our ${Icon.name.replace('Fa', '')} page`}
    >
        <Icon size={16} />
    </a>
);

// Footer Link component
const FooterLink = ({ href, children }) => (
    <li className="group">
        <Link
            href={href}
            className="text-gray-400 text-sm hover:text-white transition-colors duration-200 relative inline-block before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-blue-500 before:transition-all before:duration-300 group-hover:before:w-full"
        >
            {children}
        </Link>
    </li>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0b1b46] border-t border-blue-900/50 text-gray-400 pt-16 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-8 lg:gap-12">

                    {/* 1. Logo, Description & Socials */}
                    <div className="col-span-2 md:col-span-2">

                        <Link href="/" className="flex items-center space-x-2 group mb-4">
                            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 shadow-xl group-hover:shadow-blue-600/50 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
                                <span className="text-white font-black text-xl">G</span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white">GadgetVerse</span>
                        </Link>

                        <p className="text-gray-400 text-sm mb-6 max-w-sm">
                            Your one-stop destination for the latest tech gadgets. We deliver innovation, quality, and style in every product.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <SocialIcon Icon={FaFacebookF} href="https://facebook.com" />
                            <SocialIcon Icon={FaTwitter} href="https://twitter.com" />
                            <SocialIcon Icon={FaInstagram} href="https://instagram.com" />
                            <SocialIcon Icon={FaLinkedinIn} href="https://linkedin.com" />
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b-2 border-blue-600/50 w-fit pb-1">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/products">Shop All</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/faq">FAQ</FooterLink>
                            <FooterLink href="/contact">Support</FooterLink>
                        </ul>
                    </div>

                    {/* 3. Shop By Categories */}
                    <div className="col-span-1">
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b-2 border-blue-600/50 w-fit pb-1">
                            Shop By
                        </h4>
                        <ul className="space-y-3">
                            <FooterLink href="#">Smartphones</FooterLink>
                            <FooterLink href="#">Laptops</FooterLink>
                            <FooterLink href="#">Wearables</FooterLink>
                            <FooterLink href="#">Accessories</FooterLink>
                            <FooterLink href="#">Terms & Conditions</FooterLink>
                        </ul>
                    </div>

                    {/* 4. Contact Info */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-b-2 border-blue-600/50 w-fit pb-1">
                            Reach Us
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 shrink-0" size={16} />
                                <span>123 Tech Street, Digital City, CA 90210</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="text-blue-500 mr-3 shrink-0" size={16} />
                                <a href="tel:+1234567890" className='hover:text-white transition-colors duration-200'>+1 234 567 890</a>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="text-blue-500 mr-3 shrink-0" size={16} />
                                <a href="mailto:support@gadgetverse.com" className='hover:text-white transition-colors duration-200'>support@gadgetverse.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 pt-6 border-t border-gray-800/80">
                    <div className="md:flex justify-between items-center text-center">
                        <p className="text-sm text-gray-500 order-2 md:order-1 mb-3 md:mb-0">
                            &copy; {currentYear} GadgetVerse. All Rights Reserved.
                        </p>
                        <div className="flex justify-center space-x-4 text-xs order-1 md:order-2">
                            <FooterLink href="/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/sitemap">Sitemap</FooterLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
