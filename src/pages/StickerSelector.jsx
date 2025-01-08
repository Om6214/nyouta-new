import React, { useState } from 'react';

// Local sticker imports
import book from '../assets/stickers/book.png';
import coffee from '../assets/stickers/coffee.png';
import cute from '../assets/stickers/cute.png';
import happy from '../assets/stickers/happy.png';
import love from '../assets/stickers/love.png';
import skincare from '../assets/stickers/skincare.png';
import smile from '../assets/stickers/smile.png';
import sun from '../assets/stickers/sun.png';

// Define stickers categorized
const categorizedStickers = {
  Animal: [],
  Birthday: [],
  Emoji: [
    { name: 'Smile', src: smile },
    { name: 'Cute', src: cute },
    { name: 'Happy', src: happy },
  ],
  Gods: [],
  Floral: [{ name: 'Sun', src: sun }],
  'Letter & Numbers': [],
  Love: [{ name: 'Love', src: love }],
  Designs: [],
  Religious: [],
  Celebration: [],
  Wedding: [],
  Engagement: [],
  Typography: [],
  Mandala: [],
  Symbols: [],
  Royal: [],
  Frames: [],
  Welcome: [],
  'Colored & B/W': [
    { name: 'Book', src: book },
    { name: 'Coffee', src: coffee },
    { name: 'Skincare', src: skincare },
  ],
};

const StickerSelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('Emoji');
  const [searchQuery, setSearchQuery] = useState('');

  // Get stickers for the selected category
  const stickers =
    categorizedStickers[selectedCategory]?.filter((sticker) =>
      sticker.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg max-h-[80vh] overflow-y-auto border border-gray-200">
      <input
        type="text"
        placeholder="Search Stickers"
        className="mb-4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow hover:border-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Scrollable Category Selector */}
      <div className="relative mb-4">
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition-shadow hover:border-blue-500 appearance-none overflow-hidden"
          style={{ maxHeight: '200px', overflowY: 'auto' }} // Ensuring the dropdown is scrollable
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchQuery(''); // Reset search query when category changes
          }}
        >
          {Object.keys(categorizedStickers).map((category) => (
            <option
              key={category}
              value={category}
              className="hover:bg-blue-100 hover:text-blue-800 transition-colors"
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sticker Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stickers.length > 0 ? (
          stickers.map((sticker, index) => (
            <div
              key={index}
              className="flex justify-center p-2 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={sticker.src}
                alt={sticker.name}
                className="w-auto cursor-pointer rounded-lg hover:opacity-90"
                onClick={() => onSelect(sticker.src)}
              />
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No stickers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default StickerSelector;
