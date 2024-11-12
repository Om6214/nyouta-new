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
          </div>

          {/* Right Division */}
          <div className="lg:w-3/4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brown-900 mb-4">
                Let Us Make Your Best Day A Memorable One!
              </h2>
              <div className="w-40 h-0.5 bg-amber-400 mx-auto mb-6"></div>
              <h3 className="text-xl text-amber-700 font-medium">
                BROWSE OUR POPULAR CATEGORIES
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <Link
                  to={`/category/${category.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={index}
                  className="group"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="relative w-full aspect-square mb-3 transform transition-transform group-hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl"></div>
                      <img
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <h4 className="text-center text-brown-800 font-medium text-sm md:text-base group-hover:text-amber-700 transition-colors">
                      {category.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
