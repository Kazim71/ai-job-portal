import axios from 'axios'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10

// Rate limiting middleware
const checkRateLimit = (identifier) => {
    const now = Date.now()
    const windowStart = now - RATE_LIMIT_WINDOW
    
    if (!rateLimitStore.has(identifier)) {
        rateLimitStore.set(identifier, [])
    }
    
    const requests = rateLimitStore.get(identifier)
    // Remove old requests
    const validRequests = requests.filter(time => time > windowStart)
    
    if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        return false
    }
    
    validRequests.push(now)
    rateLimitStore.set(identifier, validRequests)
    return true
}

// Input sanitization
const sanitizeQuery = (query) => {
    return query
        .trim()
        .replace(/[<>"'&]/g, '') // Basic XSS prevention
        .substring(0, 500) // Limit length
}

// Perplexity AI Search for Job-related queries
export const searchJobsWithAI = async (req, res) => {
    try {
        const { query } = req.body
        const clientIP = req.ip || req.connection.remoteAddress
        
        // Rate limiting
        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({ 
                success: false, 
                message: 'Too many requests. Please wait before trying again.' 
            })
        }
        
        if (!query || query.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Query is required' })
        }

        if (query.length > 500) {
            return res.status(400).json({ success: false, message: 'Query too long. Maximum 500 characters.' })
        }

        const apiKey = process.env.PERPLEXITY_API_KEY
        if (!apiKey) {
            return res.status(503).json({ success: false, message: 'AI service not configured' })
        }

        const sanitizedQuery = sanitizeQuery(query)
        
        const response = await axios.post('https://api.perplexity.ai/chat/completions', {
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional career advisor and job search assistant. Provide accurate, helpful, and actionable advice about job opportunities, career development, industry insights, and professional skills. Keep responses concise, professional, and relevant to career growth. Avoid speculation and focus on factual, practical guidance.'
                },
                {
                    role: 'user',
                    content: sanitizedQuery
                }
            ],
            max_tokens: 400,
            temperature: 0.3,
            top_p: 0.9
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 25000
        })

        const aiResponse = response.data.choices[0]?.message?.content || 'No response available'

        res.json({
            success: true,
            response: aiResponse.trim(),
            query: sanitizedQuery
        })

    } catch (error) {
        console.error('Perplexity AI Error:', error.response?.data || error.message)
        
        if (error.response?.status === 429) {
            return res.status(429).json({ 
                success: false, 
                message: 'AI service rate limit exceeded. Please try again later.' 
            })
        }
        
        if (error.response?.status === 401) {
            return res.status(503).json({ 
                success: false, 
                message: 'AI service authentication failed.' 
            })
        }
        
        if (error.code === 'ECONNABORTED') {
            return res.status(408).json({ 
                success: false, 
                message: 'Request timeout. Please try a shorter query.' 
            })
        }
        
        res.status(503).json({ 
            success: false, 
            message: 'AI service temporarily unavailable. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get suggested prompts for job search
export const getSuggestedPrompts = async (req, res) => {
    try {
        const prompts = [
            "What are the most in-demand tech jobs in 2024?",
            "How to prepare for a software engineer interview?",
            "What skills should I learn for data science roles?",
            "Best practices for writing a compelling resume",
            "How to negotiate salary in tech industry?",
            "Remote work opportunities in my field",
            "Career transition tips for changing industries",
            "Latest trends in artificial intelligence jobs"
        ]

        res.json({
            success: true,
            prompts: prompts
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}