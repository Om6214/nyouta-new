import React, { useState } from "react";
import Banner1 from "../assets/images/Banner1.png";
import Banner2 from "../assets/images/Banner2.png";
import Banner3 from "../assets/images/Banner3.png";
import Banner4 from "../assets/images/Banner4.png";
import button from "../assets/images/07.png";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

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
  "Jammu and Kashmir",
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
];

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

const JoinNyouta = () => {
  const [currentCategory, setCurrentCategory] = useState("vendor");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    member: "",
    state: "",
    specialMoments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to send file and form data
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Append file if exists
      if (file) {
        submitData.append("image", file);
      }

      // Replace with your API endpoint
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: submitData,
        // Don't set Content-Type header - browser will set it automatically with boundary for FormData
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      // Handle successful submission
      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        member: "",
        state: "",
        specialMoments: "",
      });
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };
  return (
    <div>
      <motion.div className="py-4">
        <h1 className="lg:text-4xl text-3xl text-secondary font-avalonN text-center">
          Join E-Nyouta
        </h1>
        <h1 className="lg:text-3xl text-2xl font-avalonN text-center text-secondary">
          Choose Your type of Category Below
        </h1>
      </motion.div>
      <motion.div className="flex lg:gap-8 gap-2 px-2 lg:justify-center py-4 overflow-x-auto">
        {Object.entries(forms).map(([key, { name }]) => (
          <button
            className={`px-4 py-2 text-lg flex flex-shrink-0 font-avalonB rounded-md ${
              currentCategory === key
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
      <motion.div>
        <img
          src={forms[currentCategory].imgUrl}
          className="w-full h-[250px]"
          alt={forms[currentCategory].name}
        />
      </motion.div>
      <motion.div className="mx-4 lg:mx-32 my-8 flex flex-col gap-8 shadow-xl p-5">
        <div>
          <h1 className="text-center text-3xl lg:text-4xl font-avalonN text-secondary">
            {forms[currentCategory].name}
          </h1>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <input
              name="name"
              className="rounded-md"
              type="text"
              placeholder="Name*"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              className="rounded-md"
              type="email"
              name="email"
              id=""
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              className="rounded-md"
              type="number"
              name="phone"
              id=""
              placeholder="Phone No."
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              name="member"
              className="rounded-md"
              type="text"
              placeholder="Type of Member"
              required
              value={formData.member}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-6">
            <select
              className="rounded-md"
              name="state"
              id=""
              required
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="" selected disabled>
                Select State
              </option>
              {indianStates.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <textarea
              className="rounded-md"
              name="specialMoments"
              id=""
              placeholder="Write About Special Moments"
              value={formData.specialMoments}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <div className="relative border-2 border-dashed rounded-lg px-8 py-4 text-center transition-colors border-gray-300 hover:border-gray-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {fileName ? (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-green-500" />
                  <p className="text-sm text-gray-600">
                    Selected file: {fileName}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Click to select an image
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports: JPG, PNG, GIF
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <img className="h-8 w-32" src={button} alt="" />
            <button
              type="submit"
              className="absolute text-lg font-avalonN transition duration-200 ease-in-out hover:text-black hover:font-bold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default JoinNyouta;
