"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Target } from "lucide-react"

const brands = [
  {
    name: "Gray-Nicolls",
    heritage: "Since 1855",
    specialty: "Cricket Excellence",
    description: "Premium cricket bats & equipment trusted by professionals worldwide",
    color: "from-[#003DA5] to-[#1A1A1A]",
    icon: Trophy,
    achievements: ["Official England Cricket", "World Cup Heritage", "Professional Choice"],
  },
  {
    name: "Gilbert",
    heritage: "Since 1823",
    specialty: "Rugby World Leader",
    description: "World's #1 rugby brand, official Rugby World Cup ball supplier",
    color: "from-[#FF3D00] to-[#1A1A1A]",
    icon: Award,
    achievements: ["Rugby World Cup Official", "Professional Rugby", "Global Standard"],
  },
  {
    name: "Grays",
    heritage: "Field Sports",
    specialty: "Hockey Excellence",
    description: "Hockey & field sports innovation trusted by Olympic athletes",
    color: "from-[#AEEA00] to-[#1A1A1A]",
    icon: Star,
    achievements: ["Olympic Standard", "Professional Hockey", "Field Sports Leader"],
  },
  {
    name: "Molten",
    heritage: "Innovation",
    specialty: "Basketball & Volleyball",
    description: "Official tournament supplier for basketball & volleyball worldwide",
    color: "from-[#FFD700] to-[#1A1A1A]",
    icon: Target,
    achievements: ["Olympic Official", "Tournament Standard", "Professional Choice"],
  },
]

export default function BrandPartners() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#003DA5] text-white px-6 py-2 text-sm font-bold mb-4">EXCLUSIVE PARTNERSHIPS</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-6">
            WORLD-RENOWNED
            <span className="block text-[#FF3D00]">SPORTS BRANDS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As Sri Lanka's exclusive distributor, we bring you authentic equipment from the world's most trusted sports
            brands
          </p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => {
            const IconComponent = brand.icon
            return (
              <Card
                key={brand.name}
                className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-br ${brand.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="relative z-10">
                      <IconComponent className="w-8 h-8 mb-4" />
                      <h3 className="text-2xl font-black mb-2">{brand.name}</h3>
                      <p className="text-sm opacity-90">{brand.heritage}</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <Badge className="bg-[#FFD700] text-[#1A1A1A] mb-3 font-bold">{brand.specialty}</Badge>
                    <p className="text-gray-600 mb-4 leading-relaxed">{brand.description}</p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {brand.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#AEEA00] rounded-full"></div>
                          <span className="text-sm text-gray-700 font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Experience the difference of authentic, professional-grade equipment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge className="bg-[#003DA5] text-white px-8 py-3 text-base font-bold">
              ✓ Exclusive Sri Lankan Distributor
            </Badge>
            <Badge className="bg-[#FF3D00] text-white px-8 py-3 text-base font-bold">✓ Authentic Guarantee</Badge>
            <Badge className="bg-[#AEEA00] text-[#1A1A1A] px-8 py-3 text-base font-bold">✓ Professional Support</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
