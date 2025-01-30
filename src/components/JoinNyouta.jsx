import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Banner1 from "../assets/images/Banner1.png";
import Banner2 from "../assets/images/Banner2.png";
import Banner3 from "../assets/images/Banner3.png";
import Banner4 from "../assets/images/Banner4.png";
import emailjs from "@emailjs/browser";

const forms = {
  vendor: {
    name: "Register As a Vendor",
    imgUrl: Banner3,
    designLabel: "Upload Business Document/Design"
  },
  memories: {
    name: "Share Memories",
    imgUrl: Banner1,
    designLabel: "Upload Photos/Memories"
  },
  matrimony: {
    name: "Submit Matrimonial Biodata",
    imgUrl: Banner2,
    designLabel: "Upload Profile Picture"
  },
  submitDesign: {
    name: "Submit Design! Earn",
    imgUrl: Banner4,
    designLabel: "Upload Design"
  }
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

const FormField = ({ label, type, name, placeholder, options, className = "", value, onChange, required = false }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      >
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows="4"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        placeholder={placeholder}
      />
    ) : type === "file" ? (
      <input
        type={type}
        name={name}
        onChange={onChange}
        required={required}
        accept={type === "file" ? "image/*,.pdf,.doc,.docx" : undefined}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        placeholder={placeholder}
      />
    )}
  </div>
);


const JoinNyouta = () => {
  const [currentCategory, setCurrentCategory] = useState("vendor");
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    place: "",
    type: "",
    message: "",
    design: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const serviceId = "service_m2rqgdj";
      const templateId = "template_nta0aib";
      const userId = "Z17suYTec6wmDIA0q";

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        userId
      );

      setFormSuccess(true);
      formRef.current.reset();
      setFormData({
        name: "",
        email: "",
        phone: "",
        state: "",
        place: "",
        type: "",
        message: "",
        design: null
      });

    } catch (error) {
      alert('Failed to send the message: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormInputs = () => (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <FormField
          label="Select State"
          type="select"
          name="state"
          placeholder="Select state"
          options={indianStates}
          value={formData.state}
          onChange={handleInputChange}
          required
        />
      </div>

      <FormField
        label="Place"
        type="text"
        name="place"
        placeholder="Enter your place"
        value={formData.place}
        onChange={handleInputChange}
        required
      />

      {currentCategory === "vendor" && (
        <FormField
          label="Type of Member"
          type="select"
          name="type"
          placeholder="Select type"
          options={["Individual", "Business"]}
          value={formData.type}
          onChange={handleInputChange}
          required
        />
      )}

      <FormField
        label="Message"
        type="textarea"
        name="message"
        placeholder="Write your message..."
        value={formData.message}
        onChange={handleInputChange}
        required
      />

      <FormField
        label={forms[currentCategory].designLabel}
        type="file"
        name="design"
        onChange={handleInputChange}
        required
      />

      {formSuccess && (
        <div className="text-green-600 text-center py-2">
          Message sent successfully!
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary p-3 text-white px-6 hover:scale-105 ease-in-out disabled:opacity-50 transition-all rounded-md"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="lg:text-4xl text-3xl text-secondary font-avalonN text-center">
          Join E-Nyouta
        </h1>
        <h2 className="lg:text-3xl text-2xl font-avalonN text-center text-secondary mt-2">
          Choose Your type of Category Below
        </h2>
      </motion.div>

      <motion.div
        className="flex lg:gap-8 gap-2 justify-center py-4 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {Object.entries(forms).map(([key, { name }]) => (
          <button
            className={`px-4 py-2 text-lg flex-shrink-0 font-avalonB rounded-md transition-colors ${currentCategory === key
              ? "bg-primary text-white"
              : "bg-secondary text-white hover:bg-primary"
              }`}
            key={key}
            onClick={() => setCurrentCategory(key)}
          >
            {name}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <img
          src={forms[currentCategory].imgUrl}
          className="lg:w-3/4 mx-auto w-full h-[250px] object-cover rounded-lg"
          alt={forms[currentCategory].name}
        />
      </motion.div>

      <motion.div
        className="my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-center text-3xl lg:text-4xl font-avalonN text-secondary mb-8">
          {forms[currentCategory].name}
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg w-full border border-gray-300 shadow-sm">
            {renderFormInputs()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinNyouta;