import { Button } from "@/components/ui/button"
import { MapPin, Clock, Thermometer } from "lucide-react"

const destinations = [
  {
    name: "Mars",
    image: "/cinematic-photorealistic-8k-mars-planet-red-surfac.jpg",
    description:
      "Kızıl Gezegen'in gizemli vadilerini keşfedin. Olympus Mons'un zirvesine tırmanın ve antik nehir yataklarında yürüyün.",
    duration: "7 Ay",
    temperature: "-60°C",
    gravity: 0.38,
    color: "#ff6b35",
  },
  {
    name: "Jüpiter",
    image: "/cinematic-photorealistic-8k-jupiter-planet-gas-gia.jpg",
    description:
      "Güneş Sistemi'nin en büyük gezegeninin yörüngesinde muhteşem manzaraların tadını çıkarın. Büyük Kırmızı Leke'yi yakından izleyin.",
    duration: "2 Yıl",
    temperature: "-145°C",
    gravity: 2.53,
    color: "#f4a261",
  },
  {
    name: "Andromeda",
    image: "/cinematic-photorealistic-8k-andromeda-galaxy-spira.jpg",
    description:
      "En yakın galaksimize yapılan bu efsanevi yolculukta evrenin sırlarını çözün. Yeni dünyalar ve medeniyetler keşfedin.",
    duration: "2.5 Milyon Yıl*",
    temperature: "Değişken",
    gravity: "Değişken",
    color: "#bc13fe",
  },
]

export function DestinationsSection() {
  return (
    <section className="py-24 px-4 relative" id="destinations">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1b2a] to-[#0a0a1a]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#00f2ff] text-sm tracking-[0.3em] uppercase font-medium">Destinasyonlar</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-glow text-[#00f2ff]">Gezegen</span> <span className="text-white">Seçin</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Her destinasyon benzersiz bir macera sunar. Hayalinizdeki uzay yolculuğunu seçin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: destination.color }}
                >
                  {destination.name}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: destination.color }}>
                  {destination.name}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{destination.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-[#00f2ff]" />
                    <span className="text-xs text-gray-500">Süre</span>
                    <p className="text-sm font-semibold text-white">{destination.duration}</p>
                  </div>
                  <div className="text-center">
                    <Thermometer className="w-5 h-5 mx-auto mb-1 text-[#00f2ff]" />
                    <span className="text-xs text-gray-500">Sıcaklık</span>
                    <p className="text-sm font-semibold text-white">{destination.temperature}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-5 h-5 mx-auto mb-1 text-[#00f2ff]" />
                    <span className="text-xs text-gray-500">Yerçekimi</span>
                    <p className="text-sm font-semibold text-white">{destination.gravity}g</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-transparent border-2 hover:bg-white/5 font-semibold transition-all duration-300"
                  style={{ borderColor: destination.color, color: destination.color }}
                >
                  Detayları Gör
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          *Andromeda yolculuğu kriyojenik uyku teknolojisi ile gerçekleştirilir.
        </p>
      </div>
    </section>
  )
}
