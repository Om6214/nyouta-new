import { useState } from "react";
import { toast } from "react-toastify";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaCopy } from "react-icons/fa";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-12 active:scale-95"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {/* Share Options */}
      {isOpen && (
        <div className="absolute w-44 top-10 right-0 bg-white shadow-md rounded-lg p-3 flex flex-col space-y-2 border border-gray-300">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
          >
            <FaFacebookF className="text-lg" />
            <span>Facebook</span>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-400 hover:bg-gray-100 p-2 rounded-lg transition-all"
          >
            <FaTwitter className="text-lg" />
            <span>Twitter</span>
          </a>
          <a
            href={`https://wa.me/?text=${pageTitle}%20${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-green-500 hover:bg-gray-100 p-2 rounded-lg transition-all"
          >
            <FaWhatsapp className="text-lg" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied!");
            }}
            className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-all"
          >
            <FaCopy className="text-lg" />
            <span>Copy Link</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
