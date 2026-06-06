import React, { useContext, useEffect, useState } from 'react'
import {assets} from '@assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, clearUserSession, setShowLoginPopup} = useContext(ShopContext);

    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [visible])

    const requireLogin = () => {
        setShowLoginPopup(true)
    }

    const logout = () => {
        clearUserSession()
        navigate('/')
        setVisible(false)
    }

  return (
    <>
    <div className='relative flex items-center justify-between py-3 sm:py-5 font-medium navbar-animate bg-white/70 backdrop-blur-md sticky top-0 z-50 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      
      <Link to='/' className='shrink-0'><img src={assets.logo} className='w-24 sm:w-36 h-auto object-contain' alt="Forever" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        
        <NavLink to='/' className='flex flex-col items-center gap-1 nav-link-animate'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        {token && (
          <>
            <NavLink to='/collection' className='flex flex-col items-center gap-1 nav-link-animate'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1 nav-link-animate'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1 nav-link-animate'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
          </>
        )}

      </ul>

      <div className='flex items-center gap-1 sm:gap-4 shrink-0'>
            <button
              type='button'
              onClick={()=> {
                if (!token) {
                  requireLogin()
                  return
                }
                setShowSearch(true)
                navigate('/collection')
              }}
              className='nav-icon-btn'
              aria-label='Search'
            >
              <img src={assets.search_icon} alt="" />
            </button>
            
            <div className='group relative'>
                <button
                  type='button'
                  onClick={()=> token ? null : requireLogin() }
                  className='nav-icon-btn'
                  aria-label='Profile'
                >
                  <img src={assets.profile_icon} alt="" />
                </button>
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                        <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-black py-1'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black py-1'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black py-1'>Logout</p>
                    </div>
                </div>}
            </div>

            {token ? (
              <Link to='/cart' className='nav-icon-btn relative' aria-label='Cart'>
                  <img src={assets.cart_icon} alt="" />
                  <span className='absolute top-1 right-1 min-w-[14px] h-[14px] px-0.5 text-center leading-[14px] bg-black text-white rounded-full text-[8px] font-medium'>{getCartCount()}</span>
              </Link>
            ) : (
              <button type='button' onClick={requireLogin} className='nav-icon-btn' aria-label='Cart'>
                <img src={assets.cart_icon} alt="" />
              </button>
            )}

            <button
              type='button'
              onClick={()=>setVisible(true)}
              className='nav-icon-btn sm:hidden'
              aria-label='Open menu'
            >
              <img src={assets.menu_icon} alt="" />
            </button>
      </div>
    </div>

    <div className={`mobile-menu-panel sm:hidden ${visible ? 'is-open' : ''}`}>
      <div className='flex flex-col text-gray-600 h-full pt-20 px-4'>
          <button
            type='button'
            onClick={()=>setVisible(false)}
            className='flex items-center gap-4 py-4 cursor-pointer border-b mb-2 w-full text-left'
          >
              <img className='h-3 w-3 rotate-180 object-contain' src={assets.dropdown_icon} alt="" />
              <p className='font-medium'>Back</p>
          </button>
          <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/'>HOME</NavLink>
          {token && (
            <>
              <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/collection'>COLLECTION</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/about'>ABOUT</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/contact'>CONTACT</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/profile'>MY PROFILE</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/orders'>ORDERS</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-4 border-b nav-link-animate text-base' to='/cart'>CART</NavLink>
            </>
          )}
      </div>
    </div>
    </>
  )
}

export default Navbar
