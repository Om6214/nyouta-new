import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../products.json";

export default function TopCategories() {
  const dropdownData = {
    "E-INVITE": {
      Announcement: ["Countdown", "Matrimonial Biodata", "Personalize", "Shock Sandesh", "Social Invites", "Thanks to Guest", "Wishes to Invitor", "Wishes to New", "Wed"],
      "Party Invitation": ["Birthday Party", "Celebration Party", "Dastar Bandi", "Garba Party", "Halloween Party", "Kitty Party", "Kua Poojan", "Lohri Celebration", "Opening Ceremony", "Retirement Party"],
      "Pooja & Ritual": ["Aarti Books and Chalisa", "Griha Pravesh", "Katha & Path Invitations", "Mata Jagran Invitations", "Sawamani Invitations", "Shyam Jagran Invitations"],
      "Wedding Invitations": ["Anniversary Invitations", "Ceremony Invitations", "Engagement Invitations", "Pre Invitation", "Royal Wedding Invitations", "Save the Date", "Theme Invitations", "Wedding Invitations", "Wedding Logos", "Wedding Timeline"],
      "Welcome Signage": ["Birthday", "Celebration Parties", "Direction Signages", "Engagement Ceremony", "Haldi Ceremony", "Halloween Party", "Lohri Celebration", "Mehandi Celebration", "Sangeet Ceremony", "Wedding Ceremony"],
    },
    "New Trendz": {
      "Event E-Magazine": [],
      "New Trendz Invitations": [],
      "Photo E-Book": [],
      "Wedding E-Magazine": [],
      "Wedding News E-Paper": [],
    },
    "special-for-u": {
      "Digital Spread Sheet": ["Budget Purchase Expenses", "Guest Management", "Guest Management | FREE", "Ultimate Wedding Planner", "Wedding Management"],
      "Guest Management Planner": ["Birthday Guest Management", "Event Guest Management", "Guest Management Booklet", "Wedding Guest Management"],
      "Wedding Notebook": ["Wedding Notebook", "Wedding Notebook | POPULAR", "Wedding Notebook | ROYAL", "Wedding Notebook | ULTIMATE"],
      "Wedding Planner": ["Wedding Planner", "Wedding Planner | POPULAR", "Wedding Planner | ROYAL", "Wedding Planner | ULTIMATE"],
    },
  };

  const [selectedOptions, setSelectedOptions] = useState({
    main: "",
    sub: "",
    subSub: "",
  });

  const [priceFilter, setPriceFilter] = useState(3000);

  const handleMainChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      main: value,
      sub: "",
      subSub: "",
    }));
  };

  const handleSubChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      sub: value,
      subSub: "",
    }));
  };

  const handleSubSubChange = (event) => {
    const { value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      subSub: value,
    }));
  };

  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedOptions.main || product.category === selectedOptions.main;
    const matchesSubCategory =
      !selectedOptions.sub || product.subCategory === selectedOptions.sub;
    const matchesSubSubCategory =
      !selectedOptions.subSub || product.subSubCategory === selectedOptions.subSub;
    const matchesPrice = product.price <= priceFilter;

    return matchesCategory && matchesSubCategory && matchesSubSubCategory && matchesPrice;
  });

  return (
    <section className="py-16 px-4 bg-priBg">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Division */}
          <div className="lg:w-1/4 flex flex-col items-start gap-8">
            <h2 className="text-3xl font-bold text-brown-900 mb-4">
              Product Categories
            </h2>

            {/* Main Dropdown */}
            <div>
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
              <div>
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
              <div>
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
            <div>
              <label
                htmlFor="price-range"
                className="block text-sm font-medium text-amber-700 mb-2"
              >
                Filter by Price (₹1 - ₹3000)
              </label>
              <input
                type="range"
                id="price-range"
                className="w-64"
                min="1"
                max="3000"
                value={priceFilter}
                onChange={handlePriceChange}
              />
              <div className="text-sm text-gray-600 mt-2">
                Up to Price: ₹{priceFilter}
              </div>
            </div>
          </div>

          {/* Right Division */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div>No products found</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    state={{ product }} // Pass product data
                    className="relative flex flex-col rounded-xl hover:shadow-2xl items-center group"
                  >
                    <div className="relative w-full aspect-square mb-3">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="object-cover w-full h-72 rounded-t-xl"
                      />
                    </div>
                    <div className="flex flex-col px-[2px]">

                   
                    <h4 className="text-center text-brown-800 font-medium text-sm md:text-base">
                      {product.name}
                    </h4>
                    <p className="text-center text-gray-700 font-medium text-sm">
                      ₹{product.price}
                    </p>
                    </div>
                  </Link>
                ))}
              </div>

            )}
          </div>
        </div>
      </div>
    </section>
  );
}
