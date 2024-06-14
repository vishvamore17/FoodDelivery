import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from "../../assets/assets"; // Ensure correct path

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      console.log("Response from API:", response.data); // Log the response for debugging
      if (response.data.success) {
        const ordersData = response.data.data;
        if (Array.isArray(ordersData)) {
          setOrders(ordersData); // Set the orders directly if it's an array
        } else if (ordersData && typeof ordersData === 'object') {
          setOrders([ordersData]); // Wrap the single order object in an array
        } else {
          console.error("Unexpected response format:", ordersData);
          toast.error("Unexpected response format");
        }
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId: orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p>
                  {order.items.map((item, index) => (
                    index === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `
                  ))}
                </p>
                <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;