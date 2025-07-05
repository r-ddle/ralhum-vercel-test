'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const sportsCategories = [
  {
    name: 'Cricket',
    description: 'Complete cricket equipment from bats to protective gear',
    featured: 'Gray-Nicolls Partnership',
    image: '',
    color: 'from-[#003DA5] to-[#1A1A1A]',
    popular: true,
  },
  {
    name: 'Rugby',
    description: 'Professional rugby equipment and training gear',
    featured: 'Gilbert Official',
    image: '',
    color: 'from-[#FF3D00] to-[#1A1A1A]',
    popular: false,
  },
  {
    name: 'Basketball',
    description: 'Court equipment and professional basketballs',
    featured: 'Molten Official',
    image: '',
    color: 'from-[#FFD700] to-[#1A1A1A]',
    popular: true,
  },
  {
    name: 'Hockey',
    description: 'Field hockey sticks and protective equipment',
    featured: 'Grays Excellence',
    image: '',
    color: 'from-[#AEEA00] to-[#1A1A1A]',
    popular: false,
  },
  {
    name: 'Volleyball',
    description: 'Professional volleyballs and net systems',
    featured: 'Molten Quality',
    image: '',
    color: 'from-[#FF3D00] to-[#003DA5]',
    popular: false,
  },
  {
    name: 'Tennis',
    description: 'Rackets, balls, and court accessories',
    featured: 'Premium Selection',
    image: '',
    color: 'from-[#AEEA00] to-[#FF3D00]',
    popular: true,
  },
]

export default function SportsCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">
            SPORTS CATEGORIES
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-6">
            EVERY SPORT,
            <span className="block text-[#003DA5]">EVERY LEVEL</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From school teams to professional athletes, we supply equipment for every sport and
            skill level
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportsCategories.map((sport, index) => (
            <Card
              key={sport.name}
              className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white"
            >
              <CardContent className="p-0">
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={sport.image || 'https://placehold.co/600x400'}
                    alt={sport.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-80`}
                  ></div>

                  {/* Popular Badge */}
                  {sport.popular && (
                    <Badge className="absolute top-4 left-4 bg-[#FFD700] text-[#1A1A1A] font-bold">
                      POPULAR
                    </Badge>
                  )}

                  {/* Sport Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-3xl font-black text-white mb-2">{sport.name}</h3>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {sport.featured}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{sport.description}</p>

                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold transition-all duration-300"
                  >
                    EXPLORE {sport.name.toUpperCase()}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#003DA5] to-[#FF3D00] rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-black mb-4">CAN&apos;T FIND YOUR SPORT?</h3>
            <p className="text-xl mb-6 opacity-90">
              We also supply equipment for Badminton, Netball, Football and more
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 font-bold px-8 py-4 rounded-full"
            >
              <a href="/contact">CONTACT US</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
