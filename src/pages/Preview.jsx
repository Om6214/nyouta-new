// Preview.js
import React from 'react';

const Preview = ({ images, textFields, currentImage, onClose }) => {
  return (
    <div className="fixed inset-0   bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="relative w-80 h-112">
          {/* Main image preview */}
          <img src={currentImage} alt="Preview" className="w-full h-full object-cover rounded" />
          
          {/* Render text fields */}
          {textFields.map(({ id, text, x, y, size, font }) => (
            <div
              key={id}
              className="absolute"
              style={{
                top: y,
                left: x,
                fontSize: `${size}px`,
                fontFamily: font,
                transform: 'translate(-50%, -50%)',
                color: 'black', // Optional: Change text color for better visibility
                //textShadow: '1px 1px 2px rgba(0, 0, 0, 0)', // Optional: Add shadow for better readability
              }}
            >
              {text}
            </div>
          ))}
          
          {/* Render small images */}
          {images.map(({ id, src, x, y }) => (
            <img
              key={id}
              src={src}
              alt={`Small Image ${id}`}
              className="absolute"
              style={{
                top: y+27,
                left: x-200,
                width: '50px', // Adjust size as needed
                height: '50px', // Adjust size as needed
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};

export default Preview;