"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"

/**
 * Animation logic
 * - containerVariants: fade in on mount, turn white on exit
 * - primaryButtonVariants: pulse on hover, slide to top bar on click
 * - ghostButtonVariants: wiggle on hover, slide to top bar on click
 * - prefers-reduced-motion disables non-essential animations
 */

export function PrimaryButton({ text, onClick }: { text: string; onClick: () => void }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.button
      onClick={onClick}
      className="rounded-md bg-primary px-6 py-3 text-primary-foreground"
      variants={{
        hover: shouldReduce ? {} : { scale: [1, 1.05, 1] },
        toBar: {
          position: "fixed",
          top: "0.75rem",
          right: "0.75rem",
          scale: 0.8,
        },
      }}
      whileHover="hover"
    >
      {text}
    </motion.button>
  )
}

export function GhostButton({ text, onClick }: { text: string; onClick: () => void }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.button
      onClick={onClick}
      className="rounded-md border border-white/80 px-6 py-3"
      variants={{
        hover: shouldReduce ? {} : { rotateZ: [-2, 2, 0] },
        toBar: {
          position: "fixed",
          top: "0.75rem",
          right: "0.75rem",
          scale: 0.8,
        },
      }}
      whileHover="hover"
    >
      {text}
    </motion.button>
  )
}

export default function LandingPage() {
  const shouldReduce = useReducedMotion()
  const router = useRouter()

  function handleGetStarted() {
    setSelected("primary")
    setTimeout(() => router.push("/login"), 600)
  }

  function handleGuest() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("guest", "true")
    }
    setSelected("ghost")
    setTimeout(() => router.push("/explore"), 600)
  }

  const [selected, setSelected] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduce ? {} : { duration: 0.6 },
    },
    exit: {
      backgroundColor: "#ffffff",
      transition: shouldReduce ? {} : { duration: 0.6 },
    },
  }

  const animateState = selected ? "exit" : "visible"

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#433CC3] to-[#7D2BC7] text-white"
      initial="hidden"
      animate={animateState}
      variants={containerVariants}
    >
      {selected && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-10 flex h-12 items-center justify-center bg-white text-gray-800 shadow"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          Compass4Vets
        </motion.div>
      )}
      <svg
        aria-hidden="true"
        className="mb-6 h-24 w-24"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      >
        <rect x="10" y="10" width="80" height="80" rx="20" />
      </svg>
      <p className="mb-8 text-2xl font-semibold">Your compass for veteran resources.</p>
      <div className="flex gap-4">

        <PrimaryButton text="Get Started" onClick={() => setSelected("primary")}></PrimaryButton>
        <GhostButton text="Just Looking Around" onClick={() => setSelected("ghost")}></GhostButton>
      </div>
    </motion.div>
  )
}
