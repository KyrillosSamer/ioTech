"use client";

import React from "react";
import { generateContactJSONLD } from "@/lib/structuredData";

export default function ContactPage() {
  const contactData = {
    name: "IO Tech",
    phone: "+971 4 123 4567",
    email: "contact@iotechuae.com",
    address: {
      street: "Sheikh Zayed Road",
      city: "Dubai",
      country: "United Arab Emirates",
    },
    url: "https://www.iotechuae.com",
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl text-amber-900 font-bold mb-4">Contact Us</h1>

      <p className="text-gray-700 mb-4">
        If you have any questions about our services or need assistance, feel free to reach out to us.
      </p>

      <h2 className="text-2xl text-amber-900 font-semibold mt-6 mb-2">Contact Information</h2>
      <p className="text-gray-700 mb-2">Phone: {contactData.phone}</p>
      <p className="text-gray-700 mb-2">Email: {contactData.email}</p>

      <h2 className="text-2xl text-amber-900 font-semibold mt-6 mb-2">Address</h2>
      <p className="text-gray-700">
        {contactData.name}<br />
        {contactData.address.street}, {contactData.address.city}, {contactData.address.country}
      </p>

      {/* Structured Data JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateContactJSONLD(contactData)),
        }}
      />
    </div>
  );
}
