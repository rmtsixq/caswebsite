'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Edit, LogOut, Settings, Shield, Upload, X, Camera } from 'lucide-react';
import { uploadProfileImage } from '@/lib/firestore';
import { updateUserProfile } from '@/lib/auth';

export default function ProfilePage() {
  const { user, userProfile, loading, refreshUserProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        email: userProfile.email || '',
        bio: userProfile.bio || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !user) {
      alert('Please select a file first');
      return;
    }

    try {
      setUploadingImage(true);
      console.log('Uploading profile image for user:', user.uid);
      
      const imageUrl = await uploadProfileImage(selectedFile, user.uid);
      console.log('Profile image uploaded successfully:', imageUrl);
      
      // Update user profile with new image URL
      await updateUserProfile(user.uid, { profileImage: imageUrl });
      console.log('User profile updated with new image URL');
      
      // Refresh user profile to get updated data
      await refreshUserProfile();
      console.log('User profile refreshed');
      
      setSelectedFile(null);
      setImagePreview(null);
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      await updateUserProfile(user.uid, {
        displayName: formData.displayName,
        email: formData.email,
        bio: formData.bio
      });
      
      // Refresh user profile to get updated data
      await refreshUserProfile();
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Profile
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your account settings and personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-8 text-white">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {userProfile?.profileImage ? (
                    <img 
                      src={userProfile.profileImage} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => document.getElementById('profile-image-upload')?.click()}
                      className="absolute -bottom-1 -right-1 bg-white text-primary rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                      title="Upload profile image"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    {userProfile?.displayName || 'User'}
                  </h2>
                  <p className="text-white text-opacity-90">
                    {userProfile?.email || user.email}
                  </p>
                  {userProfile?.isAdmin && (
                    <div className="flex items-center mt-2">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Administrator</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-lg transition-colors duration-200"
                  title={isEditing ? 'Cancel editing' : 'Edit profile'}
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              {isEditing ? (
                <div className="space-y-6">
                  {/* Profile Image Upload */}
                  {selectedFile && (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img src={imagePreview!} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"/>
                        <button
                          onClick={clearFileSelection}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                          title="Remove selected image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={handleImageUpload}
                        disabled={uploadingImage}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Profile Image'}</span>
                      </button>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your display name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        clearFileSelection();
                      }}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Display Name</p>
                        <p className="font-semibold">{userProfile?.displayName || 'Not set'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{userProfile?.email || user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {userProfile?.bio && (
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bio</p>
                        <p className="font-semibold">{userProfile.bio}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-semibold">
                        {userProfile?.createdAt ? 
                          new Date(userProfile.createdAt).toLocaleDateString() : 
                          'Unknown'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Actions</h3>
            
            <div className="space-y-4">
              {userProfile?.isAdmin && (
                <a
                  href="/admin"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Admin Panel</p>
                      <p className="text-sm text-gray-500">Manage content and users</p>
                    </div>
                  </div>
                  <div className="text-primary">→</div>
                </a>
              )}
              
              <button
                onClick={() => {/* TODO: Implement logout */}}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">Sign Out</p>
                    <p className="text-sm text-gray-500">Log out of your account</p>
                  </div>
                </div>
                <div className="text-red-600">→</div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 