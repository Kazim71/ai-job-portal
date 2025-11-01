import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const { setShowRecruiterLogin } = useContext(AppContext)
    const { isDark, toggleTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Jobs', path: '/' },
        ...(user ? [{ name: 'Applications', path: '/applications' }] : [])
    ]

    return (
        <nav className='bg-white dark:bg-gray-900 shadow-lg transition-colors duration-200'>
            <div className='container px-4 2xl:px-20 mx-auto'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <img 
                        onClick={() => navigate('/')} 
                        className='cursor-pointer h-8 transition-transform hover:scale-105' 
                        src={assets.logo} 
                        alt="AI Job Portal" 
                    />

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-6'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium'
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - Desktop */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {/* GitHub Link */}
                        <a
                            href='https://github.com/Kazim71/ai-job-portal'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                            aria-label='View source code on GitHub'
                        >
                            <FaGithub size={20} />
                        </a>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>

                        {/* User Section */}
                        {user ? (
                            <div className='flex items-center space-x-3'>
                                <span className='text-gray-700 dark:text-gray-300 font-medium'>
                                    Hi, {user.firstName}
                                </span>
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-8 h-8'
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className='flex items-center space-x-3'>
                                <button 
                                    onClick={() => setShowRecruiterLogin(true)} 
                                    className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200'
                                >
                                    Recruiter Login
                                </button>
                                <button 
                                    onClick={() => openSignIn()} 
                                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium'
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                        aria-label='Toggle mobile menu'
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='md:hidden border-t border-gray-200 dark:border-gray-700 py-4'>
                        <div className='flex flex-col space-y-4'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium px-2'
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            <div className='flex items-center justify-between px-2 pt-2 border-t border-gray-200 dark:border-gray-700'>
                                <div className='flex items-center space-x-4'>
                                    <a
                                        href='https://github.com/Kazim71/ai-job-portal'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                                        aria-label='View source code on GitHub'
                                    >
                                        <FaGithub size={20} />
                                    </a>
                                    <button
                                        onClick={toggleTheme}
                                        className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
                                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                                    >
                                        {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                                    </button>
                                </div>
                                
                                {user ? (
                                    <div className='flex items-center space-x-3'>
                                        <span className='text-gray-700 dark:text-gray-300 text-sm'>
                                            Hi, {user.firstName}
                                        </span>
                                        <UserButton 
                                            appearance={{
                                                elements: {
                                                    avatarBox: 'w-8 h-8'
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className='flex flex-col space-y-2'>
                                        <button 
                                            onClick={() => {
                                                setShowRecruiterLogin(true)
                                                setIsMenuOpen(false)
                                            }} 
                                            className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 text-sm'
                                        >
                                            Recruiter Login
                                        </button>
                                        <button 
                                            onClick={() => {
                                                openSignIn()
                                                setIsMenuOpen(false)
                                            }} 
                                            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm'
                                        >
                                            Login
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar