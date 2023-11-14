import { useRouter } from "next/router";
import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ childred }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter();

  return (
    <CartContext.Provider
      value={{
        cart,
      }}
    ></CartContext.Provider>
  );
};
