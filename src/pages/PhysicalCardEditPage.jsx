import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; 

export default function WeddingCardEditor() {
  const [textFields, setTextFields] = useState([
    { id: 'mainText1', text: 'Aarav', x: 80, y: 120, size: 30, font: 'Arial' },
    { id: 'mainText2', text: 'Rohini', x: 220, y: 120, size: 30, font: 'Arial' },
    { id: 'subText1', text: 'July 13, 2022 ', x: 140, y: 190, size: 20, font: 'Arial' },
    { id: 'subText2', text: '12 : 30 AM ', x: 150, y: 250, size: 20, font: 'Arial' },
  ]);

  const [selectedField, setSelectedField] = useState(null); // Track selected field
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [newText, setNewText] = useState(''); // New text for update
  const [isSizeChangerVisible, setIsSizeChangerVisible] = useState(false); // Show/hide size changer
  const [sizeValue, setSizeValue] = useState(30); // Track size value for the range input
  const [dragging, setDragging] = useState(false); // Dragging state
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for dragging
  const [newTextInput, setNewTextInput] = useState(''); // Text input for new text

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
      setIsSizeChangerVisible(true); // Show the size changer
    }
  };

  // Update text after clicking 'Update'
  const handleUpdate = () => {
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedField ? { ...field, text: newText, size: sizeValue } : field
      )
    );
    setIsModalOpen(false); // Close the modal after update
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

  return (
    <div
      className="container mx-auto py-12 justify-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Page Navigation */}
      <div className="w-full mb-6 flex justify-center gap-4">
        {['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'].map((pageName, index) => (
          <button key={index} className="text-xl font-semibold">{pageName}</button>
        ))}
      </div>

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
                fontSize: `${size}px`,  // Make sure fontSize is in 'px'
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

        {/* Buttons (Edit, Size, New Text, Next) */}
        <div className="flex gap-4 justify-center items-center mb-4">
          <button
            onClick={() => setIsModalOpen(true)} // Open modal when Edit is clicked
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!selectedField} // Disable if no text field is selected
          >
            Edit
          </button>
          <button
            onClick={() => setIsSizeChangerVisible(!isSizeChangerVisible)} // Toggle size changer visibility
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!selectedField} // Disable if no text field is selected
          >
            Size
          </button>
          <button
            onClick={handleAddNewText} // Add new text
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            New Text
          </button>
          <button
            onClick={() => alert('Next page')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Next
          </button>
        </div>

        {/* Size Changer */}
        {isSizeChangerVisible && selectedField && (
          <div className="mb-4">
            <label htmlFor="text-size" className="block text-sm font-medium text-amber-700 mb-2">
              Resize Text
            </label>
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

        {/* Modal for Editing Text */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl mb-4">Edit Text</h2>
              <div className="mb-4">
                <strong>Preview:</strong>
                <div style={{ fontSize: '16px', fontFamily: 'Arial' }}>{newText}</div>
              </div>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
