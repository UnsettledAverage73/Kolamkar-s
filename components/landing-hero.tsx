"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30" />
      <div className="flowing-lines" />
      <div className="neon-particles" />
      <div className="enhanced-particles" />
      <div className="twinkling-stars" />
      <div className="drifting-dots">
        <div className="drift-dot"></div>
        <div className="drift-dot"></div>
        <div className="drift-dot"></div>
        <div className="drift-dot"></div>
      </div>
      <div className="landing-mega-dots" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 neon-text px-2">
            Kolam Pattern Analyzer
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed px-4">
            Create, analyze, and explore the mathematical beauty of traditional Kolam patterns.
            <br className="hidden sm:block" />
            Discover the geometry behind ancient Indian art forms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 mt-8 sm:mt-12 px-4">
            <Link href="/generate">
              <Button
                size="lg"
                className="neon-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white hover:text-white w-full sm:w-auto"
              >
                Generate Kolam
              </Button>
            </Link>
            <Link href="/analyze">
              <Button
                size="lg"
                className="neon-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white hover:text-white w-full sm:w-auto"
              >
                Analyze Kolam
              </Button>
            </Link>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Kolam patterns are traditional South Indian floor art that combines mathematical precision with cultural
            significance. Our analyzer helps you understand the geometric principles and create your own patterns using
            ancient techniques.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
