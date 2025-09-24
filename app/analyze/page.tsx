import { Navigation } from "@/components/navigation"
import { PatternAnalyzer } from "@/components/pattern-analyzer"

export default function AnalyzePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 neon-text">Pattern Analyzer</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload or input a Kolam pattern to analyze its mathematical properties and symmetries
          </p>
        </div>

        <PatternAnalyzer />
      </div>
    </main>
  )
}
