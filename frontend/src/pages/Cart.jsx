import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '@assets/assets';
import CartTotal from '../components/CartTotal';
import ScrollReveal from '../components/ScrollReveal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  const getStagger = (index) => {
    const n = (index % 10) + 1
    return `stagger-${n}`
  }

  return (
    <div className='border-t pt-14'>

      <ScrollReveal>
        <div className=' text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
      </ScrollReveal>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className={`py-4 px-3 sm:px-4 border-t border-b text-gray-700 flex flex-col gap-4 sm:grid sm:grid-cols-[4fr_2fr_0.5fr] sm:items-center sm:gap-4 list-row glass-panel rounded-lg ${getStagger(index)}`}>
                <div className=' flex items-start gap-3 sm:gap-6 min-w-0'>
                  <img className='w-16 sm:w-20 shrink-0 image-zoom-hover rounded' src={productData.image[0]} alt="" />
                  <div className='min-w-0'>
                    <p className='text-sm sm:text-lg font-medium line-clamp-2'>{productData.name}</p>
                    <div className='flex flex-wrap items-center gap-2 sm:gap-5 mt-2'>
                      <p className='text-sm'>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 py-1 border bg-slate-50 text-xs sm:text-sm'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between sm:contents'>
                  <p className='text-xs text-gray-500 sm:hidden'>Quantity</p>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border w-16 sm:max-w-20 px-2 py-2 text-center' type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-5 cursor-pointer btn-animate mobile-safe-btn p-1' src={assets.bin_icon} alt="" />
                </div>
              </div>
            )

          })
        }
      </div>

      <ScrollReveal className='flex justify-end my-10 sm:my-20'>
        <div className='w-full sm:w-[450px] glass-panel p-4 sm:p-6 rounded-lg'>
          <CartTotal />
          <div className=' w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-6 sm:my-8 px-6 sm:px-8 py-3 btn-animate w-full sm:w-auto'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </ScrollReveal>

    </div>
  )
}

export default Cart
