import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import watermark from "../watermark/watermark.jpg";

const PdfGenerator = ({ savedPages, savedSmallImages, savedStickers, images }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRefs = useRef([]);
console.log("working");
  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF("portrait", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let pageIndex = 0; pageIndex < images.length; pageIndex++) {
        const pageRef = previewRefs.current[pageIndex];
        if (!pageRef) continue;

        const canvas = await html2canvas(pageRef, {
          scale: 2,
          useCORS: true,
        });

        const imageData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const pdfImgWidth = imgWidth * scaleFactor;
        const pdfImgHeight = imgHeight * scaleFactor;

        const xOffset = (pdfWidth - pdfImgWidth) / 2;
        const yOffset = (pdfHeight - pdfImgHeight) / 2;

        pdf.addImage(imageData, "PNG", xOffset, yOffset, pdfImgWidth, pdfImgHeight);

        if (pageIndex < images.length - 1) {
          pdf.addPage();
        }
      }

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
              className="relative w-80 h-112 overflow-hidden border border-gray-300 shadow-lg rounded-xl bg-white"
            >
              <img src={currentImage} alt={`Page ${pageIndex + 1}`} className="w-full h-full object-cover" />
              <img
                src={watermark}
                alt="Watermark"
                className="absolute bottom-2 right-2 opacity-90"
                style={{
                  width: "100px",
                  height: "auto",
                }}
              />
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
};

export default PdfGenerator;
