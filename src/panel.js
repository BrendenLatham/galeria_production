// src/panel.js
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import "./panel.css";

function AdminPanel() {
  const { user } = useAuth();
  const [unfilledOrders, setUnfilledOrders] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:5000/unfilled"; // Check this URL
    console.log("API URL:", apiUrl);

    axios
      .get(apiUrl)
      .then((response) => {
        setUnfilledOrders(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-title">Unfilled Orders</h2>
      <ul className="order-list">
        {unfilledOrders.map((order) => (
          <li key={order._id} className="order-item">
            <div className="order-info">
              <h3>Order ID: {order._id}</h3>
              <p className="order-text">Customer: {order.customerName}</p>
              <ul className="order-list">
                {order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    <p className="order-text">
                      Product Code: {item.id}
                    </p>
                    <p className="order-text">
                      Product Name: {item.nameType}
                    </p>
                    <p className="order-text">Quantity: {item.quantity}</p>
                    <p className="order-text">Price: ${item.price}</p>
                  </li>
                ))}
              </ul>
              <p className="order-total-price">
                Total Price: ${order.total}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
