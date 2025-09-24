import { Navigation } from "@/components/navigation"
import { KolamGallery } from "@/components/kolam-gallery"

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 neon-text">Pattern Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore a curated collection of traditional and contemporary Kolam patterns
          </p>
        </div>

        <KolamGallery />
      </div>
    </main>
  )
}
