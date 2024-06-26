import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Reset from './components/LoginPopup/Reset'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import location from './components/Location/location'
import SearchResults from './components/SearchResults/SearchResults'

const App = () => {

  const [showLogin,setShowLogin] =useState(false)
  return (
    <>
  {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
         <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/MyOrders' element={<MyOrders/>} />
         <Route path='/Location' element={<Location/>} />
         <Route path='/resetPassword/:token' element={<Reset/>}/>
         <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
