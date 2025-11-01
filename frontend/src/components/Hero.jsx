import { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import AISearch from './AISearch'
import { FiSearch, FiMapPin, FiBot } from 'react-icons/fi'

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext)
    const [showAISearch, setShowAISearch] = useState(false)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10 px-4'>
            {/* Main Hero Section */}
            <div className='bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white py-16 text-center mx-2 rounded-xl shadow-2xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
                    Over 10,000+ jobs to apply
                </h2>
                <p className='mb-8 max-w-xl mx-auto text-sm md:text-base font-light px-5 text-blue-100'>
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>
                
                {/* Search Bar */}
                <div className='flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-4 sm:mx-auto shadow-lg border border-gray-200 dark:border-gray-700'>
                    <div className='flex items-center flex-1 px-4'>
                        <FiSearch className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 mr-3' />
                        <input 
                            type="text"
                            placeholder='Search for jobs'
                            className='max-sm:text-xs p-3 bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center flex-1 px-4 border-l border-gray-200 dark:border-gray-600'>
                        <FiMapPin className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 mr-3' />
                        <input 
                            type="text"
                            placeholder='Location'
                            className='max-sm:text-xs p-3 bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                            ref={locationRef}
                        />
                    </div>
                    <button 
                        onClick={onSearch} 
                        className='bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg text-white font-medium transition-colors duration-200 flex items-center gap-2'
                    >
                        <FiSearch className='h-4 w-4' />
                        <span className='hidden sm:inline'>Search</span>
                    </button>
                </div>

                {/* AI Search Toggle */}
                <div className='mt-6'>
                    <button
                        onClick={() => setShowAISearch(!showAISearch)}
                        className='inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium'
                    >
                        <FiBot className='h-4 w-4' />
                        {showAISearch ? 'Hide AI Assistant' : 'Ask AI Assistant'}
                    </button>
                </div>
            </div>

            {/* AI Search Component */}
            {showAISearch && (
                <div className='mx-2 mt-6'>
                    <AISearch />
                </div>
            )}

            {/* Trusted Companies */}
            <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg mx-2 mt-6 p-6 rounded-xl transition-colors duration-200'>
                <div className='flex justify-center items-center gap-8 lg:gap-16 flex-wrap'>
                    <p className='font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide'>Trusted by</p>
                    <img className='h-6 opacity-70 hover:opacity-100 transition-opacity duration-200' src={assets.microsoft_logo} alt="Microsoft" />
                    <img className='h-6 opacity-70 hover:opacity-100 transition-opacity duration-200' src={assets.walmart_logo} alt="Walmart" />
                    <img className='h-6 opacity-70 hover:opacity-100 transition-opacity duration-200' src={assets.accenture_logo} alt="Accenture" />
                    <img className='h-6 opacity-70 hover:opacity-100 transition-opacity duration-200' src={assets.samsung_logo} alt="Samsung" />
                    <img className='h-6 opacity-70 hover:opacity-100 transition-opacity duration-200' src={assets.amazon_logo} alt="Amazon" />
                    <img className='h-6 opacity-70 hover:opacity-100 transition-opacity duration-200' src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>
        </div>
    )
}

export default Hero