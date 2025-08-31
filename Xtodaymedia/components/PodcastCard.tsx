import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Headphones, Clock, Calendar, Mic } from 'lucide-react';
import { Podcast } from '@/lib/data';

interface PodcastCardProps {
  podcast: Podcast;
  variant?: 'default' | 'featured';
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, variant = 'default' }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (variant === 'featured') {
    return (
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 md:h-80">
          <Image
            src={podcast.thumbnail}
            alt={podcast.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
            <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110">
              <Headphones className="w-8 h-8 text-gray-800" />
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <Mic className="w-3 h-3" />
              <span>Podcast</span>
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {podcast.duration}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center space-x-2">
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              Season {podcast.season}
            </span>
            <span className="text-sm text-gray-600">
              Episode {podcast.episode}
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
            <Link href={`https://open.spotify.com/episode/${podcast.spotifyId}`} target="_blank">
              {podcast.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {podcast.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{podcast.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(podcast.publishedAt)}</span>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
              Listen on Spotify
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48">
        <Image
          src={podcast.thumbnail}
          alt={podcast.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110">
            <Headphones className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Mic className="w-3 h-3" />
            <span>Podcast</span>
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            {podcast.duration}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center space-x-2">
          <span className="inline-block bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
            S{podcast.season}E{podcast.episode}
          </span>
        </div>
        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`https://open.spotify.com/episode/${podcast.spotifyId}`} target="_blank">
            {podcast.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {podcast.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{podcast.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(podcast.publishedAt)}</span>
            </div>
          </div>
          <button className="text-green-600 hover:text-green-700 font-medium transition-colors text-xs">
            Listen
          </button>
        </div>
      </div>
    </article>
  );
};

export default PodcastCard;