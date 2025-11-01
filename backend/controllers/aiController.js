import axios from 'axios'

// Perplexity AI Search for Job-related queries
export const searchJobsWithAI = async (req, res) => {
    try {
        const { query } = req.body
        
        if (!query || query.trim().length === 0) {
            return res.json({ success: false, message: 'Query is required' })
        }

        const apiKey = process.env.PERPLEXITY_API_KEY
        if (!apiKey) {
            return res.json({ success: false, message: 'AI service not configured' })
        }

        const response = await axios.post('https://api.perplexity.ai/chat/completions', {
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful job search assistant. Provide concise, relevant information about job opportunities, career advice, and industry insights. Keep responses professional and actionable.'
                },
                {
                    role: 'user',
                    content: query
                }
            ],
            max_tokens: 500,
            temperature: 0.2
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        })

        const aiResponse = response.data.choices[0]?.message?.content || 'No response available'

        res.json({
            success: true,
            response: aiResponse,
            query: query
        })

    } catch (error) {
        console.error('Perplexity AI Error:', error.response?.data || error.message)
        res.json({ 
            success: false, 
            message: 'AI service temporarily unavailable',
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