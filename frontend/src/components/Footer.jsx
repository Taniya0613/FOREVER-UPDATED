import React from 'react'
import { assets } from '@assets/assets'

const Footer = () => {
  return (
    <div className='footer-reveal'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-14 my-10 mt-16 sm:mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Forever is your destination for modern fashion and everyday essentials. We bring together quality clothing for men, women, and kids with fast delivery, easy returns, and styles you will love to wear.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 98765 43210</li>
                <li>admin@forever.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2026 @ forever.com - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
