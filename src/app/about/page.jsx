"use client";
import React from "react";

export default function About() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl text-amber-900 font-bold mb-4">About Us</h1>
      <p className="text-gray-700  mb-4">
        We are a leading law firm providing legal consultation, corporate
        services, and litigation across all sectors. Our goal is to deliver
        trusted solutions to both individuals and businesses.
      </p>
      <h2 className="text-2xl text-amber-900 font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="text-gray-700 mb-4">
        To provide professional and reliable legal services that protect the
        rights and interests of our clients.
      </p>
      <h2 className="text-2xl text-amber-900 font-semibold mt-6 mb-2">Our Vision</h2>
      <p className="text-gray-700">
        To be recognized as one of the most trusted law firms supporting Vision
        2030 with innovative legal solutions.
      </p>
    </div>
  );
}
