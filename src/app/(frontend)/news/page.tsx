'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Calendar, User, ArrowRight, Search, Trophy, Award, TrendingUp, Globe } from 'lucide-react'

const newsCategories = [
  'All News',
  'Company Updates',
  'New Partnerships',
  'Sports Events',
  'Product Launches',
  'Industry Insights',
]

const featuredNews = [
  {
    id: 1,
    title: 'Ralhum Sports Announces Exclusive Partnership with New International Brand',
    excerpt:
      "We're excited to announce our latest partnership that will bring even more world-class sports equipment to Sri Lankan athletes and sports enthusiasts.",
    content:
      'This strategic partnership represents our continued commitment to providing the finest sports equipment available globally. The new brand will complement our existing portfolio perfectly.',
    category: 'New Partnerships',
    date: '2024-01-15',
    author: 'Ralhum Sports Team',
    image: '/placeholder.svg?height=400&width=600',
    featured: true,
    readTime: '3 min read',
  },
]

const allNews = [
  ...featuredNews,
  {
    id: 4,
    title: 'Gilbert Rugby Equipment Powers Local Tournament Success',
    excerpt:
      "Local rugby tournaments across Sri Lanka are experiencing unprecedented success with Gilbert's professional-grade equipment.",
    content:
      'The quality and reliability of Gilbert equipment has elevated the standard of rugby competitions nationwide.',
    category: 'Sports Events',
    date: '2024-01-05',
    author: 'Sports Correspondent',
    image: '/placeholder.svg?height=300&width=400',
    featured: false,
    readTime: '3 min read',
  },
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All News')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNews = allNews.filter((article) => {
    const matchesCategory = selectedCategory === 'All News' || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Company Updates':
        return TrendingUp
      case 'New Partnerships':
        return Globe
      case 'Sports Events':
        return Trophy
      case 'Product Launches':
        return Award
      default:
        return Calendar
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Company Updates':
        return 'bg-[#003DA5]'
      case 'New Partnerships':
        return 'bg-[#FF3D00]'
      case 'Sports Events':
        return 'bg-[#FFD700]'
      case 'Product Launches':
        return 'bg-[#AEEA00]'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#003DA5] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#AEEA00] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              LATEST UPDATES
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              NEWS &<span className="block text-[#FF3D00]">ANNOUNCEMENTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Stay updated with the latest news from Ralhum Sports, including new partnerships,
              product launches, company milestones, and insights from the sports equipment industry.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder-gray-300 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">
              FEATURED STORIES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              LATEST
              <span className="block text-[#003DA5]">HIGHLIGHTS</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Featured Article */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={featuredNews[0].image || '/placeholder.svg'}
                      alt={featuredNews[0].title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge
                        className={`${getCategoryColor(featuredNews[0].category)} text-white mb-3 font-bold`}
                      >
                        {featuredNews[0].category}
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
                        {featuredNews[0].title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredNews[0].date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredNews[0].author}
                        </span>
                        <span>{featuredNews[0].readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{featuredNews[0].excerpt}</p>
                    <Button
                      className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold rounded-full"
                      asChild
                    >
                      <a
                        href={`/news/${featuredNews[0].title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')}`}
                      >
                        READ FULL ARTICLE
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Featured Articles */}
            <div className="space-y-6">
              {featuredNews.slice(1, 3).map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={article.image || '/placeholder.svg'}
                        alt={article.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <Badge
                        className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white font-bold`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-black text-lg mb-2 line-clamp-2">{article.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter & All News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#AEEA00] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              ALL ARTICLES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              COMPLETE
              <span className="block text-[#FF3D00]">NEWS ARCHIVE</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {newsCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#003DA5] text-white hover:bg-[#003DA5]/90'
                    : 'border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {filteredNews.map((article) => {
              const IconComponent = getCategoryIcon(article.category)
              return (
                <Card
                  key={article.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    {/* Article Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image || '/placeholder.svg'}
                        alt={article.title}
                        className="w-full h-40 sm:h-48 object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <Badge
                        className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white font-bold text-xs`}
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        {article.category}
                      </Badge>

                      {article.featured && (
                        <Badge className="absolute top-3 right-3 bg-[#FFD700] text-[#1A1A1A] font-bold text-xs">
                          FEATURED
                        </Badge>
                      )}
                    </div>

                    {/* Article Content */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-black mb-3 line-clamp-2 hover:text-[#003DA5] transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                        {article.excerpt}
                      </p>

                      {/* Article Meta */}
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                          <span className="hidden sm:inline">{article.readTime}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold transition-all duration-300 text-sm sm:text-base py-2 sm:py-3"
                        asChild
                      >
                        <a
                          href={`/news/${article.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '')}`}
                        >
                          READ MORE
                          <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategory('All News')
                  setSearchTerm('')
                }}
                className="mt-4 bg-[#003DA5] hover:bg-[#003DA5]/90 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">STAY UPDATED</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Subscribe to our newsletter to receive the latest news, product launches, and exclusive
            updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto px-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder-gray-300 rounded-full px-4 sm:px-6 py-3 text-sm sm:text-base"
            />
            <Button
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-6 sm:px-8 py-3 font-bold rounded-full text-sm sm:text-base"
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
