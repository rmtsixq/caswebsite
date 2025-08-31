'use client';

import React, { useState } from 'react';
import { Mail, Calendar, Users, BookOpen, Send, CheckCircle } from 'lucide-react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const newsletters = [
    {
      title: 'Weekly Research Digest',
      description: 'Latest academic research and insights from our contributors',
      frequency: 'Weekly',
      icon: BookOpen
    },
    {
      title: 'Editorial Updates',
      description: 'News about our editorial process and publication schedule',
      frequency: 'Monthly',
      icon: Calendar
    },
    {
      title: 'Community Highlights',
      description: 'Spotlight on our contributors and their achievements',
      frequency: 'Bi-weekly',
      icon: Users
    }
  ];

  const benefits = [
    'Stay updated with latest academic research',
    'Get early access to new publications',
    'Receive exclusive content and insights',
    'Connect with fellow researchers',
    'Learn about upcoming opportunities',
    'Access to special events and webinars'
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Implement newsletter subscription
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Newsletter</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Stay Informed
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Subscribe to our newsletters and never miss the latest research, insights, and opportunities in academia.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Newsletters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {newsletters.map((newsletter, index) => {
              const IconComponent = newsletter.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{newsletter.title}</h3>
                      <span className="text-sm text-primary font-medium">{newsletter.frequency}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{newsletter.description}</p>
                </div>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Subscribe?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Subscribe Now</h2>
            {subscribed ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-white/80 mb-6">
                  You've successfully subscribed to our newsletter. You'll receive our next update soon.
                </p>
                <button
                  onClick={() => setSubscribed(false)}
                  className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  Subscribe Another Email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900 placeholder:text-gray-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe to Newsletter</span>
                </button>
                <p className="text-white/70 text-sm mt-3 text-center">
                  Free forever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Newsletter Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Latest Issue</h3>
                <span className="text-sm text-gray-500">December 2024</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Featured research on artificial intelligence in education, political developments in the Middle East, 
                and new philosophical perspectives on technology.
              </p>
              <button className="text-primary hover:text-primary-dark font-medium text-sm">
                Read Latest Issue →
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Previous Issues</h3>
                <span className="text-sm text-gray-500">Archive</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Browse through our collection of past newsletters featuring research highlights, 
                community updates, and academic insights.
              </p>
              <button className="text-primary hover:text-primary-dark font-medium text-sm">
                Browse Archive →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Our Newsletter?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our editorial team for any questions about our newsletters or subscription.
          </p>
          <a
            href="/contact"
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
          >
            Contact Editorial Team
          </a>
        </div>
      </section>
    </div>
  );
} 