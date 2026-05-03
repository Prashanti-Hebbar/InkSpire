import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        headers: {
          "auth-token": localStorage.getItem("UserToken"),
        },
      });

      const count =
        res.data.cart?.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        ) || 0;

      setCartCount(count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};