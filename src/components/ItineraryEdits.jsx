import { useEffect, useRef, useState } from "react";

const fonts = ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"];
const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64];

export default function ItineraryEdits({ image }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedWeight, setSelectedWeight] = useState("normal");
  const [selectedSize, setSelectedSize] = useState(24);
  const [italic, setItalic] = useState(false);
  const [stickers] = useState([
    "../assets/stickers/book.png",
  ]);

  // Initialize Canvas
  useEffect(() => {
    const initCanvas = async () => {
      try {
        const fabricModule = await import("fabric");
        const fabric = fabricModule.default || fabricModule;

        if (canvasRef.current) {
          // Clear any existing canvas instance
          if (canvas) {
            canvas.dispose();
          }

          // Create new canvas instance
          const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
          });

          if (image) {
            fabric.Image.fromURL(
              image,
              (img) => {
                // Calculate scaling to fit canvas while maintaining aspect ratio
                const scale = Math.min(
                  newCanvas.width / img.width,
                  newCanvas.height / img.height
                );

                img.set({
                  originX: 'left',
                  originY: 'top',
                  scaleX: scale,
                  scaleY: scale,
                });

                // Center the image
                const left = (newCanvas.width - img.width * scale) / 2;
                const top = (newCanvas.height - img.height * scale) / 2;
                img.set({ left, top });

                newCanvas.setBackgroundImage(img);
                newCanvas.renderAll();
              },
              {
                crossOrigin: 'anonymous'
              }
            );
          }

          setCanvas(newCanvas);
        }
      } catch (error) {
        console.error("Error initializing canvas:", error);
      }
    };

    initCanvas();

    // Cleanup function
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [image]);

  // Add Text
  const addText = () => {
    if (!canvas) return;

    const fabricModule = window.fabric;
    const text = new fabricModule.Textbox("Your Text Here", {
      left: 100,
      top: 100,
      fontSize: selectedSize,
      fontFamily: selectedFont,
      fontWeight: selectedWeight,
      fontStyle: italic ? "italic" : "normal",
      fill: "black",
      editable: true,
    });

    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
  };

  // Add Sticker
  const addSticker = (src) => {
    if (!canvas) return;

    const fabricModule = window.fabric;
    fabricModule.Image.fromURL(src, (img) => {
      img.scaleToWidth(100);
      img.set({ left: 150, top: 150, selectable: true });
      canvas.add(img);
      canvas.renderAll();
    });
  };

  // Save Image
  const downloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-template.png";
    link.click();
  };

  return (
    <div className="p-5 bg-gray-100 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Edit Your Template</h2>

      {/* Toolbar */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedFont(e.target.value)}
          value={selectedFont}
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedSize(Number(e.target.value))}
          value={selectedSize}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>

        <button
          className={`p-2 border rounded ${
            selectedWeight === "bold" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setSelectedWeight(selectedWeight === "bold" ? "normal" : "bold")}
        >
          Bold
        </button>

        <button
          className={`p-2 border rounded ${
            italic ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setItalic(!italic)}
        >
          Italic
        </button>

        <button 
          className="p-2 border rounded bg-green-500 text-white" 
          onClick={addText}
        >
          Add Text
        </button>

        <button 
          className="p-2 border rounded bg-red-500 text-white" 
          onClick={downloadImage}
        >
          Save
        </button>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="border shadow-lg bg-white"></canvas>
    </div>
  );
}