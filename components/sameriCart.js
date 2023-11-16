import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddTocart = (newItem) => {
    var cartCopy = [...cartItems];

    const alreadyExistedItem = cartCopy.find(
      (checkItem) => checkItem._id === newItem._id
    );

    if (alreadyExistedItem) {
      cartCopy = cartCopy.map((checkItem) =>
        checkItem._id === newItem._id
          ? {
              ...checkItem,
              quantity: checkItem.quantity + 1,

              totalPrice: (checkItem.quantity + 1) * checkItem.price,
            }
          : checkItem
      );
    } else {
      cartCopy.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartCopy));

    setCartItems(cartCopy);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const decreaseItemQuantity = (ItemToRemove) => {
    var copyItem = [...cartItems];

    const IsItemCheckInCart = cartItems.find(
      (cartItem) => cartItem._id === ItemToRemove._id
    );

    if (IsItemCheckInCart.quantity === 1) {
      copyItem = cartItems.filter(
        (cartItem) => cartItem._id !== ItemToRemove._id
      );
    } else {
      copyItem = cartItems.map((cartItem) =>
        cartItem._id === ItemToRemove._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: cartItem.totalPrice - cartItem.price,
            }
          : cartItem
      );
    }

    localStorage.setItem("cartItems", JSON.stringify(copyItem));

    setCartItems(copyItem);
  };

  const removeItemFromCart = () => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
  };

  const clearCart = () => {
    var copyCart = [];

    localStorage.setItem("cartItems", JSON.stringify(copyCart));

    setCartItems(copyCart);
  };

  const RemoveSpecificItemFromCart = (_id) => {
    const itemIndex = cartItems.findIndex((item) => item._id === _id);

    if (itemIndex !== -1) {
      const updatedCart = [
        ...cartItems.slice(0, itemIndex),
        ...cartItems.slice(itemIndex + 1),
      ];

      setCartItems(updatedCart);

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddTocart,
        decreaseItemQuantity,
        clearCart,
        removeItemFromCart,
        RemoveSpecificItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};