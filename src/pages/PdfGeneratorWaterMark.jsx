import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

const PdfGeneratorWaterMark = () => {
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  // Destructure data passed through React Router's state
  const { savedPages, savedSmallImages, savedStickers, images } = location.state || {};

  const previewRefs = useRef([]); // Store refs for each page



  const generatePDF = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF("portrait", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let pageIndex = 0; pageIndex < images.length; pageIndex++) {
        const pageRef = previewRefs.current[pageIndex];
        if (!pageRef) continue;

        // Step 1: Capture the page as an image
        const canvas = await html2canvas(pageRef, {
          scale: 2, // High resolution for better quality
          useCORS: true, // Allow cross-origin images
        });

        // Step 2: Convert canvas to image data
        const imageData = canvas.toDataURL("image/png");

        // Step 3: Scale the image to fit the PDF page
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const pdfImgWidth = imgWidth * scaleFactor;
        const pdfImgHeight = imgHeight * scaleFactor;

        const xOffset = (pdfWidth - pdfImgWidth) / 2;
        const yOffset = (pdfHeight - pdfImgHeight) / 2;

        // Step 4: Add the image to the PDF
        pdf.addImage(imageData, "PNG", xOffset, yOffset, pdfImgWidth, pdfImgHeight);

        // Add a new page if not the last page
        if (pageIndex < images.length - 1) {
          pdf.addPage();
        }
      }

      // Step 5: Save the PDF
      pdf.save("generated.pdf");
      console.log("PDF generated successfully.");
      setIsDownloading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };


  return (
    <div>

      {isDownloading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center">
            {/* Loading Circle */}
            <div className="w-24 h-24 border-8 border-solid border-[#AF7D32] border-t-transparent rounded-full animate-spin mx-auto"></div>

            {/* Loading Text */}
            <p className="text-white text-lg font-semibold mt-4">PDF is being prepared, please wait...</p>
          </div>
        </div>
      )}
      <div className="flex-1 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 hidden md:block tracking-wide">See Your Customized Pages</h1>
      </div>
      {/* Render all pages dynamically in a single row */}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {images.map((currentImage, pageIndex) => {
          const pageData = savedPages[pageIndex];
          const smallImagesData = savedSmallImages[pageIndex] || [];
          const pageStickers = savedStickers[pageIndex] || [];

          return (


            <div
              key={pageIndex}
              ref={(el) => (previewRefs.current[pageIndex] = el)} // Store refs for each page
              className="relative w-80 h-112 overflow-hidden border border-gray-300 shadow-lg rounded-xl bg-white transform  hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              {/* Main Image */}
              <img
                src={currentImage}
                alt={`Page ${pageIndex + 1}`}
                className="w-full h-full object-cover "
              />


              {/* Text Fields */}
              {pageData.map(
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
                  angle,
                }) => {
                  const containerWidth = 320; // Container width
                  const containerHeight = 608; // Container height

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
                        color: fontColor,
                        fontWeight: isBold ? "bold" : "normal",
                        fontStyle: isItalic ? "italic" : "normal",
                        textAlign: textAlign,
                        lineHeight: lineHeight,
                        letterSpacing: `${letterSpacing}px`,
                        transform: `translate(-50%, -50%) rotate(${angle || 0}deg)`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {text.split("\n").map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  );
                }
              )}

              {/* Small Images */}
              {smallImagesData.map(({ id, src, x, y, width, height }) => (
                <img
                  key={id}
                  src={src}
                  alt={`Small Image ${id}`}
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
              {pageStickers.map(({ id, src, x, y, width, height, rotation }) => (
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
                    transform: `rotate(${rotation || 0}deg)`,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Generate PDF Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );

}




export default PdfGeneratorWaterMark;
