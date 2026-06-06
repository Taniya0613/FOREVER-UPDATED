import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import { assets } from '@assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import ScrollReveal from '../components/ScrollReveal'

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Washington, USA',
    type: 'Full-time',
    description: 'Build responsive shopping experiences with React and modern web tools.'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design clean, customer-first interfaces for web and mobile storefronts.'
  },
  {
    id: 3,
    title: 'Customer Support Executive',
    department: 'Operations',
    location: 'Washington, USA',
    type: 'Part-time',
    description: 'Help customers with orders, returns, and product questions every day.'
  },
  {
    id: 4,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Plan campaigns, manage social media, and grow the Forever brand online.'
  },
  {
    id: 5,
    title: 'Warehouse Associate',
    department: 'Logistics',
    location: 'Washington, USA',
    type: 'Full-time',
    description: 'Support inventory, packing, and timely delivery of customer orders.'
  },
  {
    id: 6,
    title: 'Store Manager',
    department: 'Retail',
    location: 'Washington, USA',
    type: 'Full-time',
    description: 'Lead in-store teams and deliver a premium shopping experience.'
  }
]

const Jobs = () => {
  return (
    <div>

      <ScrollReveal className='text-center text-2xl pt-10 border-t'>
        <Title text1={'OPEN'} text2={'POSITIONS'} />
      </ScrollReveal>

      <ScrollReveal className='my-10 flex flex-col md:flex-row gap-16 mb-16'>
        <img className='w-full md:max-w-[480px] hero-image image-zoom-hover rounded-sm' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4 glass-panel p-6 sm:p-8 rounded-lg'>
          <p className='font-semibold text-xl text-gray-800'>Careers at Forever</p>
          <p>
            Join a team that is passionate about fashion, technology, and customer experience.
            We are always looking for talented people who want to grow with us.
          </p>
          <p>
            Explore the openings below and apply with your resume. Our HR team will get back to you
            within 3-5 business days.
          </p>
          <Link to='/contact' className='border border-black px-8 py-4 text-sm w-fit btn-animate hover:bg-black hover:text-white transition-all duration-500'>
            Contact HR
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal className='text-xl py-4'>
        <Title text1={'CURRENT'} text2={'OPENINGS'} />
      </ScrollReveal>

      <ScrollReveal className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20'>
        {jobs.map((job, index) => (
          <div key={job.id} className={`job-card border px-8 py-8 flex flex-col gap-4 stagger-${Math.min(index + 1, 10)}`}>
            <div>
              <p className='font-semibold text-lg text-gray-800'>{job.title}</p>
              <p className='text-sm text-gray-500 mt-1'>{job.department}</p>
            </div>
            <div className='text-sm text-gray-500 flex flex-col gap-1'>
              <p>Location: {job.location}</p>
              <p>Type: {job.type}</p>
            </div>
            <p className='text-sm text-gray-600'>{job.description}</p>
            <a
              href={`mailto:admin@forever.com?subject=Application for ${job.title}`}
              className='border border-black px-6 py-3 text-sm w-fit btn-animate hover:bg-black hover:text-white transition-all duration-500'
            >
              Apply Now
            </a>
          </div>
        ))}
      </ScrollReveal>

      <NewsletterBox />

    </div>
  )
}

export default Jobs
