import React, { useEffect, useState, useRef } from 'react';
import * as fabric from 'fabric';

const WeddingCardEditor = () => {
  const canvasRef = useRef(null); // Reference for the canvas element
  const [canvas, setCanvas] = useState(null);
  const [inputs, setInputs] = useState({
    bride: 'Tarushi',
    groom: 'Rakesh',
    date: '25 Nov. 2024',
  });

  useEffect(() => {
    // Initialize the Fabric.js canvas
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,  // Set the width of the canvas
      height: 557, // Set the height of the canvas
    });

    // Create an HTML Image element
    const imgElement = new Image();
    imgElement.src = '/image.jpg'; // Path to the image

    // Once the image is loaded, create a Fabric.js Image object
    imgElement.onload = () => {
      // Create a fabric image object from the loaded HTML image element
      const img = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
        scaleX: fabricCanvas.width / imgElement.width,
        scaleY: fabricCanvas.height / imgElement.height,
      });

      // Add the image as an object (acting as a background)
      fabricCanvas.add(img);
      
      // Send the image to the back after adding it to the canvas
      img.sendToBack();

      // Render the canvas
      fabricCanvas.renderAll();
      console.log('Background image set successfully');
    };

    // Create text objects for bride, groom, and date
    const brideText = new fabric.Text(inputs.bride, {
      left: 150,  // Position of the bride's name on the canvas
      top: 300,   // Position of the bride's name on the canvas
      fontSize: 30,
      fill: 'white',
    });

    const groomText = new fabric.Text(inputs.groom, {
      left: 150,  // Position of the groom's name on the canvas
      top: 350,   // Position of the groom's name on the canvas
      fontSize: 30,
      fill: 'white',
    });

    const dateText = new fabric.Text(inputs.date, {
      left: 150,  // Position of the wedding date on the canvas
      top: 400,   // Position of the wedding date on the canvas
      fontSize: 20,
      fill: 'yellow',
    });

    // Add text objects to the canvas
    fabricCanvas.add(brideText, groomText, dateText);

    // Ensure the canvas is updated after adding the text objects
    fabricCanvas.renderAll();

    // Set the canvas state
    setCanvas({ fabricCanvas, brideText, groomText, dateText });

    // Cleanup to dispose of the canvas when the component unmounts
    return () => {
      fabricCanvas.dispose();
    };
  }, [inputs]);  // Rerun the effect when 'inputs' changes

  return (
    <div>
      <canvas id="weddingCanvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default WeddingCardEditor;
