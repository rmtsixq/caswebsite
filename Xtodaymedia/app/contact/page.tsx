import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageSquare, Clock, Users, Send, Globe } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch with our editorial team',
    contact: 'editorial@xtimes.org',
    responseTime: 'Usually within 24 hours'
  },
  {
    icon: MessageSquare,
    title: 'General Inquiries',
    description: 'Questions about Vertias Today',
    contact: 'info@xtimes.org',
    responseTime: 'Usually within 48 hours'
  },
  {
    icon: Users,
    title: 'Submissions',
    description: 'Article and content submissions',
    contact: 'submissions@xtimes.org',
    responseTime: 'Usually within 1 week'
  },
  {
    icon: Globe,
    title: 'Partnerships',
    description: 'Collaborations and partnerships',
    contact: 'partnerships@xtimes.org',
    responseTime: 'Usually within 1 week'
  }
];



export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-light via-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <MessageSquare className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Contact
              <span className="block text-yellow-300">Vertias Today</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
              Have a story idea, want to contribute, or looking to collaborate? 
              We'd love to hear from you and explore how we can work together.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <div className="text-lg font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-white/70">Available Online</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Users className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <div className="text-lg font-bold text-white mb-1">Global</div>
                <div className="text-sm text-white/70">Team Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <MessageSquare className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                <div className="text-lg font-bold text-white mb-1">Fast</div>
                <div className="text-sm text-white/70">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              How to Reach Us
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Choose the best way to get in touch based on your inquiry type.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow text-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-700 mb-3">{method.description}</p>
                  <a 
                    href={`mailto:${method.contact}`}
                    className="text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
                  >
                    {method.contact}
                  </a>
                  <p className="text-xs text-gray-500 mt-2">{method.responseTime}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-700">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
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
                    placeholder="Your full name"
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="submission">Content Submission</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="press">Press Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-900 mb-2">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your school or organization"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">
                  I'd like to subscribe to the Vertias Today newsletter for updates and new content.
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700">
              Quick answers to common questions about Vertias Today.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How do I submit an article to Vertias Today?",
                answer: "You can submit articles through our submission page. Fill out the form with your article details and upload your manuscript. Our editorial team will review it within 1-2 weeks."
              },
              {
                question: "What types of content do you publish?",
                answer: "We publish research articles, opinion pieces, video essays, and podcast episodes across various academic disciplines including STEM, politics, philosophy, and social studies."
              },
              {
                question: "Is there an age requirement to contribute?",
                answer: "While we primarily focus on student-led content, we welcome contributions from high school students through graduate students of all ages."
              },
              {
                question: "Do you offer editorial feedback?",
                answer: "Yes, all submissions receive editorial feedback regardless of acceptance status. We believe in helping contributors improve their work."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/faq"
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of passionate student researchers and thought leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/submit"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Submit Your Work
            </Link>
            <Link 
              href="/about-us/our-team"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}