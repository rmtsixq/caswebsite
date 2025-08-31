'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Eye, Share2, Bookmark, Heart } from 'lucide-react';
import Link from 'next/link';
import { getArticleBySlug } from '@/lib/firestore';
import { FirebaseArticle } from '@/lib/firestore';
import ArticleContent from '@/components/ArticleContent';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [article, setArticle] = useState<FirebaseArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('Article detail yükleniyor, slug:', slug);
        const articleData = await getArticleBySlug(slug);
        console.log('Article detail verisi:', articleData);
        
        if (articleData) {
          setArticle(articleData);
        } else {
          setError('Article not found');
        }
      } catch (error) {
        console.error('Article detail yükleme hatası:', error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Author'ı string olarak al
  const authorName = article ? (
    typeof article.author === 'string' ? article.author : 
    (article.author && typeof article.author === 'object' && 'name' in article.author) ? 
    (article.author as any).name : 'Unknown Author'
  ) : 'Unknown Author';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/articles"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/articles"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium">
              {article.category}
            </span>
            {article.isEditorsPick && (
              <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium ml-2">
                Editor's Pick
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{authorName}</span>
                  </div>
            <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
              <span>
                {article.publishedAt ? 
                  new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 
                  'Published recently'
                }
              </span>
            </div>
              <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{article.views || 0} views</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200">
              <Heart className="w-4 h-4" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImage && (
        <section className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleContent content={article.content || ''} />
        </div>
      </section>

      {/* Article Footer */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              About the Author
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{authorName}</h4>
                <p className="text-gray-600">
                  Contributing writer at X-Times Media. Specializing in {article.category.toLowerCase()} content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Explore More Articles
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover more insightful content from our collection of articles.
          </p>
          <Link
            href="/articles"
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
          >
            Browse All Articles
          </Link>
        </div>
      </section>
    </div>
  );
}