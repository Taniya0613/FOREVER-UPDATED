import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '@assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
            setShowSearch(false)
        }
    },[location, setShowSearch])

    const isOpen = showSearch && visible

    if (!visible) return null

  return (
    <div className={`search-bar-panel border-t border-b bg-gray-50/90 backdrop-blur-sm ${isOpen ? 'is-open' : ''}`}>
      <div className='flex items-center justify-center gap-2 px-3 sm:px-0 py-3'>
        <div className='flex items-center border border-gray-400 px-4 py-2 rounded-full w-full max-w-md sm:w-1/2 bg-white/80'>
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className='flex-1 outline-none bg-transparent text-sm min-w-0'
            type="text"
            placeholder='Search products...'
          />
          <img className='w-4 h-4 shrink-0 object-contain opacity-60' src={assets.search_icon} alt="" />
        </div>
        <button
          type='button'
          onClick={()=>setShowSearch(false)}
          className='nav-icon-btn shrink-0'
          aria-label='Close search'
        >
          <img className='w-4 h-4 object-contain' src={assets.cross_icon} alt="" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
