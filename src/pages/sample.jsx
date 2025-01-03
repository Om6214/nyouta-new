import React, { useRef } from "react";

const PrevievVideo = ({ videos, textFields, stickers, currentVideo, onClose }) => {
  const previewRef = useRef();
  const images=videos;
console.log("videos",videos);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>

        <div ref={previewRef} className="relative w-80 h-112 overflow-hidden">
          {/* Main Video */}
          {currentVideo ? (
            <video
              src={currentVideo}
              className="w-full h-full object-cover rounded"
              autoPlay
              loop
              controls
            />
          ) : (
            <p>No video selected</p>
          )}

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
              angle, // New angle property
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
                    fontWeight: isBold ? "bold" : "normal", // Apply bold if true
                    fontStyle: isItalic ? "italic" : "normal", // Apply italic if true
                    textAlign: textAlign, // Apply text alignment
                    lineHeight: lineHeight, // Apply line height
                    letterSpacing: `${letterSpacing}px`, // Apply letter spacing
                    transform: `translate(-50%, -50%) rotate(${angle || 0}deg)`, // Apply rotation
                    whiteSpace: "nowrap",
                  }}
                >
                  {text.split("\n").map((line, index) => (
                    <div key={index}>{line}</div> // Render each line separately
                  ))}
                </div>
              );
            }
          )}

          {/* Small Videos */}
          {images.map(({ id, src, x, y, width, height }) => {
            if (y > 0) {
              y = y + 280;
              x = x + height + 10;
            } else {
              x = x + width - 80;
              y = y + 280;
            }

            return (
              <img
                key={id}
                src={src}
                alt={`Small Image ${id}`}
                className="absolute"
                style={{
                  top: y,
                  left: x,
                  width: `${width}px`,
                  height: `${height}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}

          {/* Stickers */}
          {stickers.map(({ id, src, x, y, width, height, rotation }) => {
            const adjustedY = y > 0 ? y + 280 : y + 290;

            return (
              <img
                key={id}
                src={src}
                alt={`Sticker ${id}`}
                className="absolute"
                style={{
                  top: adjustedY,
                  left: x,
                  width: `${width}px`,
                  height: `${height}px`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }}
              />
            );
          })}
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

export default PrevievVideo;
