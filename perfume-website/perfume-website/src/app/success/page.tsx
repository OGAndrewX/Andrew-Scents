'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f6f2] to-[#e7e3dc] text-[#2d2a26]">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-[#3a2c1a]">Thank You for Your Order!</h1>
        <p className="text-lg text-[#7a6c5d] mb-6 text-center">We appreciate your purchase. Your order has been received and is being processed.<br />You will receive a confirmation soon.</p>
        <Link href="/" className="px-6 py-3 bg-[#3a2c1a] text-white rounded-full shadow hover:bg-[#5a4b3c] transition font-semibold">Go to Home Page</Link>
      </div>
    </div>
  );
} 