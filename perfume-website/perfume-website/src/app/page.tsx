'use client';
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaMoon, FaSun } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: "Rose Elegance",
    price: "460 egp",
    image: "/images/perfume1.jpg",
    description: "A romantic blend of rose and jasmine for timeless elegance.",
    size: "100ml",
    notes: "Rose, Jasmine, Vanilla",
  },
  {
    id: 2,
    name: "Citrus Bloom",
    price: "380 egp",
    image: "/images/perfume2.jpg",
    description: "Fresh citrus notes with a hint of floral sweetness.",
    size: "50ml",
    notes: "Lemon, Bergamot, Orange Blossom",
  },
  {
    id: 3,
    name: "Midnight Oud",
    price: "520 egp",
    image: "/images/perfume3.jpg",
    description: "Deep oud and amber for a rich, royal experience.",
    size: "75ml",
    notes: "Oud, Amber, Sandalwood",
  },
  {
    id: 4,
    name: "Ultra Male",
    price: "540 egp",
    image: "/images/perfume4.jpg",
    description: "Deep oud and amber for a rich, royal experience.",
    size: "100ml",
    notes: "Oud, Amber, Sandalwood",
  },
  {
    id: 5,
    name: "blue de chanel",
    price: "670 egp",
    image: "/images/perfume5.jpg",
    description: "Deep oud and amber for a rich, royal experience.",
    size: "100ml",
    notes: "Oud, Amber, Sandalwood",
  },
  {
    id: 6,
    name: "Amber Night",
    price: "420 egp",
    image: "/images/perfume6.jpg",
    description: "Warm amber and musk for a mysterious evening.",
    size: "100ml",
    notes: "Amber, Musk, Patchouli",
  },
  {
    id: 7,
    name: "Jasmine Dream",
    price: "390 egp",
    image: "/images/perfume7.jpg",
    description: "Soft jasmine and white florals for a dreamy aura.",
    size: "75ml",
    notes: "Jasmine, White Flowers, Musk",
  },
  {
    id: 8,
    name: "Spice Route",
    price: "510 egp",
    image: "/images/perfume8.jpg",
    description: "Exotic spices and woods for a bold statement.",
    size: "100ml",
    notes: "Cinnamon, Clove, Cedarwood",
  },
  {
    id: 9,
    name: "Vanilla Sky",
    price: "370 egp",
    image: "/images/perfume9.jpg",
    description: "Sweet vanilla and caramel for a cozy embrace.",
    size: "50ml",
    notes: "Vanilla, Caramel, Tonka Bean",
  },
  {
    id: 10,
    name: "Fresh Aqua",
    price: "430 egp",
    image: "/images/perfume10.jpg",
    description: "Aquatic notes and citrus for a refreshing splash.",
    size: "100ml",
    notes: "Sea Breeze, Lemon, Mint",
  },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const filteredProducts = products.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         p.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setDarkMode((d) => !d)}
        className={`fixed bottom-8 left-8 z-50 p-2 rounded-full shadow transition ${darkMode ? 'bg-[#2d2a26] hover:bg-[#3a2c1a]' : 'bg-[#ede7dd] hover:bg-[#b3a58c]'}`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun size={24} color="#facc15" /> : <FaMoon size={24} color="#3a2c1a" />}
      </button>
      <main className={darkMode ? 'bg-[#23211c] text-[#ede7dd]' : 'bg-[#f5f5f5] text-[#2d2a26]'}>
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center py-24 bg-gradient-to-b from-[#f5f5f5] to-[#ede7dd]">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#3a2c1a] animate-slide-up text-center">
            Discover Your Signature Scent
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-[#5a4b3c] animate-slide-up animation-delay-200 text-center">
            Experience luxury fragrances crafted with the finest ingredients
          </p>
          {/* Hero Video Ad */}
          <div className="w-full max-w-2xl mb-8 rounded-lg overflow-hidden shadow-lg animate-fade-in">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 object-cover animate-ken-burns"
            >
              <source src="/videos/perfume-video.mp4" type="video/mp4" />
            </video>
          </div>
          <button
            onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-8 py-4 bg-[#3a2c1a] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#5a4b3c] transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slide-up animation-delay-400"
          >
            Shop Now
          </button>
        </section>

        {/* Products Section */}
        <section id="products" ref={productsRef} className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-[#3a2c1a] mb-4">Our Collection</h2>
            <p className="text-lg text-[#5a4b3c] max-w-2xl mx-auto">
              Discover our premium collection of fragrances, crafted with the finest ingredients
              to create your perfect signature scent.
            </p>
          </div>
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by name or notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-[#b3a58c] rounded-full focus:outline-none focus:ring-2 focus:ring-[#3a2c1a]"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-[#7a6c5d]">No products found.</div>
            ) : (
              filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="bg-[#ede7dd] rounded-lg shadow-lg overflow-hidden p-4 sm:p-8 flex flex-col items-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-40 sm:h-72 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 sm:p-6 w-full flex flex-col items-center">
                    <h3 className="text-base sm:text-xl font-semibold text-[#3a2c1a] mb-2 text-center">{product.name}</h3>
                    <p className="text-[#7a6c5d] mb-2 hidden sm:block text-center">{product.description}</p>
                    <p className="text-base sm:text-lg font-bold text-[#5a4b3c] mb-2 text-center">{product.price}</p>
                    <Link 
                      href={`/product/${product.id}`}
                      className="block w-full text-center py-2 bg-[#3a2c1a] text-white rounded-full hover:bg-[#5a4b3c] transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="bg-[#f5f5f5] py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#3a2c1a] mb-6">What Our Customers Say</h2>
            <div className="flex flex-col gap-8">
              <blockquote className="bg-white rounded-lg shadow p-6 text-[#5a4b3c] italic">“Faaaaagerrrr.”<br/><span className="block mt-2 font-bold text-[#3a2c1a]">— Sarah M.</span></blockquote>
              <blockquote className="bg-white rounded-lg shadow p-6 text-[#5a4b3c] italic">“Gamedd neeeeeozlanda!”<br/><span className="block mt-2 font-bold text-[#3a2c1a]">— Ahmed R.</span></blockquote>
              <blockquote className="bg-white rounded-lg shadow p-6 text-[#5a4b3c] italic">“Msh momkeeeeen!!!”<br/><span className="block mt-2 font-bold text-[#3a2c1a]">— Omar K.</span></blockquote>
            </div>
          </div>
        </section>
        {/* Back to Top Button */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-[#3a2c1a] text-white p-4 rounded-full shadow-lg hover:bg-[#5a4b3c] transition-all duration-300 z-50"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </main>
      <footer className="w-full text-center py-4 text-[#7a6c5d] text-sm bg-[#f5f5f5] border-t border-[#ede7dd] flex flex-col items-center gap-2 dark:bg-[#23211c] dark:text-[#ede7dd] dark:border-[#3a2c1a]">
        <div className="flex justify-center gap-4 mb-1">
          <a href="https://www.instagram.com/am.scents_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition"><FaInstagram size={24} /></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition"><FaFacebook size={24} /></a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-500 transition"><FaWhatsapp size={24} /></a>
        </div>
        <span>Created by Andrew R.</span>
      </footer>
    </>
  );
} 