import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiLoader, FiMessageCircle, FiSend, FiAlertCircle, FiRefreshCw } from 'react-icons/fi'
import axios from 'axios'

const AISearch = () => {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [suggestedPrompts, setSuggestedPrompts] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [lastRequestTime, setLastRequestTime] = useState(0)
    const textareaRef = useRef(null)
    const RATE_LIMIT_MS = 2000

    useEffect(() => {
        fetchSuggestedPrompts()
    }, [])

    const fetchSuggestedPrompts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ai/prompts`)
            if (res.data.success) {
                setSuggestedPrompts(res.data.prompts.slice(0, 4))
            }
        } catch (error) {
            console.error('Failed to fetch prompts:', error)
        }
    }

    const handleSearch = async (searchQuery = query) => {
        const trimmedQuery = searchQuery.trim()
        if (!trimmedQuery) return

        const now = Date.now()
        if (now - lastRequestTime < RATE_LIMIT_MS) {
            setError(`Please wait ${Math.ceil((RATE_LIMIT_MS - (now - lastRequestTime)) / 1000)} seconds`)
            return
        }

        setLoading(true)
        setShowSuggestions(false)
        setResponse('')
        setError('')
        setLastRequestTime(now)

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/search`, {
                query: trimmedQuery
            }, { timeout: 30000 })

            if (res.data.success) {
                setResponse(res.data.response)
            } else {
                setError(res.data.message || 'Could not process request')
            }
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                setError('Request timed out. Try a shorter query.')
            } else if (error.response?.status === 429) {
                setError('Too many requests. Please wait.')
            } else {
                setError('AI service unavailable. Try again later.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handlePromptClick = (prompt) => {
        setQuery(prompt)
        setError('')
        handleSearch(prompt)
    }

    const clearSearch = () => {
        setQuery('')
        setResponse('')
        setError('')
        setShowSuggestions(true)
        textareaRef.current?.focus()
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSearch()
        }
    }

    return (
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200'>
            <div className='flex items-center gap-3 mb-4'>
                <FiMessageCircle className='text-blue-600 dark:text-blue-400' size={24} />
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    AI Career Assistant
                </h3>
            </div>

            {/* Search Input */}
            <div className='relative mb-4'>
                <div className='flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                    <FiSearch className='ml-3 text-gray-400 dark:text-gray-500' size={20} />
                    <textarea
                        ref={textareaRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setError('')
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder='Ask about jobs, career advice, salary trends, skills...'
                        className='flex-1 p-3 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none'
                        rows={2}
                        disabled={loading}
                        maxLength={500}
                    />
                    <button
                        onClick={() => handleSearch()}
                        disabled={loading || !query.trim()}
                        className='mr-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 disabled:cursor-not-allowed'
                        aria-label='Search'
                    >
                        {loading ? <FiLoader className='animate-spin' size={18} /> : <FiSend size={18} />}
                    </button>
                </div>
            </div>

            {/* Suggested Prompts */}
            {showSuggestions && suggestedPrompts.length > 0 && (
                <div className='mb-4'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>Try asking:</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        {suggestedPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handlePromptClick(prompt)}
                                className='text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200 border border-gray-200 dark:border-gray-600'
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>
                    <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
                        <div className='flex items-start gap-3'>
                            <FiAlertCircle className='text-red-500 mt-0.5' size={16} />
                            <div>
                                <p className='text-red-700 dark:text-red-300 text-sm'>{error}</p>
                                <button
                                    onClick={() => handleSearch()}
                                    className='mt-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors'
                                >
                                    <FiRefreshCw size={14} /> Try again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Response */}
            {(response || loading) && (
                <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>
                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
                        {loading ? (
                            <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400'>
                                <FiLoader className='animate-spin' size={16} />
                                <span className='text-sm font-medium'>AI is thinking...</span>
                            </div>
                        ) : (
                            <div className='text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-sm'>
                                {response}
                            </div>
                        )}
                    </div>
                    
                    {response && (
                        <div className='flex gap-3 mt-3'>
                            <button
                                onClick={clearSearch}
                                className='text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors font-medium'
                            >
                                Ask another question
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(response)}
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 transition-colors'
                            >
                                Copy
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AISearch