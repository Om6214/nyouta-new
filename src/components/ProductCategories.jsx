import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TopCategories() {
  const categories = [
    { title: "Save the Date", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Haldi Ceremony", image: "/placeholder.svg?height=200&width=200" },
    { title: "Mehendi Ceremony", image: "/placeholder.svg?height=200&width=200" },
    { title: "Sangeet Ceremony", image: "/placeholder.svg?height=200&width=200" },
    { title: "Manuhar Patrika", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Timeline", image: "/placeholder.svg?height=200&width=200" },
    { title: "Theme Invitations", image: "/placeholder.svg?height=200&width=200" },
    { title: "New Trendz", image: "/placeholder.svg?height=200&width=200" },
    { title: "Matrimonial Biodata", image: "/placeholder.svg?height=200&width=200" },
    { title: "Birthday Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Sawamani Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Lohri Invites", image: "/placeholder.svg?height=200&width=200" },
    { title: "Griha Pravesh", image: "/placeholder.svg?height=200&width=200" },
    { title: "Halloween Party", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding NewsPaper", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Photo Book", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Magazine", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wedding Planners", image: "/placeholder.svg?height=200&width=200" },
    { title: "Offer & Discount", image: "/placeholder.svg?height=200&width=200" },
  ];

  const dropdownData = {
    "E-INVITE": {
      Announcement: ["Countdown", "Matrimonial Biodata", "Personalize","Shock Sandesh","Social Invites","Thanks to Guest","Wishes to Invitor","Wishes to New","Wed"],
      "Party Invitation": ["Birthday Party","Celebration Party","Dastar Bandi","Garba Party","Halloween Party","Kitty Party","Kua Poojan","Lohri Celebration","Opening Cermony","Retirement Party"],
      "Pooja & Ritual": ["Aarti Books and Chalisa", "Griha Pravesh","Katha & Path Invitations","Mata Jagran Invitations","Sawamani Inviatations","Shyam Jagran Invitations"],
      "Wedding Invitations": ["Anniversary Invitations","Ceremony Invitations","Engagement Invitations","Pre Invitation","Royal Wedding Invitations","Save the Date","Theme Invitations","Wedding Invitations","Wedding Logos","Wedding Timeline"],
      "Welcome Signage": ["Birthday","Celebration Parties", "Direction Signages","Engagement Ceremony","Haldi Ceremony","Halloween Party","Lohri Celebration","Mehandi Celebration","Sangeet Ceremony","Wedding Ceremony"],
    },
    "New Trendz": {
      "Event E-Magazine": [],
      "New Trendz Invitations": [],
      "Photo E-Book": [],
      "Wedding E-Magazine": [],
      "Wedding News E-Paper": [],
    },
    "special-for-u": {
      "Digital Spread Sheet": ["Budget Purchase Expenses", "Guest Management","Guest Management | FREE","Ultimate Wedding Planner","Wedding Management"],
      "Guest Management Planner": ["Birthday Guest Management", "Event Guest Management","Guest Management Booklet","Wedding Guest Management"],
      "Wedding Notebook": ["Wedding Notebook", "Wedding Notebook | POPULAR","Wedding Notebook | ROYAL","Wedding Notebook | ULTIMATE"],
      "Wedding Planner": ["Wedding Planner", "Wedding Planner | POPULAR", "Wedding Planner | ROYAL","Wedding Planner | ULTIMATE"],
    },
  };

  const [selectedOptions, setSelectedOptions] = useState({
    main: "",
    sub: "",
    subSub: "",
  });
  const [priceFilter, setPriceFilter] = useState(3000);
  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleMainChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      main: value,
      sub: "",  // Reset sub options when main changes
      subSub: "", // Reset sub-sub options
    }));
  };

  const handleSubChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      sub: value,
      subSub: "", // Reset sub-sub options when sub changes
    }));
  };

  const handleSubSubChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      subSub: value,
    }));
  };

  
  return (
    <section className="py-16 px-4 bg-amber-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Division */}
          <div className="lg:w-1/4 flex flex-col items-start gap-8">
            <h2 className="text-3xl font-bold text-brown-900 mb-4">
              Product Categories
            </h2>
  
            {/* Main Dropdown */}
            <div className="mb-0">
              <label
                htmlFor="main-category"
                className="block text-sm font-medium text-amber-700 mb-2"
              >
                Select Category
              </label>
              <select
                id="main-category"
                className="w-64 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-amber-400"
                value={selectedOptions.main}
                onChange={handleMainChange}
              >
                <option value="">Select a Category</option>
                {Object.keys(dropdownData).map((categoryKey) => (
                  <option key={categoryKey} value={categoryKey}>
                    {categoryKey.replace(/-/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Sub Dropdown */}
            {selectedOptions.main && (
              <div className="mb-0">
                <select
                  id="sub-category"
                  className="w-64 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-amber-400"
                  value={selectedOptions.sub}
                  onChange={handleSubChange}
                >
                  <option value="">Select an Option</option>
                  {Object.keys(dropdownData[selectedOptions.main]).map(
                    (subOptionKey) => (
                      <option key={subOptionKey} value={subOptionKey}>
                        {subOptionKey}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
  
            {/* Sub-Sub Dropdown */}
            {selectedOptions.sub && (
              <div className="mb-0">
                <select
                  id="sub-sub-category"
                  className="w-64 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-amber-400"
                  value={selectedOptions.subSub}
                  onChange={handleSubSubChange}
                >
                  <option value="">Select a Sub-Option</option>
                  {dropdownData[selectedOptions.main][selectedOptions.sub].map(
                    (subSubOption, index) => (
                      <option key={index} value={subSubOption}>
                        {subSubOption}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
  
            {/* Price Filter */}
            <div className="mb-0">
              <label
                htmlFor="price-range"
                className="block text-sm font-medium text-amber-700 mb-2"
              >
                Filter by Price (₹1 - ₹3000)
              </label>
              <input
                type="range"
                id="price-range"
                className="w-64 "
                min="1"
                max="3000"
                value={priceFilter}
                onChange={handlePriceChange}
                style={{
                  background: "brown",
                  accentColor: "brown",
                }}
              />
              <div className="text-sm text-gray-600 mt-2">
                Up to Price: ₹{priceFilter}
              </div>
            </div>
          </div>
  
          {/* Right Division */}
          <div className="lg:w-3/4">
            
            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {[
                {
                  url: "https://lovely-cards.com/cdn/shop/files/IMG_6839_1080x1080_ee5c0b11-10df-400a-9783-46907b9310fa.jpg?v=1726214919",
                  title: "Elegant Wedding Cards",
                  price: "₹500",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/files/dgc-102-1.jpg?v=1713336487",
                  title: "Custom Invitation Cards",
                  price: "₹750",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/products/dgc-098_6bc30bc3-17be-42cf-83a8-a9e8e923926b.jpg?v=1709379501",
                  title: "Premium Greeting Cards",
                  price: "₹1000",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/products/dgs-w01-des151_27f01796-aab5-4dba-acce-81381e8349ca.jpg?v=1709379205",
                  title: "Floral Designs",
                  price: "₹850",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/files/acr-w05-2.jpg?v=1711619015",
                  title: "Minimalistic Cards",
                  price: "₹600",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/files/signateur2079.jpg?v=1711865872",
                  title: "Modern Invitations",
                  price: "₹950",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/files/signateur2080.jpg?v=1711865896",
                  title: "Traditional Touch",
                  price: "₹700",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/products/dgs-w01-t-des02_5725db6e-38b2-4fe1-ac6e-095d3d50db2c.jpg?v=1709378960",
                  title: "Classic Elegance",
                  price: "₹800",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/products/dgf-01_96bccd93-fcf7-4f98-961a-3cc0b7dd1776.jpg?v=1713598965",
                  title: "Funky Patterns",
                  price: "₹650",
                },
                {
                  url: "https://lovely-cards.com/cdn/shop/files/acr-w05-2.jpg?v=1711619015",
                  title: "Sophisticated Styles",
                  price: "₹850",
                },
              ].map((image, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center group"
                >
                  <div className="relative w-full aspect-square mb-3 transform transition-transform group-hover:scale-105">
                    <div className="absolute inset-0  rounded-xl"></div>
                    <img
                      src={image.url}
                      alt={image.title}
                      className="object-contain p-4 rounded-lg"
                    />
                  </div>
                  <h4 className="text-center text-brown-800 font-medium text-sm md:text-base group-hover:text-amber-700 transition-colors">
                    {image.title}
                  </h4>
                  <p className="text-center text-gray-700 font-medium text-sm">
                    {image.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}