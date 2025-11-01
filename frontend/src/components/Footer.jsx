import { assets } from '../assets/assets'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='mt-20 transition-colors duration-200 border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700'>
      <div className='container px-4 py-8 mx-auto 2xl:px-20'>
        <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
          {/* Logo */}
          <div className='flex items-center'>
            <img 
              width={160} 
              src={assets.logo} 
              alt="AI Job Portal" 
              className='h-8'
            />
          </div>

          {/* Copyright */}
          <div className='text-center md:text-left'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              © 2025 AI Job Portal. All rights reserved.
            </p>
            <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
              Developed by <span className='font-medium'>Mohammad Kazim</span>
            </p>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-500'>
              Contact: mohammadkazim71@gmail.com
            </p>
          </div>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/Kazim71/ai-job-portal'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              aria-label='View source code on GitHub'
              title='GitHub Repository'
            >
              <FaGithub size={24} />
            </a>
            <div className='flex gap-3'>
              <img 
                width={32} 
                height={32}
                src={assets.facebook_icon} 
                alt="Facebook" 
                className='transition-opacity duration-200 cursor-pointer opacity-60 hover:opacity-100'
              />
              <img 
                width={32} 
                height={32}
                src={assets.twitter_icon} 
                alt="Twitter" 
                className='transition-opacity duration-200 cursor-pointer opacity-60 hover:opacity-100'
              />
              <img 
                width={32} 
                height={32}
                src={assets.instagram_icon} 
                alt="Instagram" 
                className='transition-opacity duration-200 cursor-pointer opacity-60 hover:opacity-100'
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer