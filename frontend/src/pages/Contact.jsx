import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import { assets } from '@assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import ScrollReveal from '../components/ScrollReveal'

const Contact = () => {
  return (
    <div>
      
      <ScrollReveal className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </ScrollReveal>

      <ScrollReveal className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] hero-image image-zoom-hover rounded-sm' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6 glass-panel p-6 sm:p-8 rounded-lg'>
          <p className='font-semibold text-xl text-gray-600 hero-text-item'>Our Store</p>
          <p className=' text-gray-500 hero-text-item hero-text-item-delay-1'>Jandiala Guru, Amritsar <br /> Punjab 143115, India</p>
          <p className=' text-gray-500 hero-text-item hero-text-item-delay-2'>Tel: +91 98765 43210 <br /> Email: admin@forever.com</p>
          <p className='font-semibold text-xl text-gray-600 hero-text-item hero-text-item-delay-3'>Careers at Forever</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <Link to='/jobs' className='border border-black px-8 py-4 text-sm btn-animate hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</Link>
        </div>
      </ScrollReveal>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
