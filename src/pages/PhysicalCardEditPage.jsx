import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function WeddingCardEditor() {
  const [textFields, setTextFields] = useState([
    { id: 'mainText1', text: 'Aarav', x: 80, y: 120, size: 30, font: 'Blade Rush' },
    { id: 'mainText2', text: 'Rohini', x: 220, y: 120, size: 30, font: 'Blade Rush' },
    { id: 'subText1', text: 'July 13, 2022 ', x: 140, y: 190, size: 20, font: 'Blade Rush' },
    { id: 'subText2', text: '12 : 30 AM ', x: 150, y: 250, size: 20, font: 'Blade Rush' },
  ]);

  const [selectedField, setSelectedField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [isSizeChangerVisible, setIsSizeChangerVisible] = useState(false);
  const [sizeValue, setSizeValue] = useState(30);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [newTextInput, setNewTextInput] = useState('');
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Blade Rush');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const location = useLocation();
  const { id } = useParams();
  const { images } = location.state || {}; // Array of images passed from previous page

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setImageUrl(images[0]); // Set default image from the first element
    }
  }, [images]);

  const handleSelectTextField = (id) => {
    const field = textFields.find((field) => field.id === id);
    if (field) {
      setSelectedField(id);
      setNewText(field.text);
      setSizeValue(field.size);
      setSelectedFont(field.font);
      setShowErrorMessage(false);
    }
  };

  const handleUpdate = () => {
    if (selectedField) {
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === selectedField ? { ...field, text: newText, size: sizeValue, font: selectedFont } : field
        )
      );
      setIsModalOpen(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSizeValue(newSize);

    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedField ? { ...field, size: newSize } : field
      )
    );
  };

  const handleMouseDown = (id, e) => {
    e.preventDefault();
    const field = textFields.find((field) => field.id === id);
    setSelectedField(id);
    setDragging(true);
    setOffset({ x: e.clientX - field.x, y: e.clientY - field.y });
  };

  const handleMouseMove = (e) => {
    if (dragging && selectedField) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === selectedField ? { ...field, x: newX, y: newY } : field
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleAddNewText = () => {
    const newId = `newText${Date.now()}`;
    const newField = {
      id: newId,
      text: newTextInput || 'Enter text',
      x: 100,
      y: 100,
      size: 30,
      font: 'Arial',
    };
    setTextFields((prevFields) => [...prevFields, newField]);
    setNewTextInput('');
  };

  const handleRemoveTextField = (id) => {
    setTextFields((prevFields) => prevFields.filter((field) => field.id !== id));
    setSelectedField(null);
  };

  const handleFontSelect = (font) => {
    if (selectedField) {
      setSelectedFont(font);
      setIsFontModalOpen(false);
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === selectedField ? { ...field, font: font } : field
        )
      );
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setImageUrl(images[index]);
  };

  return (
    <div className="container mx-auto py-12 flex flex-col items-center">
  {/* Heading and Horizontal Line */}
  <div className="w-full text-center mb-1 flex justify-between items-center">
    <div className="flex-1 text-center ml-96">
      <h1 className="text-3xl font-bold">Editing Screen</h1>
    </div>

    {/* Download PDF Button (Top Right Corner) */}
    <button className="px-4 py-2 rounded bg-black text-white hover:bg-black">
      Download PDF
    </button>
  </div>

  <hr className="my-4 border-t-2 border-gray-300 w-full" />

  {/* Horizontal Lines on the Left and Right */}
  <div className="flex w-full relative">
    {/* Vertical Line on Left */}
    <div className="absolute top-0 bottom-0 left-60 border-l-2 border-gray-300"></div>

    {/* Left Sidebar for Vertical Images with Scrolling */}
    <div className="w-48 flex flex-col gap-4 p-4 h-screen overflow-y-auto w-64">
  <h2 className="font-bold mb-4 text-3xl">All Pages</h2>
  {images &&
    images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index + 1}`}
        className="w-full object-contain cursor-pointer"
        onClick={() => handleThumbnailClick(index)} // Click to change image
      />
    ))}
</div>


    {/* Main Content Area */}
    <div className="flex flex-col items-center w-full relative" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Editable Image Area */}
      <div className="relative w-80 h-112 mb-6">
        <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
        {/* Editable Text Fields */}
        {textFields.map(({ id, text, x, y, size, font }) => (
          <div
            key={id}
            className={`absolute ${selectedField === id ? 'border-2 border-blue-500' : ''}`}
            style={{
              top: y,
              left: x,
              fontSize: `${size}px`,
              fontFamily: font,
              transform: 'translate(-50%, -50%)',
              cursor: 'move',
              zIndex: selectedField === id ? 10 : 1,
            }}
            onMouseDown={(e) => handleMouseDown(id, e)}
            onClick={() => handleSelectTextField(id)}
          >
            {text}
            {/* Show Delete Icon only if text field is selected */}
            {selectedField === id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTextField(id); // Remove text field
                }}
                className="absolute top-0 right-0 text-red-500 bg-transparent border-none cursor-pointer"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>
        ))}
        
      </div>
      <div className="relative  transform -translate-x-1/2 ml-56 ">
    <button
      //onClick={handleSaveChanges} // Replace with your save logic
      className="px-16 py-2 bg-black text-white rounded hover:bg-blue-600"
    >
      Save Changes
    </button>
  </div>

      

      {/* Error Message */}
      {showErrorMessage && (
        <div className="text-red-500 mb-4 absolute top-40 right-40">
          Please select a text field first!
        </div>
      )}

      {isSizeChangerVisible && selectedField && (
        <div className="mb-4 absolute top-28 right-40">
          <input
            type="range"
            id="text-size"
            className="w-64"
            min="10"
            max="100"
            value={sizeValue}
            onChange={handleSizeChange}
          />
          <div className="text-sm text-gray-600 mt-2">Text Size: {sizeValue}</div>
        </div>
      )}

      {/* Buttons (Edit, Size, New Text, Next, Font) */}
      <div className="absolute top-10 right-40 flex gap-4 z-10">
        <button
          onClick={() => {
            if (selectedField) {
              setIsModalOpen(true);
              const selectedFieldData = textFields.find((field) => field.id === selectedField);
              if (selectedFieldData) {
                setNewText(selectedFieldData.text); // Set the selected field's text to the modal
              }
            } else {
              setShowErrorMessage(true); // Show error if no field is selected
            }
          }}
          className="px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (selectedField) {
              setIsSizeChangerVisible(!isSizeChangerVisible);
            } else {
              setShowErrorMessage(true);
            }
          }}
          className="px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
        >
          Size
        </button>
        <button
          onClick={handleAddNewText} // Add new text
          className="px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
        >
          New
        </button>
        <button
          onClick={() => {
            if (selectedField) {
              setIsFontModalOpen(true);
            } else {
              setShowErrorMessage(true);
            }
          }}
          className="px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
        >
          Font
        </button>
      </div>

      {/* Modals and Error Messages below Buttons */}
      {/* Modal for Editing Text */}
      {isModalOpen && selectedField && (
        <div className="bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 absolute top-20 right-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Edit Text</h2>
            <div>
              <label htmlFor="text">Text</label>
              <input
                type="text"
                id="text"
                className="w-full p-2 border rounded mb-4"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </div>
            <button
              onClick={handleUpdate}
              className="px-6 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100 mr-32"
            >
              Update
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-1 rounded border border-green-400 text-green-600 hover:bg-green-100 "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Font Modal for selecting a font */}
      {isFontModalOpen && (
        <div className="bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 absolute top-20 right-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Choose Font</h2>
            <div>
              {['Arial', 'Blade Rush', 'Comic Sans MS', 'Courier New'].map((font) => (
                <button
                  key={font}
                  onClick={() => handleFontSelect(font)}
                  className="block w-full text-left px-4 py-2 border-b hover:bg-gray-200"
                >
                  {font}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsFontModalOpen(false)}
              className="px-6 py-1 rounded border border-green-400 text-green-600 hover:bg-green-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
}
