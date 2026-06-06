import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price,index=0}) => {

    const staggerClass = index < 10 ? `stagger-${index + 1}` : 'stagger-10'
    
    const {currency, token, setShowLoginPopup} = useContext(ShopContext);

    const handleClick = (event) => {
        scrollTo(0,0)
        if (!token) {
            event.preventDefault()
            setShowLoginPopup(true)
        }
    }

  return (
    <Link onClick={handleClick} className={`text-gray-700 cursor-pointer product-card ${staggerClass}`} to={`/product/${id}`}>
      <div className='product-image-wrap'>
        <img src={image[0]} alt="" />
      </div>
      <p className='pt-2 sm:pt-3 pb-1 text-xs sm:text-sm line-clamp-2'>{name}</p>
      <p className='text-xs sm:text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
