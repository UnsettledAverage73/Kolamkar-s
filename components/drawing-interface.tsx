"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Download, Palette, Grid3X3 } from "lucide-react"

interface Point {
  x: number
  y: number
}

interface DrawingPath {
  points: Point[]
  color: string
  strokeWidth: number
}

export function DrawingInterface() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [paths, setPaths] = useState<DrawingPath[]>([])
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [strokeWidth, setStrokeWidth] = useState([3])
  const [currentColor, setCurrentColor] = useState("#8b5cf6") // neon purple
  const [showGrid, setShowGrid] = useState(true)
  const [gridSize, setGridSize] = useState([20])

  const colors = [
    "#8b5cf6", // neon purple
    "#06b6d4", // neon cyan
    "#ec4899", // neon pink
    "#f97316", // neon orange
    "#10b981", // neon green
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height, gridSize[0])
    }

    // Draw all completed paths
    paths.forEach((path) => {
      drawPath(ctx, path.points, path.color, path.strokeWidth)
    })

    // Draw current path being drawn
    if (currentPath.length > 0) {
      drawPath(ctx, currentPath, currentColor, strokeWidth[0])
    }
  }, [paths, currentPath, showGrid, gridSize, currentColor, strokeWidth])

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, spacing: number) => {
    ctx.strokeStyle = "rgba(139, 92, 246, 0.2)" // neon purple with low opacity
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])

    // Draw vertical lines
    for (let x = 0; x <= width; x += spacing) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw dots at intersections
    ctx.setLineDash([])
    ctx.fillStyle = "rgba(139, 92, 246, 0.4)"
    for (let x = 0; x <= width; x += spacing) {
      for (let y = 0; y <= height; y += spacing) {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawPath = (ctx: CanvasRenderingContext2D, points: Point[], color: string, width: number) => {
    if (points.length < 2) return

    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.setLineDash([])

    // Add glow effect
    ctx.shadowColor = color
    ctx.shadowBlur = 8

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.stroke()
    ctx.shadowBlur = 0
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const pos = getMousePos(e)
    setCurrentPath([pos])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const pos = getMousePos(e)
    setCurrentPath((prev) => [...prev, pos])
  }

  const stopDrawing = () => {
    if (isDrawing && currentPath.length > 0) {
      setPaths((prev) => [
        ...prev,
        {
          points: currentPath,
          color: currentColor,
          strokeWidth: strokeWidth[0],
        },
      ])
      setCurrentPath([])
    }
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setPaths([])
    setCurrentPath([])
  }

  const downloadSVG = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    let svgContent = `<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">`

    paths.forEach((path) => {
      if (path.points.length < 2) return

      const pathData = path.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

      svgContent += `<path d="${pathData}" stroke="${path.color}" strokeWidth="${path.strokeWidth}" fill="none" strokeLinecap="round" strokeLinejoin="round"/>`
    })

    svgContent += "</svg>"

    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "kolam-pattern.svg"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Drawing Canvas */}
      <div className="lg:col-span-2">
        <Card className="p-6 neon-border">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold neon-text-blue">Drawing Canvas</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
                className={`neon-button ${showGrid ? "neon-border-blue" : ""}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={clearCanvas} className="neon-button bg-transparent">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadSVG} className="neon-button bg-transparent">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-auto drawing-canvas rounded-lg cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="space-y-6">
        {/* Color Palette */}
        <Card className="p-6 neon-border">
          <h3 className="text-lg font-semibold mb-4 neon-text-orange">
            <Palette className="w-5 h-5 inline mr-2" />
            Colors
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <motion.button
                key={color}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  currentColor === color ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                onClick={() => setCurrentColor(color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </Card>

        {/* Stroke Width */}
        <Card className="p-6 neon-border">
          <h3 className="text-lg font-semibold mb-4 neon-text-orange">Stroke Width</h3>
          <div className="space-y-4">
            <Slider value={strokeWidth} onValueChange={setStrokeWidth} max={20} min={1} step={1} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">{strokeWidth[0]}px</div>
          </div>
        </Card>

        {/* Grid Settings */}
        <Card className="p-6 neon-border">
          <h3 className="text-lg font-semibold mb-4 neon-text-orange">Grid Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Show Grid</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
                className={`neon-button ${showGrid ? "neon-border-blue" : ""}`}
              >
                {showGrid ? "On" : "Off"}
              </Button>
            </div>
            {showGrid && (
              <>
                <Slider value={gridSize} onValueChange={setGridSize} max={50} min={10} step={5} className="w-full" />
                <div className="text-center text-sm text-muted-foreground">Grid: {gridSize[0]}px</div>
              </>
            )}
          </div>
        </Card>

        {/* Pattern Info */}
        <Card className="p-6 neon-border">
          <h3 className="text-lg font-semibold mb-4 neon-text-orange">Pattern Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Paths:</span>
              <span className="neon-text-blue">{paths.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Points:</span>
              <span className="neon-text-blue">{paths.reduce((sum, path) => sum + path.points.length, 0)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
