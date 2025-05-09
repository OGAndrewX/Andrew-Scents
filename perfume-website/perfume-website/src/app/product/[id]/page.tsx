'use client';
import React from "react";
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 1,
    name: "Rose Elegance",
    price: "46s0 egp",
    image: "/images/perfume1.jpg",
    description: "A romantic blend of rose and jasmine for timeless elegance.",
    size: "100ml",
    notes: "Rose, Jasmine, Vanilla",
    longDescription: "Experience the timeless elegance of Rose Elegance, a sophisticated fragrance that captures the essence of romance. This exquisite blend combines the delicate sweetness of rose petals with the intoxicating allure of jasmine, finished with a warm vanilla base that lingers on your skin.",
    ingredients: "Rose Absolute, Jasmine Grandiflorum, Vanilla Bean Extract",
    howToUse: "Spray on pulse points for a lasting fragrance experience.",
    benefits: "Long-lasting scent, suitable for all occasions, hypoallergenic formula",
    inStock: true
  },
  {
    id: 2,
    name: "Citrus Bloom",
    price: "380 egp",
    image: "/images/perfume2.jpg",
    description: "Fresh citrus notes with a hint of floral sweetness.",
    size: "50ml",
    notes: "Lemon, Bergamot, Orange Blossom",
    longDescription: "Awaken your senses with Citrus Bloom, a vibrant and refreshing fragrance that combines zesty citrus notes with delicate floral undertones. Perfect for those who love a fresh, invigorating scent that brightens any day.",
    ingredients: "Lemon Essential Oil, Bergamot Extract, Orange Blossom Absolute",
    howToUse: "Apply to wrists and neck for a refreshing burst of fragrance.",
    benefits: "Energizing scent, perfect for daytime wear, mood-lifting properties",
    inStock: true
  },
  {
    id: 3,
    name: "Midnight Oud",
    price: "520 egp",
    image: "/images/perfume3.jpg",
    description: "Deep oud and amber for a rich, royal experience.",
    size: "75ml",
    notes: "Oud, Amber, Sandalwood",
    longDescription: "Immerse yourself in the luxurious depths of Midnight Oud, a rich and complex fragrance that combines the rare and precious oud with warm amber and sandalwood. Perfect for evening wear and special occasions.",
    ingredients: "Oud Wood, Amber Resin, Sandalwood Essential Oil",
    howToUse: "Apply to pulse points for an intense, long-lasting fragrance.",
    benefits: "Rich, complex scent, perfect for evening wear, long-lasting",
    inStock: true
  },
  {
    id: 4,
    name: "Ultra Male",
    price: "540 egp",
    image: "/images/perfume4.jpg",
    description: "Bold and masculine scent with modern appeal.",
    size: "100ml",
    notes: "Lavender, Pear, Vanilla",
    longDescription: "Experience the modern masculinity of Ultra Male, a bold and sophisticated fragrance that combines fresh lavender with sweet pear and warm vanilla. A perfect balance of freshness and sensuality.",
    ingredients: "Lavender Essential Oil, Pear Extract, Vanilla Absolute",
    howToUse: "Spray on chest and neck for a bold presence.",
    benefits: "Modern masculine scent, versatile for any occasion",
    inStock: true
  },
  {
    id: 5,
    name: "Blue de Chanel",
    price: "670 egp",
    image: "/images/perfume5.jpg",
    description: "Fresh and woody fragrance with citrus notes.",
    size: "100ml",
    notes: "Citrus, Labdanum, Cedar",
    longDescription: "Discover the iconic Blue de Chanel, a fresh and woody fragrance that combines citrus notes with labdanum and cedar. A timeless scent that embodies modern elegance.",
    ingredients: "Citrus Essential Oils, Labdanum Resin, Cedarwood",
    howToUse: "Apply to pulse points for a sophisticated presence.",
    benefits: "Iconic scent, perfect for any occasion, long-lasting",
    inStock: true
  },
  {
    id: 6,
    name: "Amber Night",
    price: "420 egp",
    image: "/images/perfume6.jpg",
    description: "Warm amber and musk for a mysterious evening.",
    size: "100ml",
    notes: "Amber, Musk, Patchouli",
    longDescription: "Embrace the warmth of Amber Night, a sensual and mysterious fragrance that combines rich amber with musk and patchouli. Perfect for creating an unforgettable evening presence.",
    ingredients: "Amber Resin, Musk Extract, Patchouli Essential Oil",
    howToUse: "Apply to pulse points for an intense evening scent.",
    benefits: "Warm, sensual scent, perfect for evening wear",
    inStock: true
  },
  {
    id: 7,
    name: "Jasmine Dream",
    price: "390 egp",
    image: "/images/perfume7.jpg",
    description: "Soft jasmine and white florals for a dreamy aura.",
    size: "75ml",
    notes: "Jasmine, White Flowers, Musk",
    longDescription: "Drift into the dreamy world of Jasmine Dream, a delicate and romantic fragrance that combines soft jasmine with white flowers and musk. Perfect for creating a gentle, feminine presence.",
    ingredients: "Jasmine Absolute, White Flower Extract, Musk",
    howToUse: "Apply to pulse points for a delicate, lingering scent.",
    benefits: "Soft, romantic scent, perfect for daytime wear",
    inStock: true
  },
  {
    id: 8,
    name: "Spice Route",
    price: "510 egp",
    image: "/images/perfume8.jpg",
    description: "Exotic spices and woods for a bold statement.",
    size: "100ml",
    notes: "Cinnamon, Clove, Cedarwood",
    longDescription: "Embark on a journey with Spice Route, a bold and exotic fragrance that combines warm spices with rich woods. Perfect for those who love a distinctive, memorable scent.",
    ingredients: "Cinnamon Essential Oil, Clove Extract, Cedarwood",
    howToUse: "Apply to pulse points for a bold, spicy presence.",
    benefits: "Bold, distinctive scent, perfect for special occasions",
    inStock: true
  },
  {
    id: 9,
    name: "Vanilla Sky",
    price: "370 egp",
    image: "/images/perfume9.jpg",
    description: "Sweet vanilla and caramel for a cozy embrace.",
    size: "50ml",
    notes: "Vanilla, Caramel, Tonka Bean",
    longDescription: "Indulge in the sweet comfort of Vanilla Sky, a warm and inviting fragrance that combines rich vanilla with caramel and tonka bean. Perfect for creating a cozy, comforting presence.",
    ingredients: "Vanilla Absolute, Caramel Extract, Tonka Bean",
    howToUse: "Apply to pulse points for a sweet, comforting scent.",
    benefits: "Sweet, comforting scent, perfect for casual wear",
    inStock: true
  },
  {
    id: 10,
    name: "Fresh Aqua",
    price: "430 egp",
    image: "/images/perfume10.jpg",
    description: "Aquatic notes and citrus for a refreshing splash.",
    size: "100ml",
    notes: "Sea Breeze, Lemon, Mint",
    longDescription: "Experience the refreshing burst of Fresh Aqua, a crisp and invigorating fragrance that combines aquatic notes with citrus and mint. Perfect for a fresh, energetic presence.",
    ingredients: "Sea Breeze Accord, Lemon Essential Oil, Mint Extract",
    howToUse: "Apply to pulse points for a refreshing burst of fragrance.",
    benefits: "Fresh, energizing scent, perfect for daytime wear",
    inStock: true
  }
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(params.id)) || products[0];
  const relatedProducts = products.filter(p => p.id !== parseInt(params.id));
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const scrollToProducts = () => {
    const productsSection = document.querySelector('.product-details');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#3a2c1a] text-white px-6 py-3 rounded-full shadow-lg z-50 animate-slide-up">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#3a2c1a] text-white p-3 rounded-full shadow-lg hover:bg-[#5a4b3c] transition-all duration-300 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <div className="container mx-auto px-4 py-12 product-details">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Image Navigation Arrows */}
              <button
                onClick={() => setCurrentImage(prev => (prev > 0 ? prev - 1 : 0))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImage(prev => (prev < 2 ? prev + 1 : 2))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-bold text-[#3a2c1a]">{product.name}</h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  In Stock
                </span>
              </div>
              <p className="text-2xl font-semibold text-[#5a4b3c]">{product.price}</p>
              <p className="text-[#7a6c5d]">{product.longDescription}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#3a2c1a]">Size</h3>
                  <p className="text-[#7a6c5d]">{product.size}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3a2c1a]">Notes</h3>
                  <p className="text-[#7a6c5d]">{product.notes}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3a2c1a]">Ingredients</h3>
                  <p className="text-[#7a6c5d]">{product.ingredients}</p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#3a2c1a] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#5a4b3c] transition-all duration-300 transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#3a2c1a] mb-4">How to Use</h3>
                <p className="text-[#7a6c5d]">{product.howToUse}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#3a2c1a] mb-4">Benefits</h3>
                <p className="text-[#7a6c5d]">{product.benefits}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 relative">
          <h2 className="text-3xl font-bold text-[#3a2c1a] mb-8">You May Also Like</h2>
          
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 -ml-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3a2c1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 -mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3a2c1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-8 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="flex-none w-[300px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl snap-start"
              >
                <div className="relative h-64">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#3a2c1a]">{relatedProduct.name}</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      In Stock
                    </span>
                  </div>
                  <p className="text-[#7a6c5d] mb-4">{relatedProduct.description}</p>
                  <p className="text-lg font-bold text-[#5a4b3c]">{relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 