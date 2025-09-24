"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Play, Pause, SkipForward, SkipBack, Download, Zap } from "lucide-react"

interface AnalysisResult {
  stepByStep: string[]
  symmetry: string[]
  geometricTransforms: string[]
  mathConcepts: string[]
  grid: {
    rows: number
    cols: number
    dotCoordinates: Array<{ x: number; y: number }>
  }
}

export function PatternAnalyzer() {
  const [svgInput, setSvgInput] = useState("")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1000)

  // Mock analysis function - in a real app, this would call an AI service
  const analyzePattern = async () => {
    setIsAnalyzing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock analysis result
    const mockResult: AnalysisResult = {
      stepByStep: [
        "<circle cx='50' cy='50' r='2' fill='currentColor'/>",
        "<path d='M30 50 Q50 30, 70 50' stroke='currentColor' strokeWidth='2' fill='none'/>",
        "<path d='M50 30 Q70 50, 50 70' stroke='currentColor' strokeWidth='2' fill='none'/>",
        "<path d='M70 50 Q50 70, 30 50' stroke='currentColor' strokeWidth='2' fill='none'/>",
        "<path d='M50 70 Q30 50, 50 30' stroke='currentColor' strokeWidth='2' fill='none'/>",
      ],
      symmetry: ["rotational order 4", "reflective across diagonals"],
      geometricTransforms: ["rotation 90°", "reflection", "scaling"],
      mathConcepts: ["parametric curves", "quadratic Bezier", "polar coordinates", "group theory"],
      grid: {
        rows: 5,
        cols: 5,
        dotCoordinates: [
          { x: 30, y: 30 },
          { x: 50, y: 30 },
          { x: 70, y: 30 },
          { x: 30, y: 50 },
          { x: 50, y: 50 },
          { x: 70, y: 50 },
          { x: 30, y: 70 },
          { x: 50, y: 70 },
          { x: 70, y: 70 },
        ],
      },
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
    setCurrentStep(0)
  }

  const playAnimation = () => {
    if (!analysisResult) return

    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisResult.stepByStep.length - 1) {
          setIsPlaying(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, playbackSpeed)
  }

  const pauseAnimation = () => {
    setIsPlaying(false)
  }

  const nextStep = () => {
    if (!analysisResult) return
    setCurrentStep((prev) => Math.min(prev + 1, analysisResult.stepByStep.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const downloadSVG = () => {
    if (!analysisResult) return

    const svgContent = `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      ${analysisResult.stepByStep.slice(0, currentStep + 1).join("\n")}
    </svg>`

    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "analyzed-kolam.svg"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        <Card className="p-6 neon-border">
          <h2 className="text-2xl font-bold mb-4 neon-text-blue">Input Pattern</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SVG Code or Description</label>
              <Textarea
                placeholder="Paste SVG code here or describe your Kolam pattern..."
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                className="min-h-32 neon-border bg-background/50"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={analyzePattern}
                disabled={!svgInput.trim() || isAnalyzing}
                className="neon-button flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 mr-2"
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze Pattern
                  </>
                )}
              </Button>

              <Button variant="outline" className="neon-button bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </Card>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Symmetry */}
              <Card className="p-6 neon-border">
                <h3 className="text-lg font-semibold mb-3 neon-text-orange">Symmetry Properties</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.symmetry.map((sym, index) => (
                    <Badge key={index} variant="secondary" className="neon-border-pink">
                      {sym}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Geometric Transforms */}
              <Card className="p-6 neon-border">
                <h3 className="text-lg font-semibold mb-3 neon-text-orange">Geometric Transforms</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.geometricTransforms.map((transform, index) => (
                    <Badge key={index} variant="secondary" className="neon-border-blue">
                      {transform}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Math Concepts */}
              <Card className="p-6 neon-border">
                <h3 className="text-lg font-semibold mb-3 neon-text-orange">Mathematical Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.mathConcepts.map((concept, index) => (
                    <Badge key={index} variant="secondary" className="neon-border">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Grid Info */}
              <Card className="p-6 neon-border">
                <h3 className="text-lg font-semibold mb-3 neon-text-orange">Grid Structure</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Rows:</span>
                    <span className="ml-2 neon-text-blue">{analysisResult.grid.rows}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Columns:</span>
                    <span className="ml-2 neon-text-blue">{analysisResult.grid.cols}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Dot Points:</span>
                    <span className="ml-2 neon-text-blue">{analysisResult.grid.dotCoordinates.length}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Visualization Section */}
      <div className="space-y-6">
        <Card className="p-6 neon-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold neon-text-blue">Step-by-Step Reconstruction</h2>
            {analysisResult && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="neon-button bg-transparent"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>

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
                  onClick={nextStep}
                  disabled={!analysisResult || currentStep === analysisResult.stepByStep.length - 1}
                  className="neon-button bg-transparent"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>

                <Button variant="outline" size="sm" onClick={downloadSVG} className="neon-button bg-transparent">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="aspect-square bg-background/20 rounded-lg neon-border flex items-center justify-center">
            {analysisResult ? (
              <div className="relative">
                <svg width="300" height="300" viewBox="0 0 100 100" className="svg-glow" style={{ color: "#8b5cf6" }}>
                  {analysisResult.stepByStep.slice(0, currentStep + 1).map((step, index) => (
                    <motion.g
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      dangerouslySetInnerHTML={{ __html: step }}
                    />
                  ))}
                </svg>

                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="neon-border-blue">
                    Step {currentStep + 1} of {analysisResult.stepByStep.length}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Analyze a pattern to see step-by-step reconstruction</p>
              </div>
            )}
          </div>
        </Card>

        {/* Step Details */}
        {analysisResult && (
          <Card className="p-6 neon-border">
            <h3 className="text-lg font-semibold mb-3 neon-text-orange">Construction Steps</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analysisResult.stepByStep.map((step, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border transition-all ${
                    index <= currentStep ? "neon-border-blue bg-background/30" : "border-border/30 bg-background/10"
                  }`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: index <= currentStep ? 1 : 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <svg width="24" height="24" viewBox="0 0 100 100" className="inline mr-2">
                        <g dangerouslySetInnerHTML={{ __html: step }} style={{ color: "#8b5cf6" }} />
                      </svg>
                      <span className="text-sm font-mono text-muted-foreground">
                        {step.length > 50 ? `${step.substring(0, 50)}...` : step}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
