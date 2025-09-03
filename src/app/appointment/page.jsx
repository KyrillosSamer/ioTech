"use client";

import Link from "next/link";

export default function AppointmentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-[#643F2E] mb-6">Book Appointment</h1>
      <p className="text-gray-700 mb-4">
        This page is for booking appointments. You can add your booking form here later.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#643F2E] text-white rounded hover:bg-[#FFD700] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
