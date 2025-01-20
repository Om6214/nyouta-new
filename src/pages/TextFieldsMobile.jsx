import React, { useState } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { MdFormatLineSpacing } from "react-icons/md";
import { FaBold, FaItalic, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import translate from "translate"; // Importing translate library

const TextFieldsMobile = ({ selectedText, updateTextField, onClose }) => {
  const {
    text,
    fontColor,
    isBold,
    isItalic,
    textAlign,
    lineHeight,
    font,
    letterSpacing,
    isUppercase,
    isLowercase,
    curveValue: initialCurveValue, // Get the initial curve value from selectedText
  } = selectedText;

  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default target language: English
  const [translatedText, setTranslatedText] = useState(text); // Holds the translated text
  const [curveValue, setCurveValue] = useState(initialCurveValue || 0); // Initialize curveValue with selectedText's curveValue or default to 0

  // Configure the translation library to auto-detect the source language and use Google Translate without an API key
  translate.engine = "google"; // Use Google Translate's free engine

  // Handle real-time translation when the user types in the text area
  const handleTextChange = async (e) => {
    let newText = e.target.value;
  
    // Apply transformations
    if (isUppercase) {
      newText = newText.toUpperCase();
    } else if (isLowercase) {
      newText = newText.toLowerCase();
    }
  
    updateTextField(selectedText.id, "text", newText); // Update original text
  
    try {
      // Translate the new text and specify both the source and target languages
      const translated = await translate(newText, {
        from: selectedLanguage, // Current selected language
        to: selectedLanguage,  // Translate to the same language for now
      });
      setTranslatedText(translated); // Update the translated text
      updateTextField(selectedText.id, "text", translated); // Update the text field with translated text
    } catch (error) {
      console.error("Translation Error:", error);
    }
  };
  
  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
  
    try {
      // Translate existing text to the new target language
      const translated = await translate(text, {
        from: selectedLanguage, // Current selected language
        to: newLanguage,        // Translate to the new language
      });
      setTranslatedText(translated); // Update translated text
      updateTextField(selectedText.id, "text", translated); // Update the text field with translated text
    } catch (error) {
      console.error("Translation Error:", error);
    }
  };

  const handleCurveChange = (e) => {
    const newCurveValue = e.target.value;
    setCurveValue(newCurveValue); // Update the curveValue in state
    updateTextField(selectedText.id, "curveValue", newCurveValue); // Update the curve value in the parent state
  };


  const toggleUppercase = () => {
    updateTextField(selectedText.id, "isUppercase", !isUppercase);
    updateTextField(selectedText.id, "isLowercase", false); // Disable lowercase
  };

  const toggleLowercase = () => {
    updateTextField(selectedText.id, "isLowercase", !isLowercase);
    updateTextField(selectedText.id, "isUppercase", false); // Disable uppercase
  };

  const fontOptions = ["Lora", "Roboto", "Arial", "Times New Roman","Andallan","Linna","AvalonBold","AvalonNormal","TT_Medium","Angelina",
    "Bebas Neue","Blade Rush","Cinzel","Garden Hidaleya","Justin Hailey","Lovely Valentine","Magdelin","Mussica Swash",
    "New Walt Disney","Nexa Bold","Quicksand","Wedding"
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative border focus:outline-none focus:ring-2 focus:ring-black sm:max-w-full ">
      {/* Language and Text Area */}
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-2">Language</label>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="w-full  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
          <option value="gu">ગુજરાતી</option>
          <option value="ta">தமிழ்</option>
        </select>
        
      </div>

      {/* Font Family, Bold, Italic, and Color */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:flex-col sm:gap-2">
        <select
          value={font}
          onChange={(e) => updateTextField(selectedText.id, "font", e.target.value)}
          className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-full"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
        <button
          onClick={() => updateTextField(selectedText.id, "isBold", !isBold)}
          className={`p-2 rounded-lg ${isBold ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => updateTextField(selectedText.id, "isItalic", !isItalic)}
          className={`p-2 rounded-lg ${isItalic ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
        >
          <FaItalic />
        </button>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => updateTextField(selectedText.id, "fontColor", e.target.value)}
          className="w-10 h-10 cursor-pointer border rounded-lg"
        />
      </div>

      {/* Alignment, Letter Spacing, Uppercase */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:flex-col sm:gap-2">
        <div className="flex flex-col items-center sm:items-start">
          <label className="text-xs text-gray-500 mb-1">Alignment</label>
          <div className="flex gap-2">
            <button
              onClick={() => updateTextField(selectedText.id, "textAlign", "left")}
              className={`p-2 rounded-lg ${textAlign === "left" ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
            >
              <AiOutlineAlignLeft />
            </button>
            <button
              onClick={() => updateTextField(selectedText.id, "textAlign", "center")}
              className={`p-2 rounded-lg ${textAlign === "center" ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
            >
              <AiOutlineAlignCenter />
            </button>
            <button
              onClick={() => updateTextField(selectedText.id, "textAlign", "right")}
              className={`p-2 rounded-lg ${textAlign === "right" ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
            >
              <AiOutlineAlignRight />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <label className="text-xs text-gray-500 mb-1">Letter Spacing</label>
          <input
            type="range"
            min="-5"
            max="10"
            step="0.1"
            value={letterSpacing}
            onChange={(e) => updateTextField(selectedText.id, "letterSpacing", e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
        
      </div>

      {/* Line Height, Curve Text, Lowercase */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:flex-col sm:gap-2">
        <div className="flex flex-col items-center sm:items-start">
          <label className="text-xs text-gray-500 mb-1">Line Height</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={lineHeight}
            onChange={(e) => updateTextField(selectedText.id, "lineHeight", e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
       
        <button
          onClick={toggleLowercase}
          className={`p-2 rounded-lg ${isLowercase ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
        >
          Lower
        </button>

        <button
          onClick={toggleUppercase}
          className={`p-2 rounded-lg ${isUppercase ? "bg-blue-500 text-white" : "border hover:bg-gray-100"}`}
        >
          Upper
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default TextFieldsMobile;
