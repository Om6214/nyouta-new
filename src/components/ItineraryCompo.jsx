import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bold, Italic, Type, Move } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ItineraryCompo = () => {
  const location = useLocation();
  const templateImage = location.state?.image;

  const [textElements, setTextElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Text element structure
  const createTextElement = (x, y) => ({
    id: Date.now(),
    text: 'Click to edit',
    x,
    y,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'Arial'
  });

  // Handle double click to add new text
  const handleDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newElement = createTextElement(x, y);
    setTextElements([...textElements, newElement]);
    setSelectedElement(newElement);
  };

  // Handle text element selection
  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedElement) {
      setTextElements(textElements.filter(el => el.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };

  const handleDelete = () => {
    if (selectedElement) {
      setTextElements(textElements.filter(el => el.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };
  
  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(document.querySelector('.canvas-container'));
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save('itinerary.pdf');
  };

  const handleSave = () => {
    localStorage.setItem('savedTextElements', JSON.stringify(textElements));
    alert('Itinerary saved successfully!');
  };
  
  // Load on component mount
  useEffect(() => {
    const savedElements = localStorage.getItem('savedTextElements');
    if (savedElements) {
      setTextElements(JSON.parse(savedElements));
    }
  }, []);
  
  // Handle text editing
  const handleTextChange = (e) => {
    if (!selectedElement) return;
    
    const updatedElements = textElements.map(el =>
      el.id === selectedElement.id ? { ...el, text: e.target.value } : el
    );
    setTextElements(updatedElements);
  };

  // Handle font styling
  const updateTextStyle = (property, value) => {
    if (!selectedElement) return;
    
    const updatedElements = textElements.map(el =>
      el.id === selectedElement.id ? { ...el, [property]: value } : el
    );
    setTextElements(updatedElements);
  };

  

  // Handle dragging
  const handleMouseDown = (element, e) => {
    e.stopPropagation();
    setIsDragging(true);
    setSelectedElement(element);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedElement) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    const updatedElements = textElements.map(el =>
      el.id === selectedElement.id ? { ...el, x, y } : el
    );
    setTextElements(updatedElements);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className=" w-full h-full min-h-screen bg-gray-100"  tabIndex={0} 
  onKeyDown={handleKeyDown}>
      {/* Toolbar */}
      <div className="fixed bg-white shadow-md p-4 z-10">
      <div className="flex items-center gap-4">
          {/* Font Family */}
          <select
            className="p-2 border rounded"
            value={selectedElement?.fontFamily}
            onChange={(e) => updateTextStyle('fontFamily', e.target.value)}
            disabled={!selectedElement}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>

          {/* Font Size */}
          <select
            className="p-2 border rounded"
            value={selectedElement?.fontSize}
            onChange={(e) => updateTextStyle('fontSize', Number(e.target.value))}
            disabled={!selectedElement}
          >
            {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map(size => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>

          {/* Style Buttons */}
          <button
            className={`p-2 rounded ${selectedElement?.fontWeight === 'bold' ? 'bg-blue-100' : ''}`}
            onClick={() => updateTextStyle('fontWeight', selectedElement?.fontWeight === 'bold' ? 'normal' : 'bold')}
            disabled={!selectedElement}
          >
            <Bold size={20} />
          </button>

          <button
            className={`p-2 rounded ${selectedElement?.fontStyle === 'italic' ? 'bg-blue-100' : ''}`}
            onClick={() => updateTextStyle('fontStyle', selectedElement?.fontStyle === 'italic' ? 'normal' : 'italic')}
            disabled={!selectedElement}
          >
            <Italic size={20} />
          </button>

        </div>
        {/* <div className=" right-0 bg-white shadow-md p-4 z-50 flex gap-4">
  <button className="p-2 rounded bg-green-500 text-white" onClick={handleSave}>
    Save
  </button> */}
  {/* <button className="p-2 rounded bg-blue-500 text-white" onClick={handleDownloadPDF}>
    Download PDF
  </button>
</div> */}
<div className='flex justify-center gap-4 mt-4'>
<button className="p-2 rounded bg-red-500 text-white" onClick={handleDelete} disabled={!selectedElement}>
  Delete
</button>
<button className="p-2 rounded bg-green-500 text-white" onClick={handleSave}>
    Save
  </button>
      </div>
      </div>

      {/* Canvas */}
      <div className='flex justify-center text-xl mb-5'>Edit Your Template</div>
      <div 
        className="relative  w-full min-h-[calc(100vh-4rem)] canvas-container"
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
        {textElements.map(element => (
          <div
            key={element.id}
            className="absolute cursor-move"
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
                fontFamily: element.fontFamily
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>
      


    </div>
  );
};

export default ItineraryCompo;