import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";



export default function TopCategories() {

  const [products, setproducts] = useState()


  useEffect(() => {
    async function fetchProducts() {
      const url = "https://nyouta.onrender.com/api/v1/products/products";
      try {
        const response = await axios.get(url);

        setproducts(response.data);
        // console.log(responseData)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
  

   
  const dropdownData = {
    "E-Invitations": {
      "Wedding Invitations": [
        "Pre Invitations - Manuhar",
        "Save the Date",
        "Wedding Invitations",
        "Ceremony Invitations",
        "Wedding Timeline",
        "Royal Collection - NEW",
      ],
      "Party Invitations": [
        "Birthday Party",
        "Kitty Party",
        "Retirement Party",
        "Halloween Party",
        "Lohri Party",
      ],
      "Pooja Invitations": ["Sawamani", "Griha Pravesh", "Shyam Jagran"],
      "Ceremony Invitations": [
        "Engagement Ceremony",
        "Wedding Anniversary",
        "Wedding Events",
        "Opening Ceremony",
        "Kua Poojan",
      ],
      "Short Invitation - FREE": ["Wedding Invitations", "Party Invitations"],
      "Matrimonial Biodata": ["Marriage Biodata"],
    },
    "Print Invitations": {
      "Wedding Invitations": [
        "Elegant Collection",
        "Vintage  Collection",
        "Royal Invitations",
        "Slider Invitations",
        "Passport Theme Invitations",
        "Newspaper Invitations",
        "Aadhar Card Invitations",
        "ATM Theme Invitations",
      ],
      "Party Invitation": [
        "Birthday Party",
        "Kitty Party",
        "Retirement Party",
        "Halloween Party",
        "Lohri Party",
      ],
      "Pooja Invitations": [
        "Sawamani",
        "Griha Pravesh",
        "Shyam Jagran",
        "Engagement Ceremony",
        "Sawamani Invitations",
        "Shyam Jagran Invitations",
      ],
      "Ceremony Invitations": [
        "Engagement Ceremony",
        "Wedding Anniversary",
        "Opening Ceremony",
        "Kua Poojan",
      ],
      //"Welcome Signage": ["Birthday", "Celebration Parties", "Direction Signages", "Engagement Ceremony", "Haldi Ceremony", "Halloween Party", "Lohri Celebration", "Mehandi Celebration", "Sangeet Ceremony", "Wedding Ceremony"],
    },
    "Photo Books": {
      "Soft Cover Photobook": [
        "Wedding Photobook",
        "Engagement Photobook",
        "Anniversary Photobook",
        "Birthday Photobook",
      ],
      "Hard Cover Photobook": [
        "Wedding Photobook",
        "Engagement Photobook",
        "Anniversary Photobook",
        "Birthday Photobook",
      ],
      "Spiral Photobook": [
        "Wedding Photobook",
        "Engagement Photobook",
        "Anniversary Photobook",
        "Birthday Photobook",
      ],
      "Photo Folder": [
        "Wedding Photobook",
        "Engagement Photobook",
        "Anniversary Photobook",
        "Birthday Photobook",
      ],
      "Digtial Photobook > Best Seller": [
        "Wedding Photobook",
        "Engagement Photobook",
        "Anniversary Photobook",
        "Birthday Photobook",
      ],
    },


    Itinerary: {
      "Wedding Itinerary": [
        "Room Itinerary",
        "Check-in Itinerary",
        "Room Key Enevelop",
        "Thank You Cards",
        "Wedding Menu",
        "Table Itinerary",
        "Dining Table Mats",
      ],
      Stickers: [
        "Guest Name Stickers",
        "Gift Box Sticker",
        "Vehicle Stickers",
        "Designer Stickers",
        "Vintage Stickers",
      ],
      "Tags / Bedges": [
        "Luggage Tag",
        "Door Handle Tag",
        "Gift Tag",
        "Parking Tags",
        "Wedding Bedges",
      ],
      "Welcome Signages": [
        "Wedding Ceremony",
        "Haldi Ceremony",
        "Mehandi Ceremony",
        "Sangeet Ceremony",
        "Direction Signage",
        "Engagement Ceremony",
        "Anniversary Ceremony",
        "Lohri Party",
        "Halloween Party",
        "Birthday Party",
        "Celeration Party",
      ],
      "Accessories  > Best Seller": [
        "Shagun Enevelop for New Wed",
        "Shagun Enevelop for Guests",
        "Coasters",
        "Paper Napkins",
        "Party Dangler",
        "Event Banner",
        "Face Mask",
        "Photo Megnet",
        "Funny Poster",
      ],
      Games: ["Playing Cards", "Puzzle Games", "Fun Games"],
    },


    "Guest Surprising ": {
      Newspapers: [
        "Wedding Newspaper",
        "Engagement Newspaper",
        "Birthday Newspaper",
        "Special Event",
        "E-Paper",
      ],
      Magazine: [
        "Wedding Magazine",
        "Engagement Magazine",
        "Birthday Magazine",
        "Special Event",
        "E-Magazine",
      ],
    },


    "Calendars 2025": {
      "Mini Desktop Calendar": [
        "Wedding Calendar",
        "Birthday Calendar",
        "Family & Kids",
      ],
      "Wall Calendar - Portrait": [
        "Wedding Calendar",
        "Birthday Calendar",
        "Family & Kids",
      ],
      "Wall Calendar - Landscape": [
        "Wedding Calendar",
        "Birthday Calendar",
        "Family & Kids",
      ],
      "Desktop Calendar": [
        "Wedding Calendar",
        "Birthday Calendar",
        "Family & Kids",
      ],
      "Table Tent Calendar": [
        "Wedding Calendar",
        "Birthday Calendar",
        "Family & Kids",
      ],
      "Poster Calendar": [
        "Wedding Calendar",
        "Birthday Calendar",
        "Family & Kids",
      ],
    },


    "Planner Books": {
      "Planner Books": [
        "Wedding Management",
        "Guest Management",
        "Wedding Notepad(liner)",
        "Wedding Notepad(photo)",
        "Guest List Booklet - Best Seller",
      ],
      "Free Printable": [
        "Wedding Guest List-PDF",
        "Wedding Guest List - XLS",
        "Wedding Notepad - PDF",
      ],
    },


    "Free Greetings": {
      "Wishes Greeting": [
        "Wishes to New Wed",
        "Engagement Wishes",
        "Anniversary Wishes",
        "Birthday Wishes",
        "Retirement Wishes",
        "General Wishes",
      ],
      "Thanks Greeting": [
        "Thanks to Invitor",
        "Thanks to Guests",
        "Thanks for Wishes",
        "General Greetings",
      ],
      "Feeling Greetings": [
        "Love Cards",
        "Sorry Cards",
        "Congrats Cards",
        "Miss you Card",
        "Good Luck Cards",
      ],
      "Funny Greetings": [
        "For Wedding",
        "For Anniversary",
        "For Party",
        "General Greetings",
      ],
    },
  };


  const [selectedOptions, setSelectedOptions] = useState({
    main: "",
    sub: "",
    subSub: "",
  });


  const [priceFilter, setPriceFilter] = useState(3000);
  const location = useLocation();


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
    const value = event.target.value ? parseFloat(event.target.value) : Infinity;
    setPriceFilter(value);
  };

  console.log(products);
  

console.log(selectedOptions.subSub);

  // Parse query parameters
const params = new URLSearchParams(location.search);
const searchTerm = params.get("term") || "";
const category = params.get("category") || "All";

console.log(searchTerm,category);



// Filter Logic
const filteredProducts = products?.filter((product) => {
  const matchesCategory =
    category === "All" || product.category === category;


  // Matches the sub-category
  const matchesSubCategory =
    !selectedOptions.sub || product.subCategory === selectedOptions.sub;


  // Matches the sub-sub-category
  const matchesSubSubCategory =
    !selectedOptions.subSub || product.subSubCategory === selectedOptions.subSub;


  // Matches the price filter
  const matchesPrice = product.price <= priceFilter;


  // Matches the search term
  const matchesSearchTerm =
    !searchTerm ||
    product.subSubCategory?.toLowerCase().includes(searchTerm.toLowerCase());


  return (
    matchesCategory &&
    matchesSubCategory &&
    matchesSubSubCategory &&
    matchesPrice &&
    matchesSearchTerm
  );
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
                {Object.keys(dropdownData).map((categoryKey, index) => (
                  <option key={index} value={categoryKey}>
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
                    (subOptionKey, index) => (
                      <option key={index} value={subOptionKey}>
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
            {filteredProducts?.length === 0 ? (
              <div>No products found</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts?.map((product, index) => (
                  <Link
                    to={`/product/${product?._id}`}
                    key={index}
                    state={{ product }} // Pass product data
                    className="relative flex flex-col rounded-xl hover:shadow-lg group duration-200 overflow-hidden transition items-center group border bg-white "
                  >
                    <div className="relative w-full aspect-square  p-2   ">
                      <img
                        src={product?.image[0]}
                        alt={product?.name}
                        className="object-cover w-full h-72 rounded-t-xl group-hover:rotate-2 group-hover:scale-105 duration-300 transition "
                      />
                    </div>
                    <div className="flex flex-col justify-center py-2 ">
                      <h4 className="text-center text-brown-800  font-medium text-sm ">
                        {product?.subSubCategory.length > 25 ? `${product?.subSubCategory.slice(0, 25)}...` : product?.subSubCategory }
                      </h4>


                      <p className="text-center text-gray-700 font-medium text-sm">
                        ₹{product?.price}
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



