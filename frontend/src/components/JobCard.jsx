import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiClock } from 'react-icons/fi'
import { FaBuilding } from 'react-icons/fa'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  const handleApply = () => {
    navigate(`/apply-job/${job._id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl rounded-xl transition-all duration-200 hover:scale-[1.02] group'>
      {/* Company Header */}
      <div className='flex justify-between items-start mb-4'>
        <div className='flex items-center gap-3'>
          <img 
            className='h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-600' 
            src={job.companyId.image} 
            alt={job.companyId.name}
            onError={(e) => {
              e.target.src = '/api/placeholder/40/40'
            }}
          />
          <div>
            <h5 className='font-medium text-gray-900 dark:text-white text-sm'>
              {job.companyId.name}
            </h5>
            <div className='flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400'>
              <FaBuilding className='h-3 w-3' />
              <span>Company</span>
            </div>
          </div>
        </div>
        <div className='text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1'>
          <FiClock className='h-3 w-3' />
          <span>2 days ago</span>
        </div>
      </div>

      {/* Job Title */}
      <h4 className='font-semibold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200'>
        {job.title}
      </h4>

      {/* Job Details */}
      <div className='flex items-center gap-3 mb-4 flex-wrap'>
        <span className='inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-medium'>
          <FiMapPin className='h-3 w-3' />
          {job.location}
        </span>
        <span className='inline-flex items-center bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full text-xs font-medium'>
          {job.level}
        </span>
        {job.category && (
          <span className='inline-flex items-center bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full text-xs font-medium'>
            {job.category}
          </span>
        )}
      </div>

      {/* Job Description */}
      <div className='text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed'>
        <div 
          dangerouslySetInnerHTML={{ 
            __html: job.description.slice(0, 150) + (job.description.length > 150 ? '...' : '') 
          }}
          className='prose prose-sm dark:prose-invert max-w-none'
        />
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3 text-sm'>
        <button 
          onClick={handleApply}
          className='flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm'
        >
          Apply Now
        </button>
        <button 
          onClick={handleApply}
          className='px-4 py-2.5 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200'
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

export default JobCard