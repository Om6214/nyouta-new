import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../CartContext';
import { IoClose } from 'react-icons/io5';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { getCart, removeFromCart, updateCartQuantity } from '../Store/slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, isCartOpen, toggleCart } = useCart();
  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.product);
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  // Fetch cart data on mount & when cart updates
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, cart?.products?.length]); // Added dependency to re-fetch when cart changes

  // Close cart when clicking outside
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

  // Calculate total price dynamically
  const totalPrice = cart?.products?.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  ) || 0;

  // Optimized Remove Function
  const handleRemove = async (item) => {
    try {
      dispatch(removeFromCart(item.productId._id));
      setTimeout(() => dispatch(getCart()), 500); // Ensure UI updates smoothly
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Handle quantity changes
  const handleQuantityChange = async (item, operation) => {
    const newQuantity = operation === 'increment' ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity === 0) {
      setProductToRemove(item);
      setShowModal(true);
    } else {
      try {
        await dispatch(updateCartQuantity({
          productId: item.productId._id,
          quantity: newQuantity,
          operation: operation === 'increment' ? 1 : 0,
        }));
        setTimeout(() => dispatch(getCart()), 500);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  // Confirm remove product
  const confirmRemoveProduct = async () => {
    await dispatch(removeFromCart(productToRemove.productId._id));
    setTimeout(() => dispatch(getCart()), 500);
    setShowModal(false);
  };

  // Cancel remove confirmation
  const cancelRemoveProduct = () => {
    setShowModal(false);
  };

  return (
    <div>
      {isCartOpen && (
        <div
          ref={cartRef}
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-all duration-300 ease-in-out z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={toggleCart} className="p-2 text-gray-500 hover:text-gray-800">
              <IoClose size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent w-8 h-8 rounded-full" />
              </div>
            ) : cart?.products?.length > 0 ? (
              <ul className="space-y-4">
                {cart?.products?.map((item) => (
                  <li key={item?.productId?._id} className="flex items-center space-x-4">
                    <img
                      src={item?.productId?.image && item?.productId?.image[0]}
                      alt={item?.productId?.name}
                      className="w-16 h-16 rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item?.productId?.name}</h3>
                      <p className="text-sm text-gray-600">₹{item?.productId?.price?.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <button onClick={() => handleQuantityChange(item, 'decrement')} className="px-2 py-1 bg-gray-200 rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item, 'increment')} className="px-2 py-1 bg-gray-200 rounded">+</button>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">Total: ₹{(item?.productId?.price * item?.quantity)?.toFixed(2)}</p>
                    </div>
                    <button onClick={() => handleRemove(item)} className="text-red-600 text-sm hover:text-black transition duration-300 ease-in">
                      <Trash2 />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-xl">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className='w-20'>
              <button
                onClick={() => toggleCart()}
                className="w-full bg-amber-600 text-white py-3 rounded-lg text font-semibold hover:bg-amber-700 transition duration-300 ease-in-out"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to remove this product?</h3>
            <div className="flex justify-between">
              <button onClick={confirmRemoveProduct} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">Yes, remove</button>
              <button onClick={cancelRemoveProduct} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
