import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

function MyOrders() {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + "/api/order/order",
                {},
                { headers: { token } }
            );
            const responseData = response.data.data;
            if (responseData) {
                if (Array.isArray(responseData)) {
                    setData(responseData);
                } else if (responseData && typeof responseData === 'object') {
                    setData([responseData]); // Convert single order object to array
                } else {
                    console.error("Fetched data is not valid", responseData);
                    setData([]);
                }
            }
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching orders', error);
            setError('Error fetching orders. Please try again later.');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={order.id || index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt='' />
                            <p>
                                {order.items.map((item, itemIndex) => (
                                    <span key={item.id || itemIndex}>
                                        {item.name} X{item.quantity}
                                        {itemIndex === order.items.length - 1 ? '' : ','}
                                    </span>
                                ))}
                            </p>
                            <p>₹{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span>&#x25cf;</span>
                                <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
}

export default MyOrders;
