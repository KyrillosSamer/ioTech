// src/app/layout.tsx
import './globals.css';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

export const metadata = {
  title: "IO Tech",
  description: "Frontend Developer Task",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 relative">
        <NavbarWrapper /> {/* NavbarWrapper ممكن يكون client */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
