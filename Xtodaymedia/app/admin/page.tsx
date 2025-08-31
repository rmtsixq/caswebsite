'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getAllArticles, getAllVideos } from '@/lib/firestore';
import { FileText, Video, Settings, Plus, BarChart3, Users, Eye } from 'lucide-react';

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalVideos: 0,
    totalViews: 0,
    totalUsers: 1
  });
  const [loadingStats, setLoadingStats] = useState(true);

          // Redirect to home page if not admin
  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

          // Load statistics
  useEffect(() => {
    const fetchStats = async () => {
      if (!isAdmin) return;
      
      try {
        setLoadingStats(true);
        
        const [articles, videos] = await Promise.all([
          getAllArticles(),
          getAllVideos()
        ]);

        const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0) +
                          videos.reduce((sum, video) => sum + (video.views || 0), 0);

        setStats({
          totalArticles: articles.length,
          totalVideos: videos.length,
          totalViews,
          totalUsers: 1 // Fixed for now
        });
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Empty page during redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Content management and site statistics</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Admin
              </span>
              <span className="text-sm text-gray-500">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Makale</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : stats.totalArticles}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <Video className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Video</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : stats.totalVideos}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Eye className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Görüntüleme</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : stats.totalViews.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kayıtlı Kullanıcı</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingStats ? '...' : stats.totalUsers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/admin/articles/new"
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                <Plus className="w-6 h-6" />
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Yeni Makale</h3>
            <p className="text-gray-600 mb-4">Yeni bir makale oluştur ve yayınla.</p>
            <div className="flex items-center text-blue-600 font-medium">
              <span>Makale Oluştur</span>
              <Plus className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link 
            href="/admin/videos/new"
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors duration-200">
                <Plus className="w-6 h-6" />
              </div>
              <Video className="w-8 h-8 text-red-500 opacity-20" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Yeni Video</h3>
            <p className="text-gray-600 mb-4">YouTube video ekle ve yönet.</p>
            <div className="flex items-center text-red-600 font-medium">
              <span>Video Ekle</span>
              <Plus className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link 
            href="/admin/articles"
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors duration-200">
                <FileText className="w-6 h-6" />
              </div>
              <BarChart3 className="w-8 h-8 text-green-500 opacity-20" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Makale Yönetimi</h3>
            <p className="text-gray-600 mb-4">Makaleleri düzenle, sil veya durumunu değiştir.</p>
            <div className="flex items-center text-green-600 font-medium">
              <span>Makaleleri Yönet</span>
              <Settings className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link 
            href="/admin/videos"
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors duration-200">
                <Video className="w-6 h-6" />
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Yönetimi</h3>
            <p className="text-gray-600 mb-4">Videoları düzenle, sil veya durumunu değiştir.</p>
            <div className="flex items-center text-purple-600 font-medium">
              <span>Videoları Yönet</span>
              <Settings className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Son Aktiviteler</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz aktivite yok</h3>
              <p className="text-gray-600">
                İçerik eklemeye başladığınızda burada son aktiviteler görünecek.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}