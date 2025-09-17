import React, { useState, useEffect } from 'react'

// Mock LLM Response Generator
// TODO: Replace with actual LLM API calls
class MockLLMService {
  // Extend Reply Mock Data
  static extendReplyTemplates = {
    'yes': [
      "Yes, I'd be happy to help with that.",
      "Absolutely, that sounds great!",
      "Yes, count me in for this.",
      "Definitely, I'm interested in participating."
    ],
    'no': [
      "No, I won't be able to make it.",
      "Unfortunately, I can't participate in this.",
      "No thank you, I'll have to pass on this one.",
      "I appreciate the offer, but no thanks."
    ],
    'maybe': [
      "I'm not sure yet, can I get back to you?",
      "Maybe, let me check my schedule first.",
      "I'm tentatively interested, but need more details.",
      "Possibly, depends on a few factors."
    ],
    'help': [
      "I could use some assistance with this.",
      "Would you mind helping me out?",
      "I'd appreciate some help if you have time.",
      "Could you lend me a hand with this?"
    ],
    'thanks': [
      "Thank you so much for your help!",
      "I really appreciate everything you've done.",
      "Thanks, that means a lot to me.",
      "I'm grateful for your support."
    ]
  }

  // Background Info Mock Responses
  static backgroundResponses = {
    pets: (profile: string) => {
      if (profile.toLowerCase().includes('dog')) {
        return [
          "Yes, I have a wonderful dog who brings so much joy to my life.",
          "I do! My dog is my best companion and always keeps me active.",
          "Absolutely, my dog is like family to me."
        ]
      } else if (profile.toLowerCase().includes('cat')) {
        return [
          "Yes, I have a cat who's independent but very loving.",
          "I do! My cat is the perfect companion - low maintenance but affectionate.",
          "Absolutely, my cat brings such calm energy to my home."
        ]
      } else {
        return [
          "No, I don't have any pets right now.",
          "Not currently, but I love animals.",
          "No pets at the moment, but I'm considering it."
        ]
      }
    },
    hobbies: (profile: string) => {
      const hobbies = profile.toLowerCase()
      if (hobbies.includes('reading')) {
        return [
          "I love reading, especially fiction and biographies.",
          "Reading is one of my favorite pastimes - I'm always in the middle of a good book.",
          "Yes, I'm an avid reader. Currently working through my reading list."
        ]
      } else if (hobbies.includes('music')) {
        return [
          "I'm really into music - both listening and playing when I can.",
          "Music is a huge part of my life. I love discovering new artists.",
          "Absolutely! Music helps me relax and express myself."
        ]
      } else {
        return [
          "I have several hobbies that keep me busy and engaged.",
          "I enjoy various activities depending on my mood and energy.",
          "I like to try different things and explore new interests."
        ]
      }
    }
  }

  // Word to Request Mock Data
  static wordToRequestTemplates = {
    'water': [
      "Could I please have some water?",
      "Would you mind getting me a glass of water?",
      "I'd appreciate some water when you have a moment."
    ],
    'help': [
      "Could you please help me with something?",
      "I could use some assistance if you're available.",
      "Would you mind giving me a hand?"
    ],
    'bathroom': [
      "Could you please help me get to the bathroom?",
      "I need assistance getting to the restroom.",
      "Would you mind helping me with a bathroom break?"
    ],
    'food': [
      "Could I have something to eat, please?",
      "I'm feeling hungry - could you help me with food?",
      "Would it be possible to get something to eat?"
    ],
    'rest': [
      "I'd like to rest for a bit, please.",
      "Could we take a break? I need to rest.",
      "I'm feeling tired and would like to lie down."
    ]
  }

  static generateExtendedReply(input: string, temperature: number = 0.7): string[] {
    const key = input.toLowerCase().trim()
    const templates = this.extendReplyTemplates[key as keyof typeof this.extendReplyTemplates] || [
      `I understand what you're saying about "${input}".`,
      `That's an interesting point about "${input}".`,
      `Thanks for bringing up "${input}".`,
      `I'd like to discuss "${input}" further.`
    ]
    
    // Simulate temperature by varying responses
    const numResponses = Math.max(2, Math.min(4, Math.floor(3 + temperature * 2)))
    return templates.slice(0, numResponses)
  }

  static generateBackgroundResponse(question: string, profile: string): string[] {
    if (question.toLowerCase().includes('pet')) {
      return this.backgroundResponses.pets(profile)
    } else if (question.toLowerCase().includes('hobbies') || question.toLowerCase().includes('hobby')) {
      return this.backgroundResponses.hobbies(profile)
    } else {
      return [
        "Based on what I've shared about myself, I'd say...",
        "Given my background, I think...",
        "From my experience, I would say..."
      ]
    }
  }

  static generateWordToRequest(word: string): string[] {
    const key = word.toLowerCase().trim()
    return this.wordToRequestTemplates[key as keyof typeof this.wordToRequestTemplates] || [
      `Could you help me with ${word}, please?`,
      `I need assistance with ${word}.`,
      `Would you mind helping me get ${word}?`
    ]
  }
}

// Extend Reply Prototype Component
const ExtendReplyPrototype = () => {
  const [input, setInput] = useState('')
  const [contextMessage, setContextMessage] = useState("Hey, want to join us for lunch?")
  const [responses, setResponses] = useState<string[]>([])
  const [temperature, setTemperature] = useState(0.7)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const generateResponses = async () => {
    if (!input.trim()) return
    
    setIsGenerating(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    /* TODO: Replace with actual LLM API call
    const apiResponse = await fetch('/api/extend-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        input, 
        context: contextMessage, 
        temperature 
      })
    })
    const data = await apiResponse.json()
    setResponses(data.responses)
    */
    
    // Mock implementation
    const mockResponses = MockLLMService.generateExtendedReply(input, temperature)
    setResponses(mockResponses)
    setIsGenerating(false)
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditText(responses[index])
  }

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newResponses = [...responses]
      newResponses[editingIndex] = editText
      setResponses(newResponses)
      setEditingIndex(null)
      setEditText('')
    }
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditText('')
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">Extend Reply</h3>
          <p className="text-sm text-gray-500">Transform short inputs into full responses</p>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
          DEMO
        </span>
      </div>
      
      <p className="text-gray-600 mb-6">
        Enter a short word or phrase, and get multiple full response suggestions based on conversation context.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="context-message" className="block text-sm font-medium text-gray-700 mb-2">
            Conversation Context
          </label>
          <input
            id="context-message"
            type="text"
            value={contextMessage}
            onChange={(e) => setContextMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="What the other person said..."
          />
        </div>

        <div>
          <label htmlFor="short-input" className="block text-sm font-medium text-gray-700 mb-2">
            Your Short Input
          </label>
          <input
            id="short-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., 'yes', 'no', 'maybe', 'help'"
            onKeyPress={(e) => e.key === 'Enter' && generateResponses()}
          />
        </div>

        <div>
          <label htmlFor="temperature-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Variability: {temperature.toFixed(1)}
          </label>
          <input
            id="temperature-slider"
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
            aria-describedby="temperature-desc"
          />
          <div id="temperature-desc" className="text-xs text-gray-500 mt-1">
            Lower values = more consistent, Higher values = more creative
          </div>
        </div>

        <button
          onClick={generateResponses}
          disabled={!input.trim() || isGenerating}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          aria-describedby="generate-desc"
        >
          {isGenerating ? 'Generating...' : 'Generate Responses'}
        </button>
        <div id="generate-desc" className="sr-only">
          Generate multiple response suggestions based on your input
        </div>
      </div>

      {responses.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Suggested Responses:</h4>
          <div className="space-y-3">
            {responses.map((response, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                {editingIndex === index ? (
                  <div className="space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-primary-500"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="btn-primary text-sm px-3 py-1">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="btn-ghost text-sm px-3 py-1">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <p className="text-gray-800 flex-1">{response}</p>
                    <button
                      onClick={() => startEditing(index)}
                      className="ml-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      aria-label={`Edit response ${index + 1}`}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Background Info Prototype Component
const BackgroundInfoPrototype = () => {
  const [profile, setProfile] = useState('')
  const [responses, setResponses] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState("Do you have any pets?")

  const sampleQuestions = [
    "Do you have any pets?",
    "What are your hobbies?",
    "Tell me about yourself",
    "What do you like to do for fun?"
  ]

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('aac-user-profile')
    if (savedProfile) {
      setProfile(savedProfile)
    }
  }, [])

  const saveProfile = () => {
    localStorage.setItem('aac-user-profile', profile)
    alert('Profile saved locally (demo only)')
  }

  const clearProfile = () => {
    localStorage.removeItem('aac-user-profile')
    setProfile('')
    setResponses([])
  }

  const generateResponse = async () => {
    if (!profile.trim()) {
      alert('Please add some background information first')
      return
    }
    
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    /* TODO: Replace with actual LLM API call
    const apiResponse = await fetch('/api/background-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        question: selectedQuestion,
        profile: profile
      })
    })
    const data = await apiResponse.json()
    setResponses(data.responses)
    */
    
    // Mock implementation
    const mockResponses = MockLLMService.generateBackgroundResponse(selectedQuestion, profile)
    setResponses(mockResponses)
    setIsGenerating(false)
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">Reply with Background Info</h3>
          <p className="text-sm text-gray-500">Use personal information for contextual responses</p>
        </div>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
          LOCAL ONLY
        </span>
      </div>
      
      <p className="text-gray-600 mb-6">
        Store personal information locally to generate contextual responses to common questions.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="profile-textarea" className="block text-sm font-medium text-gray-700 mb-2">
            Your Background Information
          </label>
          <textarea
            id="profile-textarea"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={4}
            placeholder="Tell me about yourself: your interests, pets, work, hobbies, etc. This information stays on your device."
          />
        </div>

        <div className="flex gap-2">
          <button onClick={saveProfile} className="btn-secondary text-sm">
            Save Profile
          </button>
          <button onClick={clearProfile} className="btn-ghost text-sm">
            Clear Profile
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800">Privacy Note</p>
              <p className="text-sm text-yellow-700">
                Your profile is stored locally on this device only. No data is sent to external servers in this demo.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="question-select" className="block text-sm font-medium text-gray-700 mb-2">
            Sample Question
          </label>
          <select
            id="question-select"
            value={selectedQuestion}
            onChange={(e) => setSelectedQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sampleQuestions.map((question) => (
              <option key={question} value={question}>
                {question}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateResponse}
          disabled={!profile.trim() || isGenerating}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Response'}
        </button>
      </div>

      {responses.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Suggested Responses:</h4>
          <div className="space-y-3">
            {responses.map((response, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800">{response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Word to Request Prototype Component
const WordToRequestPrototype = () => {
  const [word, setWord] = useState('')
  const [responses, setResponses] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [privacyLevel, setPrivacyLevel] = useState('polite')

  const exampleWords = ['water', 'help', 'bathroom', 'food', 'rest', 'medicine', 'comfort']
  
  const generateRequests = async () => {
    if (!word.trim()) return
    
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    /* TODO: Replace with actual LLM API call
    const apiResponse = await fetch('/api/word-to-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        word: word,
        privacyLevel: privacyLevel
      })
    })
    const data = await apiResponse.json()
    setResponses(data.responses)
    */
    
    // Mock implementation
    const mockResponses = MockLLMService.generateWordToRequest(word)
    setResponses(mockResponses)
    setIsGenerating(false)
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">Turn Words into Requests</h3>
          <p className="text-sm text-gray-500">Convert single words into polite requests</p>
        </div>
        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
          DEMO
        </span>
      </div>
      
      <p className="text-gray-600 mb-6">
        Transform single words into polite, contextually appropriate help requests.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="word-input" className="block text-sm font-medium text-gray-700 mb-2">
            Single Word Input
          </label>
          <input
            id="word-input"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter a single word..."
            onKeyPress={(e) => e.key === 'Enter' && generateRequests()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Example Words
          </label>
          <div className="flex flex-wrap gap-2">
            {exampleWords.map((exampleWord) => (
              <button
                key={exampleWord}
                onClick={() => setWord(exampleWord)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
              >
                {exampleWord}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="privacy-level" className="block text-sm font-medium text-gray-700 mb-2">
            Privacy/Directness Level
          </label>
          <select
            id="privacy-level"
            value={privacyLevel}
            onChange={(e) => setPrivacyLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="direct">Direct (specific request)</option>
            <option value="polite">Polite (standard courtesy)</option>
            <option value="euphemistic">Euphemistic (more private)</option>
          </select>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-orange-800">Privacy Consideration</p>
              <p className="text-sm text-orange-700">
                Different privacy levels help balance communication efficiency with personal comfort.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={generateRequests}
          disabled={!word.trim() || isGenerating}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Requests'}
        </button>
      </div>

      {responses.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Suggested Requests:</h4>
          <div className="space-y-3">
            {responses.map((response, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800">{response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Main Interactive Prototypes Component
const InteractivePrototypes = () => {
  const [activePrototype, setActivePrototype] = useState<'extend' | 'background' | 'word'>('extend')

  const prototypeConfig = {
    extend: {
      title: 'Extend Reply',
      subtitle: 'Transform short inputs into full responses',
      description: 'Enter a short word or phrase, and get multiple full response suggestions based on conversation context.'
    },
    background: {
      title: 'Reply with Background Info', 
      subtitle: 'Use personal information for contextual responses',
      description: 'Store personal information locally to generate contextual responses to common questions.'
    },
    word: {
      title: 'Turn Words into Requests',
      subtitle: 'Convert single words into polite requests', 
      description: 'Transform single words into polite, contextually appropriate help requests.'
    }
  }

  const currentConfig = prototypeConfig[activePrototype]

  return (
    <section id="prototypes" className="section-padding bg-white">
      <div className="container-max">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              {currentConfig.title} Feature
            </h3>
            <p className="text-lg text-gray-600 mb-2">
              {currentConfig.subtitle}
            </p>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentConfig.description}
            </p>
          </div>

          {/* Prototype Selection Buttons */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setActivePrototype('extend')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activePrototype === 'extend'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Extend Reply
              </button>
              <button
                onClick={() => setActivePrototype('background')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activePrototype === 'background'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Background Info
              </button>
              <button
                onClick={() => setActivePrototype('word')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activePrototype === 'word'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Word to Request
              </button>
            </div>
          </div>

          {/* Single Prototype Display */}
          <div className="max-w-4xl mx-auto">
            {activePrototype === 'extend' && <ExtendReplyPrototype />}
            {activePrototype === 'background' && <BackgroundInfoPrototype />}
            {activePrototype === 'word' && <WordToRequestPrototype />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractivePrototypes

