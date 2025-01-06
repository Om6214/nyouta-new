import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const SmallImage = ({ src, id, x, y, onDelete, onResize }) => {
  const [position, setPosition] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(50); // Default size of the image
  const [resizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, initialSize: 50 });

  // Update position when x or y props change
  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      setPosition({ x: newX, y: newY });
      onResize(id, newX, newY); // Update position in the parent
    }
    if (resizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const delta = Math.max(deltaX, deltaY); // Choose the larger delta for resizing
      const newSize = Math.max(resizeStart.initialSize + delta, 20); // Ensure a minimum size
      setSize(newSize);
      onResize(id, position.x, position.y, newSize); // Update size in the parent
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, initialSize: size });
  };

  // Attach mousemove and mouseup events globally while dragging or resizing
  useEffect(() => {
    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing]);

  return (
    <div
      className="absolute"
      style={{
        top: position.y,
        left: position.x,
        cursor: 'move',
        zIndex: 10,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Render the small image */}
      <img
        src={src}
        alt="Small Icon"
        className="object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
      />

      {/* Delete button */}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-0 right-0 bg-white rounded-full p-1"
        style={{ transform: 'translate(50%, -50%)' }}
      >
        <FaTrash size={13} />
      </button>

      {/* Resize handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute right-0 bottom-0 w-4 h-4 bg-gray-500 cursor-se-resize"
        style={{ transform: 'translate(50%, 50%)' }}
      />
    </div>
  );
};

export default SmallImage;
