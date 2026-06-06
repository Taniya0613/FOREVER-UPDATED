import React from 'react'
import Title from '../components/Title'
import { assets } from '@assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import ScrollReveal from '../components/ScrollReveal'

const About = () => {
  return (
    <div>

      <ScrollReveal className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </ScrollReveal>

      <ScrollReveal className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px] hero-image image-zoom-hover rounded-sm' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p className='hero-text-item'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
              <p className='hero-text-item hero-text-item-delay-1'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
              <b className='text-gray-800 hero-text-item hero-text-item-delay-2'>Our Mission</b>
              <p className='hero-text-item hero-text-item-delay-3'>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </ScrollReveal>

      <ScrollReveal className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </ScrollReveal>

      <ScrollReveal className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='info-card border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 stagger-1'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='info-card border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 stagger-2'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='info-card border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 stagger-3'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </ScrollReveal>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
