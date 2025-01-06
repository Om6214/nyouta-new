import React, { useRef, useState } from "react";

const PreviewVideo = ({ textFields, stickers, currentVideo, onClose }) => {
  const previewRef = useRef();
  const canvasRef = useRef();
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    if (!currentVideo) return alert("No video selected");

    const video = document.createElement("video");
    video.src = currentVideo;
    video.crossOrigin = "anonymous";

    // Wait for video to load completely
    video.onloadeddata = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Create MediaRecorder
      const stream = canvas.captureStream(30); // 30 FPS
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        // Combine chunks and create a video
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.webm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Play video and overlay frames on canvas
      video.play();
      let frameIndex = 0;
      const totalFrames = Math.floor(video.duration * 30); // 30 FPS

      const drawFrame = () => {
        if (frameIndex >= totalFrames) {
          mediaRecorder.stop();
          setIsRecording(false);
          return;
        }
console.log(1);
        // Sync video frame with the canvas frame
        video.currentTime = (frameIndex / totalFrames) * video.duration;

        // Wait until the current frame is updated
        video.ontimeupdate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Draw text fields
          textFields.forEach(({ text, x, y, size, font, fontColor, isBold, isItalic }) => {
            ctx.font = `${isBold ? "bold" : ""} ${isItalic ? "italic" : ""} ${size}px ${font}`;
            ctx.fillStyle = fontColor;
            ctx.fillText(text, x, y);
          });

          // Draw stickers
          stickers.forEach(({ src, x, y, width, height }) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              ctx.drawImage(img, x, y, width, height);
            };
          });

          // Record frame to mediaRecorder
          mediaRecorder.requestData();

          frameIndex++;
        };
      };

      drawFrame();
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>

        <div ref={previewRef} className="relative w-80 h-112 overflow-hidden">
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
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="mt-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-10 py-3 bg-[#AF7D32] text-white font-medium rounded-lg shadow-lg hover:bg-[#643C28] transform hover:scale-105 transition-all duration-300"
          >
            Close Preview
          </button>
          <button
            onClick={startRecording}
            className="flex items-center justify-center gap-2 px-10 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            {isRecording ? "Recording..." : "Start Recording"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewVideo;
