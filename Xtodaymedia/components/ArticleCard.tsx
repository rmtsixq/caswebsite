import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, User, Tag } from 'lucide-react';
import { FirebaseArticle } from '@/lib/firestore';

interface ArticleCardProps {
  article: FirebaseArticle;
  variant?: 'default' | 'featured' | 'compact';
  showImage?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'default',
  showImage = true 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Author'ı string olarak al
  const authorName = typeof article.author === 'string' ? article.author : 
    (article.author && typeof article.author === 'object' && 'name' in article.author) ? 
    (article.author as any).name : 'Unknown Author';

  if (variant === 'featured') {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          {showImage && (
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
              {article.isEditorsPick && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Editor's Pick
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
                {article.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {authorName}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {article.tags && article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
          <div className="p-4">
            <div className="flex items-start space-x-3">
              {showImage && (
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="80px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{authorName}</span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/articles/${article.slug}`} className="block">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {showImage && (
          <div className="relative h-48 w-full">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            {article.isEditorsPick && (
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Editor's Pick
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
              {article.views && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {authorName}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {article.tags && article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;