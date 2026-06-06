import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import ScrollReveal from '../components/ScrollReveal'

const Profile = () => {

  const { token, user } = useContext(ShopContext)

  if (!token) {
    return <Navigate to='/' replace />
  }

  return (
    <div className='border-t pt-10 min-h-[60vh]'>
      <ScrollReveal>
        <Title text1={'MY'} text2={'PROFILE'} />
      </ScrollReveal>

      <ScrollReveal className='max-w-lg mt-10 border rounded-lg p-6 sm:p-8 text-gray-700 glass-panel shadow-sm'>
        <p className='text-sm text-gray-500 mb-6'>Your login credentials</p>

        <div className='flex flex-col gap-5'>
          <div className='info-card border rounded p-4 stagger-1'>
            <p className='text-xs uppercase tracking-wide text-gray-400'>Name</p>
            <p className='text-lg font-medium mt-1'>{user?.name || '-'}</p>
          </div>

          <div className='info-card border rounded p-4 stagger-2'>
            <p className='text-xs uppercase tracking-wide text-gray-400'>Email</p>
            <p className='text-lg font-medium mt-1 break-all'>{user?.email || '-'}</p>
          </div>

          <div className='info-card border rounded p-4 stagger-3'>
            <p className='text-xs uppercase tracking-wide text-gray-400'>Password</p>
            <p className='text-lg font-medium mt-1'>{user?.password || '-'}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

export default Profile
