import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function WeddingCardEditor() {
  const [textFields, setTextFields] = useState([
    { id: 'mainText1', text: 'Aarav', x: 80, y: 140, size: 30, font: 'Blade Rush' },
    { id: 'mainText2', text: 'Rohini', x: 220, y: 140, size: 30, font: 'Blade Rush' },
    { id: 'subText1', text: 'July 13, 2022 ', x: 160, y: 190, size: 20, font: 'Blade Rush' },
    { id: 'subText2', text: '12 : 30 AM ', x: 170, y: 250, size: 20, font: 'Blade Rush' },
  ]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  
  
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const redoChange = redoStack.pop();
      setUndoStack((prevStack) => [...prevStack, { textFields }]);
      setTextFields(redoChange.textFields); // Apply redo change
    }
  };
  


  useEffect(() => {
    if (images && images.length > 0) {
      setImageUrl(images[0]); // Set default image from the first element
    }
  }, [images]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSaveChanges = () => {
    const savedPages = JSON.parse(localStorage.getItem('savedPages')) || {};

    // Save the current page changes
    savedPages[currentImageIndex] = textFields;

    // Store the updated changes in localStorage
    localStorage.setItem('savedPages', JSON.stringify(savedPages));

    // Show success message
    setShowSuccessMessage(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1000);
  };



  // Load the saved data for the current page on image change
  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem('savedPages')) || {};

    if (savedPages[currentImageIndex]) {
      setTextFields(savedPages[currentImageIndex]);
    } else {
      // Reset to default if no saved changes
      setTextFields([
        { id: 'mainText1', text: 'Aarav', x: 80, y: 140, size: 30, font: 'Blade Rush' },
        { id: 'mainText2', text: 'Rohini', x: 220, y: 140, size: 30, font: 'Blade Rush' },
        { id: 'subText1', text: 'July 13, 2022 ', x: 160, y: 190, size: 20, font: 'Blade Rush' },
        { id: 'subText2', text: '12 : 30 AM ', x: 170, y: 250, size: 20, font: 'Blade Rush' },
      ]);
    }
  }, [currentImageIndex]);


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
  
    // Save the current state to undo stack before starting the drag
    setUndoStack((prevStack) => [
      ...prevStack,
      { textFields: [...textFields] } // Save the current textFields state
    ]);
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
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastChange = undoStack.pop();
      setRedoStack((prevStack) => [...prevStack, { textFields }]);
      setTextFields(lastChange.textFields); // Restore previous state
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
      size: 25,
      font: 'Blade Rush',
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
    <div className="container mx-auto  flex flex-col items-center">
 
      <div className="w-full text-center mb-1 flex justify-between items-center">
        <div className="flex-1 text-center ml-96">
          <h1 className="text-3xl font-bold">Editing Screen</h1>
        </div>

        
        <button className="px-4 py-2 rounded bg-black text-white hover:bg-black">
          Download PDF
        </button>
      </div>

      
      
      {/* Horizontal Lines on the Left and Right */}
      <hr className="  border-gray-300 w-full" />
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
        <div
          className="flex flex-col items-center w-full relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Editable Image Area */}
          <div className="flex flex-col items-center w-full relative" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {/* Undo and Redo Buttons */}


            {/* Editable Image Area */}
            <div className="relative w-80 h-112 mb-6">
              <img src={imageUrl} alt="Background" className="w-full h-full object-cover " />
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
                  {selectedField === id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTextField(id);
                      }}
                      className="absolute top-0 right-50 text-white-500 bg-transparent border-none cursor-pointer  "
                    >
                      <FaTrash size={13} />
                    </button>
                  )}
                </div>
              ))}

              {/* Render added images */}
              
            </div>
          </div>


          {/* Save and Preview Buttons */}
          <div className="flex gap-4">
            {/* Save Changes Button */}
            <button
              onClick={handleSaveChanges}
              className="px-8 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Save Changes
            </button>

            {/* Preview Button */}
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="px-10 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Preview
            </button>
          </div>

          {/* Preview Modal */}
        {isPreviewOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-2/4 h-4/4 flex flex-col items-center overflow-y-auto ml-56">
                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                <div className="relative  w-80 h-112">
                  <img src={imageUrl} alt="Preview" className="w-auto h-auto object-cover w-80 h-112" />
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
                      }}
                    >
                      {text}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Close Preview
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {showErrorMessage && (
            <div className="absolute top-36 right-10 bg-white-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md">
              Please select a text field first!
            </div>
          )}

          {/* Size Changer */}
          {isSizeChangerVisible && selectedField && (
            <div className="mb-4 absolute top-36 right-10">
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
          <div className="absolute top-10 flex gap-4 z-10 mt-10"
            style={{ right: '30px' }}>
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
{/* Success Message 
            <button
              onClick={() => document.getElementById('add-image-input').click()}
              className="w-full px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
            >
              Add Image
            </button>
*/}

          </div>

          <div className="absolute top-5 flex gap-4 z-10"
            style={{ right: '130px' }}>
            <button
              onClick={handleUndo}
              className="px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
              disabled={undoStack.length === 0}
            >
              Undo
            </button>
            <button
              onClick={handleRedo}
              className="px-3 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100"
              disabled={redoStack.length === 0}
            >
              Redo
            </button>
          </div>
          <div>

          </div>





          {/* Success Message */}
          {showSuccessMessage && (
            <div className="absolute top-36 right-10 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow-md">
              Changes saved successfully!
            </div>
          )}

          {/* Modal for Editing Text */}
          {isModalOpen && selectedField && (
            <div className="bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 absolute top-20 right-1">
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
            <div className="bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 absolute top-20 right-1">
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
