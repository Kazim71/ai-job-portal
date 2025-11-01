import { assets } from '../assets/assets'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20 transition-colors duration-200'>
      <div className='container px-4 2xl:px-20 mx-auto py-8'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
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
              © 2024 AI Job Portal. All rights reserved.
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              Developed by <span className='font-medium'>Mohammad Kazim</span>
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-1'>
              Contact: mohammadkazim71@gmail.com
            </p>
          </div>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/Kazim71/ai-job-portal'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
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
                className='opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer'
              />
              <img 
                width={32} 
                height={32}
                src={assets.twitter_icon} 
                alt="Twitter" 
                className='opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer'
              />
              <img 
                width={32} 
                height={32}
                src={assets.instagram_icon} 
                alt="Instagram" 
                className='opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer'
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer