import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import ScrollReveal from './ScrollReveal'

const NewsletterBox = () => {

    const { backendUrl } = useContext(ShopContext)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        setLoading(true)
        try {
            const { data } = await axios.post(backendUrl + '/api/newsletter/subscribe', { email })

            if (data.success) {
                toast.success(data.message)
                setEmail('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <ScrollReveal className='newsletter-box text-center bg-white/50 backdrop-blur-sm py-8 sm:py-10 px-4 rounded-lg'>
      <p className='text-xl sm:text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3 text-sm sm:text-base px-2'>
      Get exclusive offers, new arrivals, and a 20% discount on your first order delivered straight to your inbox.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mx-auto my-6 border p-3 sm:pl-3 bg-white/80'>
        <input
          className='w-full outline-none px-2 py-2 sm:py-0'
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit' disabled={loading} className='bg-black text-white text-xs px-6 sm:px-10 py-3 sm:py-4 disabled:opacity-60 btn-animate w-full sm:w-auto'>
          {loading ? 'SENDING...' : 'SUBSCRIBE'}
        </button>
      </form>
    </ScrollReveal>
  )
}

export default NewsletterBox
