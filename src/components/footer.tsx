import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] dark:bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black text-[#FFD700] mb-4">
              RALHUM
              <span className="text-[#FF3D00]">SPORTS</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
              Sri Lanka's #1 sports equipment distributor for 25+ years. Exclusive distributor of world-renowned sports
              brands.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-[#FFD700] cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-[#FFD700] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFD700]">QUICK LINKS</h3>
            <ul className="space-y-2">
              {["Home", "Brands", "Sports", "Products", "About", "News", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFD700]">SPORTS</h3>
            <ul className="space-y-2">
              {["Cricket", "Rugby", "Basketball", "Hockey", "Volleyball", "Tennis", "Badminton"].map((sport) => (
                <li key={sport}>
                  <a href="/sports" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                    {sport}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFD700]">CONTACT</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#AEEA00] mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base">
                  27, Hildon Place
                  <br />
                  Colombo 04, Sri Lanka
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#AEEA00] flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base">+94 11 250 8082</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#AEEA00] flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base">info@ralhumsports.lk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Ralhum Trading Company Pvt Ltd. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Part of S.M.M.Muhlar & Co - 75+ Years of Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
