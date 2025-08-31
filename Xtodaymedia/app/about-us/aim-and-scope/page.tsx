import React from 'react';
import Link from 'next/link';
import { Target, Globe, Users, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

export default function AimAndScopePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Aim & Scope
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our mission, vision, and the scope of our work as we strive to create 
              a platform for academic excellence and journalistic integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-primary-light rounded-full p-3 mr-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To provide a platform for student-led academic journalism that bridges cultural divides, 
                promotes critical thinking, and fosters intellectual discourse across the Middle East and beyond.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are committed to delivering high-quality, research-driven content that addresses the 
                most pressing issues of our time while maintaining the highest standards of journalistic 
                integrity and academic rigor.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-primary-light rounded-full p-3 mr-4">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                To become the leading student-led academic journal in the Middle East, recognized globally 
                for our contribution to scholarly discourse and our commitment to amplifying diverse voices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where young scholars and journalists can freely express their ideas, 
                challenge conventional thinking, and contribute to positive change in their communities and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide our work and define our approach to journalism and academia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Academic Excellence</h3>
              <p className="text-gray-600">
                We maintain rigorous academic standards in all our publications, ensuring that every piece 
                contributes meaningfully to scholarly discourse.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                We welcome voices from all backgrounds, cultures, and perspectives, creating a truly 
                inclusive platform for academic and journalistic expression.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Global Perspective</h3>
              <p className="text-gray-600">
                While rooted in the Middle East, we embrace a global perspective, addressing issues that 
                transcend borders and affect humanity as a whole.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Work */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Scope of Our Work</h2>
            <p className="text-lg text-gray-600">
              The breadth and depth of content we cover across multiple disciplines and formats.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Subject Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'STEM & Technology',
                    'Social Studies',
                    'Politics & Governance',
                    'Philosophy & Ethics',
                    'Art & Literature',
                    'Women\'s Rights',
                    'Environmental Studies',
                    'Economics',
                    'Cultural Studies'
                  ].map((subject) => (
                    <div key={subject} className="bg-gray-50 p-3 rounded-lg text-center">
                      <span className="font-medium text-gray-800">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Content Formats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary-light rounded-lg p-4 mb-3">
                      <BookOpen className="w-8 h-8 text-primary mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Articles</h4>
                    <p className="text-sm text-gray-600">
                      In-depth research articles, opinion pieces, and analytical content
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary-light rounded-lg p-4 mb-3">
                      <Globe className="w-8 h-8 text-primary mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Videos</h4>
                    <p className="text-sm text-gray-600">
                      Educational content, interviews, and documentary-style productions
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary-light rounded-lg p-4 mb-3">
                      <Users className="w-8 h-8 text-primary mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Podcasts</h4>
                    <p className="text-sm text-gray-600">
                      Expert discussions, debates, and conversational content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Be part of our journey to create meaningful, impactful journalism and academic discourse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved/join-us"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Join Our Team
            </Link>
            <Link
              href="/get-involved/contact-us"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}