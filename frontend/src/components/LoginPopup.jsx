import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = () => {

  const [currentState, setCurrentState] = useState('Login')
  const { setToken, backendUrl, saveUserProfile, setShowLoginPopup } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          saveUserProfile({ name, email, password })
          setShowLoginPopup(false)
          toast.success('Account created successfully')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)

          const profileResponse = await axios.post(
            backendUrl + '/api/user/profile',
            {},
            { headers: { token: response.data.token } }
          )

          if (profileResponse.data.success) {
            saveUserProfile({
              name: profileResponse.data.user.name,
              email: profileResponse.data.user.email,
              password
            })
          } else {
            saveUserProfile({ name: 'User', email, password })
          }

          setShowLoginPopup(false)
          toast.success('Login successful')
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 modal-backdrop'>
      <div className='w-full max-w-md rounded-xl bg-white p-5 sm:p-6 shadow-2xl modal-content max-h-[90vh] overflow-y-auto'>
        <div className='text-center mb-6'>
          <p className='prata-regular text-3xl text-gray-800'>{currentState}</p>
          <p className='text-sm text-gray-500 mt-2'>Create an account or login to explore the full website</p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 text-gray-800'>
          {currentState === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className='w-full px-3 py-2 border border-gray-800'
              placeholder='Name'
              required
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email'
            required
          />
          <input
            onChange={(e) => setPasword(e.target.value)}
            value={password}
            type="password"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Password'
            required
          />

          <div className='w-full flex justify-between text-sm'>
            <p className='text-gray-500'>Required to continue shopping</p>
            {currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-gray-800'>Create account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-gray-800'>Login Here</p>
            }
          </div>

          <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-2 btn-animate'>
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPopup
