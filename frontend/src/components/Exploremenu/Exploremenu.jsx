import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
      <center>
    <h1>Explore our Menu</h1>
    <p className='explore-menu-text'>Choose from a diverse menu featuring a deletable array of dishes crafted with the finest ingredients and satisfy your  cravings and elevate your dining experience , one delicious meal at a time </p>
    </center>
    <div className='explore-menu-list'>
      {menu_list.map((item,index)=>{
        return(
        <div onClick={()=>setCategory(prev=>prev  === item.menu_name?"All":item.menu_name)} key={index}  className='explore-menu-list-items'>
        <img className={category===item.menu_name?"Active":""} src={item.menu_image} alt=''/>
        <p>{item.menu_name}</p>
        </div>
        )
      })}
    </div>
    <hr/>  
    </div>
  
)
}

export default Exploremenu
