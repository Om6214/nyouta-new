import React, { useEffect } from "react";
import jsPDF from "jspdf";

const PdfGenerator = ({
  savedPages,
  savedSmallImages,
  savedStickers,
  images,
  textFields,
}) => {
  const generatePDF = async () => {
    console.log("PDF generation started...");
    const doc = new jsPDF("portrait", "px", "a4");

    const pdfPageWidth = doc.internal.pageSize.getWidth();
    const pdfPageHeight = doc.internal.pageSize.getHeight();

    // Loop through all pages and generate PDF content dynamically
    for (const pageIndex of Object.keys(savedPages)) {
      const pageData = savedPages[pageIndex];
      const smallImagesData = savedSmallImages[pageIndex] || [];
      const pageStickers = savedStickers[pageIndex] || [];
      const currentImage = images[pageIndex];

      if (currentImage) {
        const imgElement = document.createElement("img");
        imgElement.src = currentImage;
        imgElement.crossOrigin = "anonymous";

        let imgWidth = 0;
        let imgHeight = 0;

        await new Promise((resolve, reject) => {
          imgElement.onload = () => {
            imgWidth = imgElement.naturalWidth;
            imgHeight = imgElement.naturalHeight;
            resolve();
          };
          imgElement.onerror = (e) => {
            reject(e);
          };
        });

        const scaleFactor = Math.min(pdfPageWidth / imgWidth, pdfPageHeight / imgHeight);

        const pdfImgWidth = imgWidth * scaleFactor;
        const pdfImgHeight = imgHeight * scaleFactor;
        const xOffset = (pdfPageWidth - pdfImgWidth) / 2;
        const yOffset = (pdfPageHeight - pdfImgHeight) / 2;

        doc.addImage(currentImage, "JPEG", xOffset, yOffset, pdfImgWidth, pdfImgHeight);
      } else {
        break;
      }

      smallImagesData.forEach(({ src, x, y, width, height }) => {
        if (src && typeof x === "number" && typeof y === "number" && width > 0 && height > 0) {
          const containerWidth = 350;
          const containerHeight = 530;

          const scaleX = pdfPageWidth / containerWidth;
          const scaleY = pdfPageHeight / containerHeight;

          const scaledWidth = width * scaleX;
          const scaledHeight = height * scaleY;

          const xOffset = x * scaleX;
          const yOffset = y * scaleY;

          doc.addImage(src, "JPEG", xOffset + 28, yOffset, scaledWidth - 40, scaledHeight - 20);
        }
      });

      pageStickers.forEach(({ src, x, y, width, height, rotation }) => {
        if (src && typeof x === "number" && typeof y === "number" && width > 0 && height > 0) {
          const containerWidth = 350;
          const containerHeight = 530;

          const scaleX = pdfPageWidth / containerWidth;
          const scaleY = pdfPageHeight / containerHeight;

          const scaledWidth = width * scaleX;
          const scaledHeight = height * scaleY;

          const xOffset = x * scaleX;
          const yOffset = y * scaleY;

          doc.addImage(src, "PNG", xOffset + 28, yOffset, scaledWidth - 20, scaledHeight - 20, undefined, "S", rotation || 0);
        }
      });

      pageData.forEach(
        ({
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
          const containerWidth = 890;
          const containerHeight = 640;

          let scaleX = pdfPageWidth / containerWidth;
          let scaleY = pdfPageHeight / containerHeight;

          scaleX += 0.28;
          scaleY += 0.16;
          const clampedX = Math.max(0, Math.min(x, containerWidth)) * scaleX;
          const clampedY = Math.max(0, Math.min(y, containerHeight)) * scaleY;
          size = size + 10;
          const scaledSize = size * Math.min(scaleX, scaleY);
          const fontStyle = `${isBold ? "bold" : ""}${isItalic ? "italic" : ""}`;
          const selectedFont = font || "Blade Rush";
          doc.setFont(selectedFont, fontStyle);
          doc.setFontSize(scaledSize);
          doc.setTextColor(fontColor || "black");

          doc.text(text, clampedX+40, clampedY, {
            align: textAlign || "left",
            angle: angle || 0,
          });
        }
      );

      if (parseInt(pageIndex, 10) < Object.keys(savedPages).length - 1) {
        doc.addPage();
      }
    }

    console.log("PDF generation completed.");
    doc.save("generated.pdf");
  };

  useEffect(() => {
    generatePDF(); // Automatically generate PDF on component render
  }, []); // Empty dependency array ensures it runs only once on mount

  return null; // No button or UI element needed
};


export default PdfGenerator;
