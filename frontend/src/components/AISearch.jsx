import { useState, useEffect } from 'react'
import { FiSearch, FiLoader, FiMessageCircle, FiSend } from 'react-icons/fi'
import axios from 'axios'

const AISearch = () => {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [suggestedPrompts, setSuggestedPrompts] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(true)

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
        if (!searchQuery.trim()) return

        setLoading(true)
        setShowSuggestions(false)
        setResponse('')

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/search`, {
                query: searchQuery
            })

            if (res.data.success) {
                setResponse(res.data.response)
            } else {
                setResponse('Sorry, I couldn\\'t process your request. Please try again.')\n            }\n        } catch (error) {\n            setResponse('AI service is temporarily unavailable. Please try again later.')\n        } finally {\n            setLoading(false)\n        }\n    }\n\n    const handlePromptClick = (prompt) => {\n        setQuery(prompt)\n        handleSearch(prompt)\n    }\n\n    const handleKeyPress = (e) => {\n        if (e.key === 'Enter' && !e.shiftKey) {\n            e.preventDefault()\n            handleSearch()\n        }\n    }\n\n    return (\n        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200'>\n            <div className='flex items-center gap-3 mb-4'>\n                <FiMessageCircle className='text-blue-600 dark:text-blue-400' size={24} />\n                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>\n                    AI Career Assistant\n                </h3>\n            </div>\n\n            {/* Search Input */}\n            <div className='relative mb-4'>\n                <div className='flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>\n                    <FiSearch className='ml-3 text-gray-400 dark:text-gray-500' size={20} />\n                    <textarea\n                        value={query}\n                        onChange={(e) => setQuery(e.target.value)}\n                        onKeyPress={handleKeyPress}\n                        placeholder='Ask me about jobs, career advice, or industry insights...'\n                        className='flex-1 p-3 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none'\n                        rows={2}\n                        disabled={loading}\n                    />\n                    <button\n                        onClick={() => handleSearch()}\n                        disabled={loading || !query.trim()}\n                        className='mr-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 disabled:cursor-not-allowed'\n                        aria-label='Search'\n                    >\n                        {loading ? <FiLoader className='animate-spin' size={18} /> : <FiSend size={18} />}\n                    </button>\n                </div>\n            </div>\n\n            {/* Suggested Prompts */}\n            {showSuggestions && suggestedPrompts.length > 0 && (\n                <div className='mb-4'>\n                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>Try asking:</p>\n                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>\n                        {suggestedPrompts.map((prompt, index) => (\n                            <button\n                                key={index}\n                                onClick={() => handlePromptClick(prompt)}\n                                className='text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200 border border-gray-200 dark:border-gray-600'\n                            >\n                                {prompt}\n                            </button>\n                        ))}\n                    </div>\n                </div>\n            )}\n\n            {/* Response */}\n            {(response || loading) && (\n                <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>\n                    <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>\n                        {loading ? (\n                            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>\n                                <FiLoader className='animate-spin' size={16} />\n                                <span>Thinking...</span>\n                            </div>\n                        ) : (\n                            <div className='prose prose-sm dark:prose-invert max-w-none'>\n                                <p className='text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed'>\n                                    {response}\n                                </p>\n                            </div>\n                        )}\n                    </div>\n                    \n                    {response && (\n                        <button\n                            onClick={() => {\n                                setResponse('')\n                                setQuery('')\n                                setShowSuggestions(true)\n                            }}\n                            className='mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200'\n                        >\n                            Ask another question\n                        </button>\n                    )}\n                </div>\n            )}\n        </div>\n    )\n}\n\nexport default AISearch"}, {"oldStr": "            } else {\n                setResponse('Sorry, I couldn\\'t process your request. Please try again.')", "newStr": "            } else {\n                setResponse('Sorry, I couldn\\'t process your request. Please try again.')"}]