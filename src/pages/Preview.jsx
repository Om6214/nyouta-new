import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Preview = ({ images, textFields, currentImage, onClose }) => {
  const previewRef = useRef();

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('preview.pdf');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div ref={previewRef} className="relative w-80 h-112">
          <img src={currentImage} alt="Preview" className="w-full h-full object-cover rounded" />
          {textFields.map(({ id, text, x, y, size, font }) => (
            <div
              key={id}
              className="absolute"
              style={{
                top: y,
                left: x,
                fontSize: `${size}px`,
                fontFamily: font,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {text}
            </div>
          ))}
          {images.map(({ id, src, x, y, size }) => (
            <img
              key={id}
              src={src}
              alt={`Small Image ${id}`}
              className="absolute"
              style={{
                top: y+54,
                left: x-180,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <button onClick={onClose} className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300">
            Close Preview
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
