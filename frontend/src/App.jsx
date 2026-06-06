import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Jobs from './pages/Jobs'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import TrackOrder from './pages/TrackOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import LoginPopup from './components/LoginPopup'
import AnimatedBackground from './components/AnimatedBackground'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import { ShopContext } from './context/ShopContext'

const AppContent = () => {

  const { token, showLoginPopup } = useContext(ShopContext)
  const location = useLocation()

  if (!token && location.pathname !== '/') {
    return <Navigate to='/' replace />
  }

  return (
    <>
      {showLoginPopup && !token && <LoginPopup />}
      <div key={location.pathname} className='page-enter'>
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/track-order/:orderId' element={<TrackOrder />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>
    </>
  )
}

const App = () => {
  return (
    <div className='site-shell'>
      <AnimatedBackground />
      <div className='site-content px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer position="top-center" limit={3} />
        <Navbar />
        <SearchBar />
        <AppContent />
        <Footer />
      </div>
    </div>
  )
}

export default App
