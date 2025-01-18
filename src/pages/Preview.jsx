import React, { useRef } from 'react';

const Preview = ({ images, textFields, stickers, currentImage, onClose }) => {
  const previewRef = useRef();
  //console.log("child stickers", images);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative   flex flex-col items-center rounded-lg shadow-md border border-gray-200 bg-gray-50 overflow-hidden"
      style={{width:"270px"}}>
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div ref={previewRef} className="relative w-full h-auto">
          {/* Main Image */}
          <img src={currentImage} alt="Preview" className="w-full h-auto object-cover rounded" />
  
          {/* Text Fields */}
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
              angle, // Add angle here
            }) => {
              const containerWidth = 320; // Container width
              const containerHeight = 608; // Container height
  
              // Clamping the x and y positions
              const clampedX = Math.max(0, Math.min(x, containerWidth));
              const clampedY = Math.max(0, Math.min(y, containerHeight));
  
              return (
                <div
                  key={id}
                  className="absolute"
                  style={{
                    top: clampedY,
                    left: clampedX,
                    fontSize: `${size}px`,
                    fontFamily: font,
                    color: fontColor, // Apply dynamic font color
                    fontWeight: isBold ? 'bold' : 'normal', // Apply bold if true
                    fontStyle: isItalic ? 'italic' : 'normal', // Apply italic if true
                    textAlign: textAlign, // Apply text alignment
                    lineHeight: lineHeight, // Apply line height
                    letterSpacing: `${letterSpacing}px`, // Apply letter spacing
                    transform: `translate(-50%, -50%) rotate(${angle || 0}deg)`, // Apply rotation
                    whiteSpace: 'nowrap',
                  }}
                >
                  {text.split('\n').map((line, index) => (
                    <div key={index}>{line}</div> // Render each line separately
                  ))}
                </div>
              );
            }
          )}
  
          {/* Small Images */}
          {images.map(({ id, src, x, y, width, height }) => (
            <img
              key={id}
              src={src}
              alt={`Image ${id}`}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            />
          ))}
  
          {/* Stickers */}
          {stickers.map(({ id, src, x, y, width, height, rotation }) => (
            <img
              key={id}
              src={src}
              alt={`Sticker ${id}`}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
                transform: `rotate(${rotation}deg)`,
              }}
            />
          ))}
        </div>
  
        {/* Close Button */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Preview;
