import {
  NewsArticle,
  Author,
  NewsCategory,
  NewsResponse,
  NewsFilters,
  NewsSort,
} from "@/types/news";

// Mock authors
export const authors: Author[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@ralhumsports.com",
    avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    bio: "Senior Sports Journalist with over 10 years of experience covering professional cricket and rugby. Former national level player.",
    title: "Senior Sports Writer",
    socialLinks: {
      twitter: "@sarahjsports",
      linkedin: "sarah-johnson-sports",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@ralhumsports.com",
    avatar: "/placeholder.svg?height=100&width=100&text=MC",
    bio: "Equipment specialist and former professional athlete. Passionate about helping athletes choose the right gear.",
    title: "Equipment Expert",
    socialLinks: {
      linkedin: "michael-chen-sports",
      instagram: "@mikechensports",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma@ralhumsports.com",
    avatar: "/placeholder.svg?height=100&width=100&text=ER",
    bio: "Sports technology analyst and former university coach. Specializes in performance analysis and training methodologies.",
    title: "Performance Analyst",
    socialLinks: {
      twitter: "@emmarodsports",
      linkedin: "emma-rodriguez-sports",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Mock categories
export const newsCategories: NewsCategory[] = [
  {
    id: "1",
    name: "Equipment Reviews",
    slug: "equipment-reviews",
    description: "In-depth reviews of the latest sports equipment",
    color: "#003DA5",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sports News",
    slug: "sports-news",
    description: "Latest news from the world of sports",
    color: "#FF3D00",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Training Tips",
    slug: "training-tips",
    description: "Expert training advice and techniques",
    color: "#AEEA00",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Industry Insights",
    slug: "industry-insights",
    description: "Behind-the-scenes look at the sports industry",
    color: "#FFD700",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Athletes Stories",
    slug: "athlete-stories",
    description: "Inspiring stories from professional athletes",
    color: "#9C27B0",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// Mock news articles
export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Gray-Nicolls Launches Revolutionary New Cricket Bat Technology",
    slug: "gray-nicolls-revolutionary-cricket-bat-technology",
    excerpt:
      "The legendary cricket brand introduces groundbreaking willow treatment that promises to enhance performance and durability.",
    content: `# Gray-Nicolls Launches Revolutionary New Cricket Bat Technology

Gray-Nicolls, the iconic cricket equipment manufacturer with over 165 years of heritage, has unveiled their latest innovation in cricket bat technology. The new "DynaWillow" treatment process promises to revolutionize how cricket bats perform at both professional and amateur levels.

## What Makes DynaWillow Special?

The new technology involves a proprietary compression and grain alignment process that:

- **Increases Power**: Enhanced sweet spot area by 15%
- **Improves Durability**: 40% longer lifespan compared to traditional bats
- **Better Balance**: Optimized weight distribution for superior pick-up
- **Consistent Performance**: Uniform grain structure across the blade

## Professional Endorsements

Several international cricket stars have already adopted the new technology:

> "The difference is immediately noticeable. The bat feels lighter but packs more power. It's given me the confidence to play more aggressive shots." - *Joe Root, England Captain*

## Availability and Pricing

The DynaWillow range will be available through authorized dealers starting next month, with prices ranging from $299 for amateur models to $799 for professional-grade bats.

## Technical Specifications

- **Blade Material**: Grade 1+ English Willow with DynaWillow treatment
- **Handle**: Premium Sarawak cane with multi-grip zones
- **Weight Range**: 2lb 7oz to 2lb 12oz
- **Profile**: Mid-to-low sweet spot placement
- **Edges**: 38-42mm depending on model

This innovation continues Gray-Nicolls' tradition of pushing cricket equipment boundaries, following their successful launches of the Fusion and Quantum series.

*For more information about Gray-Nicolls products, visit our [store page](/products?brands=gray-nicolls).*`,
    author: authors[0],
    featuredImage: {
      id: "1",
      url: "/placeholder.svg?height=400&width=600&text=Cricket+Bat",
      alt: "Gray-Nicolls DynaWillow Cricket Bat",
      caption:
        "The new Gray-Nicolls DynaWillow technology promises enhanced performance",
      width: 600,
      height: 400,
    },
    categories: [newsCategories[0], newsCategories[1]],
    tags: ["cricket", "gray-nicolls", "technology", "equipment", "innovation"],
    publishedAt: "2024-01-20T10:00:00Z",
    readingTime: 4,
    status: "published",
    featured: true,
    seo: {
      title:
        "Gray-Nicolls Revolutionary Cricket Bat Technology - DynaWillow Launch",
      description:
        "Discover Gray-Nicolls latest cricket bat innovation featuring DynaWillow technology for enhanced performance and durability.",
      keywords: [
        "Gray-Nicolls",
        "cricket bat",
        "DynaWillow",
        "cricket equipment",
        "sports technology",
      ],
    },
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Ultimate Guide to Choosing the Perfect Rugby Ball",
    slug: "ultimate-guide-choosing-perfect-rugby-ball",
    excerpt:
      "From training to match play, discover how to select the right rugby ball for your needs with expert insights from Gilbert.",
    content: `# Ultimate Guide to Choosing the Perfect Rugby Ball

Selecting the right rugby ball can make a significant difference in your training and match performance. With various options available from different manufacturers, understanding the key factors will help you make an informed decision.

## Understanding Rugby Ball Sizes

Rugby balls come in different sizes for different age groups and playing levels:

### Size 5 (Senior)
- **Length**: 280-300mm
- **Width**: 180-190mm
- **Weight**: 410-460g
- **Use**: Senior men's and women's rugby (15+ years)

### Size 4 (Youth)
- **Length**: 270-280mm
- **Width**: 170-180mm
- **Weight**: 350-390g
- **Use**: Youth rugby (12-14 years)

### Size 3 (Junior)
- **Length**: 255-270mm
- **Width**: 165-175mm
- **Weight**: 300-340g
- **Use**: Junior rugby (under 12 years)

## Key Features to Consider

### 1. Construction Material
- **Synthetic Leather**: Durable, weather-resistant, consistent performance
- **Natural Leather**: Traditional feel, requires more maintenance
- **Composite**: Modern materials offering best of both worlds

### 2. Grip Pattern
- **Pimple Design**: Affects handling in wet conditions
- **Hand Placement Guides**: Some balls feature subtle markings
- **Surface Texture**: Varies between brands and models

### 3. Bladder Type
- **Butyl Bladder**: Superior air retention, maintains shape longer
- **Natural Rubber**: Traditional option, requires more frequent inflation

## Top Recommendations by Use Case

### Match Play
**Gilbert Match XV** - World Rugby approved, used in international competitions
- Superior grip in all weather conditions
- Consistent flight characteristics
- Professional-grade construction

### Training
**Gilbert G-TR4000** - Durable training ball designed for heavy use
- Enhanced durability for ground contact
- Cost-effective for club training
- Available in multiple colors

### Beach/Touch Rugby
**Gilbert Beach Rugby Ball** - Designed for sand and recreational play
- Softer construction for safety
- Bright colors for visibility
- Water-resistant materials

## Maintenance Tips

1. **Proper Inflation**: Check pressure weekly (9-10 PSI recommended)
2. **Storage**: Keep in cool, dry place away from direct sunlight
3. **Cleaning**: Use mild soap and water, avoid harsh chemicals
4. **Rotation**: Use multiple balls during training to extend lifespan

## Brand Comparisons

### Gilbert
- **Pros**: World Rugby official supplier, excellent grip, proven quality
- **Cons**: Premium pricing
- **Best For**: Serious players and clubs

### Canterbury
- **Pros**: Good value for money, reliable performance
- **Cons**: Limited high-end options
- **Best For**: Recreational players and schools

### Rhino
- **Pros**: Innovative designs, good durability
- **Cons**: Less widespread availability
- **Best For**: Training and development programs

## Final Recommendations

For most players, we recommend starting with a **Gilbert Match XV** for serious play and a **Gilbert G-TR4000** for training. This combination provides the best balance of performance, durability, and value.

*Browse our complete selection of rugby balls in our [rugby equipment section](/products?categories=rugby).*`,
    author: authors[1],
    featuredImage: {
      id: "2",
      url: "/placeholder.svg?height=400&width=600&text=Rugby+Ball",
      alt: "Gilbert Rugby Balls Collection",
      caption:
        "Various Gilbert rugby balls showcasing different sizes and designs",
      width: 600,
      height: 400,
    },
    categories: [newsCategories[0], newsCategories[2]],
    tags: ["rugby", "gilbert", "equipment-guide", "training", "selection"],
    publishedAt: "2024-01-18T14:30:00Z",
    readingTime: 6,
    status: "published",
    featured: true,
    seo: {
      title: "Ultimate Guide to Choosing the Perfect Rugby Ball | Expert Tips",
      description:
        "Complete guide to selecting the right rugby ball for training and matches. Expert insights on sizes, materials, and top recommendations.",
      keywords: [
        "rugby ball",
        "Gilbert",
        "rugby equipment",
        "sports guide",
        "ball selection",
      ],
    },
    createdAt: "2024-01-17T00:00:00Z",
    updatedAt: "2024-01-18T14:30:00Z",
  },
  {
    id: "3",
    title: "Training Techniques That Professional Athletes Swear By",
    slug: "training-techniques-professional-athletes",
    excerpt:
      "Discover the science-backed training methods used by elite athletes to improve performance, prevent injuries, and maintain peak condition.",
    content: `# Training Techniques That Professional Athletes Swear By

Elite athletes don't just train harder—they train smarter. Through years of research and refinement, sports scientists and professional coaches have developed training methodologies that maximize performance while minimizing injury risk.

## Periodization: The Foundation of Elite Training

Professional athletes use periodized training programs that systematically vary intensity, volume, and training focus throughout the year.

### Macrocycle Planning
- **Preparation Phase**: Building base fitness and technical skills
- **Competition Phase**: Peak performance and competition preparation
- **Transition Phase**: Active recovery and regeneration

### Microcycle Variations
Elite athletes typically follow 7-14 day microcycles that balance:
- High-intensity training
- Moderate effort sessions
- Recovery and regeneration

## Power Development Strategies

### Plyometric Training
Professional athletes incorporate explosive movements to develop power:

1. **Depth Jumps**: Building reactive strength
2. **Medicine Ball Throws**: Sport-specific power patterns
3. **Sprint Intervals**: Developing speed and acceleration

### Olympic Lifting Variations
Many professional athletes use modified Olympic lifts:
- **Power Cleans**: Full-body explosive power
- **Hang Snatches**: Hip drive and coordination
- **Push Jerks**: Upper body power development

## Recovery and Regeneration Protocols

### Sleep Optimization
Elite athletes prioritize sleep quality and quantity:
- **8-9 hours** per night minimum
- **Consistent sleep schedule** even during travel
- **Sleep environment optimization** (temperature, darkness, quiet)

### Active Recovery Methods
- **Contrast Baths**: Hot/cold water therapy
- **Compression Therapy**: Enhanced circulation
- **Massage and Soft Tissue Work**: Regular maintenance

### Nutrition Timing
Professional athletes follow precise nutrition protocols:
- **Pre-training**: Carbohydrate loading for energy
- **During training**: Hydration and electrolyte replacement
- **Post-training**: Protein and carbohydrate for recovery

## Mental Training Components

### Visualization Techniques
Elite athletes use mental imagery to:
- Rehearse competition scenarios
- Build confidence and reduce anxiety
- Improve technical skills through mental practice

### Stress Management
Professional athletes develop coping strategies:
- **Breathing techniques** for competition nerves
- **Mindfulness practices** for focus and concentration
- **Goal setting** for motivation and direction

## Technology Integration

### Performance Monitoring
Modern athletes use technology to track:
- **Heart Rate Variability**: Recovery and adaptation
- **GPS Tracking**: Movement patterns and workload
- **Force Plates**: Power output and asymmetries

### Video Analysis
Detailed movement analysis helps:
- Identify technical flaws
- Track improvement over time
- Compare with elite performance models

## Sport-Specific Applications

### Cricket
Professional cricketers focus on:
- **Rotational power** for batting and bowling
- **Hand-eye coordination** through specific drills
- **Endurance training** for long-format games

### Rugby
Elite rugby players emphasize:
- **Collision preparation** through contact training
- **Agility and change of direction** skills
- **Team coordination** through pattern practice

### Basketball
Professional basketball players develop:
- **Vertical jump power** through plyometrics
- **Court awareness** through small-sided games
- **Shooting consistency** through repetition and analysis

## Implementation for Amateur Athletes

While not everyone can train like a professional, key principles can be adapted:

1. **Consistency**: Regular training is more important than intensity
2. **Progressive Overload**: Gradually increase training demands
3. **Recovery Focus**: Prioritize sleep and nutrition
4. **Skill Development**: Practice sport-specific movements regularly
5. **Monitor Progress**: Track improvements objectively

## Common Mistakes to Avoid

- **Overtraining**: More isn't always better
- **Neglecting Recovery**: Adaptation happens during rest
- **Ignoring Nutrition**: Fuel affects performance
- **Skipping Warm-up**: Proper preparation prevents injury
- **Training Through Pain**: Distinguish between discomfort and injury

## Conclusion

The training methods used by professional athletes are based on scientific principles that can benefit athletes at all levels. The key is to adapt these concepts to your individual needs, goals, and circumstances.

Remember: **consistency, progression, and recovery** are the foundations of any successful training program.

*Enhance your training with professional-grade equipment from our [sports collection](/products).*`,
    author: authors[2],
    featuredImage: {
      id: "3",
      url: "/placeholder.svg?height=400&width=600&text=Training",
      alt: "Professional Athletes Training",
      caption: "Elite athletes using advanced training techniques",
      width: 600,
      height: 400,
    },
    categories: [newsCategories[2], newsCategories[4]],
    tags: [
      "training",
      "professional-athletes",
      "performance",
      "techniques",
      "sports-science",
    ],
    publishedAt: "2024-01-16T09:00:00Z",
    readingTime: 8,
    status: "published",
    featured: false,
    seo: {
      title: "Professional Athlete Training Techniques | Expert Guide",
      description:
        "Learn the science-backed training methods used by elite athletes to improve performance and prevent injuries.",
      keywords: [
        "professional training",
        "athlete techniques",
        "sports performance",
        "training methods",
        "elite athletes",
      ],
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "4",
    title:
      "The Evolution of Basketball Technology: From Leather to Smart Balls",
    slug: "evolution-basketball-technology-smart-balls",
    excerpt:
      "Explore how basketball technology has evolved from simple leather balls to modern smart basketballs with embedded sensors.",
    content: `# The Evolution of Basketball Technology: From Leather to Smart Balls

Basketball has come a long way since Dr. James Naismith invented the game in 1891 using a peach basket and a soccer ball. Today's basketballs incorporate cutting-edge technology that would amaze the game's founders.

## The Early Years (1890s-1940s)

### Original Equipment
- **Soccer balls** were initially used
- **Leather panels** sewn together by hand
- **Laced closure** similar to footballs
- **Inconsistent bounce** due to construction methods

### First Improvements
In the 1940s, manufacturers began:
- Standardizing ball size and weight
- Improving leather quality
- Developing better stitching techniques

## The Modern Era Begins (1950s-1980s)

### Synthetic Materials
The introduction of synthetic materials revolutionized basketball:
- **Composite leather**: More consistent performance
- **Improved grip**: Better handling in various conditions
- **Weather resistance**: Suitable for outdoor play

### Manufacturing Advances
- **Machine stitching**: Improved consistency
- **Quality control**: Standardized testing procedures
- **Pressure regulation**: Better air retention

## The Technology Revolution (1990s-2000s)

### Advanced Materials
Modern basketballs incorporate:
- **Microfiber composite**: Enhanced grip and feel
- **Channel design**: Improved aerodynamics
- **Moisture-wicking surfaces**: Better handling when wet

### Professional Standards
Organizations like the NBA established strict requirements:
- Precise size and weight specifications
- Standardized bounce characteristics
- Quality testing protocols

## The Smart Ball Era (2010s-Present)

### Sensor Integration
Modern smart basketballs include:
- **Motion sensors**: Track spin rate and trajectory
- **Pressure sensors**: Monitor ball handling force
- **GPS tracking**: Location and movement data
- **Bluetooth connectivity**: Real-time data transmission

### Popular Smart Basketball Models

#### Wilson X Connected
- Tracks makes and misses automatically
- Provides shooting percentage data
- Compatible with mobile apps
- Uses built-in sensors for accuracy

#### ShotTracker Basketball
- Wearable sensor system
- Tracks shooting form and consistency
- Provides detailed analytics
- Used by professional teams

#### DribbleUp Smart Basketball
- Augmented reality training
- Interactive mobile app
- Skill development programs
- Real-time form feedback

## Benefits of Modern Technology

### For Players
- **Detailed performance analytics**
- **Objective feedback** on shooting form
- **Progress tracking** over time
- **Personalized training programs**

### For Coaches
- **Player development insights**
- **Team performance analysis**
- **Strategic planning data**
- **Injury prevention monitoring**

### For Fans
- **Enhanced viewing experience**
- **Real-time statistics**
- **Behind-the-scenes data**
- **Interactive engagement**

## Material Science Advances

### Surface Technology
Modern basketballs feature:
- **Pebbled texture**: Optimized for grip
- **Composite covers**: Durability and consistency
- **Channel depth**: Aerodynamic performance
- **Color retention**: Fade-resistant materials

### Internal Construction
- **Butyl bladders**: Superior air retention
- **Wound construction**: Shape consistency
- **Pressure regulation**: Consistent bounce
- **Temperature resistance**: Performance in various climates

## Environmental Considerations

### Sustainable Materials
Manufacturers are exploring:
- **Recycled materials**: Environmentally friendly options
- **Biodegradable components**: Reduced environmental impact
- **Sustainable manufacturing**: Eco-friendly production processes

### Durability Improvements
Modern basketballs last longer through:
- **Enhanced wear resistance**
- **UV protection** for outdoor use
- **Moisture resistance**
- **Temperature stability**

## Future Innovations

### Emerging Technologies
- **AI integration**: Advanced performance analysis
- **Biometric monitoring**: Player health tracking
- **Virtual reality**: Immersive training experiences
- **Advanced materials**: Self-healing surfaces

### Potential Developments
- **Real-time coaching**: Instant feedback during play
- **Injury prediction**: Biomechanical analysis
- **Performance optimization**: Personalized equipment
- **Fan interaction**: Enhanced spectator experience

## Choosing the Right Basketball

### Indoor Play
- **Leather or composite**: Premium feel and performance
- **Official size and weight**: Regulation specifications
- **Deep channels**: Better grip and control

### Outdoor Play
- **Rubber or composite**: Weather resistance
- **Durable construction**: Extended lifespan
- **Consistent bounce**: Reliable performance

### Training and Development
- **Smart features**: Performance tracking
- **Size variations**: Age-appropriate options
- **Skill-specific designs**: Specialized training balls

## Maintenance and Care

### Traditional Basketballs
- Regular cleaning with mild soap
- Proper inflation (7-9 PSI)
- Storage in cool, dry conditions
- Avoid extreme temperatures

### Smart Basketballs
- Follow manufacturer's charging instructions
- Protect electronic components
- Regular software updates
- Professional calibration when needed

## Conclusion

The evolution of basketball technology demonstrates how innovation can enhance sports performance and experience. From simple leather balls to sophisticated smart equipment, technology continues to push the boundaries of what's possible in basketball.

Whether you're a professional athlete, coach, or recreational player, modern basketball technology offers tools to improve your game and deepen your understanding of this beloved sport.

*Explore our complete basketball equipment collection, including the latest smart basketballs, in our [basketball section](/products?categories=basketball).*`,
    author: authors[1],
    featuredImage: {
      id: "4",
      url: "/placeholder.svg?height=400&width=600&text=Smart+Basketball",
      alt: "Smart Basketball Technology",
      caption: "Modern smart basketball with embedded sensors and technology",
      width: 600,
      height: 400,
    },
    categories: [newsCategories[0], newsCategories[3]],
    tags: [
      "basketball",
      "technology",
      "smart-equipment",
      "innovation",
      "evolution",
    ],
    publishedAt: "2024-01-15T11:00:00Z",
    readingTime: 7,
    status: "published",
    featured: false,
    seo: {
      title: "Evolution of Basketball Technology | Smart Balls & Innovation",
      description:
        "Discover how basketball technology evolved from leather balls to modern smart basketballs with sensors and analytics.",
      keywords: [
        "basketball technology",
        "smart basketballs",
        "sports innovation",
        "basketball evolution",
        "sensor technology",
      ],
    },
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
];

// Utility functions for PayloadCMS compatibility
export function getNewsArticles(
  filters: NewsFilters = {},
  sort: NewsSort = { field: "publishedAt", direction: "desc" },
  page: number = 1,
  limit: number = 10,
): NewsResponse {
  let filteredArticles = [...newsArticles];

  // Apply filters
  if (filters.categories?.length) {
    filteredArticles = filteredArticles.filter((article) =>
      article.categories.some((cat) => filters.categories!.includes(cat.slug)),
    );
  }

  if (filters.tags?.length) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tags.some((tag) => filters.tags!.includes(tag)),
    );
  }

  if (filters.author) {
    filteredArticles = filteredArticles.filter(
      (article) => article.author.id === filters.author,
    );
  }

  if (filters.featured !== undefined) {
    filteredArticles = filteredArticles.filter(
      (article) => article.featured === filters.featured,
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
  }

  // Apply sorting
  filteredArticles.sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sort.field) {
      case "title":
        aValue = a.title;
        bValue = b.title;
        break;
      case "publishedAt":
        aValue = new Date(a.publishedAt);
        bValue = new Date(b.publishedAt);
        break;
      case "readingTime":
        aValue = a.readingTime;
        bValue = b.readingTime;
        break;
      case "featured":
        aValue = a.featured ? 1 : 0;
        bValue = b.featured ? 1 : 0;
        break;
      default:
        aValue = new Date(a.publishedAt);
        bValue = new Date(b.publishedAt);
    }

    if (sort.direction === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Apply pagination
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    filters,
    appliedSort: sort,
  };
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getFeaturedArticles(limit: number = 3): NewsArticle[] {
  return newsArticles.filter((article) => article.featured).slice(0, limit);
}

export function getRelatedArticles(
  article: NewsArticle,
  limit: number = 3,
): NewsArticle[] {
  return newsArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.categories.some((cat) =>
          article.categories.some((articleCat) => articleCat.id === cat.id),
        ) ||
          a.tags.some((tag) => article.tags.includes(tag))),
    )
    .slice(0, limit);
}

export function getAllAuthors(): Author[] {
  return authors;
}

export function getAllNewsCategories(): NewsCategory[] {
  return newsCategories;
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export function formatPublishDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  return Math.ceil(wordCount / wordsPerMinute);
}
