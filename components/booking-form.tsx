"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "İsim alanı zorunludur"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "İsim en az 2 karakter olmalıdır"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.destination) {
      newErrors.destination = "Lütfen bir destinasyon seçiniz"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", destination: "" })
      }, 3000)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-24 px-4 relative" id="booking">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] to-[#0d1b2a]" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="glass rounded-3xl p-12 text-center neon-glow">
            <CheckCircle className="w-20 h-20 text-[#00f2ff] mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold text-[#00f2ff] mb-4">Rezervasyonunuz Alındı!</h3>
            <p className="text-gray-300 text-lg">
              Teşekkürler, {formData.name}! Uzay yolculuğunuz için sizinle en kısa sürede iletişime geçeceğiz.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 relative" id="booking">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] to-[#0d1b2a]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#00f2ff] text-sm tracking-[0.3em] uppercase font-medium">Rezervasyon</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">Yolculuğunuzu</span>{" "}
            <span className="text-glow text-[#00f2ff]">Planlayın</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Formu doldurun, uzay macerası ekibimiz sizinle iletişime geçsin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12 neon-glow">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#00f2ff] font-medium">
                Adınız Soyadınız
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Neil Armstrong"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`bg-[#0a0a1a]/50 border-[#00f2ff]/30 focus:border-[#00f2ff] text-white text-lg h-14 placeholder:text-gray-600 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#00f2ff] font-medium">
                E-posta Adresiniz
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="astronaut@space.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`bg-[#0a0a1a]/50 border-[#00f2ff]/30 focus:border-[#00f2ff] text-white text-lg h-14 placeholder:text-gray-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Destination Select */}
            <div className="space-y-2">
              <Label className="text-[#00f2ff] font-medium">Gidilecek Gezegen</Label>
              <Select
                value={formData.destination}
                onValueChange={(value) => setFormData({ ...formData, destination: value })}
              >
                <SelectTrigger
                  className={`bg-[#0a0a1a]/50 border-[#00f2ff]/30 focus:border-[#00f2ff] text-white text-lg h-14 ${
                    errors.destination ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Destinasyon seçiniz" />
                </SelectTrigger>
                <SelectContent className="bg-[#0d1b2a] border-[#00f2ff]/30">
                  <SelectItem value="mars" className="text-white hover:bg-[#00f2ff]/10">
                    🔴 Mars - Kızıl Gezegen
                  </SelectItem>
                  <SelectItem value="jupiter" className="text-white hover:bg-[#00f2ff]/10">
                    🟠 Jüpiter - Gaz Devi
                  </SelectItem>
                  <SelectItem value="andromeda" className="text-white hover:bg-[#00f2ff]/10">
                    🌌 Andromeda - Galaksi Yolculuğu
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.destination && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.destination}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#00f2ff] hover:bg-[#00f2ff]/80 text-[#0a0a1a] font-bold text-lg h-14 neon-glow transition-all duration-300 hover:scale-105 mt-4"
            >
              <Send className="w-5 h-5 mr-2" />
              Rezervasyon Talebi Gönder
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
