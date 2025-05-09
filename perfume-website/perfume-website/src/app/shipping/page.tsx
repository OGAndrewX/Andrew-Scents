'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from "react";
const countryCodes = [
  { code: '+20', country: 'Egypt' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+971', country: 'UAE' },
  { code: '+1', country: 'USA' },
  // Add more as needed
];

export default function ShippingPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+20',
    phone: '',
    street: '',
    floor: '',
    apartment: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/^[0-9]{8,15}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid phone number (8-15 digits)';
    }
    if (!form.street || form.street.length < 3) {
      newErrors.street = 'Enter a valid street (at least 3 characters)';
    }
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    localStorage.setItem('shippingInfo', JSON.stringify(form));
    router.push('/checkout');
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-[#3a2c1a]">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div className="flex-1">
            <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" className="p-3 border rounded w-full" />
            {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
          </div>
          <div className="flex-1">
            <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" className="p-3 border rounded w-full" />
            {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
          </div>
        </div>
        <div>
          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full p-3 border rounded" />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <select name="countryCode" value={form.countryCode} onChange={handleChange} className="p-3 border rounded">
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
            ))}
          </select>
          <div className="flex-1">
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="p-3 border rounded w-full" />
            {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
          </div>
        </div>
        <div>
          <input name="street" value={form.street} onChange={handleChange} required placeholder="Street" className="w-full p-3 border rounded" />
          {errors.street && <div className="text-red-600 text-sm mt-1">{errors.street}</div>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <input name="floor" value={form.floor} onChange={handleChange} placeholder="Floor" className="flex-1 p-3 border rounded" />
          <input name="apartment" value={form.apartment} onChange={handleChange} placeholder="Apartment" className="flex-1 p-3 border rounded" />
        </div>
        <button type="submit" className="w-full py-3 bg-[#3a2c1a] text-white rounded-full font-semibold shadow hover:bg-[#5a4b3c] transition">Proceed to Checkout</button>
      </form>
    </div>
  );
} 