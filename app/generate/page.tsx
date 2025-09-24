"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { GenerateFromInputs } from "@/components/generate-from-inputs"
import { GenerateFromImage } from "@/components/generate-from-image"
import { Button } from "@/components/ui/button"

export default function GeneratePage() {
  const [activeMode, setActiveMode] = useState<"inputs" | "image">("inputs")

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 neon-text">Generate Kolam Patterns</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Create beautiful kolam patterns using traditional parameters or upload your own designs
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
          <Button
            size="lg"
            onClick={() => setActiveMode("inputs")}
            className={`px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all ${
              activeMode === "inputs"
                ? "neon-button text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Generate from Inputs
          </Button>
          <Button
            size="lg"
            onClick={() => setActiveMode("image")}
            className={`px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all ${
              activeMode === "image"
                ? "neon-button text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Generate from Image
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {activeMode === "inputs" && (
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 neon-text-blue">Generate from Inputs</h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                  Use traditional kolam parameters to create authentic patterns
                </p>
              </div>
              <div className="neon-border rounded-xl p-4 sm:p-6 md:p-8 bg-background/50">
                <GenerateFromInputs />
              </div>
            </section>
          )}

          {activeMode === "image" && (
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 neon-text-orange">Generate from Image</h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                  Upload an image and extract kolam patterns from it
                </p>
              </div>
              <div className="neon-border-pink rounded-xl p-4 sm:p-6 md:p-8 bg-background/50">
                <GenerateFromImage />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
