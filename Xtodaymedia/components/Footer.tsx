'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Twitter, Linkedin, Youtube, Instagram, Star, Award, Users, Send } from 'lucide-react';
import { getPublishedArticles } from '@/lib/firestore';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const footerSections = [
    {
      title: 'Content',
      links: [
        { name: 'Articles', href: '/articles' },
        { name: 'Videos', href: '/videos' },
        { name: 'Podcasts', href: '/podcasts' },
        { name: 'Newsletter Archive', href: '/newsletter' }
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Team', href: '/about-us/our-team' },
        { name: 'Aim & Scope', href: '/about-us/aim-and-scope' },
        { name: 'Editorial Guidelines', href: '/about-us/editorial-guidelines' }
      ]
    },
    {
      title: 'Contribute',
      links: [
        { name: 'Submit Your Work', href: '/submit' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Join Our Team', href: '/about-us/our-team' },
        { name: 'Partnership', href: '/contact' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'STEM', href: '/articles?category=STEM' },
        { name: 'Politics', href: '/articles?category=Politics' },
        { name: 'Philosophy', href: '/articles?category=Philosophy' },
        { name: 'Women Rights', href: '/articles?category=Women Rights' },
        { name: 'Science & Technology', href: '/articles?category=Science & Technology' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/veritastoday', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/veritastoday', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@veritastoday', color: 'hover:text-red-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/veritastoday', color: 'hover:text-pink-500' },
    { name: 'Email', icon: Mail, href: 'mailto:editorial@veritastoday.org', color: 'hover:text-primary' }
  ];

  // Makale sayısını yükle
  useEffect(() => {
    const fetchArticleCount = async () => {
      try {
        const articles = await getPublishedArticles();
        setArticleCount(articles.length);
      } catch (error) {
        console.error('Makale sayısı yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleCount();
  }, []);

  const stats = [
    { icon: Star, label: 'Published Articles', value: loading ? '...' : articleCount.toString() },
    { icon: Award, label: 'Years of Excellence', value: '1+' },
    { icon: Users, label: 'Active Contributors', value: '20+' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Mail className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Weekly Newsletter</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Stay Informed
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Join 500+ readers getting our weekly digest of the latest research, 
                insights, and opportunities in academia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900 placeholder:text-gray-500"
                />
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </div>
              <p className="text-white/70 text-sm mt-3">
                Free forever. Unsubscribe anytime.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                    <IconComponent className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center overflow-hidden p-2">
                <img src="/Logo.png" alt="Vertias Today" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-white">
                  Vertias Today
                </span>
                <div className="text-xs text-gray-400 -mt-1">Academic Journal</div>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The Middle East's leading student-led academic journal. We empower young voices 
              through rigorous journalism, connecting bright minds to prestigious opportunities worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors duration-300 p-2 rounded-lg hover:bg-white/10`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-bold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Vertias Today. All rights reserved. Made with ❤️ for the academic community.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/guidelines"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Guidelines
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
              Empowering the next generation of scholars and thought leaders
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;