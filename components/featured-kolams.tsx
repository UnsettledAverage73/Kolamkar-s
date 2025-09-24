"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import kolamData from "@/data/kolams.json"

export function FeaturedKolams() {
  const [selectedKolam, setSelectedKolam] = useState<any>(null)
  const featuredKolams = kolamData.slice(0, 3)

  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 neon-text-blue">Featured Kolam Patterns</h2>
          <p className="text-lg text-muted-foreground">Explore traditional patterns with mathematical analysis</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredKolams.map((kolam, index) => (
            <motion.div
              key={kolam.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="gallery-card rounded-lg p-6 cursor-pointer"
              onClick={() => setSelectedKolam(kolam)}
            >
              <div className="aspect-square bg-background/30 rounded-lg mb-4 flex items-center justify-center neon-border-pink">
                <svg viewBox={kolam.svgViewBox} className="w-full h-full p-4">
                  {kolam.steps.map((step, stepIndex) => (
                    <g key={stepIndex} dangerouslySetInnerHTML={{ __html: step }} className="svg-glow text-neon-pink" />
                  ))}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 neon-text-orange">{kolam.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{kolam.type}</p>
              <p className="text-sm text-muted-foreground">{kolam.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="neon-button bg-transparent text-white hover:text-white">
            <a href="/gallery">View Full Gallery</a>
          </Button>
        </div>
      </div>

      {/* Modal for selected kolam */}
      <Dialog open={!!selectedKolam} onOpenChange={() => setSelectedKolam(null)}>
        <DialogContent className="max-w-2xl bg-background neon-border">
          <DialogHeader>
            <DialogTitle className="neon-text-blue">{selectedKolam?.name}</DialogTitle>
          </DialogHeader>
          {selectedKolam && (
            <div className="space-y-4">
              <div className="aspect-square bg-background/30 rounded-lg flex items-center justify-center neon-border-pink">
                <svg viewBox={selectedKolam.svgViewBox} className="w-full h-full p-4">
                  {selectedKolam.steps.map((step: string, stepIndex: number) => (
                    <g key={stepIndex} dangerouslySetInnerHTML={{ __html: step }} className="svg-glow text-neon-pink" />
                  ))}
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="neon-text-orange">Type:</strong> {selectedKolam.type}
                </div>
                <div>
                  <strong className="neon-text-orange">Grid:</strong> {selectedKolam.grid.rows}×
                  {selectedKolam.grid.cols}
                </div>
              </div>
              <p className="text-muted-foreground">{selectedKolam.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
