'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Calendar, Users, BookOpen, Video, Headphones, Mail, Star, Globe, Award, ChevronRight, Search } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import VideoCard from '@/components/VideoCard';
import PodcastCard from '@/components/PodcastCard';
import { categories } from '@/lib/data';
import { getPublishedArticles, getEditorsPicks, getPublishedVideos, type FirebaseArticle, type FirebaseVideo } from '@/lib/firestore';

export default function HomePage() {
  const [articles, setArticles] = useState<FirebaseArticle[]>([]);
  const [editorsPicks, setEditorsPicks] = useState<FirebaseArticle[]>([]);
  const [videos, setVideos] = useState<FirebaseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchData = async () => {
      try {
        console.log('Ana sayfa verileri yükleniyor...');
        
        const [articlesData, editorsPicksData, videosData] = await Promise.all([
          getPublishedArticles(),
          getEditorsPicks(),
          getPublishedVideos()
        ]);

        console.log('=== DEBUG BİLGİLERİ ===');
        console.log('Makaleler (published):', articlesData);
        console.log('Makale sayısı:', articlesData.length);
        console.log('Editor Picks:', editorsPicksData);
        console.log('Editor Picks sayısı:', editorsPicksData.length);
        console.log('Videolar:', videosData);
        console.log('Video sayısı:', videosData.length);
        
        // Her makalenin detaylarını kontrol et
        articlesData.forEach((article, index) => {
          console.log(`Makale ${index + 1}:`, {
            id: article.id,
            title: article.title,
            status: article.status,
            publishedAt: article.publishedAt,
            isEditorsPick: article.isEditorsPick
          });
        });

        setArticles(articlesData);
        setEditorsPicks(editorsPicksData);
        setVideos(videosData);
      } catch (error) {
        console.error('Ana sayfa veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section - Newsletter Style */}
      <section className="relative bg-gradient-to-br from-primary-light via-primary to-primary-dark text-white overflow-hidden">
        {/* Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <img 
            src="/Logo.png" 
            alt="Vertias Today Background Logo" 
            className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-dark opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">The Middle East's Leading Academic Journal</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8">
              Vertias Today
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12">
              Student-led academic journalism delivering trustworthy insights across STEM, politics, philosophy, and social justice through articles, videos, and podcasts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/articles"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
              >
                Explore Latest Articles
              </Link>
              <Link 
                href="#newsletter"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-center"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section id="newsletter" className="py-16 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <Mail className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Stay Updated with Vertias Today
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get our weekly newsletter with the latest articles, research insights, and thought-provoking content delivered directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900 placeholder-gray-600"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Videos & Podcasts
            </h2>
            <p className="text-lg text-white/90">
              Engage with our content through multiple formats - watch, listen, and learn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Video */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif font-bold text-white">Featured Video</h3>
                <Link 
                  href="/videos"
                  className="text-white/80 hover:text-white font-semibold transition-colors duration-200"
                >
                  View All Videos
                </Link>
              </div>
              
              {!mounted || loading ? (
                <div className="bg-gray-800 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading videos...</p>
                </div>
              ) : videos.length > 0 ? (
                <VideoCard video={videos[0]} />
              ) : (
                <div className="bg-gray-800 rounded-xl p-8 text-center">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">No videos yet</h4>
                  <p className="text-gray-400">Featured videos will appear here once uploaded.</p>
                </div>
              )}
            </div>

            {/* Featured Podcast */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif font-bold text-white">Featured Podcast</h3>
                <Link 
                  href="/podcasts"
                  className="text-white/80 hover:text-white font-semibold transition-colors duration-200"
                >
                  View All Podcasts
                </Link>
              </div>
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <Headphones className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Coming Soon</h4>
                <p className="text-gray-400">Podcast section is under construction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-700">
                Stay informed with our most recent publications and research findings.
              </p>
            </div>
            <Link 
              href="/articles"
              className="hidden sm:flex items-center space-x-2 text-primary hover:text-primary-dark font-semibold transition-colors duration-200 bg-gray-100 px-6 py-3 rounded-lg hover:bg-gray-200"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          {!mounted || loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600">
                Articles will appear here once our editors start publishing content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-white/90">
              Join our growing community of readers who trust Vertias Today for quality academic journalism.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Active Readers</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{articles.length}</div>
              <div className="text-white/80">Articles Published</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{videos.length}</div>
              <div className="text-white/80">Videos Created</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-white/80">Expert Contributors</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
