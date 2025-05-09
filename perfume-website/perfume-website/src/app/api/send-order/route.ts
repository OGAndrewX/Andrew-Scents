'use server';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_PASS:", process.env.GMAIL_PASS ? "Exists" : "Missing");
  const { shippingInfo, cart } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const orderDetails = cart.map((item: { name: string; price: string | number; quantity: number }) =>
    `${item.name} x ${item.quantity} - ${item.price}`
  ).join('\n');

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'New Perfume Order',
    text: `New order received!\n\nShipping Info:\nFirst Name: ${shippingInfo.firstName}\nLast Name: ${shippingInfo.lastName}\nEmail: ${shippingInfo.email}\nPhone: ${shippingInfo.countryCode} ${shippingInfo.phone}\nStreet: ${shippingInfo.street}\nFloor: ${shippingInfo.floor}\nApartment: ${shippingInfo.apartment}\n\nOrder Details:\n${orderDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Send order email error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
} 