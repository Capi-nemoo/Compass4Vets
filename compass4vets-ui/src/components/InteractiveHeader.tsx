"use client";

import Link from 'next/link';

export default function InteractiveHeader() {
  const headerHeight = "h-16"; // Approx 4rem or 64px

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between bg-background text-foreground p-4 shadow-md ${headerHeight}`}
    >
        <Link href="/" className="font-semibold">
          Compass4Vets
        </Link>
        <nav className="flex gap-4">
          <Link href="/register">Register</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/services">Services</Link>
          <Link href="/community">Community</Link>
        </nav>
    </header>
  );
}
