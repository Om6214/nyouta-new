import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import productsData from '../products.json';
import { useSelector } from 'react-redux';
import { getProducts } from '../Store/slices/productSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
export default function PhysicalCardEditPage() {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const location = useLocation();
  const { id } = useParams();
  const { imageUrl } = location.state || {};

  const product = products?.find((p) => p?._id === id);

  const [paymentDone, setPaymentDone] = useState(false);
  const [groomName, setGroomName] = useState('Vikram');
  const [brideName, setBrideName] = useState('Aditi');
  const [date, setDate] = useState('2025-12-25');
  const [time, setTime] = useState('10:30');
  const [font, setFont] = useState('Pacifico');
  const [color, setColor] = useState('#ad101f');
  const [textSize] = useState(30);
  const [textPosition, setTextPosition] = useState({
    groomName: { x: 280, y: 160 },
    brideName: { x: 440, y: 160 },
    date: { x: 320, y: 220 },
    time: { x: 350, y: 280 },
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingText, setDraggingText] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const canvasRef = useRef(null);

  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = imageUrl;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.min(scaleX, scaleY);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      Object.keys(textPosition).forEach((key) => {
        const { x, y } = textPosition[key];
        ctx.font = `${textSize}px ${font}`;
        ctx.fillStyle = color;
        ctx.fillText(eval(key), x, y);
      });
    };
  };

  useEffect(() => {
    document.fonts.load(`10px ${font}`).then(drawCanvas);
  }, [imageUrl, groomName, brideName, date, time, font, color, textPosition]);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Object.keys(textPosition).forEach((key) => {
      const { x, y } = textPosition[key];
      const textWidth = ctx.measureText(eval(key)).width;
      const textHeight = textSize;

      if (
        offsetX >= x &&
        offsetX <= x + textWidth &&
        offsetY >= y - textHeight &&
        offsetY <= y
      ) {
        setIsDragging(true);
        setDragStart({ x: offsetX, y: offsetY });
        setDraggingText(key);
      }
    });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !draggingText) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const dx = offsetX - dragStart.x;
    const dy = offsetY - dragStart.y;

    setTextPosition((prev) => ({
      ...prev,
      [draggingText]: {
        x: prev[draggingText].x + dx,
        y: prev[draggingText].y + dy,
      },
    }));

    setDragStart({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingText(null);
  };

  const handlePreview = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png'); // Generate the image
      setPreviewImage(image); // Save the image to state
      setIsPreviewModalOpen(true); // Open the modal
    } else {
      console.error("Canvas not found!");
    }
  };

  const handlePayment = () => {
    setTimeout(() => {
      alert('Payment successful!');
      setPaymentDone(true);
    }, 1000);
  };

  const handleShareCard = () => {
    alert('Card sharing functionality coming soon!');
  };

  const PreviewModal = ({ isOpen, onClose, image }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray- 600 text-4xl"
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
  return (
    <div className="edit-image-page max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Customize Your {product.name}</h1>
  
      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          <div
            className="w-full lg:w-2/3 flex justify-center items-center rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
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
            </div>
  
            {/* Buttons */}
            <div className="mt-8 flex flex-col lg:flex-row gap-12">
              <button
                onClick={handlePreview}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 rounded-lg py-2"
              >
                Preview
              </button>
              {!paymentDone ? (
                <button
                  onClick={handlePayment}
                  className="bg-green-500 text-white py-2 px-10 rounded-lg hover:bg-green-600 w-auto"
                >
                  Pay Now
                </button>
              ) : (
                <button
                  onClick={handleShareCard}
                  className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600"
                >
                  Share Card
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xl mt-12">No image available for this product</div>
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