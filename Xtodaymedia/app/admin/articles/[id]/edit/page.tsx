'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getArticleById, updateArticle, createSlug, getAllUsers } from '@/lib/firestore';
import { uploadImage } from '@/lib/firestore';
import { categories } from '@/lib/data';
import { ArrowLeft, Save, Eye, EyeOff, Upload, X, AlertCircle } from 'lucide-react';
import { FirebaseArticle } from '@/lib/firestore';
import ArticleEditor from '@/components/ArticleEditor';

export default function EditArticlePage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
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
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(true);
  
  // Dosya yükleme state'leri
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Yazar seçenekleri
  const [authors, setAuthors] = useState<{ uid: string; displayName: string; email: string }[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);

  // Admin değilse yönlendir
  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  // Kullanıcıları yükle
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingAuthors(true);
        const users = await getAllUsers();
        setAuthors(users);
      } catch (error) {
        console.error('Kullanıcılar yüklenirken hata:', error);
        setError('Kullanıcılar yüklenirken bir hata oluştu');
      } finally {
        setLoadingAuthors(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  // Makale verilerini yükle
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;
      
      try {
        setLoadingArticle(true);
        const article = await getArticleById(articleId);
        
        if (article) {
          setFormData({
            title: article.title || '',
            excerpt: article.excerpt || '',
            content: article.content || '',
            category: article.category || '',
            customCategory: '',
            tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
            featuredImage: article.featuredImage || '',
            status: (article.status === 'archived' ? 'draft' : article.status) || 'draft',
            isEditorsPick: article.isEditorsPick || false,
            author: typeof article.author === 'string' ? article.author : 
              (article.author && typeof article.author === 'object' && 'name' in article.author) ? 
              (article.author as any).name : ''
          });
        } else {
          setError('Makale bulunamadı');
        }
      } catch (error) {
        console.error('Makale yüklenirken hata:', error);
        setError('Makale yüklenirken bir hata oluştu');
      } finally {
        setLoadingArticle(false);
      }
    };

    if (isAdmin && articleId) {
      fetchArticle();
    }
  }, [isAdmin, articleId]);

  if (loading || loadingArticle) {
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
    setSuccess('');

    try {
      // Form validasyonu
      if (!formData.title.trim()) {
        setError('Başlık gereklidir');
        return;
      }

      if (!formData.excerpt.trim()) {
        setError('Özet gereklidir');
        return;
      }

      if (!formData.content.trim()) {
        setError('İçerik gereklidir');
        return;
      }

      const selectedAuthor = authors.find(a => a.uid === formData.author);
      
      const articleData = {
        title: formData.title.trim(),
        slug: createSlug(formData.title),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: selectedAuthor?.displayName || formData.author || 'Admin',
        category: formData.customCategory || formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        featuredImage: formData.featuredImage || '/images/default-article.jpg',
        isEditorsPick: formData.isEditorsPick,
        status: formData.status,
        updatedAt: new Date().toISOString()
      };

      await updateArticle(articleId, articleData);
      setSuccess('Makale başarıyla güncellendi!');
      
      // 2 saniye sonra listeye dön
      setTimeout(() => {
        router.push('/admin/articles');
      }, 2000);
    } catch (error: any) {
      console.error('Makale güncelleme hatası:', error);
      setError(error.message || 'Makale güncellenirken bir hata oluştu');
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

  // Dosya seçme fonksiyonu
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Lütfen sadece resim dosyası seçin.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu 5MB\'dan küçük olmalıdır.');
        return;
      }
      
      setSelectedFile(file);
      setError('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dosya yükleme fonksiyonu
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
      
      console.log('Resim başarıyla yüklendi:', downloadURL);
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      setError('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Dosya seçimini temizle
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
                onClick={() => router.push('/admin/articles')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Makale Düzenle</h1>
                <p className="text-gray-600 mt-1">Makale bilgilerini güncelle</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>Önizleme</span>
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
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {success}
                </div>
              )}

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Makale başlığını girin"
                  />
                </div>

                {/* Author Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yazar *
                  </label>
                  <select
                    required
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
                    disabled={loadingAuthors}
                  >
                    <option value="">{loadingAuthors ? 'Yükleniyor...' : 'Yazar seçin'}</option>
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
                    Özet *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Makale özetini girin"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçerik *
                  </label>
                  <ArticleEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Makale içeriğini girin..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    HTML etiketleri kullanabilirsiniz. Toolbar'daki butonları kullanarak kolayca formatlama yapabilirsiniz.
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Custom Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özel Kategori
                  </label>
                  <input
                    type="text"
                    value={formData.customCategory}
                    onChange={(e) => handleInputChange('customCategory', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Özel kategori adı (opsiyonel)"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiketler
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Etiketleri virgülle ayırın (örn: teknoloji, bilim, AI)"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Öne Çıkan Görsel
                  </label>
                  
                  {/* Mevcut resim varsa göster */}
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
                        Resmi Kaldır
                      </button>
                    </div>
                  )}
                  
                  {/* Dosya yükleme alanı */}
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
                          {selectedFile ? selectedFile.name : 'Resim dosyası seçin'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF (max 5MB)
                        </p>
                      </label>
                    </div>
                    
                    {/* Seçilen dosya preview */}
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
                    
                    {/* Yükleme butonu */}
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
                            Yükleniyor...
                          </div>
                        ) : (
                          'Resmi Yükle'
                        )}
                      </button>
                    )}
                  </div>
                  
                  {/* Manuel URL girişi (alternatif) */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Veya URL ile ekle
                    </label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800 placeholder-gray-400"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/articles')}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Güncelleniyor...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Makaleyi Güncelle</span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ayarlar</h3>
              
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durum
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
                  >
                    <option value="draft">Taslak</option>
                    <option value="published">Yayınla</option>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Önizleme</h3>
                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold">{formData.title || 'Başlık'}</h2>
                  <p className="text-gray-600">{formData.excerpt || 'Özet'}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Yazar: {authors.find(a => a.uid === formData.author)?.displayName || 'Belirtilmemiş'}</p>
                    <p>Kategori: {formData.customCategory || formData.category || 'Belirtilmemiş'}</p>
                    <p>Etiketler: {formData.tags || 'Yok'}</p>
                    <p>Durum: {formData.status === 'published' ? 'Yayınlanacak' : 'Taslak'}</p>
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