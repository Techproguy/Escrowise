import type React from "react"
import { Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#666666] pt-12 sm:pt-16 lg:pt-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Company Information */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Company Information</h3>
            <nav className="mt-3 sm:mt-4">
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a href="/about" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Press & Media
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Escrow Services */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Escrow Services</h3>
            <nav className="mt-3 sm:mt-4">
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a
                    href="/services/cryptocurrency"
                    className="text-sm sm:text-base hover:text-orange-200 transition-colors"
                  >
                    Bitcoin & Cryptocurrency Escrow
                  </a>
                </li>
                <li>
                  <a
                    href="/services/real-estate"
                    className="text-sm sm:text-base hover:text-orange-200 transition-colors"
                  >
                    Real Estate Escrow
                  </a>
                </li>
                <li>
                  <a
                    href="/services/financial"
                    className="text-sm sm:text-base hover:text-orange-200 transition-colors"
                  >
                    Financial Escrow
                  </a>
                </li>
                <li>
                  <a href="/services/broker" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Broker Escrow
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Support & Resources */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Support & Resources</h3>
            <nav className="mt-3 sm:mt-4">
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a href="/help" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/how-it-works" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/security" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Security & Compliance
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Legal & Compliance */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Legal & Compliance</h3>
            <nav className="mt-3 sm:mt-4">
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a href="/terms" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/compliance" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    Regulatory Compliance
                  </a>
                </li>
                <li>
                  <a href="/aml-kyc" className="text-sm sm:text-base hover:text-orange-200 transition-colors">
                    AML & KYC Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Us */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 mt-6 sm:mt-8 lg:mt-0">
            <h3 className="text-lg sm:text-xl font-bold tracking-tighter">Contact Us</h3>
            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="text-sm sm:text-base">+1-421-831-3871</span>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="hover:text-orange-200 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-orange-200 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-orange-200 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-orange-200 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-12 sm:mt-16 border-zinc-400" />

        <div className="h-[363px] flex flex-col relative">
          <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a5521d5d1f5ca5fd6f5df217cdc17d27640dfa4?placeholderIfAbsent=true&apiKey=4da4e5020e3c4dcf85e2d10d2c5dbe02"
              alt="Escrowise logo"
              className="w-[280px] sm:w-[350px] md:w-[400px] max-w-full h-auto"
            />
          </div>
          <p className="text-sm text-zinc-200 absolute bottom-[100px] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            Copyright © 2025 Escrowise, Inc. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

