'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isServicePage = pathname?.startsWith("/services");

  return <Navbar variant={isServicePage ? "service" : "home"} />;
}
