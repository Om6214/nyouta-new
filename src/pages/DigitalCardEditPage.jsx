import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import productsData from '../products.json'; // Assuming you have this data file with a list of products

export default function DigitalCardEditPage() {
  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {}; // Get the image URL passed through state

  // Find the product by its ID from the products data
  const product = productsData.find((p) => p.id === id);

  const [text, setText] = useState(''); // Text to overlay
  const [font, setFont] = useState('Arial'); // Font for the text
  const [color, setColor] = useState('#000000'); // Text color
  const [paymentCompleted, setPaymentCompleted] = useState(false); // State to track payment status
  const [showPaymentForm, setShowPaymentForm] = useState(false); // To toggle payment form visibility
  const [isApplyChangesEnabled, setIsApplyChangesEnabled] = useState(false); // To track if apply changes button is enabled
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false); // To track if pay now button is enabled

  // Enable Apply Changes button if text, font, and color are selected
  useEffect(() => {
    if (text && font && color) {
      setIsApplyChangesEnabled(true); // Enable Apply Changes button
    } else {
      setIsApplyChangesEnabled(false); // Disable Apply Changes button
    }
  }, [text, font, color]);

  // Handle the text change in the form
  const handleTextChange = (event) => {
    setText(event.target.value); // Update text state
  };

  // Handle font change in the form
  const handleFontChange = (event) => {
    setFont(event.target.value); // Update font state
  };

  // Handle color change for text
  const handleColorChange = (event) => {
    setColor(event.target.value); // Update text color state
  };

  // Handle Apply Changes button click
  const handleApplyChanges = () => {
    if (text && font && color) {
      setIsPayNowEnabled(true); // Enable Pay Now button after applying changes
    }
  };

  // Simulate showing the payment form when the user clicks "Pay Now"
  const handlePayment = () => {
    setShowPaymentForm(true); // Show the payment form
  };

  // Handle payment form submission
  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Simulate payment processing (replace with actual payment logic)
    setTimeout(() => {
      alert('Payment Successful!');
      setPaymentCompleted(true); // Set payment as completed
      setShowPaymentForm(false); // Hide payment form after successful payment
    }, 2000); // Simulate payment delay
  };

  // Handle image download
  const handleDownload = () => {
    alert('Download functionality is currently not implemented.');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="edit-image-page max-w-7xl mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Edit Your Digital Card for Product {product.name}</h1>
      
      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          
          {/* Image Display */}
          <div className="w-full lg:w-2/3 bg-white p-4 shadow-xl rounded-lg flex justify-center">
            <img 
              src={imageUrl} 
              alt="Product" 
              className="w-full max-w-[500px] h-auto rounded-lg shadow-md border border-gray-300"
            />
          </div>

          {/* Form for Editing Text */}
          <div className="w-full lg:w-1/3 bg-white p-6 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customize Your Card</h2>
            
            {/* Text Input */}
            <label className="text-lg font-medium text-gray-700 mb-2">Text to Add:</label>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Font Selection */}
            <label className="text-lg font-medium text-gray-700 mb-2">Select Font:</label>
            <select
              value={font}
              onChange={handleFontChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Courier New">Courier New</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>

            {/* Text Color Picker */}
            <label className="text-lg font-medium text-gray-700 mb-2">Select Text Color:</label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full border p-3 mb-4 rounded-lg"
            />

            {/* Apply Changes Button */}
            <button
              onClick={handleApplyChanges}
              disabled={!isApplyChangesEnabled}
              className={`w-full px-6 py-3 ${isApplyChangesEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-semibold rounded-lg mb-4 transition duration-300`}
            >
              Apply Changes
            </button>

            {/* Payment / Download Button */}
            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                disabled={!isPayNowEnabled}
                className={`w-full px-6 py-3 ${isPayNowEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-semibold rounded-lg transition duration-300`}
              >
                Pay Now
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Download Image Card
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No image selected.</p>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && !paymentCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
              <label className="block mb-2 text-gray-700">Name:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-gray-700">Card Number:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-gray-700">Expiration Date:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-gray-700">CVV:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              >
                Submit Payment
              </button>
            </form>
            <button
              onClick={() => setShowPaymentForm(false)}
              className="mt-4 w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
