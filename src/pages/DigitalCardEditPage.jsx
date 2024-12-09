import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import productsData from '../products.json';

export default function PhysicalCardEditPage() {
  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {}; // Get the original image URL passed through state

  const product = productsData.find((p) => p.id === id); // Find product by ID

  // State for text fields
  const [groomName, setGroomName] = useState('Vikram'); // Groom's name
  const [brideName, setBrideName] = useState('Aditi'); // Bride's name
  const [date, setDate] = useState('2025-12-25'); // Date
  const [time, setTime] = useState('10:30'); // Time
  const [font, setFont] = useState('Dancing Script'); // Font for the text
  const [color, setColor] = useState('#000000'); // Text color
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); // State for modal visibility

  const canvasRef = useRef(null); // Reference for the HTML5 canvas element

  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = imageUrl;
    img.crossOrigin = 'anonymous'; // Handle cross-origin image

    img.onload = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale and draw the background image
      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.min(scaleX, scaleY);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Draw each text customization (groom name, bride name, date, time)
      ctx.font = `${30}px ${font}`;
      ctx.fillStyle = color;

      ctx.fillText(groomName, 350, 150);
      ctx.fillText(brideName, 350, 200);
      ctx.fillText(date, 350, 250);
      ctx.fillText(time, 350, 300);
    };

    img.onerror = (err) => {
      console.error('Error loading image:', err);
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [groomName, brideName, date, time, font, color, imageUrl]);

  const handlePreview = () => {
    drawCanvas(); // Ensure the latest updates are drawn on the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the image data from the canvas
    const dataUrl = canvas.toDataURL('image/png');
    setPreviewImage(dataUrl);
    setIsPreviewModalOpen(true); // Open the modal
  };

  const PreviewModal = ({ isOpen, onClose, image }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 text-4xl"
            style={{ width: '40px', height: '40px' }} // Making the close button larger
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <img src={image} alt="Preview" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    );
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="edit-image-page max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Customize Your {product.name}</h1>

      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          <div className="w-full lg:w-2/3 flex justify-center items-center rounded-lg">
            <canvas ref={canvasRef} className="w-full h-auto rounded-lg" width={800} height={600}></canvas>
          </div>

          <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Card Details</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Groom's Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Groom's Name:</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={handleInputChange(setGroomName)}
                  className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                  placeholder="Enter Groom's Name"
                />
              </div>

              {/* Bride's Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Bride's Name:</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={handleInputChange(setBrideName)}
                  className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                  placeholder="Enter Bride's Name"
                />
              </div>

              {/* Wedding Date */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Wedding Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={handleInputChange(setDate)}
                  className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                />
              </div>

              {/* Wedding Time */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Wedding Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={handleInputChange(setTime)}
                  className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                />
              </div>

              {/* Select Font */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Select Font:</label>
                <select
                  value={font}
                  onChange={handleInputChange(setFont)}
                  className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Lobster">Lobster</option>
                  <option value="Dancing Script">Dancing Script</option>
                  <option value="Great Vibes">Great Vibes</option>
                  <option value="Sacramento">Sacramento</option>
                  <option value="Pacifico">Pacifico</option>
                </select>
              </div>

              {/* Select Text Color */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Select Text Color:</label>
                <input
                  type="color"
                  value={color}
                  onChange={handleInputChange(setColor)}
                  className="w-full h-12 cursor-pointer rounded-lg border-2"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 mt-4">
                <button
                  onClick={handlePreview}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600"
                >
                  Preview
                </button>

                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xl mt-12">
          No image available for this product
        </div>
      )}

      {/* Render the Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        image={previewImage}
      />
    </div>
  );
}
