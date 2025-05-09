'use client';
import React from "react";
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[#3a2c1a]">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-[#7a6c5d] mb-4">Your cart is empty.</p>
          <Link href="/" className="inline-block px-6 py-2 bg-[#3a2c1a] text-white rounded-full hover:bg-[#5a4b3c] transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-6 bg-[#ede7dd] rounded-lg shadow p-4">
              <div className="w-24 h-32 bg-[#e7e3dc] rounded flex items-center justify-center">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full rounded" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#3a2c1a]">{item.name}</h3>
                <p className="text-[#7a6c5d] mb-2">{item.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                    className="px-3 py-1.5 bg-[#3a2c1a] text-white rounded-full font-bold shadow hover:bg-[#5a4b3c] transition text-lg"
                  >
                    -
                  </button>
                  <span className="px-3 text-[#3a2c1a] font-bold text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    className="px-3 py-1.5 bg-[#3a2c1a] text-white rounded-full font-bold shadow hover:bg-[#5a4b3c] transition text-lg"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-600 text-sm hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
              <div className="text-lg font-bold text-[#5a4b3c]">{item.price}</div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8 border-t pt-6">
            <button 
              onClick={clearCart} 
              className="text-red-600 hover:text-red-700 transition"
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold text-[#3a2c1a]">
              Total: {totalPrice.toLocaleString()} EGP
            </div>
          </div>
          <Link 
            href="/shipping" 
            className="block mt-6 w-full py-3 bg-[#3a2c1a] text-white rounded-full font-semibold shadow hover:bg-[#5a4b3c] text-center transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
} 