"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Play, Pause, Download, BarChart3 } from "lucide-react"

export function GenerateFromImage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedKolam, setGeneratedKolam] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const extractAndGenerate = () => {
    // Mock extraction - in real app this would analyze the uploaded image
    const mockKolam = {
      svgPaths: [
        "M30 30 C40 20, 60 40, 70 30 C80 20, 100 40, 110 30",
        "M30 50 C40 40, 60 60, 70 50 C80 40, 100 60, 110 50",
        "M30 70 C40 60, 60 80, 70 70 C80 60, 100 80, 110 70",
      ],
      steps: [
        { path: "M30 30 C40 20, 60 40, 70 30", description: "Extract main curve from image" },
        { path: "M70 30 C80 20, 100 40, 110 30", description: "Continue pattern recognition" },
        { path: "M30 50 C40 40, 60 60, 70 50", description: "Identify repeated elements" },
      ],
      metadata: {
        symmetry: ["bilateral"],
        transforms: ["translation", "scaling"],
        math: ["curve fitting", "pattern recognition"],
      },
    }
    setGeneratedKolam(mockKolam)
    setCurrentStep(0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Upload Panel */}
      <Card className="neon-border bg-background/50">
        <CardHeader>
          <CardTitle className="neon-text-blue">Upload Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            className="border-2 border-dashed neon-border-pink rounded-lg p-8 text-center cursor-pointer hover:bg-background/30 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {uploadedImage ? (
              <div className="space-y-4">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded"
                  className="max-w-full max-h-48 mx-auto rounded-lg"
                />
                <p className="text-sm text-muted-foreground">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-neon-pink" />
                <div>
                  <p className="text-lg font-medium text-white">Drop your image here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <p className="text-xs text-muted-foreground">Supports JPG, PNG, SVG files</p>
              </div>
            )}
          </div>

          <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

          {uploadedImage && (
            <Button onClick={extractAndGenerate} className="w-full neon-button text-white hover:text-white">
              Extract & Generate
            </Button>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong className="text-neon-orange">Demo Note:</strong> For demonstration purposes, uploaded images will
              be processed using our sample patterns. In a full implementation, this would use computer vision to
              analyze your actual image.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Card className="neon-border bg-background/50">
        <CardHeader>
          <CardTitle className="neon-text-blue">Generated Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          {generatedKolam ? (
            <div className="space-y-4">
              {/* SVG Preview */}
              <div className="aspect-square bg-background/30 rounded-lg neon-border-pink p-4">
                <svg viewBox="0 0 140 140" className="w-full h-full">
                  {generatedKolam.svgPaths.slice(0, currentStep + 1).map((path: string, index: number) => (
                    <motion.path
                      key={index}
                      d={path}
                      stroke="#06B6D4"
                      strokeWidth="2"
                      fill="none"
                      className="svg-glow"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.5 }}
                    />
                  ))}
                </svg>
              </div>

              {/* Animation Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="neon-button bg-transparent text-white hover:text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {generatedKolam.steps.length}
                </span>
              </div>

              {/* Current Step Description */}
              <div className="p-3 neon-border rounded-lg bg-background/30">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-neon-orange">Step {currentStep + 1}:</strong>{" "}
                  {generatedKolam.steps[currentStep]?.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="flex-1 neon-button text-white hover:text-white"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
                <Button variant="outline" className="neon-button bg-transparent text-white hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  SVG
                </Button>
                <Button variant="outline" className="neon-button bg-transparent text-white hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  PNG
                </Button>
              </div>

              {/* Analysis Panel */}
              {showAnalysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 neon-border rounded-lg bg-background/30"
                >
                  <h4 className="font-semibold mb-2 neon-text-orange">Pattern Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-neon-blue">Symmetry:</strong>{" "}
                      {generatedKolam.metadata.symmetry.join(", ")}
                    </div>
                    <div>
                      <strong className="text-neon-blue">Transforms:</strong>{" "}
                      {generatedKolam.metadata.transforms.join(", ")}
                    </div>
                    <div>
                      <strong className="text-neon-blue">Math Concepts:</strong>{" "}
                      {generatedKolam.metadata.math.join(", ")}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-background/30 rounded-lg neon-border flex items-center justify-center">
              <p className="text-muted-foreground">Upload an image to generate pattern</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
