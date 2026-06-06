import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '@assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import ScrollReveal from '../components/ScrollReveal'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const [showGooglePay, setShowGooglePay] = useState(false);
    const [googlePayLoading, setGooglePayLoading] = useState(false);
    const [pendingOrder, setPendingOrder] = useState(null);
    const { navigate, backendUrl, token, setToken, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const handleAuthError = (message) => {
        if (
            message?.toLowerCase().includes('login again') ||
            message?.toLowerCase().includes('session expired') ||
            message?.toLowerCase().includes('invalid signature')
        ) {
            localStorage.removeItem('token')
            setToken('')
            navigate('/login')
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error('Please login to place order')
            navigate('/login')
        }
    }, [token, navigate])

    const buildOrderData = () => {
        let orderItems = []

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if (itemInfo) {
                        itemInfo.size = item
                        itemInfo.quantity = cartItems[items][item]
                        orderItems.push(itemInfo)
                    }
                }
            }
        }

        return {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee
        }
    }

    const confirmGooglePay = async () => {
        if (!pendingOrder) return

        setGooglePayLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            const response = await axios.post(
                backendUrl + '/api/order/googlepay',
                pendingOrder,
                { headers: { token } }
            )

            if (response.data.success) {
                toast.success('Google Pay payment successful')
                setCartItems({})
                setShowGooglePay(false)
                setPendingOrder(null)
                navigate('/orders')
            } else {
                toast.error(response.data.message)
                handleAuthError(response.data.message)
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message
            toast.error(message)
            handleAuthError(message)
        } finally {
            setGooglePayLoading(false)
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        if (!token) {
            toast.error('Please login to place order')
            navigate('/login')
            return
        }

        try {
            const orderData = buildOrderData()

            switch (method) {

                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                        handleAuthError(response.data.message)
                    }
                    break;

                case 'googlepay':
                    setPendingOrder(orderData)
                    setShowGooglePay(true)
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error)
            const message = error.response?.data?.message || error.message
            toast.error(message)
            handleAuthError(message)
        }
    }


    return (
        <>
            {showGooglePay && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 modal-backdrop'>
                    <div className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl modal-content'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <img className='h-6 w-6 shrink-0 object-contain' src={assets.googlepay_icon} alt="" />
                                <p className='text-sm font-medium text-gray-700'>GOOGLE PAY</p>
                            </div>
                            <button
                                type='button'
                                onClick={() => {
                                    if (!googlePayLoading) {
                                        setShowGooglePay(false)
                                        setPendingOrder(null)
                                    }
                                }}
                                className='text-gray-400 hover:text-gray-600'
                            >
                                ✕
                            </button>
                        </div>

                        <div className='mt-6 text-center'>
                            <p className='text-sm text-gray-500'>Pay Forever Store</p>
                            <p className='mt-2 text-3xl font-semibold text-gray-900'>
                                {currency}{pendingOrder?.amount?.toFixed(2)}
                            </p>
                        </div>

                        <div className='mt-6 rounded-xl border bg-gray-50 p-4'>
                            <p className='text-sm font-medium text-gray-700'>UPI ID</p>
                            <p className='mt-1 text-sm text-gray-500'>demo@okaxis</p>
                            <p className='mt-4 text-xs text-gray-400'>Demo payment — no real money will be charged.</p>
                        </div>

                        <button
                            type='button'
                            disabled={googlePayLoading}
                            onClick={confirmGooglePay}
                            className='mt-6 w-full rounded-full bg-black py-3 text-sm font-medium text-white disabled:opacity-60 btn-animate'
                        >
                            {googlePayLoading ? 'Processing...' : 'Pay with Google Pay'}
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
                <ScrollReveal className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                    <div className='text-xl sm:text-2xl my-3'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="text" placeholder='First name' />
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="text" placeholder='Last name' />
                    </div>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="email" placeholder='Email address' />
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="text" placeholder='Street' />
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="text" placeholder='City' />
                        <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="text" placeholder='State' />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="number" placeholder='Zipcode' />
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="text" placeholder='Country' />
                    </div>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-2.5 px-3.5 w-full text-base' type="number" placeholder='Phone' />
                </ScrollReveal>

                <ScrollReveal className='mt-8'>

                    <div className='mt-4 sm:mt-8 w-full'>
                        <CartTotal />
                    </div>

                    <div className='mt-12'>
                        <Title text1={'PAYMENT'} text2={'METHOD'} />
                        <div className='flex gap-3 flex-col sm:flex-row'>
                            <div onClick={() => setMethod('googlepay')} className='payment-option flex items-center gap-3 border p-2 px-4 cursor-pointer glass-panel rounded'>
                                <p className={`min-w-3.5 h-3.5 border rounded-full shrink-0 ${method === 'googlepay' ? 'bg-green-400' : ''}`}></p>
                                <div className='flex items-center gap-2 mx-1'>
                                    <img className='h-4 w-4 shrink-0 object-contain' src={assets.googlepay_icon} alt="" />
                                    <p className='text-gray-500 text-sm font-medium whitespace-nowrap'>GOOGLE PAY</p>
                                </div>
                            </div>
                            <div onClick={() => setMethod('cod')} className='payment-option flex items-center gap-3 border p-2 px-4 cursor-pointer glass-panel rounded'>
                                <p className={`min-w-3.5 h-3.5 border rounded-full shrink-0 ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                                <p className='text-gray-500 text-sm font-medium mx-1 whitespace-nowrap'>CASH ON DELIVERY</p>
                            </div>
                        </div>

                        <div className='w-full mt-8'>
                            <button type='submit' className='bg-black text-white px-8 sm:px-16 py-3 text-sm btn-animate w-full sm:w-auto'>PLACE ORDER</button>
                        </div>
                    </div>
                </ScrollReveal>
            </form>
        </>
    )
}

export default PlaceOrder
