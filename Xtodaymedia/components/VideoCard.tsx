import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, Eye, Calendar } from 'lucide-react';
import { FirebaseVideo } from '@/lib/firestore';

interface VideoCardProps {
  video: FirebaseVideo;
  variant?: 'default' | 'featured' | 'compact';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, variant = 'default' }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  if (variant === 'featured') {
    return (
      <Link href={`/videos/${video.id}`} className="block">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={getYouTubeThumbnail(video.youtubeId || '')}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
              <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110">
                <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
              </button>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Play className="w-3 h-3" />
                <span>Video</span>
              </span>
            </div>
            {video.duration && (
              <div className="absolute bottom-4 right-4">
                <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="mb-2">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {video.category}
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
              {video.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {video.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                {video.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <Link href={`/videos/${video.id}`} className="block">
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
          <div className="flex">
            <div className="relative w-32 h-24 flex-shrink-0">
              <Image
                src={getYouTubeThumbnail(video.youtubeId || '')}
                alt={video.title}
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110">
                  <Play className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" />
                </button>
              </div>
              <div className="absolute top-1 left-1">
                <span className="bg-red-600 text-white px-1 py-0.5 rounded text-xs font-medium">
                  <Play className="w-2 h-2 inline" />
                </span>
              </div>
            </div>
            <div className="p-3 flex-1">
              <h3 className="text-sm font-serif font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  {video.views && (
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/videos/${video.id}`} className="block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={getYouTubeThumbnail(video.youtubeId || '')}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110">
              <Play className="w-6 h-6 text-gray-800 ml-0.5" fill="currentColor" />
            </button>
          </div>
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Play className="w-3 h-3" />
              <span>Video</span>
            </span>
          </div>
          {video.duration && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
              {video.category}
            </span>
          </div>
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {video.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {video.views && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{video.views.toLocaleString()} views</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(video.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default VideoCard;