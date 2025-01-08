import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { 
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';


// SortablePhoto component
function SortablePhoto({ id, photo, index, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-move"
    >
      <img
        src={photo}
        alt={`Upload ${index + 1}`}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <p className="text-sm text-gray-600">Photo {index + 1}</p>
        <button
          className="text-red-500 text-sm hover:text-red-700"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const layouts = [
  { 
    id: "layout1", 
    name: "Layout 1",
    structure: [
      { className: "text-1", style: { height: "46%", width: "50%", top: "2%", left: "30%" } },
      { className: "text-1b", style: { height: "46%", width: "50%", bottom: "2%", left: "15%" } },
    ]
  },
  { 
    id: "layout2", 
    name: "Layout 2",
    structure: [
      { className: "text-1", style: { height: "40%", width: "30%", top: "2%", left: "15%" } },
      { className: "text-1c", style: { height: "40%", width: "30%", top: "2%", right: "15%" } },
      { className: "text-1b", style: { height: "50%", width: "60%", bottom: "4%", left: "20%" } },
    ]
  },
  { 
    id: "layout3", 
    name: "Layout 3",
    structure: [
      { className: "text-1", style: { height: "45%", width: "46%", top: "4%", left: "10%" } },
      { className: "text-1c", style: { height: "45%", width: "32%", top: "4%", right: "10%" } },
      { className: "text-1b", style: { height: "45%", width: "32%", bottom: "4%", left: "10%" } },
      { className: "text-1d", style: { height: "45%", width: "46%", bottom: "4%", right: "10%" } },
    ]
  },
];

const templateSizes = [
  { id: 'small', name: 'Small', dimensions: { width: 600, height: 600 } },
  { id: 'medium', name: 'Medium', dimensions: { width: 800, height: 800 } },
  { id: 'large', name: 'Large', dimensions: { width: 1000, height: 1000 } },
];

export default function PhotoBook() {
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedSize, setSelectedSize] = useState(templateSizes[1]);
  
  const location = useLocation();
  const image = location.state?.image;
  const templateImage = image;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedPhotos((prev) => [...prev, ...files]);
  };

  const handleDeletePhoto = (index) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      setUploadedPhotos((items) => {
        const oldIndex = parseInt(active.id);
        const newIndex = parseInt(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-3 md:p-5 gap-4">
      {/* Left Section - Layout Selection */}
      <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Template Size</h2>
          <div className="grid grid-cols-3 gap-2">
            {templateSizes.map((size) => (
              <button
                key={size.id}
                className={`p-2 text-sm rounded-md transition-colors ${
                  selectedSize.id === size.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-3">Choose Layout</h2>
        <div className="space-y-4">
          {layouts.map((layout) => (
            <div key={layout.id} className="space-y-2">
              <button
                className={`w-full p-2 text-left rounded-md transition-colors ${
                  selectedLayout.id === layout.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedLayout(layout)}
              >
                {layout.name}
              </button>
              
              <div className="relative w-32 h-32 border-2 mx-auto border-gray-300 rounded-md overflow-hidden">
                {layout.structure.map((item, index) => (
                  <div
                    key={index}
                    className="absolute border-2 border-black bg-white"
                    style={{
                      ...item.style,
                      position: "absolute"
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Section - Template Display */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-3">Photobook Preview</h2>
        <div 
          className="relative border-2 border-gray-300 shadow-md bg-gray-50 rounded-md overflow-hidden"
          style={{
            width: `${selectedSize.dimensions.width}px`,
            height: `${selectedSize.dimensions.height}px`,
            maxWidth: '100%',
            maxHeight: '80vh',
            aspectRatio: '1/1'
          }}
        >
          <img
            src={templateImage}
            alt="Template"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0">
            {selectedLayout.structure.map((item, index) => (
              <div
                key={index}
                className="absolute border-2 border-black bg-white overflow-hidden"
                style={{
                  ...item.style,
                  position: "absolute"
                }}
              >
                {uploadedPhotos[index] ? (
                  <img
                    src={uploadedPhotos[index]}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Empty
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Photo Upload and Arrangement */}
      <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Upload Photos</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          className="mb-3 w-full border border-gray-300 p-2 rounded-md"
          onChange={handlePhotoUpload}
        />
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={uploadedPhotos.map((_, index) => index.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {uploadedPhotos.map((photo, index) => (
                <SortablePhoto 
                  key={index}
                  id={index.toString()}
                  photo={photo}
                  index={index}
                  onDelete={handleDeletePhoto}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}