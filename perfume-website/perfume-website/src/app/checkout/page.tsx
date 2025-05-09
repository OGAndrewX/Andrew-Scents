'use client';
import React from "react";
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Guard: redirect to /shipping if no shippingInfo
  useEffect(() => {
    const shippingInfo = localStorage.getItem('shippingInfo');
    if (!shippingInfo) {
      router.replace('/shipping');
    }
  }, [router]);

  const sendOrderEmail = async () => {
    console.log("Sending order email");
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo') || '{}');
    await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shippingInfo, cart }),
    });
  };

  const handleCheckout = async () => {
    setLoading(true);
    await sendOrderEmail();
    if (paymentMethod === 'card') {
      // Stripe integration
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });
      const data = await response.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        alert('Error creating Stripe Checkout session: ' + (data.error || 'Unknown error'));
        setLoading(false);
      }
    } else if (paymentMethod === 'cod') {
      alert('Order placed! Please pay cash on delivery.');
      clearCart();
      setLoading(false);
      router.push('/success');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[#3a2c1a]">Checkout</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="text-lg font-bold">Total: {totalPrice.toLocaleString()} EGP</div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Choose Payment Method</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
            Pay by Card (Visa/MasterCard)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
            Cash on Delivery
          </label>
        </div>
      </div>
      <button onClick={handleCheckout} disabled={loading} className={`w-full py-3 bg-[#3a2c1a] text-white rounded-full font-semibold shadow hover:bg-[#5a4b3c] transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? (<span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Processing...</span>) : 'Place Order'}</button>
    </div>
  );
} 