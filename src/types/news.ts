export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  title?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  featuredImage?: NewsImage;
  gallery?: NewsImage[];
  categories: NewsCategory[];
  tags: string[];
  publishedAt: string;
  readingTime: number;
  status: "draft" | "published" | "archived";
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  relatedArticles?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsFilters {
  categories?: string[];
  tags?: string[];
  author?: string;
  featured?: boolean;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface NewsSort {
  field: "publishedAt" | "title" | "readingTime" | "featured";
  direction: "asc" | "desc";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  pagination: PaginationInfo;
  filters: NewsFilters;
  appliedSort: NewsSort;
}

export interface Comment {
  id: string;
  articleId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  parentId?: string;
  replies?: Comment[];
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  updatedAt: string;
}
