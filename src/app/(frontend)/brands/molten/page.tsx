'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Target, Star, Phone, MessageCircle, Eye } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp-button'

const moltenProducts = [
  {
    category: 'Basketballs',
    description: 'Official Olympic and FIBA approved basketballs for all levels',
    products: [
      {
        name: 'Molten GG7X',
        description: 'Official FIBA approved basketball for international competitions',
        features: ['FIBA Approved', 'Premium Leather', 'Perfect Bounce'],
        priceRange: 'LKR 8,000 - 12,000',
      },
      {
        name: 'Molten BGR7',
        description: 'High-quality rubber basketball for outdoor play',
        features: ['Weather Resistant', 'Durable Rubber', 'Excellent Grip'],
        priceRange: 'LKR 3,500 - 5,500',
      },
      {
        name: 'Molten B7G3800',
        description: 'Training basketball for schools and clubs',
        features: ['Synthetic Leather', 'Good Bounce', 'Affordable'],
        priceRange: 'LKR 2,500 - 4,000',
      },
      {
        name: 'Molten Mini Basketball',
        description: 'Size 3 basketball for youth training',
        features: ['Youth Size', 'Soft Touch', 'Training Focused'],
        priceRange: 'LKR 1,500 - 2,500',
      },
    ],
  },
  {
    category: 'Volleyballs',
    description: 'Official Olympic and FIVB approved volleyballs',
    products: [
      {
        name: 'Molten V5M5000',
        description: 'Official FIVB approved volleyball for international play',
        features: ['FIVB Approved', 'Microfiber Leather', 'Perfect Flight'],
        priceRange: 'LKR 6,000 - 9,000',
      },
      {
        name: 'Molten V5B1500',
        description: 'High-quality training volleyball',
        features: ['Synthetic Leather', 'Consistent Performance', 'Club Standard'],
        priceRange: 'LKR 3,000 - 4,500',
      },
      {
        name: 'Molten Beach Volleyball',
        description: 'Official beach volleyball for outdoor play',
        features: ['Water Resistant', 'Soft Touch', 'Beach Approved'],
        priceRange: 'LKR 4,000 - 6,000',
      },
      {
        name: 'Molten Recreational Volleyball',
        description: 'Entry-level volleyball for beginners',
        features: ['Soft PVC', 'Easy to Handle', 'Great Value'],
        priceRange: 'LKR 1,800 - 2,800',
      },
    ],
  },
  {
    category: 'Training Equipment',
    description: 'Professional training aids for basketball and volleyball',
    products: [
      {
        name: 'Molten Ball Cart',
        description: 'Professional ball storage and transport cart',
        features: ['Holds 15 Balls', 'Easy Mobility', 'Durable Construction'],
        priceRange: 'LKR 25,000 - 35,000',
      },
      {
        name: 'Molten Ball Pump',
        description: 'Professional dual-action ball pump',
        features: ['Dual Action', 'Pressure Gauge', 'Multiple Needles'],
        priceRange: 'LKR 2,500 - 4,000',
      },
      {
        name: 'Molten Training Cones',
        description: 'Bright training cones for drills',
        features: ['Bright Colors', 'Stackable', 'Set of 12'],
        priceRange: 'LKR 2,000 - 3,000',
      },
      {
        name: 'Molten Whistle',
        description: 'Professional referee whistle',
        features: ['Clear Sound', 'Comfortable Grip', 'Official Standard'],
        priceRange: 'LKR 800 - 1,500',
      },
    ],
  },
  {
    category: 'Court Accessories',
    description: 'Essential court equipment and accessories',
    products: [
      {
        name: 'Molten Scoreboard',
        description: 'Professional portable scoreboard',
        features: ['Large Display', 'Easy Operation', 'Portable Design'],
        priceRange: 'LKR 15,000 - 25,000',
      },
      {
        name: 'Molten Net System',
        description: 'Professional volleyball net system',
        features: ['Tournament Standard', 'Easy Setup', 'Durable Materials'],
        priceRange: 'LKR 12,000 - 18,000',
      },
      {
        name: 'Molten Basketball Hoop',
        description: 'Portable basketball hoop system',
        features: ['Adjustable Height', 'Stable Base', 'Professional Rim'],
        priceRange: 'LKR 35,000 - 55,000',
      },
    ],
  },
]

export default function MoltenProductsPage() {
  return (
    <main className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFD700] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FF3D00] rounded-full blur-3xl animate-pulse"></div>
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
              <Target className="w-8 h-8 text-[#1A1A1A]" />
              <Badge className="bg-[#1A1A1A] text-[#FFD700] px-6 py-2 text-sm font-bold">
                INNOVATION LEADER
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              MOLTEN
              <span className="block text-[#1A1A1A]">BASKETBALL & VOLLEYBALL</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the complete Molten collection. As the official supplier for Olympic Games
              and World Championships, Molten provides the highest quality balls and equipment for
              basketball and volleyball.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                size="lg"
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-4 text-lg font-bold rounded-full"
                message="Hello Ralhum Sports! I'm interested in Molten basketball and volleyball equipment. Please provide me with more information and pricing. Thank you!"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                GET QUOTE
              </WhatsAppButton>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#FFD700] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
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
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              PRODUCT CATEGORIES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-6">
              COMPLETE
              <span className="block text-[#FF3D00]">MOLTEN RANGE</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional basketball and volleyball equipment trusted by Olympic athletes and teams
              worldwide.
            </p>
          </div>

          <div className="space-y-16">
            {moltenProducts.map((category) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-black text-[#FFD700] mb-4">
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
                          <h5 className="font-bold text-[#FFD700] mb-2 text-sm">KEY FEATURES:</h5>
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
                          className="w-full border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A] font-bold transition-all duration-300"
                          message={`Hello Ralhum Sports! I'm interested in the Molten ${product.name}. Please provide me with more details, availability, and pricing information. Thank you!`}
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
      <section className="py-16 bg-gradient-to-r from-[#FFD700] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">READY TO PLAY LIKE THE PROS?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our basketball and volleyball specialists for equipment recommendations and team
            pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              size="lg"
              className="bg-white text-[#FFD700] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
              message="Hello Ralhum Sports! I need assistance with Molten basketball and volleyball equipment selection. Please contact me to discuss my requirements. Thank you!"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              CHAT WITH EXPERT
            </WhatsAppButton>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#FFD700] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
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
