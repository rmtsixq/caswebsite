'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getAllVideos, updateVideo, deleteVideo } from '@/lib/firestore';
import { FirebaseVideo } from '@/lib/firestore';
import { ArrowLeft, Plus, Edit, Trash2, Play, Search, Filter, Video as VideoIcon } from 'lucide-react';

export default function VideosManagementPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  const [videos, setVideos] = useState<FirebaseVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  // Admin değilse yönlendir
  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await getAllVideos();
        setVideos(videosData);
      } catch (error) {
        console.error('Videolar yüklenirken hata:', error);
      } finally {
        setLoadingVideos(false);
      }
    };

    if (isAdmin) {
      fetchVideos();
    }
  }, [isAdmin]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (videoId: string, newStatus: 'published' | 'draft') => {
    try {
      await updateVideo(videoId, { status: newStatus });
      setVideos(prev => prev.map(video => 
        video.id === videoId ? { ...video, status: newStatus } : video
      ));
    } catch (error) {
      console.error('Video durumu güncellenirken hata:', error);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (confirm('Bu videoyu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteVideo(videoId);
        setVideos(prev => prev.filter(video => video.id !== videoId));
      } catch (error) {
        console.error('Video silinirken hata:', error);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVideos.length === 0) return;
    
    if (confirm(`${selectedVideos.length} videoyu silmek istediğinizden emin misiniz?`)) {
      try {
        await Promise.all(selectedVideos.map(id => deleteVideo(id)));
        setVideos(prev => prev.filter(video => !selectedVideos.includes(video.id!)));
        setSelectedVideos([]);
      } catch (error) {
        console.error('Toplu silme hatası:', error);
      }
    }
  };

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

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Video Yönetimi</h1>
                <p className="text-gray-600 mt-1">Tüm videoları görüntüle, düzenle ve yönet</p>
              </div>
            </div>
            <Link
              href="/admin/videos/new"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Video</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Video ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayınlanmış</option>
                <option value="draft">Taslak</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredVideos.length} video
              </span>
              {selectedVideos.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{selectedVideos.length} seçiliyi sil</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Videos List */}
        {loadingVideos ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Videolar yükleniyor...</p>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedVideos.length === filteredVideos.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedVideos(filteredVideos.map(v => v.id!));
                          } else {
                            setSelectedVideos([]);
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Video
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVideos.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedVideos.includes(video.id!)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedVideos(prev => [...prev, video.id!]);
                            } else {
                              setSelectedVideos(prev => prev.filter(id => id !== video.id));
                            }
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 relative">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                              alt={video.title}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="w-4 h-4 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {video.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {video.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={video.status}
                          onChange={(e) => handleStatusChange(video.id!, e.target.value as 'published' | 'draft')}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="draft">Taslak</option>
                          <option value="published">Yayınlanmış</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {video.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(video.publishedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/videos/edit/${video.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteVideo(video.id!)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <VideoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              Henüz video yok
            </h3>
            <p className="text-gray-600 mb-6">
              İlk videonuzu oluşturmak için "Yeni Video" butonuna tıklayın.
            </p>
            <Link
              href="/admin/videos/new"
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>İlk Videoyu Oluştur</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 