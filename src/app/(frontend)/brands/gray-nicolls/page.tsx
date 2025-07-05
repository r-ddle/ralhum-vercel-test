"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Star, Phone, MessageCircle, Eye } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

const grayNicollsProducts = [
  {
    category: "Cricket Bats",
    description: "Professional and recreational cricket bats for all skill levels",
    products: [
      {
        name: "Powerbow 6X Players",
        description: "Professional grade bat with traditional feel and modern performance",
        features: ["Grade 1+ English Willow", "Traditional Handle", "Professional Weight"],
        priceRange: "LKR 45,000 - 65,000",
      },
      {
        name: "Powerbow 6X Academy",
        description: "High-quality bat perfect for club and academy players",
        features: ["Grade 2 English Willow", "Balanced Weight", "Excellent Value"],
        priceRange: "LKR 25,000 - 35,000",
      },
      {
        name: "Powerbow 6X Junior",
        description: "Specially designed bats for young cricketers",
        features: ["Kashmir Willow", "Lightweight Design", "Youth Sizes"],
        priceRange: "LKR 8,000 - 15,000",
      },
      {
        name: "Powerbow 6X County",
        description: "Premium county-level cricket bat",
        features: ["Premium English Willow", "Hand-Selected Clefts", "Professional Finish"],
        priceRange: "LKR 35,000 - 50,000",
      },
    ],
  },
  {
    category: "Protective Equipment",
    description: "Complete range of cricket protective gear for maximum safety",
    products: [
      {
        name: "Test Batting Pads",
        description: "Professional-grade batting pads used in international cricket",
        features: ["Lightweight Design", "Superior Protection", "Comfortable Fit"],
        priceRange: "LKR 12,000 - 18,000",
      },
      {
        name: "Atomic Cricket Helmet",
        description: "Advanced protection helmet with modern design",
        features: ["Titanium Grille", "Ventilation System", "Adjustable Fit"],
        priceRange: "LKR 15,000 - 25,000",
      },
      {
        name: "Test Batting Gloves",
        description: "Premium batting gloves for professional players",
        features: ["Leather Palm", "Finger Protection", "Excellent Grip"],
        priceRange: "LKR 8,000 - 12,000",
      },
      {
        name: "Thigh Guards",
        description: "Essential protection for batsmen",
        features: ["Lightweight Foam", "Secure Strapping", "Comfortable Wear"],
        priceRange: "LKR 3,000 - 5,000",
      },
    ],
  },
  {
    category: "Cricket Balls",
    description: "Match and practice cricket balls meeting international standards",
    products: [
      {
        name: "County Special",
        description: "Premium match ball for professional cricket",
        features: ["Hand-Stitched", "Alum Tanned Leather", "Consistent Bounce"],
        priceRange: "LKR 3,500 - 4,500",
      },
      {
        name: "Club Special",
        description: "High-quality ball for club cricket",
        features: ["Machine Stitched", "Durable Construction", "Good Value"],
        priceRange: "LKR 2,000 - 3,000",
      },
      {
        name: "Practice Balls",
        description: "Durable balls for training and practice",
        features: ["Synthetic Leather", "Weather Resistant", "Long Lasting"],
        priceRange: "LKR 800 - 1,500",
      },
    ],
  },
  {
    category: "Cricket Accessories",
    description: "Essential cricket accessories and equipment",
    products: [
      {
        name: "Kit Bags",
        description: "Spacious and durable cricket kit bags",
        features: ["Multiple Compartments", "Wheel Options", "Weather Resistant"],
        priceRange: "LKR 8,000 - 15,000",
      },
      {
        name: "Stumps & Bails",
        description: "Professional quality stumps and bails",
        features: ["Ash Wood", "Standard Dimensions", "Durable Finish"],
        priceRange: "LKR 2,500 - 4,000",
      },
      {
        name: "Boundary Markers",
        description: "Professional boundary marking equipment",
        features: ["Bright Colors", "Weather Resistant", "Easy Setup"],
        priceRange: "LKR 500 - 1,000",
      },
    ],
  },
]

export default function GrayNicollsProductsPage() {
  return (
    <main className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#003DA5] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#AEEA00] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <a href="/brands" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Brands
            </a>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-[#FFD700]" />
              <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold">SINCE 1855</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              GRAY-NICOLLS
              <span className="block text-[#FFD700]">CRICKET EQUIPMENT</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the complete range of Gray-Nicolls cricket equipment. From professional-grade bats to essential
              protective gear, we offer everything you need to excel on the cricket field.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                size="lg"
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-4 text-lg font-bold rounded-full"
                message="Hello Ralhum Sports! I'm interested in Gray-Nicolls cricket equipment. Please provide me with more information and pricing. Thank you!"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                GET QUOTE
              </WhatsAppButton>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                CALL US
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#003DA5] text-white px-6 py-2 text-sm font-bold mb-4">PRODUCT CATEGORIES</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-6">
              COMPLETE
              <span className="block text-[#FF3D00]">CRICKET RANGE</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional cricket equipment trusted by players worldwide, from grassroots to international level.
            </p>
          </div>

          <div className="space-y-16">
            {grayNicollsProducts.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-black text-[#003DA5] dark:text-[#4A90E2] mb-4">
                    {category.category}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{category.description}</p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product, productIndex) => (
                    <Card
                      key={product.name}
                      className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white dark:bg-gray-900"
                    >
                      <CardContent className="p-6">
                        {/* Product Header */}
                        <div className="mb-4">
                          <h4 className="text-xl font-black text-[#1A1A1A] dark:text-white mb-2">{product.name}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <h5 className="font-bold text-[#003DA5] dark:text-[#4A90E2] mb-2 text-sm">KEY FEATURES:</h5>
                          <ul className="space-y-1">
                            {product.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                <Star className="w-3 h-3 text-[#FFD700] flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                          <Badge className="bg-[#AEEA00] text-[#1A1A1A] font-bold">{product.priceRange}</Badge>
                        </div>

                        {/* Action Button */}
                        <WhatsAppButton
                          variant="outline"
                          className="w-full border-[#003DA5] dark:border-[#4A90E2] text-[#003DA5] dark:text-[#4A90E2] hover:bg-[#003DA5] dark:hover:bg-[#4A90E2] hover:text-white font-bold transition-all duration-300"
                          message={`Hello Ralhum Sports! I'm interested in the Gray-Nicolls ${product.name}. Please provide me with more details, availability, and pricing information. Thank you!`}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          GET INFO
                        </WhatsAppButton>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">READY TO UPGRADE YOUR CRICKET GEAR?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our cricket equipment specialists for personalized recommendations and bulk order pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
              message="Hello Ralhum Sports! I need assistance with Gray-Nicolls cricket equipment selection. Please contact me to discuss my requirements. Thank you!"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              CHAT WITH EXPERT
            </WhatsAppButton>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2" />
              CALL: +94 11 250 8082
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
