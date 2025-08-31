'use client';

import React from 'react';
import { BookOpen, FileText, CheckCircle, Users, Award, Calendar } from 'lucide-react';

export default function GuidelinesPage() {
  const guidelines = [
    {
      title: 'Academic Writing Standards',
      icon: BookOpen,
      items: [
        'Clear, concise, and well-structured writing',
        'Original research or critical analysis',
        'Proper academic citation (APA format)',
        'Logical argument development',
        'Professional tone and language',
        'Word count: 3,000-8,000 words'
      ]
    },
    {
      title: 'Research Quality',
      icon: Award,
      items: [
        'Rigorous methodology and analysis',
        'Evidence-based conclusions',
        'Transparent research methods',
        'Relevant literature review',
        'Clear research objectives',
        'Reproducible findings'
      ]
    },
    {
      title: 'Submission Format',
      icon: FileText,
      items: [
        'Microsoft Word (.docx) format',
        '12pt Times New Roman font',
        'Double-spaced text',
        '1-inch margins on all sides',
        'Page numbers included',
        'Abstract (150-250 words)'
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

  const categories = [
    {
      name: 'STEM',
      description: 'Science, Technology, Engineering, and Mathematics research',
      topics: ['Computer Science', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Engineering']
    },
    {
      name: 'Politics',
      description: 'Political science, international relations, and governance',
      topics: ['Political Theory', 'International Relations', 'Public Policy', 'Comparative Politics', 'Political Economy']
    },
    {
      name: 'Philosophy',
      description: 'Philosophical inquiry and theoretical analysis',
      topics: ['Ethics', 'Metaphysics', 'Epistemology', 'Political Philosophy', 'Philosophy of Science']
    },
    {
      name: 'Women Rights',
      description: 'Gender studies, women\'s rights, and feminist research',
      topics: ['Gender Studies', 'Women\'s History', 'Feminist Theory', 'Gender Equality', 'Women\'s Rights']
    },
    {
      name: 'Science & Technology',
      description: 'Scientific research and technological innovation',
      topics: ['Scientific Research', 'Technology Innovation', 'Scientific Ethics', 'Technology Policy', 'Scientific Communication']
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
              <span className="text-sm font-medium">Guidelines</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Submission Guidelines
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

          {/* Research Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Topics include:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
                <h3 className="font-semibold mb-2">Submit</h3>
                <p className="text-white/80 text-sm">Upload your manuscript through our portal</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Review</h3>
                <p className="text-white/80 text-sm">Editorial team conducts initial screening</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="text-white/80 text-sm">Expert reviewers provide detailed feedback</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Publish</h3>
                <p className="text-white/80 text-sm">Final decision and publication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Submit?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Follow these guidelines to ensure your submission meets our standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/submit"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Submit Your Work
            </a>
            <a
              href="/about-us/editorial-guidelines"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Editorial Guidelines
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 