import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Preview from '../pages/Preview';

export default function ShareView() {
  const { state } = useParams();
  const [design, setDesign] = useState(null);

  useEffect(() => {
    try {
      const decodedState = JSON.parse(atob(state));
      setDesign(decodedState);
    } catch (error) {
      console.error('Invalid share URL:', error);
    }
  }, [state]);

  if (!design) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Wedding Card Design</h1>
      <Preview
        images={design.smallImages}
        textFields={design.textFields}
        stickers={design.stickers}
        currentImage={design.images[design.currentImageIndex]}
        isSharedView
      />
    </div>
  );
}