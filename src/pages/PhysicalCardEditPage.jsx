import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import Cart Context
import productsData from '../products.json'; // Import product data

export default function PhysicalCardEditPage() {
  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {}; // Get the original image URL passed through state

  const product = productsData.find((p) => p.id === id); // Find product by ID
  const { addToCart } = useCart(); // Access the addToCart function from CartContext

  const canvasRef = useRef(null); // Reference for the HTML5 canvas element

  const [groomName, setGroomName] = useState('Vikram');
  const [brideName, setBrideName] = useState('Aditi');
  const [date, setDate] = useState('2025-12-25');
  const [time, setTime] = useState('10:30');
  const [font, setFont] = useState('Dancing Script');
  const [color, setColor] = useState('#000000');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); // State for modal visibility

  const [textPosition, setTextPosition] = useState({
    groomName: { x: 350, y: 150 },
    brideName: { x: 350, y: 200 },
    date: { x: 350, y: 250 },
    time: { x: 350, y: 300 },
  });

  const [textSize, setTextSize] = useState(30); // Default font size
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingText, setDraggingText] = useState(null);

  const handleGroomNameChange = (event) => setGroomName(event.target.value);
  const handleBrideNameChange = (event) => setBrideName(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleTimeChange = (event) => setTime(event.target.value);
  const handleFontChange = (event) => setFont(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      customizationType: 'Physical Card',
      groomName,
      brideName,
      date,
      time,
      font,
      color,
    };
    addToCart(customizedProduct, 1);
    console.log(`Added ${customizedProduct.name} to cart`);
  };

  useEffect(() => {
    if (groomName && brideName && date && time && font && color) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [groomName, brideName, date, time, font, color]);

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
      ctx.font = `${textSize}px ${font}`;
      ctx.fillStyle = color;

      ctx.fillText(groomName, textPosition.groomName.x, textPosition.groomName.y);
      ctx.fillText(brideName, textPosition.brideName.x, textPosition.brideName.y);
      ctx.fillText(date, textPosition.date.x, textPosition.date.y);
      ctx.fillText(time, textPosition.time.x, textPosition.time.y);
    };

    img.onerror = (err) => {
      console.error('Error loading image:', err);
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [groomName, brideName, date, time, font, color, textPosition, textSize, imageUrl]);

  const handleMouseDown = (e, textType) => {
    const canvas = canvasRef.current;
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    // Check if the mouse is over the specific text
    const textPositionCheck = textPosition[textType];
    const width = 200; // Approximate width of text, can be adjusted based on font/size
    const height = textSize; // Approximate height of the text

    if (
      mouseX > textPositionCheck.x &&
      mouseX < textPositionCheck.x + width &&
      mouseY > textPositionCheck.y - height &&
      mouseY < textPositionCheck.y + height
    ) {
      setIsDragging(true);
      setDraggingText(textType);
      setDragStart({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    const dx = mouseX - dragStart.x;
    const dy = mouseY - dragStart.y;

    setTextPosition((prev) => ({
      ...prev,
      [draggingText]: {
        x: prev[draggingText].x + dx,
        y: prev[draggingText].y + dy,
      }
    }));

    setDragStart({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingText(null);
  };

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
    <div className="edit-image-page max-w-7xl mx-auto py-12 px-6 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
        Customize Your {product.name}
      </h1>

      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          <div className="w-full lg:w-3/3 flex justify-center items-center rounded-lg">
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-lg"
              width={800}
              height={600}
              onMouseDown={(e) => handleMouseDown(e, 'groomName')}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseUp} // Ensure dragging stops if the mouse leaves the canvas
            ></canvas>
          </div>

          <div className="w-full lg:w-2/3 bg-white shadow-xl rounded-xl p-8 border border-gray-300 mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Personalize Your Card</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Groom's Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Groom's Name:</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={handleGroomNameChange}
                  className="w-full border-2 px-4 py-3 rounded-lg"
                  placeholder="Enter Groom's Name"
                />
              </div>
              {/* Bride's Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Bride's Name:</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={handleBrideNameChange}
                  className="w-full border-2 px-4 py-3 rounded-lg"
                  placeholder="Enter Bride's Name"
                />
              </div>
              {/* Wedding Date */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Wedding Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  className="w-full border-2 px-4 py-3 rounded-lg"
                />
              </div>
              {/* Wedding Time */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Wedding Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  className="w-full border-2 px-4 py-3 rounded-lg"
                />
              </div>
              {/* Select Font */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Select Font:</label>
                <select
                  value={font}
                  onChange={handleFontChange}
                  className="w-full border-2 px-4 py-3 rounded-lg"
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Lobster">Lobster</option>
                  <option value="Dancing Script">Dancing Script</option>
                  <option value="Great Vibes">Great Vibes</option>
                  <option value="Sacramento">Sacramento</option>
                  <option value="Pacifico">Pacifico</option>
                  <option value="Andallan">Andallan</option>
                  <option value="Angelina">Angelina</option>
                  <option value="Bebas Neue">Bebas Neue</option>
                  <option value="Blade Rush">Blade Rush</option>
                  <option value="Cinzel">Cinzel</option>
                  <option value="Garden Hidaleya">Garden Hidaleya</option>
                  <option value="Justin Hailey">Justin Hailey</option>
                  <option value="Lovely Valentine">Lovely Valentine</option>
                  <option value="Magdelin">Magdelin</option>
                  <option value="Mussica Swash">Mussica Swash</option>
                  <option value="New Walt Disney">New Walt Disney</option>
                  <option value="Nexa Bold">Nexa Bold</option>
                  <option value="Quicksand">Quicksand</option>
                  <option value="Rhinatta">Rhinatta</option>
                  <option value="Shattime">Shattime</option>
                  <option value="Vivaldi">Vivaldi</option>
                  <option value="Wedding">Wedding</option>
                </select>
              </div>
              {/* Select Text Color */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Select Text Color:</label>
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="w-full h-12 cursor-pointer rounded-lg border-2"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-8 flex flex-col lg:flex-row gap-4">
              <button
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
              >
                Add to Cart
              </button>
              <button
                onClick={handlePreview}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
              >
                Preview
              </button>
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

