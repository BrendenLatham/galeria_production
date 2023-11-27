//ShoppingCart.jsx
import React, { useState, useEffect, useContext } from "react";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";
import { ShopContext } from "./context/shop-context";
const baseEndpoint =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

function ShoppingCartPopup() {
  const [cart, setCart] = useState([]);
  const { objectId } = useParams(); // Access the objectId from the route parameters
  //array for the products in the cart

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Coffee Mug",
      price: 10,
      imageSrc: "",
      size: "",
      objectId: objectId,
    },
    {
      id: 2,
      name: "T-Shirt",
      price: 20,
      imageSrc: "",
      size: "",
      objectId: objectId,
    },
    {
      id: 3,
      name: "Canvas",
      price: 30,
      imageSrc: "",
      size: "",
      objectId: objectId,
    },
  ]);

  //array for size options

  const relatedProducts = [
    { id: "1", name: "S" },
    { id: "2", name: "M" },
    { id: "3", name: "L" },
    { id: "4", name: "" },
    { id: "5", name: "" },
    { id: "6", name: "" },
    { id: "7", name: "" },
  ];

  const [showBoxes, setShowBoxes] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "", // email text-box
    address: "", // address text-box
  });

  const [productInfo, setProductInfo] = useState(null);

  console.log("Received objectId: ", objectId);
  useEffect(() => {
    fetch(baseEndpoint + objectId)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProductInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [objectId]);

  const addToCart = (product, selectedSize, objectId) => {
    const existingProduct = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.objectId === objectId
    );

    if (existingProduct) {
      // If the product with the same size is already in the cart, update its quantity
      const updatedCart = cart.map((item) => {
        if (
          item.id === product.id &&
          item.size === selectedSize &&
          item.objectId === objectId
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1 and the selected size
      const updatedCart = [
        ...cart,
        { ...product, quantity: 1, size: selectedSize, objectId },
      ];
      setCart(updatedCart);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeFromCart = (productId, size, objectId) => {
    const existingProduct = cart.find(
      (product) =>
        product.id === productId &&
        product.size === size &&
        product.objectId === objectId
    );

    if (existingProduct) {
      let updatedCart;

      // If there's only one item, remove it from the cart

      if (existingProduct.quantity === 1) {
        updatedCart = cart.filter(
          (product) =>
            !(
              product.id === productId &&
              product.size === size &&
              product.objectId === objectId
            )
        );
        // If there's more than one item, decrease the quantity by 1
      } else {
        updatedCart = cart.map((product) => {
          if (
            product.id === productId &&
            product.size === size &&
            product.objectId === objectId
          ) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    // Retrieve the shopping cart from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      // Parse the JSON string back into an array
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  // Function for sending an automated email
  const sendEmail = () => {
    const params = {
      user_email: inputValues.email,
      address: inputValues.address,
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
        <h3 align="left">Select a Product</h3>
        <br></br>
        <ul>
          {products.map((product, index) => (
            <li key={product.id} className="product-item">
              <div className="product-item-details">
                <div className="product-info">
                  <div className="product-item-name">
                    {product.name}
                    <form className="form">
                      <select
                        className="size-form"
                        value={product.size}
                        onChange={(e) => {
                          const selectedSize = e.target.value;
                          // Create a copy of the products array
                          const updatedProducts = [...products];
                          // Update the size property of the selected product
                          updatedProducts[index].size = selectedSize;
                          // Update the state with the new product array
                          setProducts(updatedProducts);
                        }}
                      >
                        <option value="">Size</option>
                        {relatedProducts.map((relatedProduct) => (
                          <option
                            key={relatedProduct.id}
                            value={relatedProduct.name}
                          >
                            {relatedProduct.name}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>
                  <div className="product-price">${product.price}</div>
                </div>
              </div>
              <button
                className="add-more-button"
                onClick={() => addToCart(product, product.size)}
              >
                Add To Cart
              </button>
            </li>
          ))}
        </ul>
        <h3>Your Cart</h3>
        <br></br>
        <ul className="your-cart-items">
          {cart.map((product) => (
            <li key={product.id} className="cart-item">
              <div className="cart-item-details">
                <div className="cart-item-name">{objectId}</div>
                <div className="cart-item-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
              </div>
              <div className="yourcartimage">
                {productInfo && (
                  <div
                    className="product-image"
                    style={{
                      backgroundImage: `url(${productInfo.primaryImageSmall})`,
                    }}
                  ></div>
                )}
                <div className="cart-item-quantity-box">
                  <div className="cart-item-quantity">
                    Qty: {product.quantity}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id, product.size)}
                    className="remove-button"
                  >
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="total">Total: ${calculateTotal()}</p>
        <br></br>
        <button onClick={toggleShowBoxes} className="proceed-checkout">
          Proceed to Checkout
        </button>
        {showBoxes && (
          <div>
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
              className="address-box"
            />
            <button onClick={sendEmail} className="checkout">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCartPopup;
