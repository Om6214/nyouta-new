import React, { useState } from "react";
import Banner1 from "../assets/images/Banner1.png";
import Banner2 from "../assets/images/Banner2.png";
import Banner3 from "../assets/images/Banner3.png";
import Banner4 from "../assets/images/Banner4.png";
import { motion } from "framer-motion";

const forms = {
  vendor: {
    name: "Register As a Vendor",
    imgUrl: Banner3,
  },
  memories: {
    name: "Share Memories",
    imgUrl: Banner1,
  },
  matrimony: {
    name: "Submit Matrimonial Biodata",
    imgUrl: Banner2,
  },
  submitDesign: {
    name: "Submit Design! Earn",
    imgUrl: Banner4,
  },
};
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const JoinNyouta = () => {
  const [currentCategory, setCurrentCategory] = useState("vendor");

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const renderFormInputs = () => {
    switch (currentCategory) {
      case "vendor":
        return (
          <div className="space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Place and Type of Member Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your place"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type of Member
                </label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Select type</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Select State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select State
                </label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Select state</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your message"
              />
            </div>

            {/* Upload Design Uploader */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Design
              </label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        );
      case "memories":
        return (
          <div className="space-y-4">
            {/* Name and Email in the Same Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Number and State in the Same Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Select State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select State
                </label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Select state</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Place Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Place
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your place"
              />
            </div>

            {/* Textarea for Special Moments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Write About Special Moments
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Write about special moments..."
              />
            </div>

            {/* Design Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Design
              </label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        );
      case "matrimony":
        return (
          <div className="space-y-4">
            {/* Name and Email in the Same Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Number and State in the Same Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Select State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select State
                </label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Select state</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Place Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Place
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your place"
              />
            </div>

            {/* Textarea for Special Moments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Write About Special Moments
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Write about special moments..."
              />
            </div>

            {/* Design Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Design
              </label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        );
      case "submitDesign":
        return (
          <div className="space-y-4">
            {/* Name and Email in the Same Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Number and State in the Same Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Select State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select State
                </label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Select state</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Place Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Place
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your place"
              />
            </div>

            {/* Textarea for Special Moments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Write About Special Moments
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Write about special moments..."
              />
            </div>

            {/* Design Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Design
              </label>
              <input
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header Section */}
      <motion.div className="py-4">
        <h1 className="lg:text-4xl text-3xl text-secondary font-avalonN text-center">
          Join E-Nyouta
        </h1>
        <h1 className="lg:text-3xl text-2xl font-avalonN text-center text-secondary">
          Choose Your type of Category Below
        </h1>
      </motion.div>

      {/* Tabs Section */}
      <motion.div className="flex lg:gap-8 gap-2 px-2 lg:justify-center py-4 overflow-x-auto">
        {Object.entries(forms).map(([key, { name }]) => (
          <button
            className={`px-4 py-2 text-lg flex flex-shrink-0 font-avalonB rounded-md ${currentCategory === key
                ? "bg-primary text-white"
                : "bg-secondary text-white"
              }`}
            key={key}
            onClick={() => handleCategoryChange(key)}
          >
            {name}
          </button>
        ))}
      </motion.div>

      {/* Banner Image */}
      <motion.div>
        <img
          src={forms[currentCategory].imgUrl}
          className="lg:w-3/4 mx-auto w-full h-[250px]"
          alt={forms[currentCategory].name}
        />
      </motion.div>

      {/* Form Section */}
      <motion.div className="mx-4 lg:mx-32 my-8 flex flex-col">
        <div>
          <h1 className="text-center text-3xl lg:text-4xl font-avalonN text-secondary">
            {forms[currentCategory].name}
          </h1>
        </div>

        <div className="flex items-center justify-center mt-8">
          <div className="bg-white p-8 rounded-lg lg:w-3/4 w-full border border-gray-300">
            {renderFormInputs()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinNyouta;
