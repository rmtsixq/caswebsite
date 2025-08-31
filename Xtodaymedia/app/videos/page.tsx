'use client';

import React, { useState, useEffect } from 'react';
import { Play, Headphones, Search, Grid, List } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import { getPublishedVideos } from '@/lib/firestore';
import { FirebaseVideo } from '@/lib/firestore';

export default function VideosPage() {
  const [videos, setVideos] = useState<FirebaseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch videos from Firebase
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Videos sayfası verileri yükleniyor...');
        const videosData = await getPublishedVideos();
        console.log('Videos sayfası verileri:', videosData);
        setVideos(videosData);
      } catch (error) {
        console.error('Videos sayfası veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Videos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our video content featuring expert discussions, educational content, and in-depth analysis on current topics.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      {videos.length > 0 && (
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Videos Content */}
      {videos.length > 0 ? (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results count */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredVideos.length} of {videos.length} videos
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Videos Grid/List */}
            {filteredVideos.length > 0 ? (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredVideos.map((video) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <Search className="w-16 h-16 text-gray-300 mx-auto" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                    No videos found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* No Videos Section */
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <Play className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                No videos yet
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our video content library is being curated. Check back soon for engaging video content featuring expert discussions, educational material, and in-depth analysis.
              </p>
              <div className="bg-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">Coming Soon</h3>
                <p className="text-gray-700">
                  We're preparing high-quality video content that will complement our written articles. Subscribe to our newsletter to get notified when new videos are published.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* YouTube Channel CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Subscribe to Our YouTube Channel
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Stay updated with our latest video content by subscribing to our YouTube channel. 
            Get notified when we publish new discussions, interviews, and educational content.
          </p>
          <a
            href="https://youtube.com/@xtimes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            <Play className="w-6 h-6" />
            <span>Subscribe on YouTube</span>
          </a>
        </div>
      </section>
    </div>
  );
}