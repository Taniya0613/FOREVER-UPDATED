import React from 'react'
import { assets } from '@assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 bg-white/60 backdrop-blur-sm overflow-hidden rounded-sm'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-8 sm:py-0 px-4 sm:px-0'>
            <div className='text-[#414141] text-center sm:text-left'>
                <div className='flex items-center gap-2 hero-text-item justify-center sm:justify-start'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141] title-line'></p>
                    <p className=' font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular text-2xl sm:text-3xl sm:py-3 lg:text-5xl leading-relaxed hero-text-item hero-text-item-delay-1'>Latest Arrivals</h1>
                <div className='flex items-center gap-2 hero-text-item hero-text-item-delay-2 justify-center sm:justify-start'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141] title-line'></p>
                </div>
            </div>
      </div>
      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2 hero-image image-zoom-hover' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero
