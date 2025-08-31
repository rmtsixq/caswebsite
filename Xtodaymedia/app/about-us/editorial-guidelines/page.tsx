'use client';

import React from 'react';
import { BookOpen, FileText, CheckCircle, AlertTriangle, Users, Calendar, Award } from 'lucide-react';

export default function EditorialGuidelinesPage() {
  const guidelines = [
    {
      title: 'Article Structure',
      icon: FileText,
      items: [
        'Abstract (150-250 words)',
        'Introduction with clear objectives',
        'Literature review and methodology',
        'Results and discussion',
        'Conclusion and implications',
        'References (APA format)'
      ]
    },
    {
      title: 'Writing Standards',
      icon: BookOpen,
      items: [
        'Clear, concise academic writing',
        'Original research or analysis',
        'Proper citation of sources',
        'Logical flow and coherence',
        'Professional tone throughout',
        'Word limit: 3,000-8,000 words'
      ]
    },
    {
      title: 'Submission Requirements',
      icon: CheckCircle,
      items: [
        'Microsoft Word format (.docx)',
        '12pt Times New Roman font',
        'Double-spaced text',
        '1-inch margins on all sides',
        'Page numbers included',
        'Author information separate'
      ]
    },
    {
      title: 'Review Process',
      icon: Users,
      items: [
        'Initial editorial screening',
        'Double-blind peer review',
        'Expert feedback provided',
        'Revision recommendations',
        'Final editorial decision',
        'Publication timeline: 4-8 weeks'
      ]
    }
  ];

  const ethicalGuidelines = [
    {
      title: 'Academic Integrity',
      description: 'All submissions must be original work. Plagiarism, fabrication, and falsification are strictly prohibited.',
      icon: Award
    },
    {
      title: 'Conflict of Interest',
      description: 'Authors must disclose any potential conflicts of interest that could influence their research or conclusions.',
      icon: AlertTriangle
    },
    {
      title: 'Data Transparency',
      description: 'Research data should be available for verification. Methods must be clearly described and reproducible.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Editorial Guidelines</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Editorial Guidelines
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guidelines for submitting high-quality academic content to Vertias Today.
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {guidelines.map((guideline, index) => {
              const IconComponent = guideline.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{guideline.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {guideline.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Ethical Guidelines */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ethical Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ethicalGuidelines.map((guideline, index) => {
                const IconComponent = guideline.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{guideline.title}</h3>
                    <p className="text-gray-600">{guideline.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submission Timeline */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Submission Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Submission</h3>
                <p className="text-white/80 text-sm">Submit your manuscript through our online portal</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Initial Review</h3>
                <p className="text-white/80 text-sm">Editorial team conducts initial screening (1-2 weeks)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Peer Review</h3>
                <p className="text-white/80 text-sm">Expert reviewers provide detailed feedback (3-4 weeks)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Publication</h3>
                <p className="text-white/80 text-sm">Final decision and publication (1-2 weeks)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Guidelines?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our editorial team is here to help you understand our guidelines and submission process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Contact Editorial Team
            </a>
            <a
              href="/submit"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Submit Your Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 