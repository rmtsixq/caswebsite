import React from 'react';
import Link from 'next/link';
import { Send, FileText, Video, Headphones, CheckCircle, Users, Clock, Award, Lightbulb, BookOpen, MessageSquare } from 'lucide-react';

const submissionTypes = [
  {
    icon: FileText,
    title: 'Research Articles',
    description: 'In-depth analysis and research papers on academic topics',
    requirements: ['1500-3000 words', 'Peer-reviewed sources', 'Original research'],
    examples: ['Scientific studies', 'Policy analysis', 'Historical research']
  },
  {
    icon: Video,
    title: 'Video Essays',
    description: 'Educational video content with strong narrative structure',
    requirements: ['5-15 minutes', 'Script included', 'Educational focus'],
    examples: ['Explainer videos', 'Documentary shorts', 'Tutorial content']
  },
  {
    icon: Headphones,
    title: 'Podcast Episodes',
    description: 'Audio content including interviews and discussions',
    requirements: ['15-45 minutes', 'Clear audio quality', 'Engaging format'],
    examples: ['Expert interviews', 'Panel discussions', 'Narrative podcasts']
  },
  {
    icon: MessageSquare,
    title: 'Opinion Pieces',
    description: 'Thoughtful commentary on current events and social issues',
    requirements: ['800-1500 words', 'Clear argument', 'Supporting evidence'],
    examples: ['Social commentary', 'Political analysis', 'Cultural critique']
  }
];

const submissionProcess = [
  {
    step: 1,
    title: 'Submit Your Work',
    description: 'Fill out our submission form with your content and contact information',
    icon: Send
  },
  {
    step: 2,
    title: 'Editorial Review',
    description: 'Our editorial team reviews your submission for quality and fit',
    duration: '1-2 weeks',
    icon: Users
  },
  {
    step: 3,
    title: 'Peer Review',
    description: 'Accepted submissions undergo peer review for academic rigor',
    duration: '2-3 weeks',
    icon: CheckCircle
  },
  {
    step: 4,
    title: 'Publication',
    description: 'Final articles are published and promoted across our platform',
    duration: '1 week',
    icon: Award
  }
];

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-light via-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <Lightbulb className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Share Your Ideas</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Submit Your
              <span className="block text-yellow-300">Work</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
              Join our community of student researchers and thought leaders. Share your insights, 
              research, and ideas with a global audience of engaged readers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">48hr</div>
                <div className="text-white/90">Response Time</div>
                <div className="text-sm text-white/70">Initial Review</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">85%</div>
                <div className="text-white/90">Acceptance Rate</div>
                <div className="text-sm text-white/70">Quality Submissions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">10K+</div>
                <div className="text-white/90">Monthly Views</div>
                <div className="text-sm text-white/70">Average Article</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              What We Accept
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We welcome diverse forms of academic and intellectual content from student researchers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {submissionTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{type.title}</h3>
                      <p className="text-gray-700 mb-4">{type.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {type.requirements.map((req, i) => (
                              <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, i) => (
                              <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submission Process */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Submission Process
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our streamlined process ensures quality while providing timely feedback to contributors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {submissionProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 mb-2">{step.description}</p>
                  {step.duration && (
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Submit Your Work
            </h2>
            <p className="text-lg text-gray-700">
              Ready to share your ideas? Fill out the form below to get started.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl">
            <form className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-900 mb-2">
                    Institution/School
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your school or university"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-900 mb-2">
                    Academic Year
                  </label>
                  <select
                    id="year"
                    name="year"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select your year</option>
                    <option value="high-school">High School</option>
                    <option value="freshman">University Freshman</option>
                    <option value="sophomore">University Sophomore</option>
                    <option value="junior">University Junior</option>
                    <option value="senior">University Senior</option>
                    <option value="graduate">Graduate Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Submission Details */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
                  Submission Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select submission type</option>
                  <option value="research-article">Research Article</option>
                  <option value="opinion-piece">Opinion Piece</option>
                  <option value="video-essay">Video Essay</option>
                  <option value="podcast">Podcast Episode</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="stem">STEM</option>
                  <option value="social-studies">Social Studies</option>
                  <option value="politics">Politics</option>
                  <option value="philosophy">Philosophy</option>
                  <option value="art-literature">Art & Literature</option>
                  <option value="women-rights">Women Rights</option>
                  <option value="science-technology">Science & Technology</option>
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your submission title"
                />
              </div>

              <div>
                <label htmlFor="abstract" className="block text-sm font-medium text-gray-900 mb-2">
                  Abstract/Summary *
                </label>
                <textarea
                  id="abstract"
                  name="abstract"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Provide a brief summary of your work (150-300 words)"
                ></textarea>
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-900 mb-2">
                  Upload File *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                        <span>Upload a file</span>
                        <input id="file" name="file" type="file" className="sr-only" accept=".pdf,.doc,.docx,.txt" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="additional-info" className="block text-sm font-medium text-gray-900 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additional-info"
                  name="additional-info"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any additional information you'd like to share about your submission"
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the <Link href="/terms" className="text-primary hover:text-primary-dark">terms and conditions</Link> and confirm that this work is original and has not been published elsewhere.
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Your Work</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Submission Guidelines
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Review our comprehensive guidelines to ensure your submission meets our standards and increases your chances of acceptance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/guidelines"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Read Guidelines
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}