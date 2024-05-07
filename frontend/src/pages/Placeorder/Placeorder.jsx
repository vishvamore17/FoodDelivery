import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../components/context/StoreContext'

const Placeorder = () => {

  const {getTotalCartAmount}=useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
    <p className="title">Delivery Information</p>
    <div className="multi-fields">
      <input type="text" placeholder='First Name' />
      <input type="text" placeholder='Last Name' />
    </div>
    <input type="email" placeholder='Email address' />
    <input type="text" placeholder='street' />
    <div className="multi-fields">
      <input type="text" placeholder='city' />
      <input type="text" placeholder='State' />
    </div>
    <div className="multi-fields">
      <input type="text" placeholder='Zip code' />
      <input type="text" placeholder='Country' />
    </div>
    <input type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
    <h2>Cart Totals</h2>
    <div>
      <div className="cart-total-details">
        <p>Subtotal</p>
        <p>${getTotalCartAmount()}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <p>Delievery Fee</p>
        <p>${2}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <b>Total</b>
        <b>{getTotalCartAmount()+2}</b>
      </div>
      

    </div>
    <button>Proceed To Payment</button>
  </div>
      </div>
      
    </form>
  )
}

export default Placeorder
