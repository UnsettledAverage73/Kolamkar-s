"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, SkipForward, Download, BarChart3 } from "lucide-react"

interface KolamParams {
  type: string
  gridRows: number
  gridCols: number
  dotSpacing: number
  iterations: number
  strokeThickness: number
  colorPalette: string
}

export function GenerateFromInputs() {
  const [params, setParams] = useState<KolamParams>({
    type: "sikku",
    gridRows: 7,
    gridCols: 7,
    dotSpacing: 20,
    iterations: 3,
    strokeThickness: 2,
    colorPalette: "neon-purple",
  })

  const [generatedKolam, setGeneratedKolam] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const colorPalettes = [
    { value: "neon-purple", label: "Neon Purple", colors: ["#8B5CF6", "#EC4899"] },
    { value: "neon-blue", label: "Neon Blue", colors: ["#06B6D4", "#3B82F6"] },
    { value: "neon-orange", label: "Neon Orange", colors: ["#F97316", "#EC4899"] },
    { value: "neon-green", label: "Neon Green", colors: ["#10B981", "#06B6D4"] },
  ]

  const generateKolam = () => {
    // Mock generation - in real app this would call an API
    const mockKolam = {
      svgPaths: [
        "M20 20 C30 10, 50 30, 60 20 C70 10, 90 30, 100 20",
        "M20 40 C30 30, 50 50, 60 40 C70 30, 90 50, 100 40",
        "M20 60 C30 50, 50 70, 60 60 C70 50, 90 70, 100 60",
      ],
      steps: [
        { path: "M20 20 C30 10, 50 30, 60 20", description: "Draw first curve" },
        { path: "M60 20 C70 10, 90 30, 100 20", description: "Continue curve" },
        { path: "M20 40 C30 30, 50 50, 60 40", description: "Add second row" },
      ],
      metadata: {
        symmetry: ["rotational 2"],
        transforms: ["translation", "mirror"],
        math: ["parametric curves", "cubic Bezier segments"],
      },
    }
    setGeneratedKolam(mockKolam)
    setCurrentStep(0)
  }

  const downloadSVG = () => {
    if (!generatedKolam) return
    const svgContent = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      ${generatedKolam.svgPaths.map((path: string) => `<path d="${path}" stroke="#8B5CF6" strokeWidth="2" fill="none"/>`).join("")}
    </svg>`
    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "kolam-pattern.svg"
    a.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls Panel */}
      <Card className="neon-border bg-background/50">
        <CardHeader>
          <CardTitle className="neon-text-blue">Pattern Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-white">Kolam Type</Label>
            <Select value={params.type} onValueChange={(value) => setParams({ ...params, type: value })}>
              <SelectTrigger className="neon-border bg-background/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background neon-border">
                <SelectItem value="sikku">Sikku (Continuous)</SelectItem>
                <SelectItem value="pulli">Pulli (Dot Grid)</SelectItem>
                <SelectItem value="geometric">Geometric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Grid Rows</Label>
              <Input
                type="number"
                value={params.gridRows}
                onChange={(e) => setParams({ ...params, gridRows: Number.parseInt(e.target.value) })}
                className="neon-border bg-background/50 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Grid Cols</Label>
              <Input
                type="number"
                value={params.gridCols}
                onChange={(e) => setParams({ ...params, gridCols: Number.parseInt(e.target.value) })}
                className="neon-border bg-background/50 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Dot Spacing: {params.dotSpacing}px</Label>
            <Slider
              value={[params.dotSpacing]}
              onValueChange={([value]) => setParams({ ...params, dotSpacing: value })}
              min={10}
              max={40}
              step={2}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white">Iterations</Label>
            <Input
              type="number"
              value={params.iterations}
              onChange={(e) => setParams({ ...params, iterations: Number.parseInt(e.target.value) })}
              className="neon-border bg-background/50 text-white"
            />
          </div>

          <div>
            <Label className="text-white">Stroke Thickness: {params.strokeThickness}px</Label>
            <Slider
              value={[params.strokeThickness]}
              onValueChange={([value]) => setParams({ ...params, strokeThickness: value })}
              min={1}
              max={5}
              step={0.5}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-white">Color Palette</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {colorPalettes.map((palette) => (
                <Button
                  key={palette.value}
                  variant="outline"
                  className={`neon-button ${params.colorPalette === palette.value ? "neon-border-blue" : "bg-transparent"} text-white hover:text-white`}
                  onClick={() => setParams({ ...params, colorPalette: palette.value })}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {palette.colors.map((color, i) => (
                        <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    {palette.label}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={generateKolam} className="w-full neon-button text-white hover:text-white">
            Generate (Demo)
          </Button>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Card className="neon-border bg-background/50">
        <CardHeader>
          <CardTitle className="neon-text-blue">Pattern Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {generatedKolam ? (
            <div className="space-y-4">
              {/* SVG Preview */}
              <div className="aspect-square bg-background/30 rounded-lg neon-border-pink p-4">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {generatedKolam.svgPaths.slice(0, currentStep + 1).map((path: string, index: number) => (
                    <motion.path
                      key={index}
                      d={path}
                      stroke="#8B5CF6"
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(Math.min(currentStep + 1, generatedKolam.steps.length - 1))}
                  className="neon-button bg-transparent text-white hover:text-white"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {generatedKolam.steps.length}
                </span>
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
                <Button
                  variant="outline"
                  onClick={downloadSVG}
                  className="neon-button bg-transparent text-white hover:text-white"
                >
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
              <p className="text-muted-foreground">Generate a pattern to see preview</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
