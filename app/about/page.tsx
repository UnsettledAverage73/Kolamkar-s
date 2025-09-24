import { Navigation } from "@/components/navigation"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <AboutContent />
      </div>
    </main>
  )
}
