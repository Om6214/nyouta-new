import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const SmallImage = ({ src, id, left, top, width, height, aspectRatio, onDelete, onResize }) => {
  const [position, setPosition] = useState({ left, top });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width, height });
  const [resizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

  // Update position and size when props change
  useEffect(() => {
    setPosition({ left, top });
    setSize({ width, height });
  }, [left, top, width, height]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!resizing) { // Prevent dragging while resizing
      setDragging(true);
      setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newLeft = e.clientX - offset.x;
      const newTop = e.clientY - offset.y;
      setPosition({ left: newLeft, top: newTop });
      onResize(id, newLeft, newTop, size.width, size.height); // Update position in the parent
    }

    if (resizing) {
      const deltaX = e.clientX - resizeStart.x;
      const newWidth = Math.max(size.width + deltaX, 20); // Ensure a minimum width
      const newHeight = newWidth / aspectRatio; // Maintain aspect ratio
      setSize({ width: newWidth, height: newHeight });
      onResize(id, position.left, position.top, newWidth, newHeight); // Update size in the parent
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the event from bubbling up
    setResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
  };

  // Attach mousemove and mouseup events globally while dragging or resizing
  useEffect(() => {
    const handleMouseMoveGlobal = (e) => handleMouseMove(e);
    const handleMouseUpGlobal = () => handleMouseUp();

    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [dragging, resizing]);

  return (
    <div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
        cursor: 'move',
        zIndex: 10,
      }}
      onMouseDown={handleMouseDown}
    >
      <img
        src={src}
        alt="Small Icon"
        className="object-cover"
        style={{ width: `${ size.width}px`, height: `${size.height}px` }}
      />
      <button
        onClick={() => onDelete(id)}
        className="absolute top-0 right-0 bg-white rounded-full p-1"
        style={{ transform: 'translate(50%, -50%)' }}
      >
        <FaTrash size={13} />
      </button>
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute right-0 bottom-0 w-4 h-4 bg-gray-500 cursor-se-resize"
        style={{ transform: 'translate(50%, 50%)' }}
      />
    </div>
  );
};

export default SmallImage;