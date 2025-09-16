# Empowering AAC Users Using AI

An accessible, interactive website for an early-stage research & product project exploring how modern AI can help augmentative and alternative communication (AAC) users while preserving personal voice and control.

## 🌟 Project Overview

This single-page website demonstrates how AI technology can reduce communication effort for AAC users without compromising their autonomy or personal expression. Built with accessibility-first principles, it features interactive prototypes that showcase AI-assisted communication tools.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or download the project
cd aac-ai-project

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Build for Production

```bash
npm run export
```

This creates a static build in the `out/` directory ready for deployment.

### Deploy to GitHub Pages

This site is configured for automatic deployment to GitHub Pages:

1. **Create Repository**: Create a repository named `aacforai.github.io` on GitHub
2. **Push Code**: Push this code to the main/master branch
3. **Enable Pages**: Go to Settings → Pages → Source: GitHub Actions
4. **Automatic Deploy**: Every push triggers automatic deployment via GitHub Actions

The site will be available at: `https://aacforai.github.io`

## 🎯 Features

### ✅ Completed Features

- **Accessible Design**: WCAG AA compliant with high-contrast mode, large text options, keyboard navigation
- **Interactive Prototypes**: Three demo widgets showcasing AI-assisted communication
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Research-Based Content**: Grounded in CHI 2023 research by Valencia et al.
- **Privacy-First**: Local storage for user data, clear privacy indicators

### 🔧 Interactive Prototypes

1. **Extend Reply**: Transform short inputs into full responses with tone control
2. **Background Info**: Generate contextual responses using locally stored personal information  
3. **Word to Request**: Convert single words into polite, contextually appropriate requests

## 🛠 Technical Architecture

### Framework & Tools
- **Next.js 14**: React framework with TypeScript
- **Tailwind CSS**: Utility-first styling with custom accessibility themes
- **Local Storage**: Client-side data persistence for user preferences and profiles

### File Structure
```
├── pages/
│   ├── _app.tsx          # App configuration
│   └── index.tsx         # Main page with all sections
├── components/
│   └── InteractivePrototypes.tsx  # Demo widgets
├── styles/
│   └── globals.css       # Global styles and accessibility themes
└── public/               # Static assets
```

## 🔌 LLM Integration Guide

The prototypes currently use mock data for demonstration. To connect real LLM capabilities:

### 1. Replace Mock Service

Find the `MockLLMService` class in `components/InteractivePrototypes.tsx` and replace with actual API calls:

```typescript
// Current mock implementation
const mockResponses = MockLLMService.generateExtendedReply(input, temperature)

// Replace with actual LLM API call
const response = await fetch('/api/llm/extend-reply', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input, temperature, context })
})
const data = await response.json()
setResponses(data.responses)
```

### 2. API Endpoints Needed

Create these API routes in `pages/api/`:

- `POST /api/llm/extend-reply` - Expand abbreviated input
- `POST /api/llm/background-response` - Generate responses using user profile
- `POST /api/llm/word-to-request` - Convert words to polite requests
- `POST /api/contact` - Handle contact form submissions

### 3. Expected API Signatures

```typescript
// Extend Reply API
interface ExtendReplyRequest {
  input: string
  context?: string  
  temperature: number
}

interface ExtendReplyResponse {
  responses: string[]
}

// Background Response API  
interface BackgroundResponseRequest {
  question: string
  profile: string
}

interface BackgroundResponseResponse {
  responses: string[]
}

// Word to Request API
interface WordToRequestRequest {
  word: string
  privacyLevel: 'direct' | 'polite' | 'euphemistic'
}

interface WordToRequestResponse {
  responses: string[]
}
```

### 4. Recommended LLM Setup

For production deployment, consider:

- **On-device LLM**: Use models like Llama 2 7B or similar for privacy
- **API Gateway**: Implement rate limiting and authentication
- **Fallback System**: Provide offline functionality with cached responses
- **Privacy Controls**: Allow users to opt-out of cloud processing

## ♿ Accessibility Compliance

### WCAG AA Features Implemented

- ✅ **Color Contrast**: 4.5:1 minimum ratio, high-contrast mode available
- ✅ **Keyboard Navigation**: All interactive elements accessible via keyboard
- ✅ **Focus Management**: Visible focus indicators and logical tab order  
- ✅ **Screen Reader Support**: Semantic HTML, ARIA labels, and descriptions
- ✅ **Text Scaling**: Large text mode up to 125% increase
- ✅ **Alternative Text**: Descriptive alt text for images and icons

### Accessibility Controls

Users can toggle:
- **High Contrast Mode**: Black background, white text, yellow accents
- **Large Text Mode**: 125% text size increase across all content
- **Keyboard Navigation**: Skip links and focus management

### Testing Checklist

- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify keyboard-only navigation
- [ ] Check color contrast ratios
- [ ] Test with 200% browser zoom
- [ ] Validate HTML semantics
- [ ] Test high contrast mode functionality

## 📱 Responsive Design

The site is optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

Key responsive features:
- Flexible grid layouts
- Touch-friendly interactive elements
- Readable typography at all screen sizes
- Accessible form controls on mobile

## 🔒 Privacy & Security

### Current Implementation
- **Local Storage**: User profiles stored client-side only
- **No Tracking**: No analytics or third-party scripts
- **Privacy Indicators**: Clear labels for data handling
- **User Control**: Easy profile export/deletion

### Production Recommendations
- Implement end-to-end encryption for cloud sync
- Add data retention policies
- Provide GDPR compliance features
- Use secure authentication for user accounts

## 📊 Content Strategy

### Two-Length Copy System

The site includes both:
- **Short Copy**: For quick scanning and mobile users
- **Long Copy**: For researchers and detailed exploration

### Research Citations

All claims are attributed to:
> Valencia et al., "The less I type, the better: How and why AAC users customize their communication devices," CHI Conference on Human Factors in Computing Systems, 2023.

## 🗺 Roadmap

### Phase 1: Co-design Sessions (Q1 2024) - In Progress
- User journey mapping
- Prototype validation
- Design principle refinement

### Phase 2: LLM Integration (Q2 2024) 
- Local model deployment
- Privacy-first API design
- Real-time response generation

### Phase 3: Personalization Engine (Q3 2024)
- Tone control systems
- Style learning algorithms
- User preference profiles

### Phase 4: Privacy-First Deployment (Q4 2024)
- Local-first architecture
- Encryption protocols
- Offline capabilities

### Phase 5: Field Studies (Q1 2025)
- Real-world testing
- Usage analytics
- Effectiveness studies

## 🤝 Contributing

We welcome contributions from:
- AAC users and advocates
- Accessibility experts
- Developers and researchers
- UX designers

### Ways to Contribute
1. **User Testing**: Help validate prototypes and designs
2. **Code Contributions**: Improve accessibility, performance, or features
3. **Research Collaboration**: Partner on studies and publications
4. **Accessibility Audits**: Review and improve compliance

### Getting Started
1. Email: research@aac-ai-project.org
2. GitHub: https://github.com/aac-ai-project
3. Review our [Code of Conduct](CODE_OF_CONDUCT.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Valencia et al. for foundational research on AAC user needs
- AAC community members who provided feedback and insights
- Accessibility experts who guided inclusive design decisions

## 📞 Contact

- **Research Team**: research@aac-ai-project.org
- **Technical Issues**: GitHub Issues
- **Media Inquiries**: media@aac-ai-project.org

---

**Built with ❤️ for the AAC community**

