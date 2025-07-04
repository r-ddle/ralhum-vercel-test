'use client'

import { useState, useEffect } from 'react'
import { NewsArticle } from '@/types/news'
import {
  getArticleBySlug,
  getRelatedArticles,
  formatReadingTime,
  formatPublishDate,
} from '@/lib/news'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Mail,
  ArrowLeft,
  Eye,
  MessageCircle,
  ThumbsUp,
  Tag,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

interface NewsDetailPageProps {
  params: {
    slug: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      const foundArticle = getArticleBySlug(params.slug)

      if (!foundArticle) {
        notFound()
      }

      setArticle(foundArticle)

      // Get related articles
      const related = getRelatedArticles(foundArticle, 3)
      setRelatedArticles(related)

      setLoading(false)
    }

    fetchArticle()
  }, [params.slug])

  if (loading) {
    return <NewsDetailSkeleton />
  }

  if (!article) {
    notFound()
  }

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const text = `${article.title} - ${article.excerpt}`

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
        )
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(text + ' ' + url)}`
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: article.title,
              text: article.excerpt,
              url: url,
            })
          } catch (error) {
            // User cancelled sharing
          }
        } else {
          navigator.clipboard.writeText(url)
          // You could show a toast here
        }
    }
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-[#003DA5] transition-colors leading-none">
              Home
            </Link>
            <span className="leading-none">/</span>
            <Link href="/news" className="hover:text-[#003DA5] transition-colors leading-none">
              News
            </Link>
            <span className="leading-none">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate leading-none">
              {article.title}
            </span>
          </nav>
        </div>
      </section>

      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-600 hover:text-[#003DA5]"
            >
              <Link href="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((category) => (
                <Badge
                  key={category.id}
                  style={{ backgroundColor: category.color }}
                  className="text-white font-bold"
                >
                  {category.name}
                </Badge>
              ))}
              {article.featured && (
                <Badge className="bg-[#FFD700] text-[#1A1A1A] font-bold">FEATURED</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatPublishDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatReadingTime(article.readingTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>2.4k views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>12 comments</span>
              </div>
            </div>

            {/* Author & Share */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>
                    {article.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {article.author.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {article.author.title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="text-gray-600 hover:text-[#003DA5]"
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare()}
                  className="text-gray-600 hover:text-[#003DA5]"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                {/* Social Share Buttons */}
                <div className="hidden sm:flex items-center gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="w-8 h-8 p-0 text-blue-500 hover:bg-blue-50"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="w-8 h-8 p-0 text-blue-600 hover:bg-blue-50"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="w-8 h-8 p-0 text-blue-700 hover:bg-blue-50"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('email')}
                    className="w-8 h-8 p-0 text-gray-600 hover:bg-gray-50"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <img
                src={article.featuredImage.url}
                alt={article.featuredImage.alt}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
              {article.featuredImage.caption && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2 italic">
                  {article.featuredImage.caption}
                </p>
              )}
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-12">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#003DA5] pl-6 py-2 bg-gray-50 dark:bg-gray-800 rounded-r-lg my-6 italic">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                    {children}
                  </ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <Link href={href || '#'} className="text-[#003DA5] hover:underline font-medium">
                    {children}
                  </Link>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900 dark:text-white">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Author Bio */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Avatar className="w-16 h-16 mx-auto sm:mx-0">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback className="text-lg">
                    {article.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {article.author.name}
                  </h3>
                  <p className="text-[#003DA5] font-medium mb-2">{article.author.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    {article.author.bio}
                  </p>
                  {article.author.socialLinks && (
                    <div className="flex justify-center sm:justify-start gap-2">
                      {article.author.socialLinks.twitter && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={`https://twitter.com/${article.author.socialLinks.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {article.author.socialLinks.linkedin && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={`https://linkedin.com/in/${article.author.socialLinks.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-800"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Like (24)
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Comment (12)
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Share this article:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="w-8 h-8 p-0 text-blue-500 hover:bg-blue-50"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="w-8 h-8 p-0 text-blue-600 hover:bg-blue-50"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="w-8 h-8 p-0 text-blue-700 hover:bg-blue-50"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="group hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={relatedArticle.featuredImage?.url || '/placeholder.svg'}
                          alt={relatedArticle.featuredImage?.alt || relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          {relatedArticle.categories[0] && (
                            <Badge
                              style={{
                                backgroundColor: relatedArticle.categories[0].color,
                              }}
                              className="text-white font-bold text-xs"
                            >
                              {relatedArticle.categories[0].name}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                          <span>{formatPublishDate(relatedArticle.publishedAt)}</span>
                          <span>•</span>
                          <span>{formatReadingTime(relatedArticle.readingTime)}</span>
                        </div>
                        <Link href={`/news/${relatedArticle.slug}`}>
                          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#003DA5] transition-colors line-clamp-2 mb-2">
                            {relatedArticle.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold"
                  asChild
                >
                  <Link href="/news">View All News Articles</Link>
                </Button>
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}

function NewsDetailSkeleton() {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
