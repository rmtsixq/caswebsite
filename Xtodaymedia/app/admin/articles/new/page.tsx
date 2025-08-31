'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createArticle, createSlug, getAllUsers } from '@/lib/firestore';
import { uploadImage } from '@/lib/firestore';
import { categories } from '@/lib/data';
import { ArrowLeft, Save, Eye, EyeOff, Upload, X, AlertCircle } from 'lucide-react';
import ArticleEditor from '@/components/ArticleEditor';

export default function NewArticlePage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    customCategory: '',
    tags: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published',
    isEditorsPick: false,
    author: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  // File upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Author options
  const [authors, setAuthors] = useState<{ uid: string; displayName: string; email: string }[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);

  // Redirect if not admin
  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  // Load users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingAuthors(true);
        const users = await getAllUsers();
        setAuthors(users);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoadingAuthors(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      console.log('Article creation started...');
      console.log('User:', user);
      
      const selectedAuthor = authors.find(a => a.uid === formData.author);
      
      const articleData = {
        title: formData.title,
        slug: createSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        author: selectedAuthor?.displayName || 'Admin',
        category: formData.customCategory || formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        publishedAt: new Date().toISOString(),
        readTime: Math.ceil(formData.content.split(' ').length / 200), // ~200 words per minute
        featuredImage: formData.featuredImage || '/images/default-article.jpg',
        isEditorsPick: formData.isEditorsPick,
        status: formData.status,
        createdBy: user?.uid || ''
      };

      console.log('Article Data:', articleData);
      console.log('Checking Firebase connection...');

      const articleId = await createArticle(articleData);
      console.log('Article created successfully! ID:', articleId);
      
      router.push('/admin');
    } catch (error: any) {
      console.error('Article creation error:', error);
      setError(error.message || 'An error occurred while creating the article');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // File selection function
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files.');
        return;
      }
      
      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB.');
        return;
      }
      
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // File upload function
  const handleImageUpload = async () => {
    if (!selectedFile) return;
    
    try {
      setUploadingImage(true);
      setError('');
      
      const downloadURL = await uploadImage(selectedFile);
      
      setFormData(prev => ({
        ...prev,
        featuredImage: downloadURL
      }));
      
      setSelectedFile(null);
      setImagePreview('');
      
      console.log('Image uploaded successfully:', downloadURL);
    } catch (error) {
      console.error('Image upload error:', error);
      setError('An error occurred while uploading the image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Clear file selection
  const clearFileSelection = () => {
    setSelectedFile(null);
    setImagePreview('');
    setError('');
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
                <h1 className="text-3xl font-serif font-bold text-gray-900">New Article</h1>
                <p className="text-gray-600 mt-1">Create and publish a new article</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>Preview</span>
              </button>
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
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="Enter article title"
                  />
                </div>

                {/* Author Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                                     <select
                     required
                     value={formData.author}
                     onChange={(e) => handleInputChange('author', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800"
                     disabled={loadingAuthors}
                   >
                     <option value="">{loadingAuthors ? 'Loading...' : 'Select author'}</option>
                     {authors.map(author => (
                       <option key={author.uid} value={author.uid}>
                         {author.displayName} ({author.email})
                       </option>
                     ))}
                   </select>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="Enter article excerpt"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <ArticleEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Enter article content..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    HTML tags are supported. Use the toolbar buttons for easy formatting.
                  </p>
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

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-red-800 placeholder-red-400"
                    placeholder="Separate tags with commas (e.g., technology, science, AI)"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  
                  {/* Show existing image if available */}
                  {formData.featuredImage && (
                    <div className="mb-4">
                      <img 
                        src={formData.featuredImage} 
                        alt="Featured" 
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => handleInputChange('featuredImage', '')}
                        className="mt-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                  
                  {/* File upload area */}
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : 'Select image file'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF (max 5MB)
                        </p>
                      </label>
                    </div>
                    
                    {/* Selected file preview */}
                    {imagePreview && (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={clearFileSelection}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Upload button */}
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={uploadingImage}
                        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                      >
                        {uploadingImage ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </div>
                        ) : (
                          'Upload Image'
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Manual URL input (alternative) */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or add via URL
                    </label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
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
                    disabled={submitting}
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
                        <span>Save Article</span>
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

                {/* Editor's Pick */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editorsPick"
                    checked={formData.isEditorsPick}
                    onChange={(e) => handleInputChange('isEditorsPick', e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="editorsPick" className="ml-2 block text-sm text-gray-700">
                    Editor's Pick
                  </label>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold">{formData.title || 'Title'}</h2>
                  <p className="text-gray-600">{formData.excerpt || 'Excerpt'}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Category: {formData.customCategory || formData.category || 'Not specified'}</p>
                    <p>Tags: {formData.tags || 'None'}</p>
                    <p>Status: {formData.status === 'published' ? 'Will be published' : 'Draft'}</p>
                    {formData.isEditorsPick && <p className="text-yellow-600">⭐ Editor's Pick</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 