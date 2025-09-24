"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Pause, Download, Zap } from "lucide-react"
import kolamData from "@/data/kolams.json"

interface KolamPattern {
  id: string
  name: string
  type: string
  grid: {
    rows: number
    cols: number
    dotSpacing: number
  }
  thumbnail: string
  description: string
  svgViewBox: string
  steps: string[]
  metadata: {
    symmetry: string[]
    transforms: string[]
    math: string[]
  }
}

export function KolamGallery() {
  const [selectedPattern, setSelectedPattern] = useState<KolamPattern | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [filter, setFilter] = useState<string>("all")

  const patterns = kolamData as KolamPattern[]

  const filteredPatterns = patterns.filter((pattern) => {
    if (filter === "all") return true
    return pattern.type.toLowerCase().includes(filter.toLowerCase())
  })

  const filterOptions = [
    { value: "all", label: "All Patterns" },
    { value: "sikku", label: "Sikku" },
    { value: "pulli", label: "Pulli" },
    { value: "grid", label: "Grid" },
  ]

  const playAnimation = () => {
    if (!selectedPattern) return

    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= selectedPattern.steps.length - 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const pauseAnimation = () => {
    setIsPlaying(false)
  }

  const downloadSVG = (pattern: KolamPattern) => {
    const svgContent = `<svg viewBox="${pattern.svgViewBox}" xmlns="http://www.w3.org/2000/svg">
      ${pattern.steps.join("\n")}
    </svg>`

    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${pattern.name.toLowerCase().replace(/\s+/g, "-")}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const openPatternDetail = (pattern: KolamPattern) => {
    setSelectedPattern(pattern)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? "default" : "outline"}
            onClick={() => setFilter(option.value)}
            className={`neon-button ${filter === option.value ? "neon-border-blue" : "bg-transparent"}`}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="gallery-card p-6 cursor-pointer" onClick={() => openPatternDetail(pattern)}>
                <div className="aspect-square mb-4 bg-background/20 rounded-lg neon-border flex items-center justify-center overflow-hidden">
                  <svg viewBox={pattern.svgViewBox} className="w-full h-full svg-glow" style={{ color: "#8b5cf6" }}>
                    {pattern.steps.map((step, stepIndex) => (
                      <g key={stepIndex} dangerouslySetInnerHTML={{ __html: step }} />
                    ))}
                  </svg>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold neon-text-blue">{pattern.name}</h3>
                    <Badge variant="secondary" className="neon-border-pink text-xs">
                      {pattern.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{pattern.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Grid: {pattern.grid.rows}×{pattern.grid.cols}
                    </span>
                    <span>{pattern.steps.length} steps</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {pattern.metadata.symmetry.slice(0, 2).map((sym, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sym}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pattern Detail Modal */}
      <Dialog open={!!selectedPattern} onOpenChange={() => setSelectedPattern(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto neon-border bg-background">
          {selectedPattern && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl neon-text-blue">{selectedPattern.name}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="neon-border-pink">
                    {selectedPattern.type}
                  </Badge>
                  <Badge variant="outline">
                    Grid: {selectedPattern.grid.rows}×{selectedPattern.grid.cols}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Animation Panel */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold neon-text-orange">Animated Reconstruction</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={isPlaying ? pauseAnimation : playAnimation}
                        className="neon-button bg-transparent"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSVG(selectedPattern)}
                        className="neon-button bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="aspect-square bg-background/20 rounded-lg neon-border flex items-center justify-center">
                    <svg
                      viewBox={selectedPattern.svgViewBox}
                      className="w-full h-full max-w-80 max-h-80 svg-glow"
                      style={{ color: "#8b5cf6" }}
                    >
                      {selectedPattern.steps.slice(0, currentStep + 1).map((step, index) => (
                        <motion.g
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          dangerouslySetInnerHTML={{ __html: step }}
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="text-center">
                    <Badge variant="secondary" className="neon-border-blue">
                      Step {currentStep + 1} of {selectedPattern.steps.length}
                    </Badge>
                  </div>
                </div>

                {/* Metadata Panel */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 neon-text-orange">Description</h3>
                    <p className="text-muted-foreground">{selectedPattern.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 neon-text-orange">Symmetry Properties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.metadata.symmetry.map((sym, index) => (
                        <Badge key={index} variant="secondary" className="neon-border-pink">
                          {sym}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 neon-text-orange">Geometric Transforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.metadata.transforms.map((transform, index) => (
                        <Badge key={index} variant="secondary" className="neon-border-blue">
                          {transform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 neon-text-orange">Mathematical Concepts</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.metadata.math.map((concept, index) => (
                        <Badge key={index} variant="secondary" className="neon-border">
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        // This would navigate to analyze page with this pattern pre-filled
                        window.location.href = "/analyze"
                      }}
                      className="neon-button flex-1"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze This
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => downloadSVG(selectedPattern)}
                      className="neon-button bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Construction Steps */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 neon-text-orange">Construction Steps</h3>
                <div className="grid gap-2 max-h-40 overflow-y-auto">
                  {selectedPattern.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-all ${
                        index <= currentStep ? "neon-border-blue bg-background/30" : "border-border/30 bg-background/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <svg width="20" height="20" viewBox={selectedPattern.svgViewBox} className="inline mr-2">
                            <g dangerouslySetInnerHTML={{ __html: step }} style={{ color: "#8b5cf6" }} />
                          </svg>
                          <span className="text-xs font-mono text-muted-foreground">
                            {step.length > 60 ? `${step.substring(0, 60)}...` : step}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
