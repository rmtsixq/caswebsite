import React from 'react';
import { Headphones, Clock, Mic, Settings } from 'lucide-react';

export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Podcasts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Listen to our podcast episodes featuring expert interviews, deep dives into current topics, 
              and thoughtful discussions on the issues that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Under Construction Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full mb-6">
                <Settings className="w-12 h-12 text-yellow-600 animate-spin" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Under Construction
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're working hard to bring you amazing podcast content. Our podcast platform is currently being developed and will be available soon.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <Mic className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Expert Interviews</h3>
                <p className="text-sm text-gray-600">In-depth conversations with industry leaders and academics</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <Headphones className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Deep Discussions</h3>
                <p className="text-sm text-gray-600">Thoughtful analysis of current topics and issues</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Regular Episodes</h3>
                <p className="text-sm text-gray-600">Consistent content delivery on a weekly schedule</p>
              </div>
            </div>
            
            <div className="bg-primary-light p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-2">Stay Updated</h3>
              <p className="text-gray-700">
                Subscribe to our newsletter to get notified when our podcast launches. We'll also share behind-the-scenes content and exclusive previews.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}