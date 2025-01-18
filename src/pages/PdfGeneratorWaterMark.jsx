import React, { useRef, useState,useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

const PdfGeneratorWaterMark = ({ savedPages, savedSmallImages, savedStickers, images }) => {
 
  const [isDownloading, setIsDownloading] = useState(false);
  // Destructure data passed through React Router's state
 

  const previewRefs = useRef([]); // Store refs for each page
console.log("working");
  useEffect(() => {
    generatePDF();
  }, []);


  const generatePDF = async () => {
    setIsDownloading(true);
    try {
      let pdf;
  
      for (let pageIndex = 0; pageIndex < images.length; pageIndex++) {
        const pageRef = previewRefs.current[pageIndex];
        if (!pageRef) continue;
  
        // Render the DOM element to a canvas
        const canvas = await html2canvas(pageRef, {
          scale: 2, // Increase the resolution
          useCORS: true, // Allow cross-origin for external images
        });
  
        // Get image dimensions
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
  
        // Convert canvas to image data
        const imageData = canvas.toDataURL("image/png");
  
        // Initialize PDF with custom dimensions for the first page
        if (pageIndex === 0) {
          pdf = new jsPDF("portrait", "px", [imgWidth, imgHeight]);
        } else {
          pdf.addPage([imgWidth, imgHeight]); // Add new page with the same dimensions
        }
  
        // Add image to the PDF page
        pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      }
  
      // Save the generated PDF
      pdf.save("generated.pdf");
      setIsDownloading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  };



  return (
      <div>
        {isDownloading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-center">
              <div className="w-24 h-24 border-8 border-solid border-[#AF7D32] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white text-lg font-semibold mt-4">PDF is being prepared, please wait...</p>
            </div>
          </div>
        )}
  
        <div style={{ clip: "rect(0, 0, 0, 0)", position: "absolute" }}>
          {images.map((currentImage, pageIndex) => {
            const pageData = savedPages[pageIndex];
            const smallImagesData = savedSmallImages[pageIndex] || [];
            const pageStickers = savedStickers[pageIndex] || [];
  
            return (
              <div
                key={pageIndex}
                ref={(el) => (previewRefs.current[pageIndex] = el)}
                className="relative  overflow-hidden border border-gray-300 shadow-lg rounded-xl bg-white"
                style={{width:"270px"}}
              >
                <img src={currentImage} alt={`Page ${pageIndex + 1}`} className="w-full h-full object-cover" />
               
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
                    const containerWidth = 320;
                    const containerHeight = 608;
  
                    const clampedX = Math.max(0, Math.min(x, containerWidth));
                    const clampedY = Math.max(0, Math.min(y, containerHeight));
  
                    return (
                      <div
                        key={id}
                        className="absolute"
                        style={{
                          top: clampedY-10,
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
      </div>
    );

}




export default PdfGeneratorWaterMark;
