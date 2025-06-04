"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InteractiveHeader() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const headerHeight = "h-16"; // Approx 4rem or 64px, matches p-4 (1rem padding on each side of content)

  return (
    <div 
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 ${headerHeight}`} // Hover detection area
    >
      <motion.header 
        initial={{ y: "-100%" }}
        animate={{ y: isHeaderHovered ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`absolute top-0 w-full flex items-center justify-between bg-background text-foreground p-4 shadow-md ${headerHeight}`} // Actual animated header
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
      </motion.header>
    </div>
  );
}
