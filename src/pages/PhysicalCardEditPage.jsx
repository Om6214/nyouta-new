import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function WeddingCardEditor() {
  const [textFields, setTextFields] = useState([
    { id: 'mainText1', text: 'Aarav', x: 80, y: 120, size: 30, font: 'Blade Rush' },
    { id: 'mainText2', text: 'Rohini', x: 220, y: 120, size: 30, font: 'Blade Rush' },
    { id: 'subText1', text: 'July 13, 2022 ', x: 140, y: 190, size: 20, font: 'Blade Rush' },
    { id: 'subText2', text: '12 : 30 AM ', x: 150, y: 250, size: 20, font: 'Blade Rush' },
  ]);

  const [selectedField, setSelectedField] = useState(null); // Track selected field
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [newText, setNewText] = useState(''); // New text for update
  const [isSizeChangerVisible, setIsSizeChangerVisible] = useState(false); // Show/hide size changer
  const [sizeValue, setSizeValue] = useState(30); // Track size value for the range input
  const [dragging, setDragging] = useState(false); // Dragging state
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for dragging
  const [newTextInput, setNewTextInput] = useState(''); // Text input for new text
  const [isFontModalOpen, setIsFontModalOpen] = useState(false); // Font modal visibility state
  const [selectedFont, setSelectedFont] = useState('Blade Rush'); // Track the selected font
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Error message visibility state

  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {};

  // Handle text field selection
  const handleSelectTextField = (id) => {
    const field = textFields.find((field) => field.id === id);
    if (field) {
      setSelectedField(id); // Set the selected field
      setNewText(field.text); // Set the current text to modal input
      setSizeValue(field.size); // Set the size value for the range input
      setSelectedFont(field.font); // Set the selected font for the text field
      setShowErrorMessage(false); // Hide error message if text is selected
    }
  };

  // Update text after clicking 'Update'
  const handleUpdate = () => {
    if (selectedField) {
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === selectedField ? { ...field, text: newText, size: sizeValue, font: selectedFont } : field
        )
      );
      setIsModalOpen(false); // Close the modal after update
    } else {
      setShowErrorMessage(true); // Show error message if no text is selected
    }
  };

  // Handle the size change via the range input
  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10); // Ensure the size is an integer
    setSizeValue(newSize);

    // Update the text field size for the selected field
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedField ? { ...field, size: newSize } : field
      )
    );
  };

  // Handle mouse down to initiate dragging
  const handleMouseDown = (id, e) => {
    e.preventDefault();
    const field = textFields.find((field) => field.id === id);
    setSelectedField(id);
    setDragging(true);
    setOffset({ x: e.clientX - field.x, y: e.clientY - field.y });
  };

  // Handle mouse move to drag text
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

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Function to handle adding new text to the image
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
    setNewTextInput(''); // Clear the input field after adding
  };

  // Function to remove the text field
  const handleRemoveTextField = (id) => {
    setTextFields((prevFields) => prevFields.filter((field) => field.id !== id));
    setSelectedField(null); // Deselect after deletion
  };

  // Function to handle font change
  const handleFontSelect = (font) => {
    if (selectedField) {
      setSelectedFont(font);
      setIsFontModalOpen(false); // Close font selection modal
      // Update the font for the selected text field
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === selectedField ? { ...field, font: font } : field
        )
      );
    } else {
      setShowErrorMessage(true); // Show error message if no text is selected
    }
  };

 return (
  <div
    className="container mx-auto py-12 flex justify-center"
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
  >
    {/* Page Navigation */}
    {/* Main Content Area */}
    <div className="flex flex-col items-center w-full">
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
              fontSize: `${size}px`, // Ensure fontSize is in 'px'
              fontFamily: font,
              transform: 'translate(-50%, -50%)',
              cursor: 'move',
              zIndex: selectedField === id ? 10 : 1,
            }}
            onMouseDown={(e) => handleMouseDown(id, e)}
            onClick={() => handleSelectTextField(id)} // Set text as selected on click
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

      {/* Error Message */}
      {showErrorMessage && (
        <div className="text-red-500 mb-4 absolute top-56 right-96">
          Please select a text field first!
        </div>
      )}

      {isSizeChangerVisible && selectedField && (
        <div className="mb-4 absolute top-56 right-80">
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
      <div className="absolute top-6 right-80 flex gap-4 z-10 mt-36">
        <button
          onClick={() => {
            if (selectedField) {
              setIsModalOpen(true); // Open modal when Edit is clicked
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
              setIsSizeChangerVisible(!isSizeChangerVisible); // Toggle size changer visibility
            } else {
              setShowErrorMessage(true); // Show error if no field is selected
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
              setIsFontModalOpen(true); // Open font modal
            } else {
              setShowErrorMessage(true); // Show error if no field is selected
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
        <div className=" bg-gray-500 bg-opacity-50 flex justify-center items-center z-50  absolute top-64 right-56      ">
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
        <div className=" bg-gray-500 bg-opacity-50 flex justify-center items-center z-50  absolute top-64 right-56">
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
              className="px-6 py-1 rounded border border-green-400 text-green-600 hover:bg-green-100 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

}
