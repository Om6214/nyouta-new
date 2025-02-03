import React, { useState } from 'react';

const ProductDescription = ({ descriptions }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState(
    descriptions?.map(() => false) || []
  );

  const truncateText = (text, maxWords = 30) => {
    const words = text.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : text;
  };

  const toggleDescription = (index) => {
    const newExpandedState = [...expandedDescriptions];
    newExpandedState[index] = !newExpandedState[index];
    setExpandedDescriptions(newExpandedState);
  };

  return descriptions?.length > 0 ? (
    <div className="text-sm font-light text-gray-900 space-y-2">
      {descriptions.map((desc, idx) => {
        const wordCount = desc.split(' ').length;
        const isTruncatable = wordCount > 5;

        return (
          <div key={idx} className="flex flex-col">
            <p className="lg:mr-2">
              {isTruncatable && !expandedDescriptions[idx]
                ? truncateText(desc)
                : desc}
            </p>
            {isTruncatable && (
              <button
                onClick={() => toggleDescription(idx)}
                className="text-blue-600 hover:underline text-xs w-20"
              >
                {expandedDescriptions[idx] ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ProductDescription;