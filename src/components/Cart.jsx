import React, { useEffect, useRef } from 'react';
import { useCart } from '../CartContext';
import { IoClose } from 'react-icons/io5'; // Import the close icon

export default function Cart() {
  const { cartItems, removeFromCart, isCartOpen, toggleCart } = useCart();
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null); // Reference for the cart button

  // Log to debug if the cart is opening/closing
  useEffect(() => {
    console.log("Cart is open:", isCartOpen);
  }, [isCartOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        toggleCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
        ref={cartButtonRef}
        onClick={toggleCart} // Removed e.stopPropagation() here
      >
        <ShoppingBag className="h-6 w-6" />
      </button>

      {/* Cart Panel */}
      {isCartOpen && (
        <div
          ref={cartRef}
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCart();
              }}
              className="p-2 text-gray-500 hover:text-gray-800"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image} // Access the image property
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
              <span className="font-semibold text-xl">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
