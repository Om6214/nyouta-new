import React, { useState } from "react";
import invitation from "../assets/images/placeholder.jpg";
import vinvite from "../assets/images/v-invite.webp";
import welcome from "../assets/images/welcome sign.webp";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Print Invitations",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Wedding Invitation",
        imgUrl: invitation,
        url: "/products/wedding-invites",
      },
      {
        subTitle: "Party Invitation",
        imgUrl: vinvite,
        url: "/products/wedding-invites",
      },
      {
        subTitle: "Pooja Invitation",
        imgUrl: invitation,
        url: "/products/wedding-invites",
      },
      {
        subTitle: "Ceremony Invitation",
        imgUrl: vinvite,
        url: "/products/wedding-invites",
      },
    ],
  },
  {
    title: "E Invitations",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus. Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had.",
    subCategory: [
      {
        subTitle: "Wedding Invitation",
        imgUrl: "",
      },
      {
        subTitle: "Party Invitation",
        imgUrl: "",
      },
      {
        subTitle: "Pooja Invitation",
        imgUrl: "",
      },
      {
        subTitle: "Ceremony Invitation",
        imgUrl: "",
      },
    ],
  },
  {
    title: "Photo Books",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had.",
    subCategory: [
      {
        subTitle: "Soft Cover Photobook",
        imgUrl: "",
      },
      {
        subTitle: "Hard Cover Photobook",
        imgUrl: "",
      },
      {
        subTitle: "Spiral Photobook",
        imgUrl: "",
      },
      {
        subTitle: "Photo Folder",
        imgUrl: "",
      },
      {
        subTitle: "Digital Photobook",
        imgUrl: "",
      },
    ],
  },
  {
    title: "Itinerary",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.",
    subCategory: [
      {
        subTitle: "Wedding Itinerary",
        imgUrl: "",
      },
      {
        subTitle: "Stickers",
        imgUrl: "",
      },
      {
        subTitle: "Tags/Badges",
        imgUrl: "",
      },
      {
        subTitle: "Welcome Signages",
        imgUrl: "",
      },
      {
        subTitle: "Accessories",
        imgUrl: "",
      },
    ],
  },
  {
    title: "Free Greetings",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus. ",
    subCategory: [
      {
        subTitle: "Wishes Greeting",
        imgUrl: "",
      },
      {
        subTitle: "Thanks Greeting",
        imgUrl: "",
      },
      {
        subTitle: "Feeling Greeting",
        imgUrl: "",
      },
      {
        subTitle: "Funny Greeting",
        imgUrl: "",
      },
      {
        subTitle: "Accessories",
        imgUrl: "",
      },
    ],
  },
  {
    title: "Guest Surprising",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Newspaper",
        imgUrl: welcome,
      },
      {
        subTitle: "Magazines",
        imgUrl: welcome,
      },
    ],
  },
  {
    title: "Calenders",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Wedding Calender",
        imgUrl: welcome,
      },
      {
        subTitle: "Family Calender",
        imgUrl: welcome,
      },
    ],
  },
];

const CategoryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const gridVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.5,
        delay: index * 0.2, // Staggered animation for each item
      },
    }),
  };

  return (
    <div className="mt-8 py-10 lg:px-8 px-2 rounded-lg bg-gradient-to-b from-amber-50 to-yellow-100 shadow-lg">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8 }}
      >
        <div className="text-center mb-10">
          <h1 className="lg:text-6xl text-3xl font-primaryFont font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
            Explore Our Product Categories
          </h1>
          <p className="text-gray-700 font-primaryFont lg:text-3xl text-xl mt-4 leading-relaxed">
            Browse through our wide range of categories to find something
            perfect for your needs!
          </p>
        </div>
      </motion.div>
      {/* Categories Navigation */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.0 }}
      >
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
          <ul className="flex flex-wrap gap-6 justify-center">
            {categories.map((cat, index) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                key={index}
                className={`text-lg font-medium cursor-pointer px-6 py-3 rounded-lg transition-all duration-300 transform 
                                ${
                                  selectedCategory === cat
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105"
                                    : "bg-gray-200 text-gray-700 hover:bg-amber-300 hover:text-gray-900 hover:shadow-md"
                                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.title}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Selected Category Display */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.7 }}
        >
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-start mt-12">
            {/* Category Info */}
            <div className="text-start w-full lg:w-[30%] flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-4xl font-bold text-gray-800">
                {selectedCategory.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedCategory.description}
              </p>
              <div className="w-16 h-[3px] bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            </div>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
              {selectedCategory.subCategory.map((sub, index) => (
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={gridVariants}
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden group">
                    <img
                      className="w-full h-[200px] object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                      src={sub.imgUrl || invitation}
                      alt={sub.subTitle}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a href={sub.url}>
                        <p className="text-white font-bold text-lg">
                          View More
                        </p>
                      </a>
                    </div>
                  </div>
                  <h1 className="text-lg font-semibold text-center text-gray-800 py-4">
                    {sub.subTitle}
                  </h1>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryCard;
