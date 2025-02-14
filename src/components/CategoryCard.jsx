import React, { useRef, useState } from "react";
import invitation from "../assets/images/placeholder.jpg";
import weddingImg from "../assets/images/wedding.jpg";
import vinvite from "../assets/images/v-invite.webp";
import welcome from "../assets/images/welcome sign.webp";
import { motion, useInView } from "framer-motion";
import btnBg from "../assets/images/08.png";
import guestPlan from "../assets/images/stressfree/guestplan.jpeg";
import wedPlan from "../assets/images/stressfree/wedplan.jpg";
import guestList from "../assets/images/stressfree/guestlist.jpg";
import pdfPrint from "../assets/images/stressfree/checklist.jpg";
import wedNote from "../assets/images/stressfree/wednoteliner.jpg";
import wedPhoto from "../assets/images/stressfree/wednotephoto.jpeg";

import wishes from "../assets/images/wishes/wish.jpg";
import thanks from "../assets/images/wishes/thank.jpg";
import feeling from "../assets/images/wishes/feeling.jpg";
import funny from "../assets/images/wishes/funny.jpg";

const categories = [
  {
    title: "Print Invitations",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Wedding Invitation",
        imgUrl: weddingImg, // URL from product.json
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
    title: "E-Invitations",
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
    title: "Planner Books",
    description:
      "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
    subCategory: [
      {
        subTitle: "Wedding Management",
        imgUrl: wedPlan, // Example image
        url: "/e/nav/planner%20books/Planner%20Books/Wedding%20Management",
      },
      {
        subTitle: "Guest Management",
        imgUrl: guestPlan, // Example image
        url: "/e/nav/planner%20books/Planner%20Books/Guest%20Management",
      },
      {
        subTitle: "Wedding Notepad (Liner)",
        imgUrl: wedNote, // Example image
        url: "/e/nav/planner%20books/Planner%20Books/Wedding%20Notepad%20(Linear)",
      },
      {
        subTitle: "Wedding Notepad (Photo)",
        imgUrl: wedPhoto, // Example image
        url: "/e/nav/planner%20books/Planner%20Books/Wedding%20Notepad%20(Photo)",
      },
      {
        subTitle: "Guest List Booklet",
        imgUrl: guestList, // Example image
        url: "/e/nav/planner%20books/Planner%20Books/Guest%20List%20Booklet%20-%20Best%20Seller",
      },
      {
        subTitle: "Free Printables",
        imgUrl: pdfPrint, // Example image
        url: "/nav/planner%20books/Free%20Printable",
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
    title: "Free Greetings",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus. ",
    subCategory: [
      {
        subTitle: "Wishes Greeting",
        imgUrl: wishes, // Example image
        url: "e/navbar/free greetings/Wishes Greeting/Wishes Greeting",
      },
      {
        subTitle: "Thanks Greeting",
        imgUrl: thanks, // Example image
      },
      {
        subTitle: "Feeling Greeting",
        imgUrl: feeling, // Example image
      },
      {
        subTitle: "Funny Greeting",
        imgUrl: funny, // Example image
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

  return (
    <div className=" py-10">
      {/* Header Section */}
      <motion.div>
        <div className="text-center mb-4">
          <h1 className="lg:text-4xl text-3xl text-secondary font-avalonB bg-clip-text">
            Explore Our Product Categories
          </h1>
          <p className="text-secondary font-avalonN lg:text-2xl text-xl mt-1 leading-relaxed">
            Browse through our wide range of categories to find something
            perfect for your needs!
          </p>
        </div>
      </motion.div>
      {/* Categories Navigation */}
      <motion.div>
        <div className="py-2 lg:px-4 px-1 bg-secondary shadow-md">
          <ul className="flex gap-4 justify-start overflow-x-auto no-scrollbar">
            {categories.map((cat, index) => (
              <motion.li
                key={index}
                className={`text-md font-avalonB flex flex-shrink-0 font-bold cursor-pointer px-5 py-2 rounded-lg transition-all duration-300 transform
                                ${
                                  selectedCategory === cat
                                    ? "bg-amber-50 text-pink-600 shadow-lg"
                                    : " text-white hover:bg-amber-300 hover:text-gray-900 hover:shadow-md"
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
        <motion.div>
          <div className="flex flex-col lg:flex-col gap-10 justify-between items-start mt-4">
            {/* Subcategories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
              {selectedCategory.subCategory.map((sub, index) => (
                <motion.div
                  custom={index}
                  key={index}
                  className="relative lg:w-[200px] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden group lg:w-[200px] h-[170px]">
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
                  <h1 className="text-md font-avalonN font-semibold text-center text-gray-800 py-1">
                    {sub.subTitle}
                  </h1>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      <div className="pt-4">
        <div className="relative flex items-center justify-center hover:translate-x-2 duration-300 ease-in-out">
          <img className="h-8" src={btnBg} alt="" />
          <a
            className="absolute text-lg font-avalonB uppercase text-white"
            href="/products"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
