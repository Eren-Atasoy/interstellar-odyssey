import { Rocket, Twitter, Instagram, Youtube, Globe } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 relative border-t border-[#00f2ff]/10">
      <div className="absolute inset-0 bg-[#0a0a1a]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Rocket className="w-8 h-8 text-[#00f2ff]" />
            <div>
              <h3 className="text-xl font-bold">
                <span className="text-[#00f2ff]">Interstellar</span> <span className="text-[#bc13fe]">Odyssey</span>
              </h3>
              <p className="text-gray-500 text-sm">Uzay Seyahat Acentesi</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00f2ff] hover:neon-glow transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#bc13fe] hover:neon-glow-purple transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00f2ff] hover:neon-glow transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#bc13fe] hover:neon-glow-purple transition-all duration-300"
              aria-label="Web"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#00f2ff]/10 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Interstellar Odyssey. Tüm hakları evrensel yasalarla korunmaktadır.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            🚀 Galaksiler Arası Seyahat Lisansı: #IO-2157-ALPHA | Yıldızlar Federasyonu Onaylı
          </p>
        </div>
      </div>
    </footer>
  )
}
