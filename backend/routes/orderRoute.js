import express from 'express'
import {placeOrder, placeOrderGooglePay, allOrders, userOrders, updateStatus, trackOrder, deleteOrder} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/delete',adminAuth,deleteOrder)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/googlepay',authUser,placeOrderGooglePay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/track',authUser,trackOrder)

export default orderRouter
