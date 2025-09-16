# LLM Integration Guide

This guide explains how to replace the mock implementations with real LLM capabilities while maintaining privacy and user control.

## 🎯 Integration Overview

The current prototypes use `MockLLMService` to simulate AI responses. To connect real LLM capabilities, you'll need to:

1. Replace mock service calls with API endpoints
2. Implement backend LLM integration
3. Add error handling and loading states
4. Maintain privacy-first architecture

## 🔧 Step-by-Step Integration

### 1. API Endpoints Setup

Create these API routes in `pages/api/`:

```typescript
// pages/api/llm/extend-reply.ts
import type { NextApiRequest, NextApiResponse } from 'next'

interface ExtendReplyRequest {
  input: string
  context?: string
  temperature: number
}

interface ExtendReplyResponse {
  responses: string[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendReplyResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ responses: [], error: 'Method not allowed' })
  }

  const { input, context, temperature } = req.body as ExtendReplyRequest

  try {
    // TODO: Replace with your LLM service
    const responses = await callLLMService({
      prompt: `Expand this short input "${input}" into 3-4 full responses. Context: "${context}"`,
      temperature,
      maxTokens: 150
    })

    res.status(200).json({ responses })
  } catch (error) {
    console.error('LLM API error:', error)
    res.status(500).json({ 
      responses: [], 
      error: 'Failed to generate responses' 
    })
  }
}
```

### 2. Frontend Integration

Update the prototype components to use real APIs:

```typescript
// In components/InteractivePrototypes.tsx

const generateResponses = async () => {
  if (!input.trim()) return
  
  setIsGenerating(true)
  setError(null)
  
  try {
    const response = await fetch('/api/llm/extend-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        input, 
        context: contextMessage, 
        temperature 
      })
    })
    
    const data = await response.json()
    
    if (data.error) {
      setError(data.error)
      return
    }
    
    setResponses(data.responses)
  } catch (error) {
    setError('Network error. Please try again.')
    console.error('API call failed:', error)
  } finally {
    setIsGenerating(false)
  }
}
```

## 🤖 LLM Service Options

### Option 1: OpenAI API

```typescript
// utils/llm-service.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateExtendedReply(
  input: string, 
  context: string, 
  temperature: number
): Promise<string[]> {
  const prompt = `
You are helping an AAC (Augmentative and Alternative Communication) user expand their short input into full responses.

Context: "${context}"
User input: "${input}"

Generate 3-4 natural, varied responses that:
1. Maintain the user's intended meaning
2. Are appropriate for the conversation context
3. Vary in formality and length
4. Sound natural and personal

Responses:
`

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature,
    max_tokens: 200,
  })

  // Parse and return responses
  const content = completion.choices[0].message.content || ""
  return content.split('\n').filter(line => line.trim()).slice(0, 4)
}
```

### Option 2: Local LLM (Ollama)

```typescript
// utils/local-llm.ts
export async function generateWithOllama(
  prompt: string, 
  model: string = 'llama2:7b'
): Promise<string[]> {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      }
    })
  })

  const data = await response.json()
  return parseResponsesFromText(data.response)
}
```

### Option 3: Hugging Face Transformers

```typescript
// utils/huggingface-llm.ts
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function generateWithHuggingFace(
  prompt: string,
  model: string = 'microsoft/DialoGPT-large'
): Promise<string[]> {
  const response = await hf.textGeneration({
    model,
    inputs: prompt,
    parameters: {
      max_new_tokens: 150,
      temperature: 0.7,
      do_sample: true,
    }
  })

  return parseResponsesFromText(response.generated_text)
}
```

## 🔒 Privacy-First Implementation

### Local Storage for Profiles

```typescript
// utils/profile-storage.ts
interface UserProfile {
  id: string
  data: string
  createdAt: Date
  updatedAt: Date
}

export class SecureProfileStorage {
  private static STORAGE_KEY = 'aac-user-profile'
  
  static async saveProfile(data: string): Promise<void> {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      data: await this.encrypt(data),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile))
  }
  
  static async getProfile(): Promise<string | null> {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) return null
    
    const profile: UserProfile = JSON.parse(stored)
    return await this.decrypt(profile.data)
  }
  
  private static async encrypt(text: string): Promise<string> {
    // Implement client-side encryption
    // Consider using Web Crypto API
    return btoa(text) // Simplified - use proper encryption in production
  }
  
  private static async decrypt(encrypted: string): Promise<string> {
    // Implement client-side decryption
    return atob(encrypted) // Simplified - use proper decryption in production
  }
}
```

### Environment Variables

Create `.env.local`:

```bash
# LLM Service Configuration
OPENAI_API_KEY=your_openai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Local LLM Configuration  
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2:7b

# Privacy Settings
ENABLE_CLOUD_PROCESSING=false
REQUIRE_EXPLICIT_CONSENT=true
DATA_RETENTION_DAYS=30
```

## 🚨 Error Handling

### Robust Error Handling

```typescript
// utils/error-handling.ts
export class LLMError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'LLMError'
  }
}

export async function callLLMWithRetry(
  apiCall: () => Promise<string[]>,
  maxRetries: number = 3
): Promise<string[]> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      lastError = error as Error
      
      if (error instanceof LLMError && !error.retryable) {
        throw error
      }
      
      if (attempt === maxRetries) {
        throw new LLMError(
          `Failed after ${maxRetries} attempts: ${lastError.message}`,
          'MAX_RETRIES_EXCEEDED'
        )
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      )
    }
  }
  
  throw lastError!
}
```

## 📊 Performance Optimization

### Response Caching

```typescript
// utils/response-cache.ts
interface CacheEntry {
  responses: string[]
  timestamp: number
  ttl: number
}

class ResponseCache {
  private cache = new Map<string, CacheEntry>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes
  
  generateKey(input: string, context: string, temperature: number): string {
    return btoa(`${input}:${context}:${temperature}`)
  }
  
  get(key: string): string[] | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.responses
  }
  
  set(key: string, responses: string[], ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      responses,
      timestamp: Date.now(),
      ttl
    })
  }
}

export const responseCache = new ResponseCache()
```

## 🧪 Testing LLM Integration

### Unit Tests

```typescript
// __tests__/llm-integration.test.ts
import { generateExtendedReply } from '../utils/llm-service'

describe('LLM Integration', () => {
  test('generates appropriate responses', async () => {
    const responses = await generateExtendedReply(
      'yes',
      'Want to join us for lunch?',
      0.7
    )
    
    expect(responses).toHaveLength(3)
    expect(responses[0]).toContain('yes')
    expect(responses[0].length).toBeGreaterThan(10)
  })
  
  test('handles errors gracefully', async () => {
    // Mock API failure
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Error'))
    
    await expect(generateExtendedReply('test', '', 0.5))
      .rejects.toThrow('API Error')
  })
})
```

## 🚀 Deployment Considerations

### Production Checklist

- [ ] Environment variables configured
- [ ] Rate limiting implemented
- [ ] Error monitoring setup (Sentry, LogRocket)
- [ ] API key rotation strategy
- [ ] User consent flows implemented
- [ ] Data retention policies enforced
- [ ] Offline fallback mechanisms
- [ ] Performance monitoring (response times)

### Scaling Considerations

- **Rate Limiting**: Implement per-user rate limits
- **Caching**: Cache common responses to reduce API calls
- **Load Balancing**: Distribute requests across multiple LLM providers
- **Fallback Strategy**: Have backup LLM services available

## 📞 Support & Troubleshooting

### Common Issues

1. **API Key Issues**: Verify environment variables are set correctly
2. **Rate Limiting**: Implement exponential backoff for API calls
3. **Response Quality**: Fine-tune prompts and temperature settings
4. **Privacy Concerns**: Ensure all user data stays local by default

### Getting Help

- Email: developers@aac-ai-project.org
- GitHub Issues: https://github.com/aac-ai-project/issues
- Documentation: https://docs.aac-ai-project.org

---

This integration guide provides a foundation for connecting real LLM capabilities while maintaining the privacy-first, user-controlled approach that's essential for AAC users.

