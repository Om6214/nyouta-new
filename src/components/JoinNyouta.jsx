import React, { useState } from "react";
import Banner1 from "../assets/images/Banner1.png";
import Banner2 from "../assets/images/Banner2.png";
import Banner3 from "../assets/images/Banner3.png";
import Banner4 from "../assets/images/Banner4.png";
import button from "../assets/images/07.png";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
      <motion.div className="mx-4 lg:mx-32 my-8 flex flex-col  ">
        <div>
          <h1 className="text-center text-3xl lg:text-4xl font-avalonN text-secondary">
            {forms[currentCategory].name}
          </h1>
        </div>
        
        <div className="  flex items-center justify-center mt-8 ">
          <div className="bg-white p-8 rounded-lg w-full max-w-xl border border-gray-300">
           
            <form>
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="business-category" className="block text-sm font-medium text-gray-700">
                    Business Category
                  </label>
                  <select
                    id="business-category"
                    name="business-category"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Bar Services & Beverages">Bar Services & Beverages</option>
                    <option value="Dance Lessons">Dance Lessons</option>
                    <option value="Photo Booths">Photo Booths</option>
                    <option value="Rehearsal Dinner">Rehearsal Dinner</option>
                    <option value="Travel Agents">Travel Agents</option>
                    <option value="Venue">Venue</option>
                    <option value="Wedding Bands">Wedding Bands</option>
                    <option value="Wedding Cakes">Wedding Cakes</option>
                    <option value="Wedding Caterers">Wedding Caterers</option>
                    <option value="Wedding Decor & Lighting">Wedding Decor & Lighting</option>
                    <option value="Wedding DJs">Wedding DJs</option>
                    <option value="Wedding Dresses">Wedding Dresses</option>
                    <option value="Wedding Favors">Wedding Favors</option>
                    <option value="Wedding Florists">Wedding Florists</option>
                    <option value="Wedding Hair & Makeup">Wedding Hair & Makeup</option>
                    <option value="Wedding Invitations">Wedding Invitations</option>
                    <option value="Wedding Jewelers">Wedding Jewelers</option>
                    <option value="Wedding Limos">Wedding Limos</option>
                    <option value="Wedding Musicians">Wedding Musicians</option>
                    <option value="Wedding Officiants">Wedding Officiants</option>
                    <option value="Wedding Photographers">Wedding Photographers</option>
                    <option value="Wedding Planners">Wedding Planners</option>
                    <option value="Wedding Rentals">Wedding Rentals</option>
                    <option value="Wedding Videographers">Wedding Videographers</option>

                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#AF7D32] focus:border-[#AF7D32] sm:text-sm"
                    required
                  >
                     <option value="">Select a Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="BR">Brazil</option>
                    <option value="CN">China</option>
                    <option value="JP">Japan</option>
                    <option value="RU">Russia</option>
                    <option value="ZA">South Africa</option>
                    <option value="MX">Mexico</option>
                    <option value="KR">South Korea</option>
                    <option value="AR">Argentina</option>
                    <option value="CL">Chile</option>
                    <option value="NZ">New Zealand</option>
                    <option value="SG">Singapore</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="FI">Finland</option>
                    <option value="IE">Ireland</option>
                    <option value="NL">Netherlands</option>
                    <option value="CH">Switzerland</option>
                    <option value="TH">Thailand</option>
                    <option value="MY">Malaysia</option>

                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="h-4 w-4 [#AF7D32] focus:ring-[#AF7D32] border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    By submitting and sharing your information you agree to{" "}
                    <Link to="/Terms" className="text-[#AF7D32] underline">
                       terms of use
                    </Link>{" "}
                    and{" "}
                    <Link to="/Terms" className="text-[#AF7D32] underline">
                       terms of use
                    </Link>
                    .
                  </label>
                </div>
              </div>
              </div>

              {/* Terms */}
              <div className="flex items-center justify-center">
              <button
                    type="submit"
                    className="w-full md:w-auto bg-[#AF7D32] text-white py-2 px-14 rounded-md shadow-sm hover:bg-[#643C28] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF7D32]"
                  >
                    Get in touch
                  </button>
              </div>
              
            </form>
          </div>
        </div>
     
      </motion.div>
    </div>
  );
};

export default JoinNyouta;
