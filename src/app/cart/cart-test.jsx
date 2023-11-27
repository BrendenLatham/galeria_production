// cart-test.jsx
import React, { useContext, useState } from "react";
import emailjs from "@emailjs/browser";
import { ShopContext } from "./context/shop-context";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import "bootstrap";

export const CartItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    showCart,
    clearCart,
  } = useContext(ShopContext);
  const totalprice = getCartTotal();
  const [showBoxes, setShowBoxes] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "", // email text-box
    address: "", // address text-box
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const sendEmail = () => {
    const params = {
      user_email: inputValues.email,
      address: inputValues.address,
      total: totalprice,
      subject: "Order Confirmation",
    };
    emailjs
      .send("service_qbhzsw7", "template_gmk5382", params, "LUULKrAouN5QgTn5n")
      .then((result) => {
        alert("Success! An email will be sent to you shortly.");
        console.log(result.text);
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  const handleCheckout = async () => {
    // Check if the cart is empty
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      items: cartItems,
      total: calculateTotal(),
      username: user.username,
      // Add any other information you need for the order
    };

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        body: JSON.stringify(order),
      });

      const responseData = await response.json();
      if (response.ok) {
        sendEmail();
        // Clear the cart after successful checkout
        clearCart();
      } else {
        // Handle errors here
        alert("Checkout failed: " + responseData.message);
      }
    } catch (error) {
      // Handle the error here
      console.error("Checkout error: ", error);
      alert("An error occurred during checkout.");
    }
  };

  const handleInputChange = (event, inputName) => {
    const { value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: value,
    }));
  };

  const toggleShowBoxes = () => {
    setShowBoxes((prevShowBoxes) => !prevShowBoxes);
  };

  return (
    <div className="shopping-cart">
      <div className="product-list">
        <p className ="yourcart-text">Your Cart</p>    
        <br></br>
        <div className = "yourcartbox">
        <ul className="your-cart-items">
          {cartItems.map((product) => (
            <li key={product.id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="img-thumbnail"
                />
                <div className = "cartlistbox">
                <div className="cart-title-name">{product.title}</div>
                <div className="cart-item-name">{product.nameType}</div>
                <div className="product-price">${product.price}</div>
                </div>
              </div>

              <div className="cart-item-quantity-box">
                <div className="cart-item-quantity">
                  Qty: {product.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(product)}
                  className="remove-button"
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="add-button"
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
        </div>
        </div>

        <div className = "product-list2">
          <p className ="checkout-text">Checkout</p>
        <p className="total">Total: ${getCartTotal()}</p>
        <br></br>
        <button onClick={clearCart} className="show-cart">
          Clear Cart
        </button>
        <button onClick={toggleShowBoxes} className="proceed-checkout">
          Proceed to Checkout
        </button>
        {showBoxes && (
          <div className ="checkoutbox">
            <br></br>
            <p className ="checkoutboxtext"> Due to technical issues, we are unable to accept payment electronically at this time. Please mail your payment to the address provided in your email confirmation after checkout. </p>
            <input
              type="text"
              value={inputValues.email}
              onChange={(e) => handleInputChange(e, "email")}
              placeholder="Enter Email Address"
              className="email-box"
            />
            <input
              type="text"
              value={inputValues.address}
              onChange={(e) => handleInputChange(e, "address")}
              placeholder="Enter Shipping Address"
              className="address-textbox"
            />
            <button onClick={handleCheckout} className="checkoutbutton">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
