// AccountPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import '../../panel.css'; // Add your CSS styles as necessary

const AccountPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/orders/${user.username}`);
          console.log('Orders fetched:', response.data);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="account-orders-container">
      <h2>Your Unfilled Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            <div className="order-info">
              <h3>Order ID: {order._id}</h3>
              {/* Assume you have a way to get the customer name, just as an example */}
              <p className="order-text">Customer: {user.username}</p> 
              <ul className="item-list">
                {order.items.map((item, index) => (
                  <li key={index} className="item-detail">
                    {/* Update these fields based on the actual item structure */}
                    <p className="order-text">Product Title: {item.title}</p>
                    <p className="order-text">Product Type: {item.nameType}</p>
                    <p className="order-text">Quantity: {item.quantity}</p>
                    <p className="order-text">Price: ${item.price}</p>
                  </li>
                ))}
              </ul>
              <p className="order-total-price">Total Price: ${order.total}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountPage;
