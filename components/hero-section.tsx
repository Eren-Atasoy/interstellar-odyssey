import { Button } from "@/components/ui/button"
import { Rocket, Stars } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cinematic-photorealistic-8k-futuristic-space-trave.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/70 via-[#0a0a1a]/50 to-[#0a0a1a]" />
      </div>

      {/* Animated Stars Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-stars"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Stars className="w-8 h-8 text-[#00f2ff] animate-pulse-glow" />
          <span className="text-[#00f2ff] text-sm md:text-base tracking-[0.3em] uppercase font-medium">
            Uzay Seyahat Acentesi
          </span>
          <Stars className="w-8 h-8 text-[#00f2ff] animate-pulse-glow" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-glow text-[#00f2ff]">Interstellar</span>
          <br />
          <span className="text-glow-purple text-[#bc13fe]">Odyssey</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Galaksinin ötesine yolculuk yapın. Mars&#39;ın kızıl çöllerinden Jüpiter&#39;in gazlı atmosferine, hatta
          Andromeda&#39;nın gizemli derinliklerine kadar keşfedin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-[#00f2ff] hover:bg-[#00f2ff]/80 text-[#0a0a1a] font-bold text-lg px-8 py-6 neon-glow transition-all duration-300 hover:scale-105"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Hemen Rezervasyon Yap
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#bc13fe] text-[#bc13fe] hover:bg-[#bc13fe]/10 font-bold text-lg px-8 py-6 transition-all duration-300 hover:scale-105 bg-transparent"
          >
            Destinasyonları Keşfet
          </Button>
        </div>

        {/* Floating Rocket Animation */}
        <div className="mt-16 animate-float">
          <Rocket className="w-16 h-16 text-[#00f2ff] mx-auto transform rotate-45" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#00f2ff]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#00f2ff] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
