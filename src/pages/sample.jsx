import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash, FaUndo, FaRedo, FaFont, FaRegEdit, FaPlus, FaFileImage, FaArrowLeft, FaArrowRight, FaArrowsAlt } from 'react-icons/fa';
import '../utils/pdf.css'; // Correctly import the external CSS file
import SmallImage from './SmallImage';
import ImageUploadOptions from './ImageUploadOptions';
import Preview from './Preview';
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import TextOptions from './TextOptions';
import StickerSelector from './StickerSelector';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { FaTrashAlt, FaSyncAlt } from 'react-icons/fa';
import { AiOutlineFileText, AiOutlinePicture } from "react-icons/ai";
import { FaStickerMule } from "react-icons/fa";


export default function WeddingCardEditor() {

  const [selectedText, setSelectedText] = useState(null); // This holds the currently selected text field
  const handleTextFieldClick = (textField) => {
    setSelectedText(textField);  // Set the selected text field when clicked
  };

  const [text, setText] = useState(''); // State for text input
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [sizeValue, setSizeValue] = useState(30);
  const [dragging, setDragging] = useState(false);
  const [textFields, setTextFields] = useState([]);
  // State to track selected field

  const [newTextInput, setNewTextInput] = useState('');
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Blade Rush');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false); // State for size change modal
  const [fontFamily, setFontFamily] = useState('Blade Rush'); // New state for font family

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [smallImages, setSmallImages] = useState([]);
  const [showImageUploadOptions, setShowImageUploadOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedPages, setSavedPages] = useState({});
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false); // Track when data is ready
  //console.log("small images",smallImages);
  const [savedSmallImages, setSavedSmallImages] = useState({});
  const [size, setSize] = useState(50);
  const [fontColor, setFontColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textAlign, setTextAlign] = useState('left');
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showStickerSelector, setShowStickerSelector] = useState(false);
  const [stickers, setStickers] = useState([]); // State to hold added stickers
  const location = useLocation();
  const { id } = useParams();
  const { images: initialImages = [] } = location.state || {}; // Default to an empty array if images are not present

  console.log("parent stickers", stickers);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages); // Set initial images from location state
    }
  }, [initialImages]);

  // Fetch savedPages from localStorage and set the text fields based on currentImageIndex
  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages); // Set initial images from location state
    }
  }, [initialImages]);




  const handleAddNewText = () => {
    const newTextField = {
      id: Date.now(), // Unique ID based on timestamp
      text: "New Text",
      x: 100, // Example position
      y: 100, // Example position
      size: 20, // Example size
      font: "Roboto",
      fontColor: "#000000",
      isBold: false,
      isItalic: false,
      textAlign: "left",
      lineHeight: 1.5,
      letterSpacing: 1,
    };

    setTextFields([...textFields, newTextField]);
  };


  // Fetch savedPages from localStorage and set text fields for the current page

  useEffect(() => {
    const savedPagesFromStorage = JSON.parse(localStorage.getItem('savedPages')) || {};
    const savedSmallImagesFromStorage = JSON.parse(localStorage.getItem('savedSmallImages')) || {};
    setSavedPages(savedPagesFromStorage);
    setSavedSmallImages(savedSmallImagesFromStorage); // Store small images in state

    // Set text fields for the current image index
    if (Array.isArray(savedPagesFromStorage[currentImageIndex])) {
      setTextFields(savedPagesFromStorage[currentImageIndex]);
    }


    // Set small images for the current image index
    if (Array.isArray(savedSmallImagesFromStorage[currentImageIndex])) {
      setSmallImages(savedSmallImagesFromStorage[currentImageIndex]);
    }
  }, [currentImageIndex]);

  const closeTextOptions = () => {
    setShowTextOptions(false); // Hide the TextOptions popup
  };
  const [selectedField, setSelectedField] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [resizingId, setResizingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, initialSize: 50 });







  const handleStickerClick = (id) => {
    setSelectedStickerId(id);
  };


  const [previewMode, setPreviewMode] = useState(false);
  useEffect(() => {
    if (draggingId || resizingId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, resizingId]);

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });
  const handleMouseDown = (e, id, x, y) => {
    e.preventDefault();
    setSelectedField(id);
    setDraggingField({ id, offsetX: e.clientX - x, offsetY: e.clientY - y });
  };
  const handleResizeMouseDownImage = (imageId, event, type) => {
    event.preventDefault(); // Prevent any unwanted behavior during resize

    const startX = event.clientX;
    const startY = event.clientY;
    const targetImage = smallImages.find((image) => image.id === imageId);

    if (!targetImage) return;

    const initialSize = targetImage.size;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const newSize = Math.max(20, initialSize + Math.max(deltaX, deltaY)); // Ensure minimum size is 20

      setSmallImages((prev) =>
        prev.map((image) =>
          image.id === imageId ? { ...image, size: newSize } : image
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleDeleteImage = (imageId) => {
    setSmallImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (draggingField) {
      const { id, offsetX, offsetY } = draggingField;
      const updatedFields = textFields.map((field) =>
        field.id === id ? { ...field, x: e.clientX - offsetX, y: e.clientY - offsetY } : field
      );
      setTextFields(updatedFields);
    } else if (resizingField) {
      const { id, startX, startWidth } = resizingField;
      const updatedFields = textFields.map((field) =>
        field.id === id
          ? { ...field, size: Math.max(10, startWidth + (e.clientX - startX)) } // Update size dynamically
          : field
      );
      setTextFields(updatedFields);
    }
  };

  // Handle mouse up to stop dragging or resizing
  const handleMouseUp = () => {
    setDraggingField(null);
    setResizingField(null);
  };

  // Handle mouse down for resizing
  const handleResizeMouseDown = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const textField = textFields.find((field) => field.id === id);
    setResizingField({
      id,
      startX: e.clientX,
      startWidth: textField.size,
    });
  };
  const generatePDF = async () => {
    const doc = new jsPDF();
    console.log("Generating PDF with savedPages:", savedPages);

    if (Object.keys(savedPages).length === 0 || images.length === 0) {
      console.log("Data not ready yet!");
      return;
    }

    for (const pageIndex of Object.keys(savedPages)) {
      const pageData = savedPages[pageIndex];
      const smallImagesData = savedSmallImages[pageIndex] || [];  // Fetch small images for the current page

      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.backgroundColor = 'white';

      let imgWidth = 0;
      let imgHeight = 0;
      let scaleX = 1;
      let scaleY = 1;

      // Add main image
      const currentImage = images[pageIndex];
      console.log(currentImage);

      if (currentImage) {
        const imgElement = document.createElement('img');
        imgElement.src = currentImage;
        imgElement.crossOrigin = 'anonymous';
        imgElement.style.position = 'absolute';
        imgElement.style.top = '0';
        imgElement.style.left = '0';

        // Dynamically set container size based on image size
        await new Promise((resolve) => {
          imgElement.onload = () => {
            imgWidth = imgElement.naturalWidth;
            imgHeight = imgElement.naturalHeight;
            console.log(`Image original size: ${imgWidth}x${imgHeight}`);

            container.style.width = `${imgWidth}px`;
            container.style.height = `${imgHeight}px`;

            // Calculate scale factors
            const defaultWidth = 320;
            const defaultHeight = 608;
            scaleX = imgWidth / defaultWidth;
            scaleY = imgHeight / defaultHeight;
            resolve();
          };
        });

        container.appendChild(imgElement);
      }
      else {
        break;
      }

      // Add text fields with scaling
      pageData.forEach(({ text, x, y, size, font }) => {
        const textElement = document.createElement('div');
        textElement.style.position = 'absolute';
        textElement.style.top = `${y * scaleY}px`;
        textElement.style.left = `${x * scaleX}px`;
        textElement.style.fontSize = `${size * Math.min(scaleX, scaleY)}px`;
        textElement.style.fontFamily = font;
        textElement.style.transform = 'translate(-50%, -50%)';
        textElement.innerText = text;
        container.appendChild(textElement);
      });

      // Add small images with scaling
      smallImagesData.forEach(({ src, x, y, size }) => {
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.style.position = 'absolute';
        imgElement.style.top = `${y * scaleY}px`;
        imgElement.style.left = `${x * scaleX}px`;
        imgElement.style.width = `${size * Math.min(scaleX, scaleY)}px`;
        imgElement.style.height = `${size * Math.min(scaleX, scaleY)}px`;
        imgElement.style.transform = 'translate(-50%, -50%)';
        container.appendChild(imgElement);
      });

      // Debugging step
      document.body.appendChild(container);
      console.log(container);

      try {
        // Capture canvas with increased scale for better quality
        const canvas = await html2canvas(container, {
          useCORS: true,
          logging: true,
          scale: 2
        });
        const imgData = canvas.toDataURL('image/png');

        // Add to PDF
        if (parseInt(pageIndex) > 0) {
          doc.addPage();
        }

        const pdfPageWidth = doc.internal.pageSize.getWidth();
        const pdfPageHeight = doc.internal.pageSize.getHeight();
        const scaleFactor = Math.min(pdfPageWidth / imgWidth, pdfPageHeight / imgHeight);

        const pdfImgWidth = imgWidth * scaleFactor;
        const pdfImgHeight = imgHeight * scaleFactor;
        const xOffset = (pdfPageWidth - pdfImgWidth) / 2;
        const yOffset = (pdfPageHeight - pdfImgHeight) / 2;

        doc.addImage(imgData, 'PNG', xOffset, yOffset, pdfImgWidth, pdfImgHeight);
      } catch (error) {
        console.error("Error rendering page:", error);
      } finally {
        document.body.removeChild(container); // Clean up
      }
    }

    doc.save('wedding-card.pdf');
  };




  const handleClose = () => {
    setSelectedField(null); // Close the TextOptions
  };





  const validateImage = async (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); // Valid image
      img.onerror = () => resolve(false); // Invalid/corrupt image
      img.src = src;
    });
  };

  const convertWebPToPNG = (webpBase64) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = webpBase64;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const pngBase64 = canvas.toDataURL("image/png");
        resolve(pngBase64);
      };

      img.onerror = () => reject(new Error("Failed to convert WebP to PNG"));
    });
  };








  const handleDownloadPDF = () => {
    generatePDF(); // Call the PDF generation function
  };










  const handleUpdate = () => {
    if (selectedField) {
      setUndoStack((prevStack) => [...prevStack, { textFields }]); // Capture current state
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

    const savedSmallImages = JSON.parse(localStorage.getItem('savedSmallImages')) || {};
    savedSmallImages[currentImageIndex] = smallImages; // Ensure `smallImages` state is updated
    localStorage.setItem('savedSmallImages', JSON.stringify(savedSmallImages));

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
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




  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastChange = undoStack.pop();
      setRedoStack((prevStack) => [...prevStack, { textFields }]);
      setTextFields(lastChange.textFields);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const redoChange = redoStack.pop();
      setUndoStack((prevStack) => [...prevStack, { textFields }]);
      setTextFields(redoChange.textFields);
    }
  };

  //  console.log("parent smallimages", smallImages);

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



  // Function to handle the deletion of a text field


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
  const [draggingField, setDraggingField] = useState(null); // Tracks which field is being dragged
  const [resizingField, setResizingField] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingField) {
        setTextFields((prevFields) =>
          prevFields.map((field) =>
            field.id === draggingField.id
              ? { ...field, x: e.clientX - draggingField.offsetX, y: e.clientY - draggingField.offsetY }
              : field
          )
        );
      }

      if (resizingField) {
        const delta = e.clientX - resizingField.startX; // Horizontal resize (you can add vertical if needed)
        setTextFields((prevFields) =>
          prevFields.map((field) =>
            field.id === resizingField.id
              ? { ...field, size: Math.max(resizingField.initialSize + delta, 10) } // Min size 10px
              : field
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingField(null);
      setResizingField(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingField, resizingField]);

  const handleAddSmallImage = (src) => {
    const newImage = {
      id: `smallImage${Date.now()}`,
      src,
      x: 200,
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
    console.log("new size", newSize);
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


  const handleStickerSelect = (sticker) => {
    setStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        src: sticker,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
      },
    ]);
    setShowStickerSelector(false);
  };

  const handleDeleteSticker = (id) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id));
  };



  // Function to update text field properties
  const updateTextField = (id, property, value) => {
    setTextFields(prev =>
      prev.map(textField =>
        textField.id === id ? { ...textField, [property]: value } : textField
      )
    );
  };

  // Function to handle the deletion of a text field
  const handleDelete = (id) => {
    setTextFields(prev => prev.filter(textField => textField.id !== id));
    setSelectedField(null); // Deselect field after deletion
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
          onClick={handleDownloadPDF}
          className="px-4 py-1 rounded bg-[#AF7D32] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#643C28] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#AF7D32] focus:outline-none flex items-center gap-2">
          Download PDF
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
          <div className="fixed bottom-4 left-20 z-5">
            <button
              onClick={openCustomizeModal}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#AF7D32] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#643C28] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#AF7D32] focus:outline-none"
            >

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
                className="w-full h-auto object-cover "
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




              {stickers.map(({ id, src, x, y, width, height, rotation }) => (
                <Draggable
                  key={id}
                  position={{ x, y }}
                  onDrag={(e, data) => {
                    setStickers((prev) =>
                      prev.map((sticker) =>
                        sticker.id === id ? { ...sticker, x: data.x, y: data.y } : sticker
                      )
                    );
                  }}
                  bounds="parent"
                >
                  <div
                    style={{
                      position: "absolute",
                      transform: `rotate(${rotation}deg)`,
                      cursor: "move",

                      border: selectedStickerId === id ? '2px dotted blue' : 'none', // Blue dotted border if selected
                      zIndex: selectedStickerId === id ? 20 : 10, // Ensure border is above other elements
                    }}
                    onClick={() => handleStickerClick(id)} // Set the selected sticker on click
                  >
                    <Resizable
                      defaultSize={{ width, height }}
                      size={{ width, height }}
                      lockAspectRatio
                      onResizeStop={(e, direction, ref, d) => {
                        setStickers((prev) =>
                          prev.map((sticker) =>
                            sticker.id === id
                              ? {
                                ...sticker,
                                width: sticker.width + d.width,
                                height: sticker.height + d.height,
                              }
                              : sticker
                          )
                        );
                      }}
                      style={{ position: "absolute", zIndex: 10, border: selectedStickerId === id ? '2px dotted blue' : 'none', }}
                    >
                      <div className="relative">
                        {/* Sticker Image */}
                        <img
                          src={src}
                          alt="Sticker"
                          className="w-full h-full object-contain"
                        />

                        {/* Delete Icon */}
                        {selectedStickerId === id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the sticker selection click
                              handleDeleteSticker(id);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white border  rounded-full p-2 cursor-pointer "
                            title="Delete Sticker"
                          >
                            <FaTrashAlt size={10} />
                          </button>
                        )}
                      </div>
                    </Resizable>
                  </div>
                </Draggable>
              ))}



              {textFields.map(
                ({
                  id,
                  text,
                  x,
                  y,
                  size,
                  font,
                  fontColor,
                  isBold,
                  isItalic,
                  textAlign,
                  lineHeight,
                  letterSpacing,
                  isUppercase,
                  isLowercase,
                  curveValue, // Use curveValue as it was defined in TextOptions
                }) => (
                  <div
                    key={id}
                    className="absolute"
                    style={{
                      top: y,
                      left: x,
                      fontSize: `${size}px`,
                      fontFamily: font,
                      color: fontColor,
                      fontWeight: isBold ? "bold" : "normal",
                      fontStyle: isItalic ? "italic" : "normal",
                      letterSpacing: `${letterSpacing}px`,
                      lineHeight: `${lineHeight}`,
                      whiteSpace: "nowrap", // Prevent text from wrapping
                      overflow: "visible", // Allow overflow
                      textAlign: textAlign,
                      cursor: "move",
                      zIndex: selectedField === id ? 10 : 1,
                      border: selectedField === id ? "2px dotted blue" : "none", // Border for selection
                      width: "fit-content", // Ensure text content adjusts to width
                      transform: `translate(-50%, -50%)`, // Center the text container
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation(); // Prevent click from propagating to parent elements
                      handleMouseDown(e, id, x, y); // Handle the click to open text options for the selected field
                    }}
                  >
                    {/* Border for the text content */}
                    <div
                      style={{
                        display: "inline-block", // Ensure text stays within the border
                        border: "1px solid #ccc", // Apply the border around the text
                        padding: "2px 5px", // Add padding to the border around text
                      }}
                    >
                      {/* Render Text with Curved Effect */}
                      {text.split("\n").map((line, index) => (
                        <div key={index}>
                          {line.split("").map((char, charIndex) => {
                            const curve = curveValue || 0; // Ensure curve has a default value
                            const angle =
                              (Math.PI * curve) * (charIndex - Math.floor(line.length / 2)) /
                              line.length;
                            const radius = 100; // Distance from the center of the curve
                            return (
                              <span
                                key={charIndex}
                                style={{
                                  position: "relative", // Using inline instead of inline-block
                                  transform: `rotate(${angle}rad) translateY(-${radius}px)`,
                                  transformOrigin: "center", // Ensure rotation happens around the center
                                }}
                              >
                                {isUppercase
                                  ? char.toUpperCase()
                                  : isLowercase
                                    ? char.toLowerCase()
                                    : char}
                              </span>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Resizing Handle */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation(); // Prevent click from propagating to parent elements
                        handleResizeMouseDown(e, id); // Handle the resizing functionality
                      }}
                      className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize"
                      style={{ transform: "translate(50%, 50%)" }}
                    />

                    {/* Delete Button */}
                    {selectedField === id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click from bubbling up
                          handleDelete(id); // Delete the text field
                        }}
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                        style={{
                          transform: "translate(50%, -50%)",
                          zIndex: 20,
                        }}
                      >
                        <FaTrash size={13} />
                      </button>
                    )}
                  </div>
                )
              )}







              {/* Small Images */}
              {smallImages.map(({ id, src, x, y, size }) => (
                <Draggable
                  key={id}
                  position={{ x, y }}
                  onDrag={(e, data) => {
                    setSmallImages((prev) =>
                      prev.map((image) =>
                        image.id === id ? { ...image, x: data.x, y: data.y } : image
                      )
                    );
                  }}
                  onStart={(e) => e.button === 0} // Dragging starts only when the left mouse button is pressed
                  bounds="parent"
                >
                  <div
                    style={{
                      position: "absolute",
                      cursor: "move",
                      zIndex: 10,
                      width: `${size}px`, // Make width dynamic based on size
                      height: `${size}px`, // Make height dynamic based on size
                    }}
                  >
                    <img
                      src={src}
                      alt="Small Icon"
                      className="object-cover w-full h-full"
                    />

                    {/* Delete Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(id);
                      }}
                      className="absolute top-0 right-0 bg-white rounded-full p-1"
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <FaTrash size={13} />
                    </button>

                    {/* Resizing Icon */}
                    <div
                      onMouseDown={(e) => handleResizeMouseDownImage(id, e, 'image')}
                      className="absolute right-0 bottom-0 w-4 h-4 bg-gray-500 cursor-se-resize"
                      style={{ transform: "translate(50%, 50%)" }}
                    />
                  </div>
                </Draggable>
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
              stickers={stickers} // Pass stickers to the preview
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
                  <textarea
                    id="text"
                    className="w-full p-2 border rounded mb-4"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent the default action (new line)
                        setNewText((prev) => prev + '\n'); // Add a new line character
                      }
                    }}
                    rows={4} // Set the number of rows for the textarea
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


          <div className="relative md:absolute  gap-4 z-10 md:right-0 xl:right-10 sm:top-auto sm:pr-4 sm:-ml-0 mr-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-col flex-wrap gap-4">
              {/* Only show these buttons if no text is selected */}
              {!selectedField && (
                <>
                  <button
                    onClick={handleAddNewText}
                    className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300 lg:mt-36 md:mt-36 xl:mt-36"
                  >
                    <AiOutlineFileText className="w-6 h-6" />
                    <span>Add Text</span>
                  </button>

                  {/* Add Sticker Button */}
                  <button
                    onClick={() => setShowStickerSelector(true)}
                    className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                  >
                    <FaStickerMule className="w-6 h-6" />
                    <span>Add Sticker</span>
                  </button>

                  {/* Add Image Button */}
                  <button
                    onClick={handleAddImageClick}
                    className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                  >
                    <AiOutlinePicture className="w-6 h-6" />
                    <span>Add Images</span>
                  </button>
                </>
              )}

              {/* Show TextOptions only when a text field is selected */}
              {selectedField && textFields.some(field => field.id === selectedField) && (
                <div className="relative flex flex-col gap-4 mt-14 left-20">
                  <TextOptions
                    selectedText={textFields.find(field => field.id === selectedField)}
                    updateTextField={updateTextField}
                    onClose={handleClose} // Pass the close handler
                  />
                </div>
              )}

              {/* Sticker Selector */}
              {showStickerSelector && (
                <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-end">
                  <div
                    className={`bg-white rounded-lg shadow-lg w-96 h-full p-6 transform transition-all duration-300 ${showStickerSelector ? "translate-x-0" : "translate-x-full"
                      }`}
                  >
                    {/* Header with Close button */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-indigo-600">Select a Sticker</h2>
                      <button
                        onClick={() => setShowStickerSelector(false)}
                        className="text-xl text-gray-500 hover:text-gray-700 transition-all duration-200"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Sticker Selector */}
                    <StickerSelector onSelect={handleStickerSelect} />

                    {/* Cancel Button */}
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setShowStickerSelector(false)} // Cancel action
                        className="py-2 px-6 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>





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