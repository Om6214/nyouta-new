import React from "react";
import { useCart } from "../CartContext"; // Assuming you have the CartContext set up

export default function CartSidebar() {
  const { cartItems, removeFromCart, isCartOpen, toggleCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={toggleCart}
        className="p-4 text-gray-500 hover:text-gray-800"
      >
        Close
      </button>

      {/* Cart Header */}
      <h2 className="text-xl font-bold p-4 border-b">Your Cart</h2>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <ul className="p-4 space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center">
              <img
                src={item.image[0]} // Assuming item.image is an array of images
                alt={item.name}
                className="w-16 h-16 rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4 text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
