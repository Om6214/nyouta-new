import React, { useRef, useState } from "react";
import invitation from "../assets/images/placeholder.jpg";
import vinvite from "../assets/images/v-invite.webp";
import welcome from "../assets/images/welcome sign.webp";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    title: "Print Invitations",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Wedding Invitation",
        imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // URL from product.json
        url: "/products/wedding-invites",
      },
      {
        subTitle: "Party Invitation",
        imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // URL from product.json
        url: "/products/party-invites",
      },
      {
        subTitle: "Pooja Invitation",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // URL from product.json
        url: "/products/pooja-invites",
      },
      {
        subTitle: "Ceremony Invitation",
        imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
        url: "/products/ceremony-invites",
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
        imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // URL from product.json
      },
      {
        subTitle: "Party Invitation",
        imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // URL from product.json
      },
      {
        subTitle: "Pooja Invitation",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // URL from product.json
      },
      {
        subTitle: "Ceremony Invitation",
        imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
      },
      {
        subTitle: "Short Invitation - Free",
        imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
      },
      {
        subTitle: "Matrimonial Biodata",
        imgUrl: "https://imagizer.imageshack.com/img922/701/tU9pus.jpg", // URL from product.json
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
        imgUrl: "https://imagizer.imageshack.com/img922/7829/cplqEv.jpg", // Example image
      },
      {
        subTitle: "Hard Cover Photobook",
        imgUrl: "https://imagizer.imageshack.com/img924/2023/xASzg2.jpg", // Example image
      },
      {
        subTitle: "Spiral Photobook",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Photo Folder",
        imgUrl: "https://imagizer.imageshack.com/img923/1097/0Gyp7f.jpg", // Example image
      },
      {
        subTitle: "Digital Photobook",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
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
        imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
      },
      {
        subTitle: "Stickers",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Tags/Badges",
        imgUrl: "https://imagizer.imageshack.com/img922/3017/bflFDJ.jpg", // Example image
      },
      {
        subTitle: "Welcome Signages",
        imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
      },
      {
        subTitle: "Accessories",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Games",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
    ],
  },
  {
    title: "Calendars 2025",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Mini Desktop Calendar",
        imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
      },
      {
        subTitle: "Wall Calendar - Potrait",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Wall Calendar - Landscape",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Desktop Calendar",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Table Tent Calendar",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Poster Calender",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
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
        imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
      },
      {
        subTitle: "Thanks Greeting",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
      },
      {
        subTitle: "Feeling Greeting",
        imgUrl: "https://imagizer.imageshack.com/img923/9710/88AWMh.jpg", // Example image
      },
      {
        subTitle: "Funny Greeting",
        imgUrl: "https://i.postimg.cc/SN3Zymj9/Guests-14.jpg", // Example image
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
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
      {
        subTitle: "Magazines",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
    ],
  },
  {
    title: "Planner Books",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Planner Books",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
      {
        subTitle: "Free Printables",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
    ],
  },
  {
    title: "E-Shop",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Shagun Envelop",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
      {
        subTitle: "Photo Magnet",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
      {
        subTitle: "Gifts",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
      {
        subTitle: "Essentials",
        imgUrl: "https://imagizer.imageshack.com/img922/8871/js4uRU.jpg", // Example image
      },
    ],
  },
  
];


const CategoryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, {once: true})
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
    <div className=" py-10 bg-priBg shadow-lg">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8 }}
      >
        <div className="text-center mb-10">
          <h1 className="lg:text-5xl text-3xl font-heroFont font-extrabold bg-clip-text text-primary">
            Explore Our Product Categories
          </h1>
          <p className="text-primary font-heroFont lg:text-2xl font-semibold text-xl mt-4 leading-relaxed">
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
        <div className="py-2 px-4 bg-secondary shadow-md">
          <ul className="flex flex-wrap gap-4 justify-start">
            {categories.map((cat, index) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                key={index}
                className={`text-md font-heroFont font-bold cursor-pointer px-5 py-2 rounded-lg transition-all duration-300 transform 
                                ${
                                  selectedCategory === cat
                                    ? "bg-violet-400 text-pink-600 shadow-lg scale-105"
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
          <div className="flex flex-col lg:flex-col gap-10 justify-between items-start mt-4">

            {/* Subcategories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
              {selectedCategory.subCategory.map((sub, index) => (
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={gridVariants}
                  key={index}
                  className="relative lg:w-[200px] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden group lg:w-[200px] lg:h-[250px]">
                    <img
                      className="w-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110 "
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
                  <h1 className="text-lg font-heroFont font-semibold text-center text-gray-800 py-4">
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
