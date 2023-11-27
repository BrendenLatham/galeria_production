import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (item) => {
    console.log("item", item);
    const isItemInCart = cartItems.find((i) => i.id === item.id);
    if (isItemInCart) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const showCart = () => {
    console.log("cartItems", cartItems);
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((i) => i.id === item.id);
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((i) => i.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (item, quantity) => {
    setCartItems((prev) => ({ ...prev, [item]: quantity }));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  const contextValues = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    updateQuantity,
    showCart,
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {props.children}
    </ShopContext.Provider>
  );
};
