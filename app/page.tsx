import { HeroSection } from "@/components/hero-section"
import { DestinationsSection } from "@/components/destinations-section"
import { WeightCalculator } from "@/components/weight-calculator"
import { BookingForm } from "@/components/booking-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] overflow-x-hidden">
      <HeroSection />
      <DestinationsSection />
      <WeightCalculator />
      <BookingForm />
      <Footer />
    </main>
  )
}
