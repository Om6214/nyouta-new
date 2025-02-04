import { useState, useRef, useEffect } from "react";

const ProductDescription = ({ descriptions }) => {
  // Ensure descriptions is always a string
  const description = Array.isArray(descriptions)
    ? descriptions.join(" ")
    : descriptions || "";

  const [isExpanded, setIsExpanded] = useState(false);
  const words = description.split(" ");

  // State for word limit based on screen size
  const [wordLimit, setWordLimit] = useState(
    window.innerWidth < 640 ? 8 : 15
  );

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      setWordLimit(window.innerWidth < 640 ? 8 : 15);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const previewText = words.slice(0, wordLimit).join(" ") + "...";

  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isExpanded) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("30px"); // Adjust based on preview text height
    }
  }, [isExpanded, wordLimit]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: height }}
      >
        <p className="text-xs leading-4 text-gray-900">
          {isExpanded ? description : previewText}{" "}
          {words.length > wordLimit && (
            <button
              onClick={toggleReadMore}
              className="text-blue-500 text-xs ml-1 hover:underline"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
