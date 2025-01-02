import React from 'react';

// Local sticker imports
import book from '../assets/stickers/book.png';
import coffee from '../assets/stickers/coffee.png';
import cute from '../assets/stickers/cute.png';
import happy from '../assets/stickers/happy.png';
import love from '../assets/stickers/love.png';
import skincare from '../assets/stickers/skincare.png';
import smile from '../assets/stickers/smile.png';
import sun from '../assets/stickers/sun.png';

// External sticker URLs


// Combine local and external stickers
const stickers = [
  book,
  coffee,
  cute,
  happy,
  love,
  skincare,
  smile,
  sun,
];

const StickerSelector = ({ onSelect }) => {
  return (
    <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-4 gap-4">
        {stickers.map((sticker, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={sticker}
              alt={`Sticker ${index + 1}`}
              className="w-16 h-16 cursor-pointer border border-gray-300 rounded-lg transition-transform transform hover:scale-110 hover:shadow-xl"
              onClick={() => onSelect(sticker)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerSelector;
