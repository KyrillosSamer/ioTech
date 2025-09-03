"use client";

import Link from "next/link";
import { FaTwitter, FaFacebook, FaGooglePlusG } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "./Loading";

export default function Footer() {
  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  return (
    <footer className="w-full bg-[#4b2615] text-white py-8 px-6">
      <div className="flex flex-col sm:flex-row justify-end items-center gap-6 mb-6 mx-auto w-[90%]">

        {/* Subscription Form */}
        <div className="flex flex-col items-center sm:items-start w-full max-w-sm">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setStatus, setSubmitting }) => {
              setSubmitting(true);
              setStatus(null);

              try {
                const res = await fetch(`${BASE_URL}/api/newsletter-emails`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ data: { Email: values.email } }),
                });

                const data = await res.json();
                console.log("Response:", data);

                if (res.ok) {
                  setStatus({ success: "Subscribed successfully!" });
                  resetForm();
                } else if (data?.error?.details?.errors?.[0]?.message.includes("unique")) {
                  setStatus({ error: "This email is already subscribed." });
                } else {
                  setStatus({ error: data?.error?.message || "Something went wrong." });
                }
              } catch (error) {
                console.error("Fetch error:", error);
                setStatus({ error: "Something went wrong. Please try again." });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status, errors, touched }) => (
              <>
                <Form className="relative w-full">
                  <div className="relative w-full">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2 pr-28 rounded-md text-black bg-white outline-none border 
                        ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#4b2615] text-white px-4 py-1 rounded-md hover:bg-[#3a1c0f] transition"
                    >
                      {isSubmitting ? "Submitting..." : "Subscribe"}
                    </button>
                  </div>

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </Form>

                {/* Success / Error Messages */}
                {status?.success && (
                  <div className="text-green-400 text-sm mt-2">{status.success}</div>
                )}
                {status?.error && (
                  <div className="text-red-400 text-sm mt-2">{status.error}</div>
                )}
              </>
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

      <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between gap-6 mx-auto w-[90%]">
        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          <Link href="/about" className="hover:text-gray-300 transition">About</Link>
          <Link href="/strategy" className="hover:text-gray-300 transition">Our Strategy</Link>
          <Link href="/advantages" className="hover:text-gray-300 transition">Our Advantages</Link>
          <Link href="/responsibility" className="hover:text-gray-300 transition">Social Responsibility</Link>
          <Link href="/services" className="hover:text-gray-300 transition">Our Services</Link>
        </div>

        <p className="text-gray-300 text-center sm:text-right text-sm">
          &copy; 2024 IO Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
