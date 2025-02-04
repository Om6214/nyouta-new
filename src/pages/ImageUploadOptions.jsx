import React from 'react';
import { FaFolderOpen } from 'react-icons/fa'; // Local Drive icon
import { FcGoogle } from 'react-icons/fc'; // Google Drive icon
import { SiDropbox,  } from 'react-icons/si'; // Dropbox, OneDrive
import { FaMicrosoft } from "react-icons/fa6";
import { MdPhotoLibrary } from 'react-icons/md'; // Google Photos
import { IoClose } from 'react-icons/io5'; // Close icon

const ImageUploadOptions = ({ onClose, onSelect }) => {
  const handleSelect = (option) => {
    onSelect(option);
    onClose();
  };

  const buttonStyle =
    "flex items-center gap-2 px-4 py-1 rounded bg-[#AF7D32] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#643C28] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#AF7D32] focus:outline-none py-2";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Add Image</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition duration-200"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button onClick={() => handleSelect('local')} className={buttonStyle}>
            <FaFolderOpen size={24} /> Local Drive
          </button>

          <button onClick={() => handleSelect('googleDrive')} className={buttonStyle}>
            <FcGoogle size={24} /> Google Drive
          </button>

          <button onClick={() => handleSelect('dropbox')} className={buttonStyle}>
            <SiDropbox size={24} /> Dropbox
          </button>

          <button onClick={() => handleSelect('oneDrive')} className={buttonStyle}>
            <FaMicrosoft size={24} /> OneDrive
          </button>

          <button onClick={() => handleSelect('googlePhotos')} className={buttonStyle}>
            <MdPhotoLibrary size={24} /> Google Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadOptions;
