// app/blogs/page.tsx
import React from "react";
import { generateBlogJSONLD } from "@/lib/structuredData";

export const revalidate = 60; // ISR every 60 seconds

export default async function BlogPage() {
  // Fetch blogs data from Strapi
  const res = await fetch("https://tranquil-positivity-9ec86ca654.strapiapp.com/api/blogs?populate=image");
  const data = await res.json();
  const blogs = data?.data || [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Our Blog</h1>

      {blogs.length === 0 && <p>No blogs available at the moment.</p>}

      {blogs.map(blog => (
        <div key={blog.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{blog.attributes.title}</h2>
          <p className="text-gray-700 mb-2">{blog.attributes.description}</p>
          {blog.attributes.image?.data && (
            <img
              src={blog.attributes.image.data.attributes.url}
              alt={blog.attributes.title}
              className="w-full max-w-lg h-auto rounded-lg mb-2"
            />
          )}
        </div>
      ))}

      {/* JSON-LD structured data for SEO */}
      {blogs.map(blog => (
        <script
          key={blog.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBlogJSONLD({
              title: blog.attributes.title,
              description: blog.attributes.description,
              url: `https://yourdomain.com/blogs/${blog.id}`,
              datePublished: blog.attributes.publishedAt
            })),
          }}
        />
      ))}
    </div>
  );
}
