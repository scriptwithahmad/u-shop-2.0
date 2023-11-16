import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems);

  const addToCart = (newlyAddedItem) => {
    // check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem._id === newlyAddedItem._id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === newlyAddedItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // if the item is not in the cart, add the item to the cart
      setCartItems([...cartItems, { ...newlyAddedItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (existedCartItem) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem._id === existedCartItem._id
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem._id !== existedCartItem._id)
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === existedCartItem._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children};
    </CartContext.Provider>
  );
};

export default CartProvider;
