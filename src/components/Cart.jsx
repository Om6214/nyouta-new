import React, { useEffect, useRef } from 'react';
import { useCart } from '../CartContext';
import { IoClose } from 'react-icons/io5';
import { ShoppingBag } from 'lucide-react'; // Ensure this import

export default function Cart() {
  const { cartItems, removeFromCart, isCartOpen, toggleCart } = useCart();
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);

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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  

  return (
    <div>
     

      {isCartOpen && (
  <div
    ref={cartRef} // Reference to detect clicks outside the cart
    className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-all duration-300 ease-in-out z-50 ${
      isCartOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    {/* Cart header */}
    <div className="flex justify-between items-center p-4 border-b bg-gray-100">
      <h2 className="text-xl font-bold">Your Cart</h2>
      <button
        onClick={toggleCart} // Close cart button
        className="p-2 text-gray-500 hover:text-gray-800"
      >
        <IoClose size={24} />
      </button>
    </div>

    {/* Cart items list */}
    <div className="flex-1 overflow-y-auto p-4">
      {cartItems.length > 0 ? (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <img
                src={item.image[0]} // Assuming item.image is an array of images
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
                onClick={() => removeFromCart(item.id)} // Remove item from cart
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

    {/* Cart total */}
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
