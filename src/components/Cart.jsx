import React, { useEffect, useRef } from "react";
import { useCart } from "../CartContext";
import { IoClose } from "react-icons/io5"; // Import the close icon

export default function Cart() {
  const { cartItems, removeFromCart, isCartOpen, toggleCart } = useCart();
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null); // Reference for the cart button

  // Log the state to check if the cart is open
  console.log("Cart is open:", isCartOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close cart if clicking outside the cart and cart button
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        toggleCart(); // Close the cart
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Cart Button */}
      <button
        ref={cartButtonRef} // Reference for the cart button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the outside click logic
          toggleCart(); // Toggle cart open/close
        }}
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-md z-50"
      >
        Cart
      </button>

      {/* Cart Panel */}
      {isCartOpen && (
        <div
          ref={cartRef} // Reference for the cart container
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            {/* Adding a background to ensure visibility */}
            <h2 className="text-xl font-bold text-black">Your Cart</h2>
            {/* Close Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the outside click logic
                toggleCart(); // Close the cart
              }}
              className="p-2 text-gray-500 hover:text-gray-800"
            >
              <IoClose size={24} /> {/* Close icon */}
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image[0]} // Assuming product image is an array, pick the first one
                      alt={item.name}
                      className="w-16 h-16 rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
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
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* Cart Total */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-xl">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
