import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash, FaUndo, FaRedo, FaFont, FaRegEdit, FaPlus, FaFileImage, FaArrowLeft, FaArrowRight, FaArrowsAlt } from 'react-icons/fa';
import '../utils/pdf.css'; // Correctly import the external CSS file
import SmallImage from './SmallImage';
import ImageUploadOptions from './ImageUploadOptions';
import Preview from './Preview';
import { useNavigate } from "react-router-dom";





export default function WeddingCardEditor() {
  const [textFields, setTextFields] = useState([
    { id: 'mainText1', text: 'Aarav', x: 80, y: 160, size: 30, font: 'Blade Rush' },
    { id: 'mainText2', text: 'Rohini', x: 220, y: 160, size: 30, font: 'Blade Rush' },
    { id: 'subText1', text: 'July 13, 2022 ', x: 180, y: 190, size: 20, font: 'Blade Rush' },
    { id: 'subText2', text: '12 : 30 AM ', x: 190, y: 250, size: 20, font: 'Blade Rush' },
  ]);
  const [text, setText] = useState(''); // State for text input
  const [images, setImages] = useState([]); // State for images
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [sizeValue, setSizeValue] = useState(30);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [newTextInput, setNewTextInput] = useState('');
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Blade Rush');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false); // State for size change modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [smallImages, setSmallImages] = useState([]);
  const [showImageUploadOptions, setShowImageUploadOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);


  const location = useLocation();
  const { id } = useParams();
  const { images: initialImages = [] } = location.state || {}; // Default to an empty array if images are not present

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages); // Set initial images from location state
      setImageUrl(initialImages[0]); // Set the first image as the default
    }
  }, [initialImages]);

  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem('savedPages')) || {};
    if (savedPages[currentImageIndex]) {
      setTextFields(savedPages[currentImageIndex]);
    } else {
      setTextFields([
        { id: 'mainText1', text: 'Aarav', x: 80, y: 140, size: 30, font: 'Blade Rush' },
        { id: 'mainText2', text: 'Rohini', x: 220, y: 140, size: 30, font: 'Blade Rush' },
        { id: 'subText1', text: 'July 13, 2022 ', x: 160, y: 190, size: 20, font: 'Blade Rush' },
        { id: 'subText2', text: '12 : 30 AM ', x: 170, y: 250, size: 20, font: 'Blade Rush' },
      ]);
    }
  }, [currentImageIndex]);



  const handleResizeMouseDown = (id, e) => {
    e.stopPropagation();
    e.preventDefault();

    const initialWidth = textFields.find(field => field.id === id).size;
    const initialX = e.clientX;

    const handleMouseMove = (moveEvent) => {
      const newSize = Math.max(initialWidth + (moveEvent.clientX - initialX), 10); // Minimum size of 10
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === id ? { ...field, size: newSize } : field
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const redoChange = redoStack.pop();
      setUndoStack((prevStack) => [...prevStack, { textFields }]);
      setTextFields(redoChange.textFields); // Apply redo change
    }
  };

  const handleDeleteImage = (index) => {
    if (index !== null) {
      setImages(images.filter((_, i) => i !== index));
      //setIsCustomizeModalOpen(false);
    }
  };

  const handleCopyImage = (index) => {
    if (index !== null) {
      const newImage = images[index]; // Assuming you want to copy the same image
      setImages([...images, newImage]);
      //setIsCustomizeModalOpen(false);
    }
  };

  const handleDragStart = (index) => {
    setDragging(true);
    setSelectedImageIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (selectedImageIndex !== null) {
      const updatedImages = [...images];
      const [movedImage] = updatedImages.splice(selectedImageIndex, 1);
      updatedImages.splice(index, 0, movedImage);
      setImages(updatedImages);
      setDragging(false);
      setSelectedImageIndex(null);
    }
  };

  useEffect(() => {
    if (images && images.length > 0) {
      setImageUrl(images[currentImageIndex]); // Set default image from the first element
    }
  }, [images, currentImageIndex]);

  const handleSaveChanges = () => {
    const savedPages = JSON.parse(localStorage.getItem('savedPages')) || {};
    savedPages[currentImageIndex] = textFields;
    localStorage.setItem('savedPages', JSON.stringify(savedPages));
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1000);
  };

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




  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastChange = undoStack.pop();
      setRedoStack((prevStack) => [...prevStack, { textFields }]);
      setTextFields(lastChange.textFields);
    }
  };



  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
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
    setSelectedImageIndex(index);
    setImageUrl(images[index]);
  };

  const openCustomizeModal = () => {
    setIsCustomizeModalOpen(true);
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

  const handleAddSmallImage = (src) => {
    const newImage = {
      id: `smallImage${Date.now()}`,
      src,
      x: 300,
      y: 250,
      size: 50, // Default size for the small image
    };
    setSmallImages((prevImages) => [...prevImages, newImage]);
  };

  const handleDeleteSmallImage = (id) => {
    setSmallImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };



  // Function to open file dialog and add image


  const handleAddImageClick = () => {
    setShowImageUploadOptions(true);
  };

  const handleClosePopup = () => {
    setShowImageUploadOptions(false);
  };


  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleSelectUploadOption = (option) => {
    console.log(`Selected upload option: ${option}`);
    // Implement the logic for each upload option here
    if (option === 'local') {
      // Logic to handle local drive upload
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          handleAddSmallImage(reader.result); // Assuming this function is defined
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
    // Add logic for other options as needed
  };


  const handleResizeSmallImage = (id, newX, newY, newSize) => {
    setSmallImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, x: newX, y: newY, size: newSize } : image
      )
    );
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Redirects to the home page
  };


  return (
    <div className="container mx-auto  md:bg-gradient-to-br">
      <div className="w-full text-center flex justify-evenly items-center">
        <div className="flex gap-4 z-10 relative left-14">
          <button
            onClick={handleUndo}
            className="px-3 py-1 rounded border border-gray-400 bg-[#FAF0DC] text-gray-800 hover:bg-[#AF7D32] transition"
            disabled={undoStack.length === 0}
          >
            <FaUndo size={20} className="hover:text-white" />
          </button>
          <button
            onClick={handleRedo}
            className="px-3 py-1 rounded border border-gray-400 bg-[#FAF0DC] text-gray-800 hover:bg-[#AF7D32] transition"
            disabled={redoStack.length === 0}
          >
            <FaRedo size={20} className="hover:text-white" />
          </button>
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-gray-800 hidden md:block">Editing Screen</h1>
        </div>
        <button
          onClick={handleClick}
          className="px-4 py-1 rounded bg-[#AF7D32] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#643C28] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#AF7D32] focus:outline-none flex items-center gap-2">


          Close Edit
        </button>
      </div>

      <hr className="border-gray-300 w-full " />

      <div className="flex w-full relative">
        <div className="hidden md:block absolute top-0 bottom-0 border-l-2 border-gray-300"></div>


        <div className="hidden md:block w-48 lg:w-56 flex flex-col gap-6 md:p-4 lg:p-6 h-screen overflow-y-auto bg-gray-100 border-r border-gray-300 shadow-md">
          {/* Title */}
          <h2 className="font-bold text-gray-800 mb-4 text-2xl text-center border-b border-gray-300 pb-2">All Pages</h2>

          {/* Thumbnails */}
          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 p-2 border rounded-lg transition-all duration-300 ${selectedImageIndex === index
                  ? 'bg-[#FDF5E6] shadow-md border-[#AF7D32]'
                  : 'bg-white border-gray-200 hover:shadow-lg hover:border-gray-300'
                  }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full rounded-md object-cover cursor-pointer transform transition duration-300 ${selectedImageIndex === index
                    ? 'scale-105'
                    : 'filter blur-sm hover:blur-none'
                    }`}
                  onClick={() => handleThumbnailClick(index)}
                />
                <span
                  className={`mt-1 text-center text-sm font-medium ${selectedImageIndex === index ? 'text-[#AF7D32]' : 'text-gray-600'
                    }`}
                >
                  Image {index + 1}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No images available.</p> // Message if no images are found
          )}

          {/* Fixed Customize Image Button */}
          <div className="fixed bottom-4 left-20 z-50">
            <button
              onClick={openCustomizeModal}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#AF7D32] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#643C28] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#AF7D32] focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h7.5m0 0V3m0 3l-7.5 7.5m0 0h-7.5m0 0v3m0-3l7.5-7.5"
                />
              </svg>
              Customize Image
            </button>
          </div>

        </div>


        {isCustomizeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col lg:w-1/3 md:w-auto">
              <h2 className="text-2xl font-bold mb-4">Let's Customize Images</h2>
              <div className="gap-4 flex flex-col overflow-y-auto" style={{ height: "500px" }}>



                {/* Text Fields */}

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
                      whiteSpace: 'nowrap', // Prevent text wrapping
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
                        className="absolute top-0 right-0 text-gray-1000 rounded-full transition duration-300"
                      >
                        <FaTrash size={13} />
                      </button>
                    )}
                    {/* Resizing handle */}
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(id, e)} // Use the new resizing function
                      className="absolute right-0 bottom-0 w-4 h-4 bg-gray-500 cursor-ew-resize"
                      style={{ transform: 'translate(50%, 50%)' }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsCustomizeModalOpen(false)}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
              {/* Rearrange Button */}

            </div>
          </div>
        )}

        {isCustomizeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col lg:w-1/3 md:w-auto">
              <h2 className="text-2xl font-bold mb-4">Let's Customize Images</h2>
              <div className="gap-4 flex flex-col overflow-y-auto" style={{ height: "500px" }}>
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full gap-4 md:p-2 border-gray-500 lg:p-3 border-b border-t border-l border-r border-gray pb-3 "
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                  >
                    <button
                      onClick={() => { /* Add functionality to rearrange images if needed */ }}
                      className="mt-4 px-6 py-2 bg-[#AF7D32] text-white rounded hover:bg-[#643C28] transition flex items-center gap-2"
                    >
                      <FaArrowsAlt size={20} />
                    </button>
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-36 object-contain cursor-pointer transition duration-300 border rounded-md h-3/3"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleCopyImage(index)}
                        className="text-blue-500 hover:text-blue-600 transition ml-10"
                        title="Duplicate"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="text-red-500 hover:text-red-600 transition ml-10"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsCustomizeModalOpen(false)}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}



        <div
          className="flex flex-col ml-14 w-full relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="flex flex-col 2xl:mb-6 md:ml-0 sm:ml-0 xl:mb-6 xl:ml-56 md:mr-4 mr-8">
            {/* Image Container */}
            <div className="relative md:w-3/5 lg:w-80 lg:h-112 flex items-center mr-8 rounded-lg shadow-md border border-gray-200 bg-gray-50 overflow-hidden">
              <img
                src={imageUrl}
                alt="Background"
                className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              {/* Left Arrow */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  onClick={handlePreviousImage}
                  className="p-3 bg-white text-gray-700 rounded-full shadow hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                >
                  <FaArrowLeft size={20} />
                </button>
              </div>
              {/* Right Arrow */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  onClick={handleNextImage}
                  className="p-3 bg-white text-gray-700 rounded-full shadow hover:bg-gray-100 hover:text-gray-900 transition duration-300"
                >
                  <FaArrowRight size={20} />
                </button>
              </div>

              {/* Text Fields */}



              {textFields.map(({ id, text, x, y, size, font }) => (
                <div
                  key={id}
                  className={`absolute ${selectedField === id ? 'border-2 border-blue-500' : ''}`}
                  style={{
                    top: y,
                    left: x,
                    fontSize: `${size}px`,
                    fontFamily: font,
                    whiteSpace: 'wrap', // Prevents text wrapping
                    overflow: 'hidden',   // Optional: hide overflow if text is too long
                    transform: 'translate(-50%, -50%)',
                    cursor: 'move',
                    zIndex: selectedField === id ? 10 : 1,
                  }}
                  onMouseDown={(e) => handleMouseDown(id, e)}
                >
                  {text}
                  {selectedField === id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTextFields((prevFields) => prevFields.filter((field) => field.id !== id));
                        setSelectedField(null);
                      }}
                      className="absolute top-0 right-0 text-gray-1000 rounded-full transition duration-300"
                    >
                      <FaTrash size={13} />
                    </button>
                  )}
                  <div
                    onMouseDown={(e) => handleResizeMouseDown(id, e)}
                    className="absolute right-0 bottom-0 w-4 h-4 bg-gray-500 cursor-ew-resize"
                    style={{ transform: 'translate(50%, 50%)' }}
                  />
                </div>
              ))}
            </div>

            {/* Buttons Below the Image */}
            <div className="flex lg:gap-4 md:mt-4 lg:mt-1 gap-4 sm:mt-4 mt-6">
              {/* Save Button */}
              <button
                onClick={handleSaveChanges}
                className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5v6.75a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25V10.5m15 0v-3.75a2.25 2.25 0 00-2.25-2.25h-10.5a2.25 2.25 0 00-2.25 2.25V10.5m15 0h-15"
                  />
                </svg>
                <span>Save</span>
              </button>

              {/* Preview Button */}
              <button
                onClick={handlePreview}
                className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.684c.046-.08.093-.16.142-.238A11.284 11.284 0 0112 4.5c3.9 0 7.345 1.882 9.878 4.946a11.422 11.422 0 011.142 1.52c.03.05.058.1.086.15m-19.126.568a11.422 11.422 0 01.086-.15m0 0a11.422 11.422 0 011.142-1.52C4.655 6.382 8.1 4.5 12 4.5c3.9 0 7.345 1.882 9.878 4.946.049.078.096.158.142.238m-19.126.568C2.292 9.77 2.25 9.888 2.25 10.5c0 .612.042.73.116.848.235.376.595.91 1.142 1.52 2.533 3.064 5.978 4.946 9.878 4.946 3.9 0 7.345-1.882 9.878-4.946a11.283 11.283 0 001.142-1.52c.074-.118.116-.236.116-.848 0-.612-.042-.73-.116-.848a11.283 11.283 0 00-1.142-1.52C19.345 6.382 15.9 4.5 12 4.5c-3.9 0-7.345 1.882-9.878 4.946a11.422 11.422 0 00-1.142 1.52z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Preview</span>
              </button>
            </div>
          </div>



          {showPreview && (
            <Preview
              images={smallImages} // Pass the small images to the preview
              textFields={textFields} // Pass the text fields to the preview
              currentImage={imageUrl} // Pass the current image URL
              onClose={handleClosePreview}
            />
          )}

          {showErrorMessage && (
            <div className="absolute top-2 right-10 bg-red-100 border border-red-400 text-red-700 p-2 rounded">
              Please select a text field first!
            </div>
          )}



          {isModalOpen && selectedField && (
            <div className="bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 md:absolute top-20 right-1 sm:flex-wrap">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
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
                  className="px-6 py-1 rounded border border-gray-400 text-gray-800 hover:bg-gray-100 transition mr-32"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-1 rounded border border-green-400 text-green-600 hover:bg-green-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {isFontModalOpen && (
            <div className="bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 md:absolute top-20 right-1 sm:flex-wrap">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Choose Font</h2>
                <div>
                  {['Roboto', 'Garamond', 'Lato'].map((font) => (
                    <button
                      key={font}
                      onClick={() => handleFontSelect(font)}
                      className="block w-full text-left px-4 py-2 border-b hover:bg-gray-200 transition"
                    >
                      {font}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsFontModalOpen(false)}
                  className="px-6 py-1 rounded border border-green-400 text-green-600 hover:bg-green-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="relative md:absolute top-10 md:top-40 gap-4 z-10 md:right-0 xl:right-10 sm:top-auto sm:pr-4 sm:-ml-0 mr-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-col flex-wrap gap-4">
              {/* Edit Button */}
              <button
                onClick={() => {
                  if (selectedField) {
                    setIsModalOpen(true);
                    const selectedFieldData = textFields.find((field) => field.id === selectedField);
                    if (selectedFieldData) {
                      setNewText(selectedFieldData.text);
                    }
                  } else {
                    setShowErrorMessage(true);
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-md hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 5.487l1.651 1.65a1.875 1.875 0 010 2.652l-7.44 7.44a4.5 4.5 0 01-2.31 1.2l-3.045.507.507-3.045a4.5 4.5 0 011.2-2.31l7.44-7.44a1.875 1.875 0 012.652 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-2.625 2.625" />
                </svg>
                <span>Edit</span>
              </button>

              {/* Size Button */}


              {/* New Button */}
              <button
                onClick={handleAddNewText}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-md hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>New</span>
              </button>

              {/* Font Button */}
              <button
                onClick={() => {
                  if (selectedField) {
                    setIsFontModalOpen(true);
                  } else {
                    setShowErrorMessage(true);
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-md hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m-10.5 0h10.5v10.5"
                  />
                </svg>
                <span>Font</span>
              </button>

              {/* Add Images Button */}
              <button
                onClick={handleAddImageClick}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-md hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                <span>Add Images</span>
              </button>
            </div>
          </div>
          {smallImages.map(({ id, src, x, y, size }) => (
            <SmallImage
              key={id}
              id={id}
              src={src}
              x={x}
              y={y}
              size={size}
              onDelete={handleDeleteSmallImage}
              onResize={handleResizeSmallImage} // Pass resize handler
            />
          ))}
          {showImageUploadOptions && (
            <ImageUploadOptions
              onClose={handleClosePopup}
              onSelect={handleSelectUploadOption}
            />
          )}

          {showSuccessMessage && (
            <div className="absolute top-0 right-10 bg-green-100 border border-green-400 text-green-700 p-2 rounded">
              Changes saved successfully!
            </div>
          )}

        </div>
        <div className="hidden md:block   border-l-2 border-gray-300"></div>

      </div>
    </div>
  );
}
