import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bold, Italic, Type, Move, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ItineraryCompo = () => {
  const location = useLocation();
  const templateImage = location.state?.image;

  const [textElements, setTextElements] = useState([]);
  const [imageElements, setImageElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);

  // Text element structure
  const createTextElement = (x, y) => ({
    id: Date.now(),
    type: 'text',
    text: 'Click to edit',
    x,
    y,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'Arial',
    color: '#000000'
  });

  // Image element structure
  const createImageElement = (x, y, file) => ({
    id: Date.now(),
    type: 'image',
    x,
    y,
    width: 200,
    height: 200,
    url: URL.createObjectURL(file)
  });

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = createImageElement(100, 100, file);
      setImageElements([...imageElements, newImage]);
      setSelectedElement(newImage);
    }
  };

  // Handle double click to add new text
  const handleDoubleClick = (e) => {
    if (selectedElement?.type === 'image') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newElement = createTextElement(x, y);
    setTextElements([...textElements, newElement]);
    setSelectedElement(newElement);
  };

  // Handle element selection
  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedElement) {
      if (selectedElement.type === 'text') {
        setTextElements(textElements.filter(el => el.id !== selectedElement.id));
      } else {
        setImageElements(imageElements.filter(el => el.id !== selectedElement.id));
      }
      setSelectedElement(null);
    }
  };

  const handleDelete = () => {
    if (selectedElement) {
      if (selectedElement.type === 'text') {
        setTextElements(textElements.filter(el => el.id !== selectedElement.id));
      } else {
        setImageElements(imageElements.filter(el => el.id !== selectedElement.id));
      }
      setSelectedElement(null);
    }
  };

  // Handle save and load
  const handleSave = () => {
    const saveData = {
      textElements,
      imageElements: imageElements.map(img => ({
        ...img,
        url: null // Don't save URLs, they'll be invalid after reload
      }))
    };
    localStorage.setItem('savedElements', JSON.stringify(saveData));
    alert('Itinerary saved successfully!');
  };

  useEffect(() => {
    const savedData = localStorage.getItem('savedElements');
    if (savedData) {
      const { textElements: savedText, imageElements: savedImages } = JSON.parse(savedData);
      setTextElements(savedText);
      // Don't load saved images as their URLs will be invalid
    }
  }, []);

  // Handle text editing
  const handleTextChange = (e) => {
    if (!selectedElement || selectedElement.type !== 'text') return;
    
    const updatedElements = textElements.map(el =>
      el.id === selectedElement.id ? { ...el, text: e.target.value } : el
    );
    setTextElements(updatedElements);
  };

  // Handle style updates
  const updateTextStyle = (property, value) => {
    if (!selectedElement || selectedElement.type !== 'text') return;
    
    const updatedElements = textElements.map(el =>
      el.id === selectedElement.id ? { ...el, [property]: value } : el
    );
    setTextElements(updatedElements);
  };

  // Handle dragging
  const handleMouseDown = (element, e, isResizeHandle = false) => {
    e.stopPropagation();
    setSelectedElement(element);
    if (isResizeHandle) {
      setResizing(true);
    } else {
      setIsDragging(true);
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!selectedElement) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    if (isDragging) {
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      
      if (selectedElement.type === 'text') {
        setTextElements(elements => elements.map(el =>
          el.id === selectedElement.id ? { ...el, x, y } : el
        ));
      } else {
        setImageElements(elements => elements.map(el =>
          el.id === selectedElement.id ? { ...el, x, y } : el
        ));
      }
    } else if (resizing && selectedElement.type === 'image') {
      const width = Math.max(50, e.clientX - rect.left - selectedElement.x);
      const height = Math.max(50, e.clientY - rect.top - selectedElement.y);
      
      setImageElements(elements => elements.map(el =>
        el.id === selectedElement.id ? { ...el, width, height } : el
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
  };

  return (
    <div className="w-full h-full min-h-screen bg-gray-100" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Toolbar */}
      <div className="fixed bg-white shadow-md p-4 z-10 w-full">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Text Controls - Only show when text is selected */}
          {selectedElement?.type === 'text' && (
            <>
              <select
                className="p-2 border rounded"
                value={selectedElement?.fontFamily}
                onChange={(e) => updateTextStyle('fontFamily', e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>

              <select
                className="p-2 border rounded"
                value={selectedElement?.fontSize}
                onChange={(e) => updateTextStyle('fontSize', Number(e.target.value))}
              >
                {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>

              <input
                type="color"
                value={selectedElement?.color}
                onChange={(e) => updateTextStyle('color', e.target.value)}
                className="p-1 border rounded"
              />

              <button
                className={`p-2 rounded ${selectedElement?.fontWeight === 'bold' ? 'bg-blue-100' : ''}`}
                onClick={() => updateTextStyle('fontWeight', selectedElement?.fontWeight === 'bold' ? 'normal' : 'bold')}
              >
                <Bold size={20} />
              </button>

              <button
                className={`p-2 rounded ${selectedElement?.fontStyle === 'italic' ? 'bg-blue-100' : ''}`}
                onClick={() => updateTextStyle('fontStyle', selectedElement?.fontStyle === 'italic' ? 'normal' : 'italic')}
              >
                <Italic size={20} />
              </button>
            </>
          )}

          {/* Image Upload */}
          <label className="p-2 rounded bg-blue-500 text-white cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <ImageIcon size={20} className="inline mr-2" />
            Add Image
          </label>

          {/* General Controls */}
          <button className="p-2 rounded bg-red-500 text-white" onClick={handleDelete} disabled={!selectedElement}>
            Delete
          </button>
          <button className="p-2 rounded bg-green-500 text-white" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center text-xl mb-5 pt-24">Edit Your Template</div>
      <div 
        className="relative w-full min-h-[calc(100vh-4rem)] canvas-container"
        style={{
          backgroundImage: `url(${templateImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        onDoubleClick={handleDoubleClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Text Elements */}
        {textElements.map(element => (
          <div
            key={element.id}
            className={`absolute cursor-move ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: element.x,
              top: element.y,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={(e) => handleElementClick(element, e)}
            onMouseDown={(e) => handleMouseDown(element, e)}
          >
            <input
              type="text"
              value={element.text}
              onChange={handleTextChange}
              className="bg-transparent border-none outline-none text-center"
              style={{
                fontSize: `${element.fontSize}px`,
                fontWeight: element.fontWeight,
                fontStyle: element.fontStyle,
                fontFamily: element.fontFamily,
                color: element.color
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}

        {/* Image Elements */}
        {imageElements.map(element => (
          <div
            key={element.id}
            className={`absolute cursor-move ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height
            }}
            onClick={(e) => handleElementClick(element, e)}
            onMouseDown={(e) => handleMouseDown(element, e)}
          >
            <img
              src={element.url}
              alt="Uploaded content"
              className="w-full h-full object-cover"
            />
            {selectedElement?.id === element.id && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
                onMouseDown={(e) => handleMouseDown(element, e, true)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryCompo;