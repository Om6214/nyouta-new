in preview small image position is diffecnt and in edting video small image postion is different so please fix this issue

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaTrash, FaUndo, FaRedo, FaFont, FaRegEdit, FaPlus, FaFileImage, FaArrowLeft, FaArrowRight, FaArrowsAlt } from 'react-icons/fa';
import '../utils/pdf.css'; // Correctly import the external CSS file
import video from "../assets/video/video.mp4"; // Ensure the correct file extension
import ImageUploadOptions from './ImageUploadOptions';
import { useNavigate } from "react-router-dom";

export default function WeddingCardEditor() {
    const [textFields, setTextFields] = useState([
        { id: 'mainText1', text: 'Aarav', x: 80, y: 160, size: 30, font: 'Blade Rush' },
        { id: 'mainText2', text: 'Rohini', x: 220, y: 160, size: 30, font: 'Blade Rush' },
        { id: 'subText1', text: 'July 13, 2022 ', x: 180, y: 190, size: 20, font: 'Blade Rush' },
        { id: 'subText2', text: '12 : 30 AM ', x: 190, y: 250, size: 20, font: 'Blade Rush' },
    ]);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [newTextInput, setNewTextInput] = useState('');
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [smallImages, setSmallImages] = useState([]);
    const [showImageUploadOptions, setShowImageUploadOptions] = useState(false);


    useEffect(() => {
        const savedPages = JSON.parse(localStorage.getItem('savedPages')) || {};
        if (savedPages[currentImageIndex]) {
            setTextFields(savedPages[currentImageIndex]);
        } else {
            setTextFields([

            ]);
        }
    }, [currentImageIndex]);


    useEffect(() => {
        if (images && images.length > 0) {
            setImageUrl(images[currentImageIndex]); // Set default image from the first element
        }
    }, [images, currentImageIndex]);

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

    const handleAddImageClick = () => {
        setShowImageUploadOptions(true);
    };

    const handleClosePopup = () => {
        setShowImageUploadOptions(false);
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
   
    const navigate = useNavigate();


    const handleAddSmallImage = (src) => {
        const newImage = {
            id: `smallImage${Date.now()}`,
            src,
            x: 300, // Adjust this based on the container's position
            y: 250,
            size: 50, // Default size
        };
        setSmallImages((prevImages) => [...prevImages, newImage]);
    };

    return (
        <div className="container mx-auto md:bg-gradient-to-br">
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

                    className="px-4 py-1 rounded bg-[#AF7D32] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#643C28] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#AF7D32] focus:outline-none flex items-center gap-2 ">


                    Download Video
                </button>
            </div>

            <hr className="border-gray-300 w-full " />

            <div className="flex w-full relative">
                <div className="hidden md:block absolute top-0 bottom-0 border-l-2 border-gray-300"></div>

                <div
                    className="flex flex-col ml-14 w-full relative"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div className="flex flex-col 2xl:mb-6 md:ml-0  xl:mb-6 xl:ml-96 md:mr-4 xl:mr-20 md-mr-10 lg:mr-10">
                        <div className="relative md:w-3/5 lg:w-80 lg:h-112 flex items-center mr-8 rounded-lg shadow-md border border-gray-200 bg-gray-50 overflow-hidden">

                            <video
                                src={video}
                                controls
                                className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            />

                            {textFields.map(({ id, text, x, y, size, font }) => (
                                <div
                                    key={id}
                                    className={`absolute ${selectedField === id ? 'border-2 border-blue-500' : ''}`}
                                    style={{
                                        top: y,
                                        left: x,
                                        fontSize: `${size}px`,
                                        fontFamily: font,
                                        whiteSpace: 'nowrap', // Prevents text wrapping
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

                                <span>Save</span>
                            </button>

                            {/* Preview Button */}
                            <button
                                onClick={() => setIsPreviewOpen(true)}
                                className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                            >

                                <span>Preview</span>
                            </button>
                        </div>
                    </div>

                    {isPreviewOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                                
                              
<div className="relative w-80 h-112">
    <video src={video} controls className="w-full h-full object-cover" />
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
    {smallImages.map(({ id, src, x, y, size }) => (
        <img
            key={id}
            src={src}
            alt="Small"
            className="absolute"
            style={{
                top: y,
                left: x,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)', // Ensure the image is centered
            }}
        />
    ))}
</div>
                                <button
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Close Preview
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
                                 
                            >
                                <span>Edit</span>
                            </button>
                            <button
                                onClick={handleAddNewText}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-md hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                            >
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
                                <span>Font</span>
                            </button>

                            {/* Add Images Button */}
                            <button
                                onClick={handleAddImageClick}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-md hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
                            >


                                <span>Images</span>
                            </button>
                        </div>
                    </div>

                    {smallImages.map(({ id, src, x, y, size }) => (
                        <img
                            key={id}
                            src={src}
                            alt="Small"
                            className="absolute"
                            style={{
                                top: `${y}px`,
                                left: `${x}px`,
                                width: `${size}px`,
                                height: `${size}px`,
                            }}
                        />
                    ))}

                    {showImageUploadOptions && (
                        <ImageUploadOptions
                            onClose={handleClosePopup}
                            onSelect={handleSelectUploadOption}
                        />

            </div>

        </div >
    );
}

