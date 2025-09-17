import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import InteractivePrototypes from '../components/InteractivePrototypes'

// Navigation Component
const Navigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'prototypes', label: 'Prototypes' },
    { id: 'publications', label: 'Research' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 ml-4">
            <h1 className="text-xl font-bold text-primary-600">AI for AAC</h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="hidden md:block mr-4">
            <div className="ml-10 flex items-baseline space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden mr-4">
            <button
              onClick={() => setActiveTab('mobile-menu')}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {activeTab === 'mobile-menu' && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Accessibility and UI Components
const AccessibilityControls = () => {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const savedHighContrast = localStorage.getItem('highContrast') === 'true'
    const savedLargeText = localStorage.getItem('largeText') === 'true'
    const savedExpanded = localStorage.getItem('accessibilityExpanded') === 'true'
    setHighContrast(savedHighContrast)
    setLargeText(savedLargeText)
    setIsExpanded(savedExpanded)
  }, [])

  useEffect(() => {
    // Apply accessibility classes to document
    const body = document.body
    if (highContrast) {
      body.classList.add('high-contrast')
    } else {
      body.classList.remove('high-contrast')
    }
    
    if (largeText) {
      body.classList.add('large-text')
    } else {
      body.classList.remove('large-text')
    }
    
    // Save to localStorage
    localStorage.setItem('highContrast', highContrast.toString())
    localStorage.setItem('largeText', largeText.toString())
    localStorage.setItem('accessibilityExpanded', isExpanded.toString())
  }, [highContrast, largeText, isExpanded])

  return (
    <div className="fixed top-20 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg">
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-3">
        <h3 className="text-sm font-semibold">Accessibility</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-primary-500"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse accessibility options' : 'Expand accessibility options'}
        >
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Collapsible content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-gray-200 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="rounded focus:ring-2 focus:ring-primary-500"
              aria-describedby="high-contrast-desc"
            />
            <span>High Contrast</span>
          </label>
          <div id="high-contrast-desc" className="sr-only">
            Toggle high contrast mode for better visibility
          </div>
          
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={largeText}
              onChange={(e) => setLargeText(e.target.checked)}
              className="rounded focus:ring-2 focus:ring-primary-500"
              aria-describedby="large-text-desc"
            />
            <span>Large Text</span>
          </label>
          <div id="large-text-desc" className="sr-only">
            Increase text size for better readability
          </div>
        </div>
      )}
    </div>
  )
}

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Us
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Empowering AAC users through innovative AI technology while preserving personal voice and user autonomy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">Our Mission</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  To reduce communication effort for AAC users by leveraging modern AI technology, 
                  while ensuring that personal voice, user control, and individual expression remain paramount.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We believe that AI should enhance, not replace, the unique communication style of each AAC user.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200">
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">Our Vision</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A world where AAC users can communicate at the speed of thought, with AI assistance that 
                  understands context, preserves personality, and respects user preferences.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We envision communication tools that adapt to users, not the other way around.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200 mb-8">
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 group-hover:text-green-700 transition-colors duration-300">Project Goals</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Reduce Communication Effort
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start group/item">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                      <span className="group-hover/item:text-blue-700 transition-colors duration-200">Transform short inputs into full responses</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                      <span className="group-hover/item:text-blue-700 transition-colors duration-200">Provide context-aware suggestions</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                      <span className="group-hover/item:text-blue-700 transition-colors duration-200">Enable faster message composition</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    Preserve User Autonomy
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start group/item">
                      <span className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                      <span className="group-hover/item:text-green-700 transition-colors duration-200">Maintain personal communication style</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                      <span className="group-hover/item:text-green-700 transition-colors duration-200">Ensure all outputs are editable</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                      <span className="group-hover/item:text-green-700 transition-colors duration-200">Respect privacy and data control</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Team Page Component
const TeamPage = () => {
  const teamMembers = [
    {
      name: "Prof. Rohini Srihari",
      role: "Principal Investigator",
      description: "Leading research in AI and accessibility technologies"
    },
    {
      name: "Sayantan Pal",
      role: "Research Associate",
      description: "Specializing in human-computer interaction and AAC systems"
    },
    {
      name: "Nikhil Murali",
      role: "Research Assistant",
      description: "Focusing on AI implementation and user interface design"
    },
    {
      name: "Atharva Jadhav",
      role: "Research Assistant", 
      description: "Working on accessibility features and user experience"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Team
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Meet the dedicated researchers and developers working to advance AAC technology through AI innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="card text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Publications Page Component
const PublicationsPage = () => {
  const publications = [
    {
      title: "Empowering AAC Users: A Systematic Integration of Personal Narratives with Conversational AI",
      authors: "Sayantan Pal, Souvik Das, Rohini Srihari, Jeff Higginborham, Jenna Bizovi",
      venue: "CustomNLP4U Workshop, ACL 2024",
      year: "2024",
      link: "https://aclanthology.org/2024.customnlp4u-1.2/",
      summary: "This paper bridges the gap between generic AI outputs and genuine human interactions by integrating advanced Conversational AI with personal narratives. We propose creating a custom conversational dataset centered on AAC user experiences to fine-tune language models, combined with Retrieval-Augmented Generation (RAG) methods for contextually relevant and deeply personal responses."
    },
    {
      title: "Exploring the Design Space of Augmentative and Alternative Communication Tools",
      authors: "Research Team",
      venue: "CHI 2023",
      year: "2023", 
      link: "https://dl.acm.org/doi/full/10.1145/3544548.3581560",
      summary: "A comprehensive study examining the current landscape of AAC tools and identifying key areas for improvement through user-centered design principles and emerging technologies."
    },
    {
      title: "AI-Assisted Communication for AAC Users: Balancing Efficiency and Autonomy",
      authors: "Research Team",
      venue: "ASSETS 2024",
      year: "2024",
      link: "https://dl.acm.org/doi/10.1145/3708359.3712160",
      summary: "This work addresses the critical balance between communication efficiency and user control in AI-assisted AAC systems, proposing design guidelines that prioritize user agency while leveraging AI capabilities."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Previous Research Publications
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Our research contributions to the field of AAC and AI-assisted communication.
              </p>
            </div>

            {/* Publications List */}
            <div className="space-y-8 mb-12">
              {publications.map((paper, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                        {paper.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">{paper.authors}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {paper.venue} • {paper.year}
                      </p>
                    </div>
                    <div className="ml-4">
                      <a 
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Read Paper
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {paper.summary}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Published in {paper.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-indigo-200">
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">Research Areas</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start group/item">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span className="group-hover/item:text-indigo-700 transition-colors duration-200">AI-assisted AAC communication</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span className="group-hover/item:text-indigo-700 transition-colors duration-200">User-centered design for accessibility</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span className="group-hover/item:text-indigo-700 transition-colors duration-200">Privacy-preserving language models</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></span>
                    <span className="group-hover/item:text-indigo-700 transition-colors duration-200">Human-computer interaction</span>
                  </li>
                </ul>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-rose-200">
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-rose-700 transition-colors duration-300">Collaboration</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We actively collaborate with AAC users, caregivers, and accessibility researchers 
                  to ensure our work has real-world impact and meets the needs of the community.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Interested in collaborating? Reach out through our contact page.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Prototypes Page Component  
const PrototypesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Demo Interactive Prototypes
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Experience our AI-assisted communication tools through these interactive demonstrations. 
                All prototypes run locally in your browser - no data is sent to external servers.
              </p>
            </div>
          </div>
          <InteractivePrototypes />
        </div>
      </div>
    </div>
  )
}

// Contact Page Component
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <ContactSection />
    </div>
  )
}

// Hero Section Component
const HeroSection = ({ setActiveTab }: { setActiveTab?: (tab: string) => void }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="section-padding min-h-screen flex items-center relative overflow-hidden">
      {/* Colorful background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50"></div>
      <div className="absolute top-20 left-20 w-32 h-32 accent-primary rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 accent-secondary rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 accent-warm rounded-full opacity-30"></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 accent-success rounded-full opacity-25"></div>
      
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Empowering AAC users
              </span>
              <br />
              <span className="text-gray-900">using AI</span>
            </h1>
          
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed lg:text-left">
              Many people who use augmentative and alternative communication (AAC) communicate more slowly and expend significant physical and cognitive effort. 
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Modern AI can help reduce this effort while preserving personal voice and user control.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <button
                onClick={() => scrollToSection('concepts')}
                className="btn-primary"
                aria-describedby="explore-concepts-desc"
              >
                Explore Concepts
              </button>
              <div id="explore-concepts-desc" className="sr-only">
                Scroll down to learn about the communication challenges AAC users face
              </div>
              
              <button
                onClick={() => setActiveTab ? setActiveTab('prototypes') : scrollToSection('prototypes')}
                className="btn-secondary"
                aria-describedby="view-prototype-desc"
              >
                View Prototypes
              </button>
              <div id="view-prototype-desc" className="sr-only">
                Jump to interactive demonstrations of AI-assisted communication tools
              </div>
            </div>
          </div>
          
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/aac-site-img1.jpg" 
                alt="Person using AAC communication device with AI assistance, showing empowerment through technology"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-800">AI-Powered Communication</p>
                  <p className="text-xs text-gray-600">Preserving voice, enhancing speed</p>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 accent-warm rounded-2xl opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 accent-success rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute top-1/2 -left-6 w-8 h-8 accent-secondary rounded-lg opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Problem Section Component
const ProblemSection = () => {
  return (
    <section id="concepts" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>
      <div className="absolute top-10 right-10 w-40 h-40 accent-warm rounded-full opacity-10"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 accent-secondary rounded-full opacity-15"></div>
      
      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What AAC Users Face
          </h2>
          
          {/* Challenge illustration */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-32 h-32 bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
              {/* Simple warning triangle icon */}
              <div className="relative">
                <svg className="w-16 h-16 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {/* Animated accent dots */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-primary-700 mb-8 text-center">Key Challenges</h3>
          
          {/* 2x2 Grid of Challenges */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Challenge Card 1 */}
            <div className="group bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">Slow Composition Rates</h4>
                  <p className="text-gray-700 mb-2">Traditional AAC methods require significant time to construct messages</p>
                  <div className="bg-red-100 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-red-800"><strong>Impact:</strong> Average typing speed is 2-10 words per minute vs. 150+ words for typical speech</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Card 2 */}
            <div className="group bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">Physical & Cognitive Fatigue</h4>
                  <p className="text-gray-700 mb-2">Each message requires considerable mental and physical effort</p>
                  <div className="bg-orange-100 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-orange-800"><strong>Reality:</strong> Users report exhaustion after just 30 minutes of AAC communication</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Card 3 */}
            <div className="group bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl p-4 border border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">Social Timing Pressures</h4>
                  <p className="text-gray-700 mb-2">Conversations move too quickly for traditional AAC input methods</p>
                  <div className="bg-yellow-100 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-yellow-800"><strong>Challenge:</strong> By the time a response is typed, the conversation has moved on to new topics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Card 4 */}
            <div className="group bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">Loss of Expressivity</h4>
                  <p className="text-gray-700 mb-2">Current shortcuts may sacrifice personal voice and nuanced communication</p>
                  <div className="bg-purple-100 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-purple-800"><strong>Dilemma:</strong> Speed vs. personal expression - users must choose between efficiency and authenticity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Todd's Experience Box */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Todd's Experience</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              "During team meetings, I often have something important to contribute, but by the time I've typed my response, 
              the conversation has moved on to three different topics. I end up staying quiet more than I'd like to."
            </p>
            <p className="text-base text-gray-600 italic">
              — Composite story based on user research findings
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// AI Help Section Component
const AIHelpSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"></div>
      <div className="absolute top-0 left-0 w-64 h-64 accent-success rounded-full opacity-10 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 accent-primary rounded-full opacity-15 translate-x-24 translate-y-24"></div>
      
      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            How AI Can Help
          </h2>
          
          {/* AI Assistance Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-cyan-100 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
              {/* Modern AI/Robot icon */}
              <div className="relative">
                <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 7h-2.5c-.4-1.5-1.5-2.7-3-3.3V5c0-.6-.4-1-1-1s-1 .4-1 1v.7C12.9 5.3 12.5 5 12 5s-.9.3-1.5.7V5c0-.6-.4-1-1-1s-1 .4-1 1v.7C7 6.3 5.9 7.5 5.5 9H3c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h2.5c.4 1.5 1.5 2.7 3 3.3V22c0 .6.4 1 1 1s1-.4 1-1v-.7c.6.4 1 .7 1.5.7s.9-.3 1.5-.7V22c0 .6.4 1 1 1s1-.4 1-1v-.7c1.5-.6 2.6-1.8 3-3.3H20c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1zm-8 8c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
                  <circle cx="10" cy="12" r="1"/>
                  <circle cx="14" cy="12" r="1"/>
                  <path d="M10 14h4c0 1.1-.9 2-2 2s-2-.9-2-2z"/>
                </svg>
                
                {/* Animated tech indicators */}
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute top-2 -left-3 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Modern large language models (LLMs) offer four key capabilities that can reduce communication effort 
            while preserving user agency and personal expression.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Expand Abbreviated Input
                  </h3>
                  <p className="text-gray-700">
                    Transform short phrases into complete sentences, reducing keystrokes while preserving meaning.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Context-Aware Responses
                  </h3>
                  <p className="text-gray-700">
                    Generate relevant responses using conversation context and situational awareness.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tone and Style Control
                  </h3>
                  <p className="text-gray-700">
                    Create multiple response variations with different tones that match user preferences.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Personal Information Integration
                  </h3>
                  <p className="text-gray-700">
                    Store personal information to answer recurring questions without repeated input.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Design Guidelines Section Component
const DesignGuidelinesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-cyan-50 to-teal-50"></div>
      <div className="absolute top-20 left-20 w-36 h-36 accent-primary rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 accent-secondary rounded-full opacity-15"></div>
      
      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Design Guidelines & User Requirements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">Essential User Needs</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Personalization of tone and style:</strong>
                    <span className="text-gray-700"> Users need control over how formal, casual, or humorous their responses sound</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Ability to edit all outputs:</strong>
                    <span className="text-gray-700"> Every AI suggestion must be editable before sending</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Granular tone controls:</strong>
                    <span className="text-gray-700"> Adjustable settings for politeness, directness, and emotional expression</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Preserved autonomy:</strong>
                    <span className="text-gray-700"> Users maintain full control over their communication choices</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">Privacy & Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Local data storage:</strong>
                    <span className="text-gray-700"> Personal information and medical data encrypted and stored locally</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Transparent AI indication:</strong>
                    <span className="text-gray-700"> Clear markers when AI assistance was used</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">User profile control:</strong>
                    <span className="text-gray-700"> Easy export, import, and deletion of personal data</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Offline capability:</strong>
                    <span className="text-gray-700"> Core features work without internet connection</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Participant Feedback</h3>
            <blockquote className="text-blue-800 italic mb-3">
              "I want the AI to help me say what I mean faster, but it still needs to sound like me. 
              If someone thinks the AI wrote my message instead of helping me write it, that's a problem."
            </blockquote>
            <p className="text-sm text-blue-700">
              — Research participant, emphasizing the importance of maintaining personal voice
            </p>
            <p className="text-xs text-blue-600 mt-3">
              <em>Based on Valencia et al., CHI 2023</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock submission for demo
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitMessage('Thank you for reaching out! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    setIsSubmitting(false)
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
      <div className="absolute top-0 right-0 w-52 h-52 accent-primary rounded-full opacity-10 translate-x-26 -translate-y-26"></div>
      <div className="absolute bottom-0 left-0 w-44 h-44 accent-secondary rounded-full opacity-15 -translate-x-22 translate-y-22"></div>
      
      <div className="container-max relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Have Any Questions?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're here to help! Whether you have questions about the technology, want to learn more about AAC, 
              or need support, don't hesitate to reach out.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            {/* Resource Boxes */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Find answers to common questions about AAC technology, AI assistance, and accessibility features.
              </p>
              <a 
                href="#faq" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Browse FAQs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Community Support</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Connect with other AAC users, caregivers, and developers in our supportive community forums.
              </p>
              <a 
                href="#community" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Join Community
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose a topic...</option>
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="accessibility">Accessibility Help</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitMessage && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// Home Page Content
// Navigation Buttons Component
const NavigationButtons = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const buttons = [
    {
      id: 'prototypes',
      label: 'Demo Prototypes',
      gradient: 'from-blue-200 to-purple-300',
      hoverGradient: 'hover:from-blue-300 hover:to-purple-400'
    },
    {
      id: 'publications',
      label: 'Research',
      gradient: 'from-green-200 to-teal-300',
      hoverGradient: 'hover:from-green-300 hover:to-teal-400'
    },
    {
      id: 'team',
      label: 'Team',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-purple-200 to-pink-300',
      hoverGradient: 'hover:from-purple-300 hover:to-pink-400'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Explore Our Work
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Discover our interactive prototypes, research contributions, and the team behind this project.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveTab(button.id)}
                className={`group relative overflow-hidden bg-gradient-to-r ${button.gradient} ${button.hoverGradient} text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold">{button.label}</h3>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const HomePage = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  return (
    <>
      <HeroSection setActiveTab={setActiveTab} />
      <ProblemSection />
      <AIHelpSection />
      <NavigationButtons setActiveTab={setActiveTab} />
      <ContactSection />
    </>
  )
}

// Main Page Component
export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />
      case 'about':
        return <AboutPage />
      case 'prototypes':
        return <PrototypesPage />
      case 'publications':
        return <PublicationsPage />
      case 'team':
        return <TeamPage />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Empowering AAC users using AI</title>
        <meta name="description" content="Research and product project exploring how modern AI can help augmentative and alternative communication users while preserving personal voice and control." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Skip Link for Screen Readers */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main id="main-content">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-max">
          <div className="text-center">
            <p className="text-base text-gray-400">
              © 2025 AAC AI Empowerment Project. Building accessible communication technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
