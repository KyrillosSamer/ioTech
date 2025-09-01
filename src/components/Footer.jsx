'use client';

import Link from "next/link";
import { FaTwitter, FaFacebook, FaGooglePlusG } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Footer() {
  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  return (
    <footer className="w-full bg-[#4b2615] text-white py-8 px-6">
      {/* Contacts + Social Icons */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-6 mb-6">

        {/* Subscription Form */}
        <div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
              // simulate API
              setTimeout(() => {
                console.log("Subscribed email:", values.email);
                setStatus({ success: "Subscribed successfully!" });
                resetForm();
                setSubmitting(false);
              }, 1000);
            }}
          >
            {({ isSubmitting, status, errors, touched }) => (
              <Form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex flex-col w-full sm:w-80">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`px-4 py-2 rounded-md text-black bg-white outline-none border 
                      ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative left-[-150px] text-white bg-[#4b2615] font-semibold px-6 py-1 rounded-md transition"
                >
                  Subscribe
                </button>
                {status && status.success && (
                  <div className="text-green-400 text-sm mt-2">
                    {status.success}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>

        <p className="text-center sm:text-left text-lg font-semibold">
          Contacts
        </p>

        <div className="flex gap-6 text-2xl">
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaFacebook className="hover:text-blue-600 cursor-pointer" />
          <FaGooglePlusG className="hover:text-red-500 cursor-pointer" />
        </div>
      </div>

      <hr className="border-gray-400 mb-6" />

      {/* Links */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between gap-6">
        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link href="/strategy" className="hover:text-gray-300 transition">
            Our Strategy
          </Link>
          <Link href="/advantages" className="hover:text-gray-300 transition">
            Our Advantages
          </Link>
          <Link
            href="/responsibility"
            className="hover:text-gray-300 transition"
          >
            Social Responsibility
          </Link>
          <Link href="/services" className="hover:text-gray-300 transition">
            Our Services
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-300 text-center sm:text-right text-sm">
          &copy; 2024 IO Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
