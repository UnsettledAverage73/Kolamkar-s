import { Navigation } from "@/components/navigation"
import { LandingHero } from "@/components/landing-hero"
import { FeaturedKolams } from "@/components/featured-kolams"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <LandingHero />
        <FeaturedKolams />
        <HowItWorks />
        <Footer />
      </div>
    </main>
  )
}
