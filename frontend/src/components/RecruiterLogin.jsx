import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {
    const navigate = useNavigate()
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)
    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == "Sign Up" && !isTextDataSubmited) {
            return setIsTextDataSubmited(true)
        }

        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                    toast.success('Login successful!')
                } else {
                    toast.error(data.message)
                }
            } else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                    toast.success('Account created successfully!')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
            <div className='relative bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md'>
                <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600'></div>
                
                <div className='p-8'>
                    <div className='flex justify-between items-start mb-6'>
                        <div>
                            <h2 className='text-2xl font-bold text-gray-800'>Recruiter {state}</h2>
                            <p className='text-gray-500 text-sm'>
                                {state === 'Login' 
                                    ? 'Welcome back! Please sign in to continue' 
                                    : isTextDataSubmited 
                                        ? 'Upload your company logo' 
                                        : 'Create your recruiter account'}
                            </p>
                        </div>
                        <button 
                            onClick={() => setShowRecruiterLogin(false)}
                            className='text-gray-400 hover:text-gray-600 transition-colors'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={onSubmitHandler} className='space-y-4'>
                        {state === "Sign Up" && isTextDataSubmited ? (
                            <div className='flex flex-col items-center py-4'>
                                <label htmlFor="image" className='group cursor-pointer'>
                                    <div className='relative'>
                                        <img 
                                            className='w-24 h-24 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-500 transition-colors' 
                                            src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                            alt="Company logo" 
                                        />
                                        <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className='mt-2 text-sm text-center text-gray-600'>Click to upload company logo</p>
                                    <input onChange={e => setImage(e.target.files[0])} type="file" id='image' className='hidden' accept='image/*' />
                                </label>
                            </div>
                        ) : (
                            <>
                                {state !== 'Login' && (
                                    <div className='space-y-1'>
                                        <label htmlFor="name" className='text-sm font-medium text-gray-700'>Company Name</label>
                                        <div className='flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <input 
                                                id="name"
                                                className='ml-2 outline-none flex-1 text-sm' 
                                                onChange={e => setName(e.target.value)} 
                                                value={name} 
                                                type="text" 
                                                placeholder='Enter company name' 
                                                required 
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className='space-y-1'>
                                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</label>
                                    <div className='flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <input 
                                            id="email"
                                            className='ml-2 outline-none flex-1 text-sm' 
                                            onChange={e => setEmail(e.target.value)} 
                                            value={email} 
                                            type="email" 
                                            placeholder='Enter your email' 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                    <label htmlFor="password" className='text-sm font-medium text-gray-700'>Password</label>
                                    <div className='flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <input 
                                            id="password"
                                            className='ml-2 outline-none flex-1 text-sm' 
                                            onChange={e => setPassword(e.target.value)} 
                                            value={password} 
                                            type="password" 
                                            placeholder='Enter your password' 
                                            required 
                                        />
                                    </div>
                                </div>

                                {state === "Login" && (
                                    <div className='flex justify-end'>
                                        <button type="button" className='text-sm text-blue-600 hover:text-blue-800 transition-colors'>
                                            Forgot password?
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button 
                            type='submit' 
                            className='w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-md transition-all'
                        >
                            {state === 'Login' ? 'Login' : isTextDataSubmited ? 'Create Account' : 'Continue'}
                        </button>

                        <div className='text-center text-sm text-gray-500 pt-2'>
                            {state === 'Login' ? (
                                <>Don't have an account?{' '}
                                <button 
                                    type="button" 
                                    onClick={() => setState("Sign Up")}
                                    className='text-blue-600 font-medium hover:text-blue-800 transition-colors'
                                >
                                    Sign Up
                                </button>
                                </>
                            ) : (
                                <>Already have an account?{' '}
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setState("Login")
                                        setIsTextDataSubmited(false)
                                    }}
                                    className='text-blue-600 font-medium hover:text-blue-800 transition-colors'
                                >
                                    Login
                                </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecruiterLogin

