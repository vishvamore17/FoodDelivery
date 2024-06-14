import React, { useContext,  useEffect,  useState } from 'react'
import './Placeorder.css';
import axios from 'axios';

import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom';



const Placeorder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

 const placeOrder = async (event) =>{
  event.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,

  }
  try{
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
      else{
        alert("error");
    }
  }
  catch(error){
    alert(error)
  }
 }

 const navigate = useNavigate();
 useEffect(()=>{
 if(!token){
  navigate('/cart')
 }else if(getTotalCartAmount()===0){
  navigate('/cart')
 }
 },[])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
    <p className="title">Delivery Information</p>
    <div className="multi-fields">
      <input type="text" name='firstName'  onChange={onChangeHandler}  value={data.firstName} placeholder='First Name' />
      <input required type="text" name="lastName"  onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
    </div>
    <input type="email" required  name="email"  onChange={onChangeHandler} value={data.email} placeholder='Email address' />
    <input type="text" placeholder='street' required name="street"   onChange={onChangeHandler} value={data.street}/>
    <div className="multi-fields">
      <input type="text" required placeholder='city' name="city"  onChange={onChangeHandler} value={data.city}/>
      <input type="text" required placeholder='State' name="state"  onChange={onChangeHandler} value={data.state}/>
    </div>
    <div className="multi-fields">
      <input type="text" required placeholder='Zip code' name="zipcode"  onChange={onChangeHandler} value={data.zipcode}/>
      <input type="text"  required placeholder='Country' name="country"  onChange={onChangeHandler} value={data.country}/>
    </div>
    <input type="text" required placeholder='phone' name="phone" onChange={onChangeHandler} value={data.phone}/>
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
    <h2>Cart Totals</h2>
    <div>
      <div className="cart-total-details">
        <p>Subtotal</p>
        <p>₹{getTotalCartAmount()}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <p>Delievery Fee</p>
        <p>₹{50}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <b>Total</b>
        <b>{getTotalCartAmount()+50}</b>
      </div>
      

    </div>
    <button type='submit'>Proceed To Payment</button>
  </div>
      </div>
      
    </form>
  )
}

export default Placeorder
