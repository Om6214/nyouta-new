import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {
  FaTrash,
  FaFont,
  FaRegEdit,
  FaPlus,
  FaFileImage,
  FaArrowLeft,
  FaArrowRight,
  FaArrowsAlt,
  FaFilePdf,
} from "react-icons/fa";
import { Undo2, Redo2 } from "lucide-react";
import "../utils/pdf.css"; // Correctly import the external CSS file
import ImageUploadOptions from "./ImageUploadOptions";
import Preview from "./Preview";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import TextOptions from "./TextOptions";
import StickerSelector from "./StickerSelector";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { FaTrashAlt, FaSyncAlt } from "react-icons/fa";
import {
  AiOutlineFileText,
  AiOutlinePicture,
  AiOutlineClose,
} from "react-icons/ai";
import { FaStickerMule } from "react-icons/fa";
import watermark from "../watermark/watermark.jpg";
import ShimmerSkeleton from "./ShimmerSkeleton";
import TextFieldsMobile from "./TextFieldsMobile";
import PdfGenerator from "./PdfGenerator";
import welcome from "../assets/images/welcome sign.webp";
import { Download } from "lucide-react";
import { Rnd } from "react-rnd";
import PdfGeneratorWaterMark from "./PdfGeneratorWaterMark";
import { toast } from "react-toastify";


export default function WeddingCardEditor() {
  //const [draggingField, setDraggingField] = useState(null); // Field being dragged
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 }); // Offset for touch
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [sizeValue, setSizeValue] = useState(30);
  const [textFields, setTextFields] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Blade Rush");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [rotateState, setRotateState] = useState(null); // State to track rotation
  const [initialTouchSize, setInitialTouchSize] = useState({
    width: 0,
    height: 0,
  }); // Initial size of the field
  const [touchStartCoords, setTouchStartCoords] = useState({ x: 0, y: 0 }); // Starting touch position
  const [generatePdf, setGeneratepdf] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [smallImages, setSmallImages] = useState([]);
  const [showImageUploadOptions, setShowImageUploadOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedPages, setSavedPages] = useState({});
  console.log("savedpages globle", savedPages);
  const [savedStickers, setSavedStickers] = useState({});
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //console.log("small images",smallImages);
  const [savedSmallImages, setSavedSmallImages] = useState({});
  const [showStickerSelector, setShowStickerSelector] = useState(false);
  const [stickers, setStickers] = useState([]); // State to hold added stickers
  const location = useLocation();
  const { images: initialImages = [] } = location.state || {}; // Default to an empty array if images are not present
  const [selectedField, setSelectedField] = useState(null);
  console.log("parent stickers", stickers);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startDrag = (clientX, clientY, id, x, y) => {
    setIsDragging(true);
    setDraggingField(id);
    setPosition({ x: clientX - x, y: clientY - y });
  };


  const updateDrag = (clientX, clientY) => {
    if (isDragging && draggingField) {
      const newX = clientX - position.x;
      const newY = clientY - position.y;
      // Update the position of the field here, e.g., update state
    }
  };

  const endDrag = () => {
    setIsDragging(false);
    setDraggingField(null);
  };

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages); // Set initial images from location state
      setSelectedField(null);
    }
  }, [initialImages]);

  // Fetch savedPages from localStorage and set the text fields based on currentImageIndex
  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages); // Set initial images from location state
      setSelectedField(null);
    }
  }, [initialImages]);
  const handleCopyImage = (index) => {
    if (index !== null) {
      const newImage = images[index]; // Assuming you want to copy the same image
      setImages([...images, newImage]);
      //setIsCustomizeModalOpen(false);
    }
  };
  const handleNextImage = () => {
    setSelectedField(null);
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    setSelectedField(null);
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAddNewText = () => {
    // Save current state for undo
    setUndoStack((prevStack) => [
      ...prevStack,
      { textFields, smallImages, stickers },
    ]);
    setRedoStack([]); // Clear redo stack on new action

    const newTextField = {
      id: Date.now(),
      text: "New Text",
      x: 100,
      y: 100,
      size: 20,
      font: "Roboto",
      // ... other properties
    };
    setTextFields([...textFields, newTextField]);
  };

  const handleImageClick = (id) => {
    // Set the selected image when clicked
    setSelectedImageId(id);
  };

  // Fetch savedPages from localStorage and set text fields for the current page
  const handleTextChange = (id, value) => {
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, text: value } : field
      )
    );
  };
  useEffect(() => {
    const savedPagesFromStorage =
      JSON.parse(localStorage.getItem("savedPages")) || {};
    const savedSmallImagesFromStorage =
      JSON.parse(localStorage.getItem("savedSmallImages")) || {};
    const savedStickersFromStorage =
      JSON.parse(localStorage.getItem("savedStickers")) || {}; // Load stickers from localStorage

    console.log("savedPagesFromStorage", savedPagesFromStorage); // Debugging line

    setSavedPages(savedPagesFromStorage);
    setSavedSmallImages(savedSmallImagesFromStorage);
    setSavedStickers(savedStickersFromStorage); // Store stickers in state

    // Load text fields, small images, and stickers for the current image index
    if (Array.isArray(savedPagesFromStorage[currentImageIndex])) {
      setTextFields(savedPagesFromStorage[currentImageIndex]);
    }

    if (Array.isArray(savedSmallImagesFromStorage[currentImageIndex])) {
      setSmallImages(savedSmallImagesFromStorage[currentImageIndex]);
    }

    if (Array.isArray(savedStickersFromStorage[currentImageIndex])) {
      setStickers(savedStickersFromStorage[currentImageIndex]);
    }
  }, [currentImageIndex]);

  const handleSaveChanges = () => {
    // Retrieve and update saved pages

    toast.success("You have saved successfully!", {
      autoClose: 3000,
    });

    const updatedSavedPages =
      JSON.parse(localStorage.getItem("savedPages")) || {};
    updatedSavedPages[currentImageIndex] = textFields;
    localStorage.setItem("savedPages", JSON.stringify(updatedSavedPages));

    console.log("savedPages", updatedSavedPages); // Debugging
    setSavedPages(updatedSavedPages); // Update React state

    // Retrieve and update saved small images
    const updatedSmallImages =
      JSON.parse(localStorage.getItem("savedSmallImages")) || {};
    updatedSmallImages[currentImageIndex] = smallImages;
    localStorage.setItem(
      "savedSmallImages",
      JSON.stringify(updatedSmallImages)
    );

    // Retrieve and update saved stickers
    const updatedStickers =
      JSON.parse(localStorage.getItem("savedStickers")) || {};
    updatedStickers[currentImageIndex] = stickers;
    localStorage.setItem("savedStickers", JSON.stringify(updatedStickers));

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  const [resizeState, setResizeState] = useState(null);

  const [draggingId, setDraggingId] = useState(null);
  const [resizingId, setResizingId] = useState(null);

  const handleStickerClick = (id) => {
    setSelectedStickerId(id);
  };

  const [lastTouchTime, setLastTouchTime] = useState(0);

  const handleTouchEnd = (e, id) => {
    const currentTime = new Date().getTime();
    const timeSinceLastTouch = currentTime - lastTouchTime;

    if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
      // Detected a double touch
      setEditingField(id);
    }

    setLastTouchTime(currentTime);
  };

  useEffect(() => {
    if (draggingId || resizingId) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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

  const handleResizeMouseDownImage = (imageId, event) => {
    event.preventDefault(); // Prevent default browser behavior

    const startX = event.clientX;
    const startY = event.clientY;
    const targetImage = smallImages.find((image) => image.id === imageId);

    if (!targetImage) return;

    // Initial dimensions of the image
    const initialWidth = targetImage.width;
    const initialHeight = targetImage.height;

    // Function to handle mouse movement (resize logic)
    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX; // Horizontal mouse movement
      const deltaY = moveEvent.clientY - startY; // Vertical mouse movement

      const newWidth = Math.max(20, initialWidth + deltaX); // Ensure minimum width is 20px
      const newHeight = Math.max(20, initialHeight + deltaY); // Ensure minimum height is 20px

      // Update the image dimensions
      setSmallImages((prev) =>
        prev.map((image) =>
          image.id === imageId
            ? { ...image, width: newWidth, height: newHeight }
            : image
        )
      );
    };

    // Function to clean up after resizing
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach event listeners for resizing
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleDeleteImagesmall = (imageId) => {
    //console.log("working");
    setSmallImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (draggingField) {
      const { id, offsetX, offsetY } = draggingField;
      const updatedFields = textFields.map((field) =>
        field.id === id
          ? { ...field, x: e.clientX - offsetX, y: e.clientY - offsetY }
          : field
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
  // const [isDownloading, setIsDownloading] = useState(false);

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

  const handleClose = () => {
    setSelectedField(null); // Close the TextOptions
  };



  useEffect(() => {
    const handleTouchStart = (e) => {
      e.preventDefault(); // Prevent scrolling or other default behaviors
      // Your custom drag logic
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent default behavior (like scrolling)
      // Your drag move logic
    };

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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
      const undoStackCopy = [...undoStack];
      const lastChange = undoStackCopy.pop();

      // Save current state to redo stack before undoing
      setRedoStack((prevStack) => [
        ...prevStack,
        { textFields, smallImages, stickers },
      ]);

      // Restore all state variables from the last undo step
      setTextFields(lastChange.textFields);
      setSmallImages(lastChange.smallImages);
      setStickers(lastChange.stickers);

      // Update undo stack
      setUndoStack(undoStackCopy);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const redoStackCopy = [...redoStack];
      const redoChange = redoStackCopy.pop();

      // Save current state to undo stack before redoing
      setUndoStack((prevStack) => [
        ...prevStack,
        { textFields, smallImages, stickers },
      ]);

      // Restore all state variables from the redo step
      setTextFields(redoChange.textFields);
      setSmallImages(redoChange.smallImages);
      setStickers(redoChange.stickers);

      // Update redo stack
      setRedoStack(redoStackCopy);
    }
  };

  const [draggingField, setDraggingField] = useState(null); // Tracks which field is being dragged
  const [resizingField, setResizingField] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingField) {
        setTextFields((prevFields) =>
          prevFields.map((field) =>
            field.id === draggingField.id
              ? {
                ...field,
                x: e.clientX - draggingField.offsetX,
                y: e.clientY - draggingField.offsetY,
              }
              : field
          )
        );
      }

      if (resizingField) {
        const delta = e.clientX - resizingField.startX; // Horizontal resize (you can add vertical if needed)
        setTextFields((prevFields) =>
          prevFields.map((field) =>
            field.id === resizingField.id
              ? {
                ...field,
                size: Math.max(resizingField.initialSize + delta, 10),
              } // Min size 10px
              : field
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingField(null);
      setResizingField(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingField, resizingField]);

  const handleDeleteImage = (index) => {
    if (index !== null) {
      setImages(images.filter((_, i) => i !== index));
      //setIsCustomizeModalOpen(false);
    }
  };

  // Function to open file dialog and add image

  const handleAddImageClick = () => {
    handleSelectUploadOption();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleSelectUploadOption = () => {
    //console.log(`Selected upload option: ${option}`);
    // Implement the logic for each upload option here

    // Logic to handle local drive upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
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
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Redirects to the home page
  };

  const handleStickerSelect = (sticker) => {
    // Save current state
    setUndoStack((prev) => [...prev, { textFields, smallImages, stickers }]);
    setRedoStack([]);

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

  /*
    const updateTextField = (id, updates) => {
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === id ? { ...field, ...updates } : field
        )
      );
    };
    */

  // Function to update text field properties

  const updateTextField = (id, property, value) => {
    setTextFields((prev) =>
      prev.map((textField) =>
        textField.id === id ? { ...textField, [property]: value } : textField
      )
    );
  };

  // Function to handle the deletion of a text field
  const handleDelete = (id) => {
    // Save current state
    setUndoStack((prev) => [...prev, { textFields, smallImages, stickers }]);
    setRedoStack([]);

    setTextFields((prev) => prev.filter((textField) => textField.id !== id));
    setSelectedField(null);
  };

  const handleUpdate = () => {
    if (selectedField) {
      // Save current state for undo
      setUndoStack((prevStack) => [
        ...prevStack,
        { textFields, smallImages, stickers },
      ]);

      // Clear redo stack for new changes
      setRedoStack([]);

      // Update the selected text field
      setTextFields((prevFields) =>
        prevFields.map((field) =>
          field.id === selectedField
            ? { ...field, text: newText, size: sizeValue, font: selectedFont }
            : field
        )
      );
    }
  };

  const handleAddSmallImage = (src) => {
    // Save current state for undo
    setUndoStack((prevStack) => [
      ...prevStack,
      { textFields, smallImages, stickers },
    ]);

    // Clear redo stack
    setRedoStack([]);

    // Calculate full size dynamically based on container dimensions
    const container = document.getElementById("image-container"); // Replace with your actual container ID
    const containerWidth = container
      ? container.offsetWidth
      : window.innerWidth;
    const containerHeight = container
      ? container.offsetHeight
      : window.innerHeight;

    const newImage = {
      id: `fullImage${Date.now()}`,
      src,
      x: 0, // Positioned at the top-left corner
      y: 0,
      width: containerWidth * 0.1, // Use 80% of container width
      height: containerHeight * 0.1, // Use 80% of container height
    };

    // Add the new image to state
    setSmallImages((prevImages) => [...prevImages, newImage]);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteSticker = (id) => {
    // Save current state for undo
    setUndoStack((prevStack) => [
      ...prevStack,
      { textFields, smallImages, stickers },
    ]);

    // Clear redo stack
    setRedoStack([]);

    // Remove the sticker
    setStickers((prevStickers) =>
      prevStickers.filter((sticker) => sticker.id !== id)
    );
  };
  const [isMediumScreen, setISMediumScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      console.log("Resize event triggered"); // Log to see if the event is firing
      setISMediumScreen(window.innerWidth < 1024 && window.innerWidth >= 768);
      console.log("Screen size check:"); // Log the condition
      console.log("Yes vfvxbcbvcbcvbdbb");
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log("Resize event triggered"); // Log to see if the event is firing
      setIsSmallScreen(window.innerWidth < 768);
      console.log("Screen size check for medium:", window.innerWidth < 768); // Log the condition
      console.log("Yes vfvxbcbvcbcvbdbb");
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isBigScreen, SetisBigScreen] = useState(false);

  useEffect(() => {
    const handleTouchMoveGlobal = (e) => {
      handleTouchMove(e);
      handleRotateTouchMove(e);
    };

    document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
    document.addEventListener('touchend', handleRotateTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMoveGlobal);
      document.removeEventListener('touchend', handleRotateTouchEnd);
    };
  }, [draggingField, rotateState]);



  useEffect(() => {
    const handleResize = () => {
      console.log("Resize event triggered"); // Log to see if the event is firing
      SetisBigScreen(window.innerWidth >= 1024);
      console.log("Screen size check for medium:", window.innerWidth < 768); // Log the condition
      console.log("Yes vfvxbcbvcbcvbdbb");
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedTextField = textFields.find(
    (field) => field.id === selectedField
  );

  const updateTextFieldRotation = (id, newRotationAngle) => {
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, rotationAngle: newRotationAngle } : field
      )
    );
    console.log("newRotationAngle", newRotationAngle);
  };

  const getAngleForTextField = (id) => {
    const field = textFields.find((f) => f.id === id);
    return field ? field.angle || 0 : 0;
  };

  // A function to handle the mouse down event for rotation
  const handleRotateMouseDown = (e, id) => {
    e.stopPropagation();
    // Capture the initial mouse position and current angle
    const startX = e.clientX;
    const startY = e.clientY;
    // Assume you have a function that returns the current angle for the text field:
    const currentAngle = getAngleForTextField(id);

    const onMouseMove = (moveEvent) => {
      // Calculate the change in angle from the center of the text field.
      // You can calculate the angle using the difference in mouse positions.
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      // A simple approach: change the angle by the arctan of dy/dx.
      const deltaAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const newAngle = currentAngle + deltaAngle;
      updateTextField(id, "angle", newAngle);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // const handleRotateMouseDownSticker = (e, id) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   // Find the selected sticker
  //   const sticker = stickers.find((sticker) => sticker.id === id);

  //   // Calculate the center of the sticker (for rotation)
  //   const centerX = sticker.x + sticker.width / 2;
  //   const centerY = sticker.y + sticker.height / 2;

  //   console.log(`Initial Center: (${centerX}, ${centerY})`);

  //   // Store the initial mouse coordinates and initial angle
  //   const initialMouseX = e.clientX;
  //   const initialMouseY = e.clientY;
  //   let initialAngle = sticker.rotation || 0;

  //   // Calculate the initial angle based on mouse movement
  //   const calculateAngle = (clientX, clientY) => {
  //     const deltaX = clientX - centerX;
  //     const deltaY = clientY - centerY;
  //     return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Angle in degrees
  //   };

  //   // Mouse move handler for tracking rotation
  //   const handleMouseMove = (moveEvent) => {
  //     const newAngle = calculateAngle(moveEvent.clientX, moveEvent.clientY);
  //     const angleDifference = newAngle - initialAngle;

  //     console.log(
  //       `Mouse Move - New Angle: ${newAngle}, Angle Difference: ${angleDifference}`
  //     );

  //     // Update the sticker's rotation state
  //     setStickers((prevStickers) =>
  //       prevStickers.map((sticker) =>
  //         sticker.id === id
  //           ? { ...sticker, rotation: initialAngle + angleDifference }
  //           : sticker
  //       )
  //     );
  //   };

  //   // Mouse up handler to stop rotating
  //   const handleMouseUp = () => {
  //     // Remove the mousemove and mouseup event listeners
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };

  //   // Add event listeners for mouse move and mouse up
  //   document.addEventListener("mousemove", handleMouseMove);
  //   document.addEventListener("mouseup", handleMouseUp);
  // };
  // const [showModal, setShowModal] = useState(false);

  // const handleOptionClick = (action) => {
  //   switch (action) {
  //     case "text":
  //       handleAddNewText();
  //       break;
  //     case "sticker":
  //       setShowStickerSelector(true);
  //       break;
  //     case "image":
  //       handleAddImageClick();
  //       break;
  //   }
  //   setShowModal(false);
  // };

  // const [isDownload, setIsDownload] = useState(false);
  // const { productId } = useParams();
  /*
  const handleDownloadPDF = () => {
    navigate(`/product/${productId}/edit-physical-card/download-pdf`, {
      state: {
        savedPages,
        savedSmallImages,
        savedStickers,
        images,
        textFields,
      },
    });
  };
  */

  // const [isDownloadWatermark, SetisDownloadWatermark] = useState(false);
  // const [isDownloadPurchase, SetisDownloadPurchase] = useState(false);
  // const DownloadWithWatermark = () => {
  //   SetisDownloadWatermark(true);
  // };
  // const DownloadPurchase = () => {
  //   console.log("works");
  //   SetisDownloadPurchase(true);
  // };

  // const handleDownloadPDF = () => {
  //   // Navigate to the PDF page
  //   setIsDownload(true);
  // };

  const downloadFun = () => {
    setIsDownload(false);
  };

  const handleDragStop = (e, id, x, y) => {
    e.preventDefault();

    // Finalize the position
    updateFieldPosition(id, x, y);

    // Optionally, reset any dragging state
    setDragging(false);
  };
  // const handleResizeStop = (direction, ref, delta, position, id) => {
  //   const newWidth = ref.offsetWidth;
  //   const newHeight = ref.offsetHeight;

  //   // Update size and position for the element
  //   updateFieldSize(id, newWidth, newHeight);

  //   // Optionally update position if Rnd allows repositioning during resize
  //   updateFieldPosition(id, position.x, position.y);

  //   // Reset any resizing-related states if necessary
  //   setResizing(false);
  // };

  const updateFieldPosition = (id, newX, newY) => {
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, x: newX, y: newY } : field
      )
    );
  };

  const handleTouchStart = (e, id, x, y) => {
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();

    // Use element-relative coordinates
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    setDraggingField(id);
    setTouchOffset({ x: offsetX, y: offsetY });
  };

  const handleTouchMove = (e) => {
    if (!draggingField) return;

    const touch = e.touches[0];
    const newX = touch.clientX - touchOffset.x;
    const newY = touch.clientY - touchOffset.y;

    e.preventDefault(); // Prevent screen scrolling
    updateFieldPosition(draggingField, newX, newY);
  };

  const handleResizeTouchStart = (e, id) => {
    e.preventDefault();
    const touch = e.touches[0];
    setResizeState({
      id,
      startX: touch.clientX,
      startY: touch.clientY,
    });
  };
  const handleRotateTouchStart = (e, id) => {
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(
      touch.clientY - centerY,
      touch.clientX - centerX
    );

    setRotateState({
      id,
      startAngle: angle,
      centerX,
      centerY,
      initialRotation: textFields.find(f => f.id === id)?.angle || 0
    });
  };

  const handleResizeTouchMove = (e) => {
    if (!resizeState) return; // Prevent errors if state is not set
    const touch = e.touches[0];
    const deltaX = touch.clientX - resizeState.startX;
    const deltaY = touch.clientY - resizeState.startY;

    // Example logic to update field size
    updateFieldSize(resizeState.id, deltaX, deltaY);

    setResizeState({
      ...resizeState,
      startX: touch.clientX,
      startY: touch.clientY,
    });
  };

  const handleResizeTouchEnd = () => {
    setResizeState(null); // Clear state after resize is complete
  };
  const updateFieldSize = (id, deltaX, deltaY) => {
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id
          ? {
            ...field,
            size: Math.max(field.size + deltaY / 10, 10), // Example logic to adjust font size
          }
          : field
      )
    );
  };

  const handleDeleteTextField = (id) => {
    setTextFields((prevFields) => prevFields.filter((field) => field.id !== id));
    setSelectedField(null);
  };


  const handleRotateTouchMove = (e) => {
    if (!rotateState || !e.touches[0]) return;

    const touch = e.touches[0];
    const deltaAngle = Math.atan2(
      touch.clientY - rotateState.centerY,
      touch.clientX - rotateState.centerX
    ) - rotateState.startAngle;

    const newRotation = rotateState.initialRotation + (deltaAngle * 180 / Math.PI);

    updateTextField(rotateState.id, "angle", newRotation);
  };

  // Perform rotation
  const handleRotateTouchEnd = () => {
    setRotateState(null); // Clear the rotation state
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'nyouta'); // Replace with your actual preset
    formData.append('public_id', `design_${uuidv4()}`);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqkzwt6oe/image/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };


  const handleShare = async () => {
    try {
      // Capture the design container as an image
      const container = document.getElementById('design-container');
      if (!container) {
        toast.error('Design container not found');
        console.error('Capture error: Design container not found');
        return;
      }

      const canvas = await html2canvas(container, {
        useCORS: true, // Enable if using cross-origin images
        scale: 2 // For higher resolution
      });

      // Convert canvas to blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      if (!blob) {
        throw new Error("Failed to convert canvas to image");
      }

      // Upload to Cloudinary
      const imageUrl = await uploadImageToCloudinary(blob);

      // ✅ Move clipboard action into a direct user interaction context
      if (navigator.clipboard) {
        navigator.clipboard.writeText(imageUrl)
          .then(() => {
            toast.success('Shareable image link copied to clipboard!', { autoClose: 3000 });
          })
          .catch((error) => {
            toast.error('Clipboard access denied');
            console.error('Clipboard error:', error);
          });
      } else {
        toast.error('Clipboard API not supported');
      }

    } catch (error) {
      toast.error('Error capturing design');
      console.error('Capture error:', error);
    }
  };


  if (loading) return <ShimmerSkeleton />;

  return (
    <div className="h-[110vh]">
      <div className="w-full flex flex-col  h-[15vh] lg:h-[15vh] xl:h-[15vh] lg:px-20 border-gray-300 border-b-2 lg:flex-row justify-between py-3 items-center  bg-white shadow-md relative">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <img
            src="http://localhost:5173/src/assets/images/nyouta-logo2.jpg"
            alt="Website Logo"
            className="h-16 w-auto"
          />
        </div>


        <div className="flex flex-row md:w-full justify-between md-justify-between space-x-2 lg:space-x-4 md:px-20">
          <div className="flex gap-4 z-10">
            <button
              onClick={handleUndo}
              className="px-4 py-2  rounded-xl border border-gray-200 bg-slate-50 text-gray-800 hover:bg-slate-50 hover:text-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              disabled={undoStack.length === 0}
              title="Undo"
            >
              <Undo2 size={20} />
            </button>
            <button
              onClick={handleRedo}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-slate-50 text-gray-800 hover:bg-slate-50 hover:text-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              disabled={redoStack.length === 0}
              title="Redo"
            >
              <Redo2 size={20} />
            </button>
          </div>
          <div className="flex md:flex-row space-x-4">
            <button
              onClick={handleSaveChanges}
              className="flex items-center justify-center h-11 px-4 py-0 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
            >
              <span>Save</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center h-11 px-4 py-0 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
            >
              <span>Share</span>
            </button>
          </div>
        </div>


      </div>

      {/* Sticker Selector */}
      {showStickerSelector && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div
            className={`bg-white rounded-lg shadow-lg w-96 h-full p-6 transform transition-all duration-300 ${showStickerSelector ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Header with Close button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl  font-bold ">Select a Sticker</h2>
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
                className="py-2 px-6 bg-[#AF7D32] w-full text-white rounded-lg shadow-md hover:bg-[#AF7D32] transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="flex w-full relative h-[80%] ">
        <div className="hidden md:block absolute top-0 bottom-0 border-l-2 border-gray-300"></div>

        {isCustomizeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col lg:h-auto lg:w-auto md:w-auto">
              <h2 className="text-2xl font-bold mb-4">
                Let's Customize Images
              </h2>
              <div
                className="gap-4 flex flex-col overflow-y-auto"
                style={{ height: "500px" }}
              >
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
                      onClick={() => {
                        /* Add functionality to rearrange images if needed */
                      }}
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
                className="mt-4 px-6 py-2 bg-[#AF7D32] hover:bg-[#643C28] text-white rounded  transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div
          className="flex flex-col bg-slate-100 w-full max-h-full relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col mx-auto mt-4">
              {/* Image Container */}
              <div
                id="design-container"
                className="relative  flex items-center mx-auto border w-3/4 lg:w-[550px] border-gray-200 bg-gray-50 overflow-hidden"
              >
                <img
                  src={imageUrl}
                  alt="Background"
                  className="w-full lg:w-[550px] lg:h-[490px] mx-auto object-cover "
                />

                {stickers.map(({ id, src, x, y, width, height }) => (
                  <Rnd
                    key={id}
                    size={{ width, height }}
                    position={{ x, y }}
                    onDragStart={(e) => {
                      // Prevent dragging if interacting with the delete button
                      if (e.target.closest(".delete-button")) {
                        e.stopPropagation();
                      }
                    }}
                    onResizeStart={(e) => {
                      // Prevent resizing if interacting with the delete button
                      if (e.target.closest(".delete-button")) {
                        e.stopPropagation();
                      }
                    }}
                    onDragStop={(e, d) => {
                      setStickers((prev) =>
                        prev.map((sticker) =>
                          sticker.id === id
                            ? { ...sticker, x: d.x, y: d.y }
                            : sticker
                        )
                      );
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setStickers((prev) =>
                        prev.map((sticker) =>
                          sticker.id === id
                            ? {
                              ...sticker,
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              x: position.x,
                              y: position.y,
                            }
                            : sticker
                        )
                      );
                    }}
                    bounds="parent"
                    lockAspectRatio
                    style={{
                      zIndex: selectedStickerId === id ? 20 : 10,
                      border:
                        selectedStickerId === id ? "2px dotted blue" : "none",
                    }}
                    onClick={() => handleStickerClick(id)} // Desktop click
                    onTouchStart={() => handleStickerClick(id)} // Touch click
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={src}
                        alt="Sticker"
                        className="w-full h-full object-contain"
                        style={{ pointerEvents: "none" }}
                      />

                      {selectedStickerId === id && (
                        <>
                          {/* Delete Button */}
                          <button
                            className="delete-button absolute top-0 right-0 w-6 h-6 shadow bg-white border-2 border-blue-500 rounded-full flex justify-center items-center"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent click events from propagating to the parent
                              handleDeleteSticker(id); // Delete the sticker
                            }}
                            onTouchEnd={(e) => {
                              e.stopPropagation(); // Prevent touch events from propagating to the parent
                              handleDeleteSticker(id); // Delete the sticker
                            }}
                            style={{
                              cursor: "pointer",
                              transform: "translate(50%, -50%)",
                              zIndex: 50, // Ensure the delete button is above other elements
                            }}
                            title="Delete Sticker"
                          >
                            <i className="fas fa-times-circle text-red-500 text-sm"></i>
                          </button>

                          {/* Resize Handle */}
                          <div
                            className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex justify-center items-center bg-blue-500 rounded-full"
                            style={{
                              transform: "translate(50%, 50%)",
                            }}
                            title="Resize Sticker"
                          >
                            <i className="fas fa-arrows-alt text-white"></i>
                          </div>
                        </>
                      )}
                    </div>
                  </Rnd>
                ))}

                {smallImages.map(({ id, src, x, y, width, height }) => (
                  <Rnd
                    key={id}
                    size={{ width, height }}
                    position={{ x, y }}
                    onDragStart={(e) => {
                      // Prevent dragging if interacting with the delete button
                      if (e.target.closest(".delete-button")) {
                        e.stopPropagation();
                      }
                    }}
                    onResizeStart={(e) => {
                      // Prevent resizing if interacting with the delete button
                      if (e.target.closest(".delete-button")) {
                        e.stopPropagation();
                      }
                    }}
                    onDragStop={(e, d) => {
                      setSmallImages((prev) =>
                        prev.map((image) =>
                          image.id === id ? { ...image, x: d.x, y: d.y } : image
                        )
                      );
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setSmallImages((prev) =>
                        prev.map((image) =>
                          image.id === id
                            ? {
                              ...image,
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              x: position.x,
                              y: position.y,
                            }
                            : image
                        )
                      );
                    }}
                    bounds="parent"
                    lockAspectRatio
                    style={{
                      zIndex: selectedImageId === id ? 20 : 10,
                      border: selectedImageId === id ? "2px dotted blue" : "none",
                    }}
                    onClick={() => handleImageClick(id)} // Desktop click
                    onTouchStart={() => handleImageClick(id)} // Touch click
                    enableResizing={{
                      bottom: true,
                      bottomRight: true,
                      right: true,
                      top: false, // Disable resizing from top (optional)
                      topLeft: false, // Disable resizing from top left (optional)
                      left: false, // Disable resizing from left (optional)
                      bottomLeft: false, // Disable resizing from bottom left (optional)
                      topRight: false, // Disable resizing from top right (optional)
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={src}
                        alt="Small Icon"
                        className="object-cover w-full h-full rounded border"
                        style={{ pointerEvents: "none" }}
                      />

                      {selectedImageId === id && (
                        <>
                          {/* Delete Button */}
                          <button
                            className="delete-button absolute top-0 right-0 w-6 h-6 shadow bg-white border-2 border-blue-500 rounded-full flex justify-center items-center"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent click events from propagating to the parent
                              handleDeleteImagesmall(id); // Delete the image
                            }}
                            onTouchEnd={(e) => {
                              e.stopPropagation(); // Prevent touch events from propagating to the parent
                              handleDeleteImagesmall(id); // Delete the image
                            }}
                            style={{
                              cursor: "pointer",
                              transform: "translate(50%, -50%)",
                              zIndex: 50, // Ensure the delete button is above other elements
                            }}
                            title="Delete Image"
                          >
                            <i className="fas fa-times-circle text-red-500 text-sm"></i>
                          </button>

                          {/* Resize Handle (appears when selected) */}
                          <div
                            className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex justify-center items-center bg-blue-500 rounded-full"
                            style={{
                              transform: "translate(50%, 50%)",
                            }}
                            title="Resize Image"
                          >
                            <i className="fas fa-arrows-alt text-white"></i>
                          </div>
                        </>
                      )}
                    </div>
                  </Rnd>
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
                    curveValue,
                    angle = 0
                  }) => (
                    <div
                      key={id}
                      className="absolute"
                      style={{
                        top: `${y}px`,
                        left: `${x}px`,
                        fontSize: `${size}px`,
                        fontFamily: font,
                        color: fontColor,
                        fontWeight: isBold ? "bold" : "normal",
                        fontStyle: isItalic ? "italic" : "normal",
                        letterSpacing: `${letterSpacing}px`,
                        lineHeight: `${lineHeight}`,
                        whiteSpace: "nowrap",
                        overflow: "visible",
                        textAlign: textAlign,
                        cursor: "move",
                        zIndex: selectedField === id ? 10 : 1,
                        border:
                          selectedField === id && editingField !== id
                            ? "2px dotted blue"
                            : "none",
                        width: "fit-content",
                        transformOrigin: "center",
                        transform: `translate(-50%, -50%) rotate(${angle || 0}deg)`,
                        touchAction: "none",
                        userSelect: 'none',
                      }}
                      onDoubleClick={() => setEditingField(id)}
                      onMouseDown={(e) => handleMouseDown(e, id, x, y)}
                      onTouchStart={(e) => {
                        handleTouchStart(e, id, x, y);
                        handleRotateTouchStart(e, id);
                      }}
                      onTouchMove={(e) => {
                        handleTouchMove(e);
                        handleRotateTouchMove(e);
                      }}
                      onTouchEnd={(e) => {
                        handleTouchEnd(e, id);
                        handleRotateTouchEnd();
                      }}
                    >
                      {/* Delete Button */}
                      {selectedField === id && (
                        <button
                          onClick={() => handleDeleteTextField(id)}
                          className="absolute top-[-8px] right-[-11px] w-4 h-4  text-black rounded-full flex items-center  justify-center shadow-mdtransition bg-white "
                        >
                          <i class="fa-solid fa-xmark fa-xs"></i>
                        </button>
                      )}

                      {editingField === id ? (
                        <textarea
                          value={text}
                          onChange={(e) => handleTextChange(id, e.target.value)}
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          className="bg-transparent border-none outline-none resize-none"
                          style={{
                            fontSize: `${size}px`,
                            fontFamily: font,
                            color: fontColor,
                            fontWeight: isBold ? "bold" : "normal",
                            fontStyle: isItalic ? "italic" : "normal",
                            letterSpacing: `${letterSpacing}px`,
                            lineHeight: `${lineHeight}`,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textAlign: textAlign,
                            zIndex: selectedField === id ? 10 : 1,
                            border: "2px dotted blue",
                            width: "fit-content",
                            height: "fit-content",
                            minHeight: "fit-content",
                            maxWidth: "fit-content",
                          }}
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                          }}
                          onFocus={(e) =>
                            e.target.setSelectionRange(
                              e.target.value.length,
                              e.target.value.length
                            )
                          }
                        />
                      ) : (
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 5px",
                            cursor: "text",
                          }}
                        >
                          {text.split("\n").map((line, index) => {
                            const totalChars = line.length;
                            // Compute maximum arc in degrees: +50 => 180°, -50 => -180°.
                            const maxArc = (curveValue / 50) * 180;
                            return (
                              <div
                                key={index}
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {line.split("").map((char, charIndex) => {
                                  // Use the absolute value to calculate a consistent arc spread.
                                  const maxArc = (Math.abs(curveValue) / 50) * 180;
                                  let theta = 0;
                                  if (totalChars > 1) {
                                    // Distribute characters evenly along the arc.
                                    // theta will go from -maxArc/2 to +maxArc/2.
                                    theta = -maxArc / 2 + (charIndex / (totalChars - 1)) * maxArc;
                                  }
                                  // Convert theta to radians.
                                  const thetaRad = (theta * Math.PI) / 180;
                                  // Define a circle radius (adjust this value to control the curvature)
                                  const R = 100;
                                  // Calculate the offsets along the circle.
                                  const offsetX = R * Math.sin(thetaRad);
                                  const offsetY = R - R * Math.cos(thetaRad);

                                  // For upward curves (curveValue >= 0) we want a rotation of -theta;
                                  // for downward curves (curveValue < 0), use theta.
                                  const rotation = curveValue >= 0 ? -theta : theta;
                                  // For upward curves, move the characters upward (negative y);
                                  // for downward curves, move them downward.
                                  const translateY = curveValue >= 0 ? -offsetY : offsetY;

                                  return (
                                    <span
                                      key={charIndex}
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        transform: `translate(${offsetX}px, ${translateY}px) rotate(${rotation}deg)`,
                                        // Change the transform origin based on the curve direction.
                                        transformOrigin: curveValue >= 0 ? "center bottom" : "center top",
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
                            );
                          })}
                        </div>
                      )}
                      {/* Rotate Handle */}
                      {selectedField === id && (
                        <div
                          onTouchStart={(e) => handleRotateTouchStart(e, id)}
                          className="absolute top-0 left-0 w-8 h-8 cursor-pointer bg-white rounded-full flex justify-center items-center text-handles"
                          style={{
                            transform: "translate(-50%, -50%)",
                            zIndex: 20,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                          }}
                        >
                          <i className="fas fa-sync-alt text-yellow-500 text-lg"></i>
                        </div>
                      )}

                      {/* Resize Handle */}
                      {selectedField === id && (
                        <div
                          onMouseDown={(e) => handleResizeMouseDown(e, id)}
                          onTouchStart={(e) => handleResizeTouchStart(e, id)}
                          className="absolute right-0 bottom-0 w-6 h-6 cursor-se-resize border-2 border-blue-500 rounded-full flex justify-center items-center"
                          style={{
                            transform: "translate(50%, 50%)",
                            zIndex: 20,
                          }}
                        >
                          <i className="fas fa-arrows-alt text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                  )
                )}



              </div>

              {/* Buttons Below the Image */}

            </div>
            {/* Center Section - Action Buttons (hidden on small screens) */}
            <div className="flex md:flex-col lg:flex-row">
              {selectedField && selectedTextField && !isSmallScreen && (
                <div className="lg:ml-6 lg:mr-4 self-center"> {/* Added spacing */}
                  <TextOptions
                    selectedText={selectedTextField}
                    updateTextField={updateTextField}
                    onClose={handleClose}
                  />
                </div>
              )}
              <div className="md:flex  flex p-2 px-2 text-sm flex-row lg:flex-col justify-evenly mx-auto bg-white rounded-xl lg:p-7 mt-8 lg:mr-6 lg:h-64 items-center gap-4">
                <button
                  onClick={handleAddNewText}
                  className="flex items-center justify-center gap-2 px-0 lg:px-7 py-2  bg-white text-gray-900 font-medium rounded-lg shadow-sm hover:bg-slate-50 transform hover:scale-105 transition-all duration-300"
                >
                  <i class="fa-solid fa-font fa-lg"></i>
                  <span>Add Text</span>
                </button>
                <button
                  onClick={() => setShowStickerSelector(true)}
                  className="flex items-center justify-center gap-2 px-0 lg:px-7 py-2 bg-white text-gray-900 font-medium rounded-lg shadow-sm hover:bg-slate-50 transform hover:scale-105 transition-all duration-300"
                >
                  <i class="fa-regular fa-note-sticky fa-lg"></i>
                  <span>Add Sticker</span>
                </button>
                <button
                  onClick={handleAddImageClick}
                  className="flex items-center justify-center gap-2 px-0 lg:px-7 py-2 bg-white text-gray-900 font-medium rounded-lg shadow-sm hover:bg-slate-50 transform hover:scale-105 transition-all duration-300"
                >
                  <i class="fa-regular fa-square-plus fa-lg"></i>
                  <span>Add Image</span>
                </button>
              </div>
            </div>
          </div>
          {isSmallScreen && (
            <div className="mr-10">
              <div className="grid gap-5">
                {/* Selected Field Section */}
                {selectedField && selectedTextField && (
                  <div
                    style={{ position: "absolute", bottom: "0", width: "100%" }}
                  >
                    <TextFieldsMobile
                      selectedText={selectedTextField}
                      updateTextField={updateTextField}
                      onClose={handleClose}
                    />
                  </div>
                )}

                {/* Sticker Selector */}
                {showStickerSelector && (
                  <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-end">
                    <div
                      className={`bg-white rounded-lg shadow-lg w-96 h-full p-6 transform transition-all duration-300 ${showStickerSelector
                        ? "translate-x-0"
                        : "translate-x-full"
                        }`}
                    >
                      {/* Header with Close button */}
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Select a Sticker</h2>
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
                          className="py-2 px-6 bg-[#AF7D32] w-full text-white rounded-lg shadow-md hover:bg-[#AF7D32] transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {showPreview && (
            <Preview
              images={smallImages} // Pass the small images to the preview
              textFields={textFields} // Pass the text fields to the preview
              stickers={stickers} // Pass stickers to the preview
              currentImage={imageUrl} // Pass the current image URL
              onClose={handleClosePreview}
            />
          )}

          {generatePdf && (
            <PdfGenerator
              savedPages={savedPages}
              savedSmallImages={savedSmallImages}
              savedStickers={savedStickers}
              images={images}
              textFields={textFields}
            />
          )}

          {showErrorMessage && (
            <div className="absolute top-2  bg-red-100 border border-red-400 text-red-700 p-2 rounded">
              Please select a text field first!
            </div>
          )}

          {isMediumScreen && (
            <div className="relative md:absolute  gap-4 z-10 md:right-0 sm:top-auto sm:pr-4 sm:-ml-0 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col flex-wrap gap-4 ">
                {/* Only show these buttons if no text is selected */}
                {!selectedField && (
                  <>
                    <button
                      onClick={handleAddNewText}
                      className="hidden items-center justify-center gap-2 px-6 py-4  bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300 lg:mt-36 md:mt-36 xl:mt-36 mt-4 "
                    >
                      <AiOutlineFileText className="w-6 h-6" />
                      <span>Add Text</span>
                    </button>

                    {/* Add Sticker Button */}
                    <button
                      onClick={() => setShowStickerSelector(true)}
                      className="hidden items-center justify-center gap-2  px-6 py-4 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                    >
                      <FaStickerMule className="w-6 h-6" />
                      <span>Add Sticker</span>
                    </button>

                    {/* Add Image Button */}
                    <button
                      onClick={handleAddImageClick}
                      className="hidden items-center justify-center gap-2  px-6 py-4 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                    >
                      <i class="fa-solid fa-icons"></i>
                      <span>Add Images</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {isBigScreen && (
            <div className="relative md:absolute  gap-4 z-10 md:right-0 xl:right-10 sm:top-auto sm:pr-4 sm:-ml-0  ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col flex-wrap gap-4 ">
                {/* Only show these buttons if no text is selected */}
                {!selectedField && (
                  <>
                    <button
                      onClick={handleAddNewText}
                      className="hidden items-center justify-center gap-2 md:px-10 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300 lg:mt-36 md:mt-36 xl:mt-36 mt-4 "
                    >
                      <AiOutlineFileText className="w-6 h-6" />
                      <span>Add Text</span>
                    </button>

                    {/* Add Sticker Button */}
                    <button
                      onClick={() => setShowStickerSelector(true)}
                      className="hidden items-center justify-center gap-2 px-10 py-3  bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                    >
                      <i class="fa-solid fa-icons"></i>
                      <span>Add Sticker</span>
                    </button>

                    {/* Add Image Button */}
                    <button
                      onClick={handleAddImageClick}
                      className="hidden items-center justify-center gap-2 px-10 py-3  bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                    >
                      <AiOutlinePicture className="w-6 h-6" />
                      <span>Add Images</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {showImageUploadOptions && (
            <ImageUploadOptions
              onClose={handleClosePopup}
              onSelect={handleSelectUploadOption}
            />
          )}
        </div>
        <div className="hidden md:block   border-l-2 border-gray-300"></div>
      </div>
    </div>
  );
}
