'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Award, Star, Target, Globe, ArrowRight, Eye, Phone } from 'lucide-react'

const brandDetails = [
  {
    name: 'Gray-Nicolls',
    category: 'Cricket',
    heritage: 'Since 1855',
    tagline: "The World's Finest Cricket Equipment",
    description:
      "Gray-Nicolls has been crafting the world's finest cricket equipment for over 165 years. From village greens to international stadiums, our bats have been wielded by cricket legends and aspiring players alike.",
    image: '',
    color: 'from-[#003DA5] to-[#1A1A1A]',
    icon: Trophy,
    achievements: [
      'Official England Cricket Supplier',
      'Used in Cricket World Cups',
      'Trusted by International Players',
      '165+ Years of Excellence',
    ],
    products: [
      { name: 'Cricket Bats', description: 'Professional and recreational bats for all levels' },
      { name: 'Protective Gear', description: 'Helmets, pads, and gloves for maximum safety' },
      {
        name: 'Cricket Balls',
        description: 'Match and practice balls meeting international standards',
      },
      { name: 'Accessories', description: 'Kit bags, stumps, and training equipment' },
    ],
    featured: true,
    slug: 'gray-nicolls',
  },
  {
    name: 'Gilbert',
    category: 'Rugby',
    heritage: 'Since 1823',
    tagline: "The World's #1 Rugby Brand",
    description:
      'Gilbert has been at the heart of rugby for 200 years. As the official ball supplier for the Rugby World Cup, we continue to innovate and inspire players at every level of the game.',
    image: '',
    color: 'from-[#FF3D00] to-[#1A1A1A]',
    icon: Award,
    achievements: [
      'Official Rugby World Cup Ball',
      '200 Years of Rugby Heritage',
      'Used by Professional Teams Worldwide',
      'Innovation Leaders in Rugby Equipment',
    ],
    products: [
      { name: 'Rugby Balls', description: 'Match and training balls for all levels' },
      {
        name: 'Training Equipment',
        description: 'Cones, tackle bags, and skill development tools',
      },
      { name: 'Protective Gear', description: 'Headguards, shoulder pads, and body protection' },
      { name: 'Team Accessories', description: 'Kit bags, water bottles, and team equipment' },
    ],
    featured: true,
    slug: 'gilbert',
  },
  {
    name: 'Molten',
    category: 'Basketball & Volleyball',
    heritage: 'Innovation Leader',
    tagline: 'Official Tournament Supplier Worldwide',
    description:
      "Molten is the world's leading manufacturer of balls for basketball and volleyball. Our commitment to innovation and quality has made us the official supplier for Olympic Games and World Championships.",
    image: '',
    color: 'from-[#FFD700] to-[#1A1A1A]',
    icon: Target,
    achievements: [
      'Official Olympic Games Supplier',
      'FIBA World Championship Official',
      'Used in Professional Leagues',
      'Innovation in Ball Technology',
    ],
    products: [
      { name: 'Basketballs', description: 'Indoor and outdoor balls for all skill levels' },
      { name: 'Volleyballs', description: 'Competition and recreational volleyballs' },
      { name: 'Training Equipment', description: 'Ball carts, pumps, and training aids' },
      { name: 'Court Accessories', description: 'Scoreboards, nets, and court equipment' },
    ],
    featured: true,
    slug: 'molten',
  },
  {
    name: 'Grays',
    category: 'Hockey',
    heritage: 'Field Sports Excellence',
    tagline: 'Trusted by Olympic Athletes',
    description:
      'Grays has been synonymous with hockey excellence for decades. Our innovative stick technology and protective equipment are trusted by Olympic athletes and recreational players worldwide.',
    image: '',
    color: 'from-[#AEEA00] to-[#1A1A1A]',
    icon: Star,
    achievements: [
      'Olympic Standard Equipment',
      'Professional Hockey Choice',
      'Field Sports Innovation Leader',
      'Trusted by International Teams',
    ],
    products: [
      { name: 'Hockey Sticks', description: 'Composite and wooden sticks for all positions' },
      { name: 'Protective Equipment', description: 'Shin guards, gloves, and goalkeeping gear' },
      { name: 'Hockey Balls', description: 'Match and training balls for all surfaces' },
      { name: 'Training Gear', description: 'Cones, goals, and skill development equipment' },
    ],
    featured: true,
    slug: 'grays',
  },
]

export default function BrandsPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const featuredBrands = brandDetails.filter((brand) => brand.featured)
  const otherBrands = brandDetails.filter((brand) => !brand.featured)

  return (
    <main className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#003DA5] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#AEEA00] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              EXCLUSIVE PARTNERSHIPS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              WORLD-RENOWNED
              <span className="block text-[#FF3D00]">SPORTS BRANDS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              As Sri Lanka's exclusive distributor, we bring you authentic equipment from the
              world's most trusted and respected sports brands. Each partnership represents decades
              of excellence and innovation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {brandDetails.map((brand) => (
                <Badge
                  key={brand.name}
                  className="bg-white/10 text-white px-4 py-2 font-bold border border-white/20"
                >
                  {brand.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">
              FLAGSHIP PARTNERSHIPS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-6">
              EXCLUSIVE
              <span className="block text-[#003DA5] dark:text-[#4A90E2]">BRAND PARTNERS</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our flagship partnerships with industry leaders, bringing you the finest sports
              equipment available in Sri Lanka.
            </p>
          </div>

          <div className="space-y-16">
            {featuredBrands.map((brand, index) => {
              const IconComponent = brand.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={brand.name}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Brand Image */}
                  <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={brand.image || 'https://placehold.co/600x400'}
                        alt={brand.name}
                        className="w-full h-80 object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${brand.color} opacity-80`}
                      ></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <IconComponent className="w-8 h-8 text-white" />
                          <Badge className="bg-white/20 text-white border-white/30">
                            {brand.heritage}
                          </Badge>
                        </div>
                        <h3 className="text-3xl font-black text-white">{brand.name}</h3>
                        <p className="text-white/90 font-medium">{brand.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Brand Content */}
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <Badge className="bg-[#AEEA00] text-[#1A1A1A] mb-4 font-bold">
                      {brand.category}
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white mb-4">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                      {brand.description}
                    </p>

                    {/* Achievements */}
                    <div className="grid md:grid-cols-2 gap-3 mb-8">
                      {brand.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Products */}
                    <div className="space-y-3 mb-8">
                      <h4 className="font-bold text-[#003DA5] dark:text-[#4A90E2] mb-3">
                        PRODUCT CATEGORIES:
                      </h4>
                      {brand.products.slice(0, 3).map((product) => (
                        <div key={product.name} className="border-l-4 border-[#AEEA00] pl-4">
                          <h5 className="font-bold text-gray-800 dark:text-gray-200">
                            {product.name}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href={`/brands/${brand.slug}`}>
                        <Button className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold rounded-full">
                          <Eye className="w-4 h-4 mr-2" />
                          VIEW PRODUCTS
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        className="border-2 border-[#003DA5] dark:border-[#4A90E2] text-[#003DA5] dark:text-[#4A90E2] hover:bg-[#003DA5] dark:hover:bg-[#4A90E2] hover:text-white font-bold rounded-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        GET QUOTE
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Other Brands Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#003DA5] text-white px-6 py-2 text-sm font-bold mb-4">
              ADDITIONAL PARTNERSHIPS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-6">
              MORE TRUSTED
              <span className="block text-[#FF3D00]">BRANDS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBrands.map((brand) => {
              const IconComponent = brand.icon
              return (
                <Card
                  key={brand.name}
                  className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white dark:bg-gray-900"
                >
                  <CardContent className="p-0">
                    {/* Brand Header */}
                    <div
                      className={`bg-gradient-to-br ${brand.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative z-10">
                        <IconComponent className="w-8 h-8 mb-4" />
                        <h3 className="text-2xl font-black mb-2">{brand.name}</h3>
                        <p className="text-sm opacity-90">{brand.heritage}</p>
                      </div>
                    </div>

                    {/* Brand Content */}
                    <div className="p-6">
                      <Badge className="bg-[#FFD700] text-[#1A1A1A] mb-3 font-bold">
                        {brand.category}
                      </Badge>
                      <h4 className="font-bold text-lg mb-2 dark:text-white">{brand.tagline}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {brand.description}
                      </p>

                      {/* Key Products */}
                      <div className="space-y-2 mb-6">
                        {brand.products.slice(0, 2).map((product) => (
                          <div key={product.name} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#AEEA00] rounded-full"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                              {product.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      <a href={`/brands/${brand.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-[#003DA5] dark:border-[#4A90E2] text-[#003DA5] dark:text-[#4A90E2] hover:bg-[#003DA5] dark:hover:bg-[#4A90E2] hover:text-white font-bold transition-all duration-300"
                        >
                          VIEW PRODUCTS
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Ralhum Section */}
      <section className="py-20 bg-[#1A1A1A] dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              EXCLUSIVE ADVANTAGES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              WHY CHOOSE
              <span className="block text-[#AEEA00]">RALHUM?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Exclusive Distributor',
                description:
                  'Official and exclusive distributor status for all major brands in Sri Lanka',
              },
              {
                icon: Trophy,
                title: 'Authentic Guarantee',
                description:
                  '100% authentic products with full manufacturer warranties and support',
              },
              {
                icon: Globe,
                title: '25+ Years Experience',
                description: 'Over two decades of expertise in sports equipment distribution',
              },
              {
                icon: Star,
                title: 'Professional Support',
                description:
                  'Expert consultation and after-sales support for all your sporting needs',
              },
            ].map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 dark:bg-gray-800/50"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#AEEA00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[#1A1A1A]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{advantage.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            READY TO EXPERIENCE THE DIFFERENCE?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to learn more about our exclusive brand partnerships and find the
            perfect equipment for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
            >
              <Phone className="w-5 h-5 mr-2" />
              CONTACT OUR TEAM
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
            >
              VIEW ALL PRODUCTS
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
