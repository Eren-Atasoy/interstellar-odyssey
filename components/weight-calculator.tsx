"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale, Rocket } from "lucide-react"

const planets = [
  { name: "Mars", gravity: 0.38, color: "#ff6b35" },
  { name: "Jüpiter", gravity: 2.53, color: "#f4a261" },
  { name: "Ay", gravity: 0.166, color: "#c0c0c0" },
  { name: "Venüs", gravity: 0.91, color: "#ffd700" },
  { name: "Satürn", gravity: 1.07, color: "#daa520" },
]

export function WeightCalculator() {
  const [earthWeight, setEarthWeight] = useState<string>("")
  const [selectedPlanet, setSelectedPlanet] = useState<string>("Mars")
  const [result, setResult] = useState<number | null>(null)

  const calculateWeight = () => {
    const weight = Number.parseFloat(earthWeight)
    if (isNaN(weight) || weight <= 0) {
      setResult(null)
      return
    }
    const planet = planets.find((p) => p.name === selectedPlanet)
    if (planet) {
      setResult(Math.round(weight * planet.gravity * 100) / 100)
    }
  }

  const selectedPlanetData = planets.find((p) => p.name === selectedPlanet)

  return (
    <section className="py-24 px-4 relative" id="calculator">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1b2a]/50 to-[#0a0a1a]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#bc13fe] text-sm tracking-[0.3em] uppercase font-medium">İnteraktif Araç</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-glow-purple text-[#bc13fe]">Ağırlık</span>{" "}
            <span className="text-white">Hesaplayıcı</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Dünyadaki kilonuzu girin ve farklı gezegenlerde ne kadar ağırlığınız olacağını keşfedin!
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 neon-glow-purple">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-[#00f2ff] font-medium">
                  Dünyadaki Kilonuz (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={earthWeight}
                  onChange={(e) => setEarthWeight(e.target.value)}
                  className="bg-[#0a0a1a]/50 border-[#00f2ff]/30 focus:border-[#00f2ff] text-white text-lg h-14 placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#00f2ff] font-medium">Gezegen Seçin</Label>
                <div className="flex flex-wrap gap-2">
                  {planets.map((planet) => (
                    <button
                      key={planet.name}
                      onClick={() => setSelectedPlanet(planet.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedPlanet === planet.name
                          ? "text-[#0a0a1a] scale-105"
                          : "bg-transparent border border-gray-600 text-gray-400 hover:border-gray-400"
                      }`}
                      style={{
                        backgroundColor: selectedPlanet === planet.name ? planet.color : undefined,
                      }}
                    >
                      {planet.name}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={calculateWeight}
                className="w-full bg-[#bc13fe] hover:bg-[#bc13fe]/80 text-white font-bold text-lg h-14 neon-glow-purple transition-all duration-300 hover:scale-105"
              >
                <Scale className="w-5 h-5 mr-2" />
                Hesapla
              </Button>
            </div>

            {/* Result Section */}
            <div className="glass-card rounded-2xl p-8 text-center">
              <Rocket
                className="w-16 h-16 mx-auto mb-4 animate-float"
                style={{ color: selectedPlanetData?.color || "#00f2ff" }}
              />

              {result !== null ? (
                <>
                  <p className="text-gray-400 mb-2">{selectedPlanet}&#39;de ağırlığınız:</p>
                  <p className="text-6xl font-bold mb-2" style={{ color: selectedPlanetData?.color || "#00f2ff" }}>
                    {result}
                  </p>
                  <p className="text-2xl text-gray-300">kilogram</p>
                  <p className="text-sm text-gray-500 mt-4">Yerçekimi katsayısı: {selectedPlanetData?.gravity}g</p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-lg">Kilonuzu girin ve gezegen seçerek</p>
                  <p className="text-[#00f2ff] text-lg font-medium">uzay ağırlığınızı keşfedin!</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
