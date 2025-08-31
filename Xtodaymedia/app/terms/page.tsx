'use client';

import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Users, Shield, Calendar } from 'lucide-react';

export default function TermsOfServicePage() {
  const terms = [
    {
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        'By accessing and using Vertias Today, you accept and agree to be bound by these terms',
        'These terms apply to all users, contributors, and visitors',
        'We reserve the right to modify these terms at any time',
        'Continued use constitutes acceptance of updated terms'
      ]
    },
    {
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'Provide accurate and truthful information',
        'Maintain the security of your account credentials',
        'Respect intellectual property rights',
        'Comply with all applicable laws and regulations',
        'Report any violations or suspicious activity'
      ]
    },
    {
      title: 'Content Guidelines',
      icon: FileText,
      content: [
        'Submit original, high-quality academic content',
        'Ensure proper attribution and citations',
        'Avoid plagiarism and copyright infringement',
        'Maintain professional and respectful communication',
        'Follow our editorial guidelines and standards'
      ]
    },
    {
      title: 'Intellectual Property',
      icon: Shield,
      content: [
        'Authors retain copyright of their original work',
        'Vertias Today receives non-exclusive publication rights',
        'Proper attribution required for all content',
        'Respect for third-party intellectual property',
        'License agreements for published content'
      ]
    }
  ];

  const prohibited = [
    'Plagiarism or copyright infringement',
    'False or misleading information',
    'Harassment or discriminatory content',
    'Commercial advertising or spam',
    'Malware or harmful code',
    'Violation of academic integrity'
  ];

  const termination = [
    {
      condition: 'Violation of Terms',
      action: 'Immediate account suspension or termination',
      description: 'Serious violations may result in permanent ban'
    },
    {
      condition: 'Inactive Account',
      action: 'Account deactivation after 12 months',
      description: 'Inactive accounts may be removed from our system'
    },
    {
      condition: 'Legal Requirements',
      action: 'Compliance with legal obligations',
      description: 'We may terminate accounts to comply with laws'
    },
    {
      condition: 'Service Discontinuation',
      action: 'Advance notice of service changes',
      description: 'Users will be notified of any service modifications'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Terms of Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The terms and conditions governing your use of Vertias Today academic platform.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <p>Effective date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {terms.map((term, index) => {
              const IconComponent = term.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{term.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {term.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Prohibited Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prohibited Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibited.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Termination Policy */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Account Termination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {termination.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{item.condition}</h3>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                      {item.action}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Limitation of Liability</h2>
            <div className="space-y-4 text-white/90">
              <p>
                Vertias Today provides this platform "as is" and makes no warranties about the accuracy, 
                completeness, or reliability of any content or services.
              </p>
              <p>
                We are not liable for any damages arising from the use of our services, including 
                but not limited to direct, indirect, incidental, or consequential damages.
              </p>
              <p>
                Users are responsible for their own content and interactions on the platform. 
                We do not endorse or verify the accuracy of user-submitted content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Terms?</h2>
          <p className="text-xl text-gray-600 mb-8">
            If you have any questions about these terms of service, please contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Contact Legal Team
            </a>
            <a
              href="/privacy"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 