'use client';

import React from 'react';
import { Shield, Eye, Lock, Database, Users, Mail, Calendar } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information (name, email, institution)',
        'Academic credentials and research interests',
        'Submitted manuscripts and research data',
        'Website usage analytics and cookies',
        'Communication records and correspondence'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Process and review your submissions',
        'Communicate about publication status',
        'Send newsletters and academic updates',
        'Improve our services and website',
        'Comply with legal obligations'
      ]
    },
    {
      title: 'Data Protection',
      icon: Shield,
      content: [
        'Encrypted data transmission (SSL/TLS)',
        'Secure storage on Firebase servers',
        'Regular security audits and updates',
        'Limited access to authorized personnel',
        'Data retention policies in place'
      ]
    },
    {
      title: 'Your Rights',
      icon: Eye,
      content: [
        'Access your personal data',
        'Request data correction or deletion',
        'Withdraw consent at any time',
        'Export your data in standard formats',
        'Lodge complaints with authorities'
      ]
    }
  ];

  const dataRetention = [
    {
      period: 'Active Submissions',
      duration: 'Until publication decision',
      description: 'Manuscripts and review data retained during the review process'
    },
    {
      period: 'Published Content',
      duration: 'Indefinitely',
      description: 'Published articles and research permanently archived'
    },
    {
      period: 'User Accounts',
      duration: 'Until account deletion',
      description: 'Profile information maintained while account is active'
    },
    {
      period: 'Analytics Data',
      duration: '2 years',
      description: 'Website usage data automatically deleted after 2 years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we collect, use, and protect your personal information at Vertias Today.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
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

          {/* Data Retention */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Data Retention Policy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataRetention.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{item.period}</h3>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Privacy Questions?</h3>
                <p className="text-white/80 mb-4">
                  If you have any questions about our privacy policy or how we handle your data, 
                  please don't hesitate to contact us.
                </p>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>privacy@xtimes.org</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Data Protection Officer</h3>
                <p className="text-white/80 mb-4">
                  Our dedicated team ensures compliance with data protection regulations 
                  and handles all privacy-related inquiries.
                </p>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span>dpo@xtimes.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Notice</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                This privacy policy is effective as of the date listed above and applies to all users of Vertias Today. 
                We may update this policy from time to time, and we will notify users of any material changes.
              </p>
              <p>
                Vertias Today is committed to protecting your privacy and ensuring the security of your personal information. 
                We comply with applicable data protection laws and regulations.
              </p>
              <p>
                By using our services, you acknowledge that you have read and understood this privacy policy 
                and agree to the collection and use of your information as described herein.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 