import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import ScrollReveal from '../components/ScrollReveal';

const Orders = () => {

  const { backendUrl, token , currency, navigate} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  const getStagger = (index) => `stagger-${(index % 10) + 1}`

  return (
    <div className='border-t pt-16'>

        <ScrollReveal>
          <div className='text-2xl'>
              <Title text1={'MY'} text2={'ORDERS'}/>
          </div>
        </ScrollReveal>

        <div>
            {
              orderData.map((item,index) => (
                <div key={index} className={`py-4 border-t border-b text-gray-700 flex flex-col gap-4 md:flex-row md:items-center md:justify-between list-row glass-panel px-3 sm:px-4 rounded-lg ${getStagger(index)}`}>
                    <div className='flex items-start gap-3 sm:gap-6 text-sm min-w-0'>
                        <img className='w-16 sm:w-20 shrink-0 image-zoom-hover rounded' src={item.image[0]} alt="" />
                        <div className='min-w-0'>
                          <p className='text-sm sm:text-base font-medium line-clamp-2'>{item.name}</p>
                          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs sm:text-base text-gray-700'>
                            <p>{currency}{item.price}</p>
                            <p>Qty: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                          </div>
                          <p className='mt-1 text-xs sm:text-sm'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className='mt-1 text-xs sm:text-sm'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center justify-between gap-3 md:w-1/2'>
                        <div className='flex items-center gap-2'>
                            <p className={`min-w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-orange-400'}`}></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <button onClick={() => navigate(`/track-order/${item.orderId}`)} className='border px-4 py-2.5 text-sm font-medium rounded-sm btn-animate hover:bg-black hover:text-white transition-all duration-500 w-full sm:w-auto text-center'>Track Order</button>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Orders
