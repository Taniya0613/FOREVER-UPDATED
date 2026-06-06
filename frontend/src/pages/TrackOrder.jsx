import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ScrollReveal from '../components/ScrollReveal'

const trackingSteps = [
  {
    status: 'Order Placed',
    title: 'Order Placed',
    description: 'We have received your order and it is being processed.'
  },
  {
    status: 'Packing',
    title: 'Packing',
    description: 'Your items are being carefully packed at our warehouse.'
  },
  {
    status: 'Shipped',
    title: 'Shipped',
    description: 'Your order has left our facility and is on the way.'
  },
  {
    status: 'Out for delivery',
    title: 'Out for Delivery',
    description: 'Our delivery partner is bringing your order to your address.'
  },
  {
    status: 'Delivered',
    title: 'Delivered',
    description: 'Your order has been delivered successfully.'
  }
]

const TrackOrder = () => {

  const { orderId } = useParams()
  const { backendUrl, token, currency, navigate } = useContext(ShopContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    if (!token) {
      toast.error('Please login to track your order')
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/order/track',
        { orderId },
        { headers: { token } }
      )

      if (data.success) {
        setOrder(data.order)
      } else {
        toast.error(data.message)
        navigate('/orders')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      navigate('/orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [orderId, token])

  const currentStepIndex = trackingSteps.findIndex((step) => step.status === order?.status)
  const estimatedDelivery = order
    ? new Date(order.date + 5 * 24 * 60 * 60 * 1000).toDateString()
    : ''

  if (loading) {
    return (
      <div className='border-t pt-16 min-h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-4'>
        <div className='spinner'></div>
        <p className='loading-pulse'>Loading order tracking...</p>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className='border-t pt-16 pb-12 sm:pb-20'>

      <ScrollReveal className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
        <div className='text-xl sm:text-2xl'>
          <Title text1={'TRACK'} text2={'ORDER'} />
        </div>
        <button
          onClick={() => navigate('/orders')}
          className='border border-black px-6 py-2.5 text-sm btn-animate hover:bg-black hover:text-white transition-all duration-500 w-full sm:w-fit text-center'
        >
          Back to Orders
        </button>
      </ScrollReveal>

      <div className='grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10'>

        <ScrollReveal className='border p-6 sm:p-8 glass-panel rounded-lg'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-6 border-b'>
            <div>
              <p className='text-sm text-gray-500'>Order ID</p>
              <p className='font-medium text-gray-800 break-all'>{order._id}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Current Status</p>
              <p className='font-semibold text-green-600'>{order.status}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Estimated Delivery</p>
              <p className='font-medium text-gray-800'>{estimatedDelivery}</p>
            </div>
          </div>

          <div className='space-y-0'>
            {trackingSteps.map((step, index) => {
              const isCompleted = currentStepIndex > index
              const isActive = currentStepIndex === index
              const isPending = currentStepIndex < index

              return (
                <div key={step.status} className={`flex gap-4 track-step stagger-${Math.min(index + 1, 10)}`}>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        isCompleted || isActive
                          ? 'bg-green-500 border-green-500 scale-110'
                          : 'bg-white border-gray-300'
                      }`}
                    ></div>
                    {index !== trackingSteps.length - 1 && (
                      <div
                        className={`w-[2px] flex-1 min-h-[70px] transition-colors duration-500 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className={`pb-8 ${isPending ? 'opacity-50' : ''}`}>
                    <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                      {step.title}
                    </p>
                    <p className='text-sm text-gray-500 mt-1'>{step.description}</p>
                    {(isCompleted || isActive) && (
                      <p className='text-xs text-gray-400 mt-2'>
                        {isActive ? 'In progress' : 'Completed'}
                        {index === 0 ? ` • ${new Date(order.date).toDateString()}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        <div className='flex flex-col gap-6'>

          <ScrollReveal className='border p-6 glass-panel rounded-lg'>
            <p className='font-semibold text-gray-800 mb-4'>Delivery Address</p>
            <p className='text-sm text-gray-700 font-medium'>
              {order.address.firstName} {order.address.lastName}
            </p>
            <p className='text-sm text-gray-500 mt-2'>{order.address.street}</p>
            <p className='text-sm text-gray-500'>
              {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
            </p>
            <p className='text-sm text-gray-500 mt-2'>Phone: {order.address.phone}</p>
          </ScrollReveal>

          <ScrollReveal className='border p-6 glass-panel rounded-lg'>
            <p className='font-semibold text-gray-800 mb-4'>Order Summary</p>
            <div className='space-y-4'>
              {order.items.map((item, index) => (
                <div key={index} className={`flex gap-4 list-row stagger-${Math.min(index + 1, 10)}`}>
                  <img className='w-16 h-16 object-cover border image-zoom-hover' src={item.image[0]} alt={item.name} />
                  <div className='text-sm'>
                    <p className='font-medium text-gray-800'>{item.name}</p>
                    <p className='text-gray-500 mt-1'>Size: {item.size} • Qty: {item.quantity}</p>
                    <p className='text-gray-700 mt-1'>{currency}{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='border-t mt-5 pt-4 text-sm space-y-2'>
              <div className='flex justify-between text-gray-600'>
                <span>Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Payment Status</span>
                <span>{order.payment ? 'Paid' : 'Pending'}</span>
              </div>
              <div className='flex justify-between font-semibold text-gray-800'>
                <span>Order Total</span>
                <span>{currency}{order.amount}</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  )
}

export default TrackOrder
