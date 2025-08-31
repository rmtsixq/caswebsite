'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createVideo, extractYouTubeId } from '@/lib/firestore';
import { categories } from '@/lib/data';
import { ArrowLeft, Save, Play, AlertCircle, Youtube } from 'lucide-react';

export default function NewVideoPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: '',
    customCategory: '',
    status: 'draft' as 'draft' | 'published'
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [youtubeId, setYoutubeId] = useState<string>('');

  // Admin değilse yönlendir
  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleYoutubeUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, youtubeUrl: url }));
    const extractedId = extractYouTubeId(url);
    console.log('YouTube URL:', url);
    console.log('Extracted ID:', extractedId);
    setYoutubeId(extractedId || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // YouTube ID'yi tekrar kontrol et
    const extractedId = extractYouTubeId(formData.youtubeUrl);
    if (!extractedId) {
      setError('Invalid YouTube URL');
      setSubmitting(false);
      return;
    }

    try {
      const videoData = {
        title: formData.title,
        description: formData.description,
        youtubeUrl: formData.youtubeUrl,
        category: formData.customCategory || formData.category,
        publishedAt: new Date().toISOString(),
        status: formData.status,
        createdBy: user?.uid || ''
      };

      console.log('Creating video with data:', videoData);
      await createVideo(videoData);
      router.push('/admin');
    } catch (error: any) {
      console.error('Video creation error:', error);
      setError(error.message || 'An error occurred while creating the video');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
                <h1 className="text-3xl font-serif font-bold text-gray-900">New Video</h1>
                <p className="text-gray-600 mt-1">Add YouTube video</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="Enter video title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="Enter video description"
                  />
                </div>

                {/* YouTube URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.youtubeUrl}
                    onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {youtubeId && (
                    <div className="mt-2 flex items-center space-x-2 text-green-600">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">YouTube ID: {youtubeId}</span>
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Custom Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Category
                  </label>
                  <input
                    type="text"
                    value={formData.customCategory}
                    onChange={(e) => handleInputChange('customCategory', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="Custom category name (optional)"
                  />
                </div>

                                 {/* YouTube Thumbnail Info */}
                 <div className="bg-blue-50 rounded-lg p-4">
                   <div className="flex items-center space-x-2 mb-2">
                     <Youtube className="w-5 h-5 text-red-600" />
                     <span className="font-medium text-blue-900">YouTube Thumbnail</span>
                   </div>
                   <p className="text-sm text-blue-800">
                     Video thumbnail will be automatically retrieved from YouTube. 
                     YouTube's official thumbnail API will be used to provide the highest quality image.
                   </p>
                 </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !formData.title || !formData.description || !formData.youtubeUrl}
                    className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Video</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Publish</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview */}
            {youtubeId && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Preview</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={formData.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {formData.title || 'Not specified'}</p>
                  <p><strong>Category:</strong> {formData.customCategory || formData.category || 'Not specified'}</p>
                  <p><strong>Status:</strong> {formData.status === 'published' ? 'Will be published' : 'Draft'}</p>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Help</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Paste the YouTube video URL</li>
                <li>• Video will automatically get thumbnail</li>
                <li>• Select category or create custom category</li>
                <li>• Save as draft and publish later</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 