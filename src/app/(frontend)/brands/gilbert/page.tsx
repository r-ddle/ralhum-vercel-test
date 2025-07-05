'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Award, Star, Phone, MessageCircle, Eye } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp-button'

const gilbertProducts = [
  {
    category: 'Rugby Balls',
    description: 'Official Rugby World Cup balls and training equipment',
    products: [
      {
        name: 'Gilbert Sirius XV',
        description: 'Official match ball used in professional rugby competitions',
        features: ['Hand-Stitched', 'Synthetic Leather', 'Perfect Weight Balance'],
        priceRange: 'LKR 8,000 - 12,000',
      },
      {
        name: 'Gilbert Omega',
        description: 'High-quality training ball for clubs and schools',
        features: ['Durable Construction', 'All-Weather Performance', 'Excellent Value'],
        priceRange: 'LKR 4,500 - 6,500',
      },
      {
        name: 'Gilbert G-TR4000',
        description: 'Professional training ball with superior grip',
        features: ['Advanced Grip Technology', 'Weather Resistant', 'Professional Standard'],
        priceRange: 'LKR 6,000 - 8,000',
      },
      {
        name: 'Gilbert Mini Rugby Ball',
        description: 'Perfect for youth training and promotional use',
        features: ['Size 1 & 2 Available', 'Soft Touch', 'Ideal for Beginners'],
        priceRange: 'LKR 2,000 - 3,500',
      },
    ],
  },
  {
    category: 'Protective Equipment',
    description: 'Professional rugby protective gear for player safety',
    products: [
      {
        name: 'Gilbert Atomic V3 Headguard',
        description: 'Advanced head protection for rugby players',
        features: ['IRB Approved', 'Lightweight Design', 'Superior Ventilation'],
        priceRange: 'LKR 8,000 - 12,000',
      },
      {
        name: 'Gilbert Shoulder Pads',
        description: 'Professional shoulder protection system',
        features: ['Flexible Design', 'Impact Absorption', 'Comfortable Fit'],
        priceRange: 'LKR 6,000 - 10,000',
      },
      {
        name: 'Gilbert Body Armour',
        description: 'Comprehensive body protection for forwards',
        features: ['Full Torso Protection', 'Breathable Material', 'Professional Grade'],
        priceRange: 'LKR 12,000 - 18,000',
      },
      {
        name: 'Gilbert Shin Guards',
        description: 'Essential leg protection for rugby players',
        features: ['Lightweight Foam', 'Secure Strapping', 'Comfortable Wear'],
        priceRange: 'LKR 3,000 - 5,000',
      },
    ],
  },
  {
    category: 'Training Equipment',
    description: 'Professional rugby training aids and equipment',
    products: [
      {
        name: 'Gilbert Tackle Bags',
        description: 'Heavy-duty tackle training equipment',
        features: ['Reinforced Construction', 'Multiple Sizes', 'Professional Quality'],
        priceRange: 'LKR 15,000 - 25,000',
      },
      {
        name: 'Gilbert Agility Poles',
        description: 'Flexible training poles for skill development',
        features: ['Flexible Design', 'Bright Colors', 'Set of 6'],
        priceRange: 'LKR 3,000 - 5,000',
      },
      {
        name: 'Gilbert Training Cones',
        description: 'Essential training markers for drills',
        features: ['Bright Orange', 'Stackable Design', 'Set of 20'],
        priceRange: 'LKR 2,000 - 3,000',
      },
      {
        name: 'Gilbert Kicking Tees',
        description: 'Professional kicking tees for accurate kicks',
        features: ['Multiple Heights', 'Stable Base', 'Professional Standard'],
        priceRange: 'LKR 1,500 - 2,500',
      },
    ],
  },
  {
    category: 'Team Accessories',
    description: 'Essential team equipment and accessories',
    products: [
      {
        name: 'Gilbert Kit Bags',
        description: 'Spacious team kit bags for equipment storage',
        features: ['Large Capacity', 'Durable Material', 'Team Branding Options'],
        priceRange: 'LKR 8,000 - 15,000',
      },
      {
        name: 'Gilbert Water Bottles',
        description: 'Professional sports water bottles',
        features: ['BPA Free', 'Easy Grip', 'Team Colors Available'],
        priceRange: 'LKR 800 - 1,500',
      },
      {
        name: 'Gilbert Ball Pumps',
        description: 'Professional ball inflation equipment',
        features: ['Dual Action', 'Pressure Gauge', 'Multiple Needles'],
        priceRange: 'LKR 2,000 - 3,500',
      },
    ],
  },
]

export default function GilbertProductsPage() {
  return (
    <main className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FF3D00] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#AEEA00] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <a
              href="/brands"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Brands
            </a>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-[#FFD700]" />
              <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold">
                SINCE 1823
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              GILBERT
              <span className="block text-[#FFD700]">RUGBY EQUIPMENT</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore the complete Gilbert rugby collection. As the official Rugby World Cup ball
              supplier, Gilbert provides the highest quality equipment for players at every level.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                size="lg"
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-4 text-lg font-bold rounded-full"
                message="Hello Ralhum Sports! I'm interested in Gilbert rugby equipment. Please provide me with more information and pricing. Thank you!"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                GET QUOTE
              </WhatsAppButton>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#FF3D00] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
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
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">
              PRODUCT CATEGORIES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-6">
              COMPLETE
              <span className="block text-[#FF3D00]">RUGBY RANGE</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional rugby equipment trusted by teams worldwide, from grassroots to Rugby
              World Cup level.
            </p>
          </div>

          <div className="space-y-16">
            {gilbertProducts.map((category) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-black text-[#FF3D00] mb-4">
                    {category.category}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <Card
                      key={product.name}
                      className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white dark:bg-gray-900"
                    >
                      <CardContent className="p-6">
                        {/* Product Header */}
                        <div className="mb-4">
                          <h4 className="text-xl font-black text-[#1A1A1A] dark:text-white mb-2">
                            {product.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <h5 className="font-bold text-[#FF3D00] mb-2 text-sm">KEY FEATURES:</h5>
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
                          <Badge className="bg-[#AEEA00] text-[#1A1A1A] font-bold">
                            {product.priceRange}
                          </Badge>
                        </div>

                        {/* Action Button */}
                        <WhatsAppButton
                          variant="outline"
                          className="w-full border-[#FF3D00] text-[#FF3D00] hover:bg-[#FF3D00] hover:text-white font-bold transition-all duration-300"
                          message={`Hello Ralhum Sports! I'm interested in the Gilbert ${product.name}. Please provide me with more details, availability, and pricing information. Thank you!`}
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
      <section className="py-16 bg-gradient-to-r from-[#FF3D00] to-[#003DA5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            READY TO ELEVATE YOUR RUGBY GAME?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our rugby equipment specialists for personalized recommendations and team order
            pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              size="lg"
              className="bg-white text-[#FF3D00] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
              message="Hello Ralhum Sports! I need assistance with Gilbert rugby equipment selection. Please contact me to discuss my requirements. Thank you!"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              CHAT WITH EXPERT
            </WhatsAppButton>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#FF3D00] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
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
