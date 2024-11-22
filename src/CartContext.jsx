import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex === -1) {
        return [...prevItems, { ...product, quantity }];
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity;
        return updatedItems;
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
