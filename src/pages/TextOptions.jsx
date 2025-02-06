import React, { useState } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineFontSize,
} from "react-icons/ai";
import { MdFormatLineSpacing } from "react-icons/md";
import { RxLetterSpacing } from "react-icons/rx";
import { FaBold, FaItalic, FaTrash, FaTextHeight } from "react-icons/fa";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import { TbLetterCaseUpper, TbLetterCaseLower } from "react-icons/tb";
import { FaBezierCurve } from "react-icons/fa";

const TextOptions = ({ selectedText, updateTextField, onClose }) => {
  // ... existing state and props destructuring ...

  const {
    text = "",
    fontColor = "#000000",
    isBold = false,
    isItalic = false,
    textAlign = "left",
    lineHeight = 1,
    font = "Arial",
    letterSpacing = 0,
    isUppercase = false,
    isLowercase = false,
    curveValue: initialCurveValue = 0,
  } = selectedText || {};

  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [isAlignmentOpen, setIsAlignmentOpen] = useState(false);
  const [isSpacingOpen, setIsSpacingOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState(selectedText.text);
  const [curveValue, setCurveValue] = useState(selectedText.curveValue || 0);
  const [isCurveOpen, setIsCurveOpen] = useState(false);

  // console.log(selectedText.curveValue)

  const fontOptions = [
    "Lora",
    "Roboto",
    "Arial",
    "Times New Roman",
    "Andallan",
    "Linna",
    "AvalonBold",
    "AvalonNormal",
    "TT_Medium",
    "Angelina",
    "Bebas Neue",
    "Blade Rush",
    "Cinzel",
    "Garden Hidaleya",
    "Justin Hailey",
    "Lovely Valentine",
    "Magdelin",
    "Mussica Swash",
    "New Walt Disney",
    "Nexa Bold",
    "Quicksand",
    "Wedding",
  ];

  const toggleUppercase = () => {
    updateTextField(selectedText.id, "isUppercase", !selectedText.isUppercase);
    updateTextField(selectedText.id, "isLowercase", false);
  };

  const toggleLowercase = () => {
    updateTextField(selectedText.id, "isLowercase", !selectedText.isLowercase);
    updateTextField(selectedText.id, "isUppercase", false);
  };

  return (
    <div className="py-4 bg-white rounded-lg flex lg:flex-col items-center justify-center gap-3 mx-auto relative border focus:outline-none focus:ring-2 focus:ring-black p-4">
      {/* Font Family Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
          className="p-2 rounded-lg  hover:bg-gray-100 flex items-center gap-1"
          title="Font Family"
        >
          <AiOutlineFontSize className="text-lg" />
          <IoIosArrowDown className="text-xs" />
        </button>

        {isFontDropdownOpen && (
          <div className="absolute right-full top-0 z-10 w-48 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {fontOptions.map((fontName) => (
              <button
                key={fontName}
                onClick={() => {
                  updateTextField(selectedText.id, "font", fontName);
                  setIsFontDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                style={{ fontFamily: fontName }}
              >
                {fontName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Formatting Buttons */}
      <div className="flex  md:flex-row lg:flex-col flex-col gap-2">
        <button
          onClick={() => updateTextField(selectedText.id, "isBold", !isBold)}
          className={`p-2 rounded-lg ${isBold ? "bg-[#AF7D32] text-white" : " hover:bg-gray-100"}`}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => updateTextField(selectedText.id, "isItalic", !isItalic)}
          className={`p-2 rounded-lg ${isItalic ? "bg-[#AF7D32] text-white" : " hover:bg-gray-100"}`}
          title="Italic"
        >
          <FaItalic />
        </button>
      </div>

      {/* Alignment Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsAlignmentOpen(!isAlignmentOpen)}
          className="p-2 rounded-lg  hover:bg-gray-100 flex items-center gap-1"
          title="Text Alignment"
        >
          <AiOutlineAlignLeft className="text-lg" />
          <IoIosArrowDown className="text-xs" />
        </button>

        {isAlignmentOpen && (
          <div className="absolute left-0 top-full z-10 bg-white border rounded-lg shadow-lg p-2 mt-1 flex flex-col gap-1">
            <button
              onClick={() => updateTextField(selectedText.id, "textAlign", "left")}
              className={`p-2 rounded-lg ${textAlign === "left" ? "bg-[#AF7D32] text-white" : "hover:bg-gray-100"}`}
            >
              <AiOutlineAlignLeft />
            </button>
            <button
              onClick={() => updateTextField(selectedText.id, "textAlign", "center")}
              className={`p-2 rounded-lg ${textAlign === "center" ? "bg-[#AF7D32] text-white" : "hover:bg-gray-100"}`}
            >
              <AiOutlineAlignCenter />
            </button>
            <button
              onClick={() => updateTextField(selectedText.id, "textAlign", "right")}
              className={`p-2 rounded-lg ${textAlign === "right" ? "bg-[#AF7D32] text-white" : "hover:bg-gray-100"}`}
            >
              <AiOutlineAlignRight />
            </button>
          </div>
        )}
      </div>

      {/* Spacing Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsSpacingOpen(!isSpacingOpen)}
          className="p-2 rounded-lg  hover:bg-gray-100 flex items-center gap-1"
          title="Spacing Options"
        >
          <MdFormatLineSpacing className="text-lg" />
          <IoIosArrowDown className="text-xs" />
        </button>

        {isSpacingOpen && (
          <div className="absolute left-0 top-full z-10 bg-white border rounded-lg shadow-lg p-3 mt-1 w-48">
            <div className="mb-2">
              <label className="flex items-center gap-2 text-sm mb-1">
                <RxLetterSpacing />
                Letter Spacing
              </label>
              <input
                type="range"
                min="-5"
                max="10"
                step="0.1"
                value={letterSpacing}
                onChange={(e) => updateTextField(selectedText.id, "letterSpacing", e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaTextHeight />
                Line Height
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={lineHeight}
                onChange={(e) => updateTextField(selectedText.id, "lineHeight", e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => setIsCurveOpen(!isCurveOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1"
          title="Text Curvature"
        >
          <FaBezierCurve className="text-lg" />
          <IoIosArrowDown className="text-xs" />
        </button>

        {isCurveOpen && (
          <div className="absolute left-0 top-full z-10 bg-white border rounded-lg shadow-lg p-3 mt-1 w-48">
            <div className="mb-2">
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaBezierCurve />
                Curve Intensity
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={curveValue}
                onChange={(e) => {
                  setCurveValue(e.target.value);
                  updateTextField(selectedText.id, "curveValue", e.target.value);
                }}
                className="w-full"
              />
              <div className="text-xs text-gray-600 mt-1">
                Current value: {curveValue}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Case Buttons */}
      <div className="flex md:flex-row lg:flex-col gap-2">
        <button
          onClick={toggleUppercase}
          className={`p-2 rounded-lg ${isUppercase ? "bg-[#AF7D32] text-white" : " hover:bg-gray-100"}`}
          title="Uppercase"
        >
          <TbLetterCaseUpper />
        </button>
        <button
          onClick={toggleLowercase}
          className={`p-2 rounded-lg ${isLowercase ? "bg-[#AF7D32] text-white" : " hover:bg-gray-100"}`}
          title="Lowercase"
        >
          <TbLetterCaseLower />
        </button>
      </div>

      {/* Color Picker */}
      <input
        type="color"
        value={fontColor}
        onChange={(e) => updateTextField(selectedText.id, "fontColor", e.target.value)}
        className="w-8 h-8 cursor-pointer border rounded-lg"
        title="Text Color"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 pt-1 pr-1 text-lg text-gray-600 hover:text-black"
        title="Close"
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default TextOptions;