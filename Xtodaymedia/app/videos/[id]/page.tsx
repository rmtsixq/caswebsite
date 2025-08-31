'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPublishedVideos } from '@/lib/firestore';
import { FirebaseVideo } from '@/lib/firestore';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { Play, Calendar, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;
  
  const [video, setVideo] = useState<FirebaseVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videos = await getPublishedVideos();
        const foundVideo = videos.find(v => v.id === videoId);
        
        if (foundVideo) {
          setVideo(foundVideo);
        } else {
          setError('Video bulunamadı');
        }
      } catch (error) {
        console.error('Video yüklenirken hata:', error);
        setError('Video yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Video Bulunamadı
            </h1>
            <p className="text-gray-600 mb-8">
              {error || 'Aradığınız video mevcut değil veya kaldırılmış olabilir.'}
            </p>
            <Link
              href="/videos"
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Videolara Dön</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/videos"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">{video.title}</h1>
              <p className="text-gray-600 mt-1">Video Detayları</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {video.youtubeId && (
                <YouTubeEmbed
                  videoId={video.youtubeId}
                  title={video.title}
                  className="w-full"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                      <Play className="w-4 h-4 mr-1" />
                      {video.category}
                    </span>
                    {video.views && (
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{video.views.toLocaleString()} görüntüleme</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(video.publishedAt)}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  {video.title}
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {video.description}
                </p>

                <div className="border-t pt-6">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>YouTube'da İzle</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Bilgileri</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Kategori:</span>
                  <span className="ml-2 text-gray-600">{video.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Yayın Tarihi:</span>
                  <span className="ml-2 text-gray-600">{formatDate(video.publishedAt)}</span>
                </div>
                {video.duration && (
                  <div>
                    <span className="font-medium text-gray-700">Süre:</span>
                    <span className="ml-2 text-gray-600">{video.duration}</span>
                  </div>
                )}
                {video.views && (
                  <div>
                    <span className="font-medium text-gray-700">Görüntüleme:</span>
                    <span className="ml-2 text-gray-600">{video.views.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related Videos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benzer Videolar</h3>
              <p className="text-sm text-gray-600">
                Yakında benzer videolar burada görünecek.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 