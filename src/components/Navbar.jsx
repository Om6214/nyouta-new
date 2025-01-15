import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../CartContext";
import logo from "../assets/images/nyouta-logo2.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/slices/authSlice";

const navItems = [
  {
    label: "Print Invitations",
    url: "/nav/print invitations",
    children: [
      {
        label: "Wedding Invitations",
        Filters: [
          { a: "Elegant Collection" },
          { a: "Vintage  Collection" },
          { a: "Royal Invitations" },
          { a: "Slider Invitations" },
          { a: "Passport Theme Invitations" },
          { a: "Newspaper Invitations" },
          { a: "Aadhar Card Invitations" },
          { a: "ATM Theme Invitations" },
        ],
      },
      {
        label: "Party Invitation",
        Filters: [
          { a: "Birthday Party " },
          { a: "Kitty Party " },
          { a: "Retirement Party " },
          { a: "Halloween Party " },
          { a: "Lohri Party " },
        ],
      },
      {
        label: "Pooja Invitations",
        Filters: [
          { a: "Sawamani " },
          { a: "Griha Pravesh " },
          { a: "Shyam Jagran " },
        ],
      },
      {
        label: "Ceremony Invitations",
        Filters: [
          { a: "Engagement Ceremony " },
          { a: "Wedding Anniversary " },
          { a: "Opening Ceremony " },
          { a: "Kua Poojan " },
        ],
      },
    ],
  },
  {
    label: "E Invitation",
    url: "/nav/e-invitations",
    children: [
      {
        label: "Wedding Invitations",
        Filters: [
          { a: "Pre Invitations - Manuhar " },
          { a: "Save the Date " },
          { a: "Wedding Invitations " },
          { a: "Ceremony Invitations " },
          { a: "Wedding Timeline " },
          { a: "Royal Collection - NEW " },
        ],
      },
      {
        label: "Party Invitations",
        Filters: [
          { a: "Birthday Party " },
          { a: "Kitty Party " },
          { a: "Retirement Party " },
          { a: "Halloween Party " },
          { a: "Lohri Party " },
        ],
      },
      {
        label: "Pooja Invitations",
        Filters: [
          { a: "Sawamani " },
          { a: "Griha Pravesh " },
          { a: "Shyam Jagran " },
        ],
      },
      {
        label: "Ceremony Invitations",
        Filters: [
          { a: "Engagement Ceremony " },
          { a: "Wedding Anniversary " },
          { a: "Wedding Events " },
          { a: "Opening Ceremony " },
          { a: "Kua Poojan " },
        ],
      },
      {
        label: "Short Invitation - Free",
        Filters: [{ a: "Wedding Invitations " }, { a: "Party Invitations " }],
      },
      { label: "Matrimonial Biodata", Filters: [{ a: "Marriage Biodata " }] },
    ],
  },
  {
    label: "Photo Books",
    url: "/nav/photo books",
    children: [
      {
        label: "Soft Cover Photobook",
        Filters: [
          { a: "Wedding Photobook " },
          { a: "Engagement Photobook " },
          { a: "Anniversary Photobook " },
          { a: "Birthday Photobook " },
        ],
      },
      {
        label: "Hard Cover Photobook",
        Filters: [
          { a: "Wedding Photobook " },
          { a: "Engagement Photobook " },
          { a: "Anniversary Photobook " },
          { a: "Birthday Photobook " },
        ],
      },
      {
        label: "Spiral Photobook",
        Filters: [
          { a: "Wedding Photobook " },
          { a: "Engagement Photobook " },
          { a: "Anniversary Photobook " },
          { a: "Birthday Photobook " },
        ],
      },
      {
        label: "Photo Folder",
        Filters: [
          { a: "Wedding Photobook " },
          { a: "Engagement Photobook " },
          { a: "Anniversary Photobook " },
          { a: "Birthday Photobook " },
        ],
      },
      {
        label: "Digtial Photobook > Best Seller",
        Filters: [
          { a: "Wedding Photobook " },
          { a: "Engagement Photobook " },
          { a: "Anniversary Photobook " },
          { a: "Birthday Photobook " },
        ],
      },
    ],
  },
  {
    label: "Itinerary",
    url: "/nav/itinerary",
    children: [
      {
        label: "Wedding Itinerary",
        Filters: [
          { a: "Room Itinerary " },
          { a: "Check-in Itinerary " },
          { a: "Room Key Enevelop " },
          { a: "Thank You Cards " },
          { a: "Wedding Menu " },
          { a: "Table Itinerary " },
          { a: "Dining Table Mats " },
        ],
      },
      {
        label: "Stickers",
        Filters: [
          { a: "Guest Name Stickers " },
          { a: "Gift Box Sticker " },
          { a: "Vehicle Stickers " },
          { a: "Designer Stickers " },
          { a: "Vintage Stickers " },
        ],
      },
      {
        label: "Badges",
        Filters: [
          { a: "Luggage Tag " },
          { a: "Door Handle Tag " },
          { a: "Gift Tag " },
          { a: "Parking Tags " },
          { a: "Wedding Bedges " },
        ],
      },
      {
        label: "Welcome Signages",
        Filters: [
          { a: "Wedding Ceremony " },
          { a: "Haldi Ceremony " },
          { a: "Mehandi Ceremony " },
          { a: "Sangeet Ceremony " },
          { a: "Direction Signage " },
          { a: "Engagement Ceremony " },
          { a: "Anniversary Ceremony " },
          { a: "Lohri Party " },
          { a: "Halloween Party " },
          { a: "Birthday Party " },
          { a: "Celebration Party " },
        ],
      },
      {
        label: "Accessories",
        Filters: [
          { a: "Party Dangler " },
          { a: "Coasters " },
          { a: "Paper Napkins " },
          { a: "Event Banner " },
          { a: "Face Mask " },
          { a: "Funny Poster " },
        ],
      },
      {
        label: "Games",
        Filters: [
          { a: "Playing Cards " },
          { a: "Puzzle Games " },
          { a: "Fun Games " },
        ],
      },
    ],
  },
  {
    label: "Calendars 2025",
    url: "/nav/calendars 2025",
    children: [
      {
        label: "Mini Desktop Calendar",
        Filters: [
          { a: "Wedding Calendar " },
          { a: "Birthday Calendar " },
          { a: "Family & Kids " },
        ],
      },
      {
        label: "Wall Calendar - Portrait ",
        Filters: [
          { a: "Wedding Calendar" },
          { a: "Birthday Calendar" },
          { a: "Family & Kids" },
        ],
      },
      {
        label: "Wall Calendar - Landscape",
        Filters: [
          { a: "Wedding Calendar " },
          { a: "Birthday Calendar " },
          { a: "Family & Kids " },
        ],
      },
      {
        label: "Desktop Calendar",
        Filters: [
          { a: "Wedding Calendar " },
          { a: "Birthday Calendar " },
          { a: "Family & Kids " },
        ],
      },
      {
        label: "Table Tent Calendar",
        Filters: [
          { a: "Wedding Calendar " },
          { a: "Birthday Calendar " },
          { a: "Family & Kids " },
        ],
      },
      {
        label: "Poster Calendar",
        Filters: [
          { a: "Wedding Calendar " },
          { a: "Birthday Calendar " },
          { a: "Family & Kids " },
        ],
      },
    ],
  },
  {
    label: "Free Greetings",
    url: "/nav/free greetings",
    children: [
      {
        label: "Wishes Greeting",
        Filters: [
          { a: "Wishes to New Wed" },
          { a: "Engagement Wishes" },
          { a: "Anniversary Wishes" },
          { a: "Birthday Wishes" },
          { a: "Retirement Wishes" },
          { a: "General Wishes" },
        ],
      },
      {
        label: "Thanks Greeting",
        Filters: [
          { a: "Thanks to Invitor" },
          { a: "Thanks to Guests" },
          { a: "Thanks for Wishes" },
          { a: "General Greetings" },
        ],
      },
      {
        label: "Feeling Greetings",
        Filters: [
          { a: "Love Cards" },
          { a: "Sorry Cards" },
          { a: "Congrats Cards" },
          { a: "Miss you Card" },
          { a: "Good Luck Cards" },
        ],
      },
      {
        label: "Funny Greetings",
        Filters: [
          { a: "For Wedding" },
          { a: "For Anniversary" },
          { a: "For Party" },
          { a: "General Greetings" },
        ],
      },
    ],
  },
  {
    label: "Guest Surprising",
    url: "/nav/guest surprising",
    children: [
      {
        label: "Newspapers",
        Filters: [
          { a: "Wedding Newspaper" },
          { a: "Engagement Newspaper" },
          { a: "Birthday Newspaper" },
          { a: "Special Event" },
          { a: "E-Paper" },
        ],
      },
      {
        label: "Magazine",
        Filters: [
          { a: "Wedding Magazine" },
          { a: "Engagement Magazine" },
          { a: "Birthday Magazine" },
          { a: "Special Event" },
          { a: "E-Magazine" },
        ],
      },
    ],
  },
  {
    label: "Planner Books",
    url: "/nav/planner books",
    children: [
      {
        label: "Wedding Management",
      },
      {
        label: "Guest Management",
      },
      {
        label: "Wedding Notepad",
      },
      {
        label: "Guest List Booklet - Best Seller",
      },
      //   Filters: [
      //     { alabel: "Wedding Management" },
      //     { a: "Guest Management" },
      //     { a: "Wedding Notepad" },
      //     { a: "Guest List Booklet - Best Seller" },
      //   ],

      {
        label: "Free Printable",
        Filters: [
          { a: "Wedding Guest List-PDF" },
          { a: "Wedding Guest List - XLS" },
          { a: "Wedding Notepad - PDF" },
        ],
      },
    ],
  },
  {
    label: "E-Shop",
    url: "/nav/e shop",
    children: [
      {
        label: "Shagun Envelop",
        Filters: [{ a: "For Wedding Guests" }, { a: "For New Wed" }],
      },
      {
        label: "Photo Magnet",
        Filters: [
          { a: "Mini Photo Magnet" },
          { a: "Wedding" },
          { a: "Family" },
          { a: "Birthday" },
          { a: "Quotes" },
          { a: "Travel" },
          { a: "Faces" },
          { a: "Funny" },
          { a: "Religious" },
          { a: "Feeling" },
        ],
      },
      {
        label: "Gifts",
        Filters: [
          { a: "Wedding Gift" },
          { a: "Party Gift" },
          { a: "Packaging" },
        ],
      },
      {
        label: "Essentials",
        Filters: [{ a: "Wedding Shopping" }, { a: "Party Shopping" }],
      },
    ],
  },
  {
    label: "Wedding Website",
    url: "/create-wedding-website",
  },
];
export default function MainNav() {
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [activeChildDropdown, setActiveChildDropdown] = React.useState(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { cartItems, toggleCart } = useCart(); // Access cartItems and toggleCart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = () => {
    // Construct query parameters
    const params = new URLSearchParams();
    if (searchTerm) params.append('term', searchTerm);
    if (category) params.append('category', category);

    console.log(params.toString());
    

    // Redirect to the products page with query parameters
    navigate(`/products?${params.toString()}`);
  };

  const gridVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    }),
  };
  const handleMouseEnter = (index) => {
    setIsDropdownOpen(index);
  };

  const handleMouseLeave = () => {
    if (!isHoveringDropdown) {
      setIsDropdownOpen(null);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    setOpenDropdown(null);
    navigate("/login");
  };
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all border-b-2 border-primary ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto ">
        {/* Top Navigation */}
        <div className="flex h-18 items-center justify-between px-4">
          <Link to="/" className="flex items-center py-2 lg:pl-12 gap-2">
            <img className="lg:w-56 w-36" src={logo} alt="logo-imgh" />
            {/* <span className="text-xl font-bold">न्यौता</span> */}
          </Link>
          <div className="lg:flex hidden">
      <select
        name="category"
        id="category"
        className="!pr-8 border-r-0 rounded-l-lg w-[80px]"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        {navItems.map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </select>
      <input
        className="flex-1 px-4 border-t border-b border-r rounded-none focus:outline-none"
        type="search"
        name="search"
        id="search"
        placeholder="I'm shopping for..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-secondary py-2 px-6 rounded-r-lg hover:bg-primary font-semibold text-white font-heroFont"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>

          {/* Right Section for Icons */}
          <div className="flex items-center gap-1 lg:gap-4">
            {/* <Link className="pr-4">
              <Search className="h-6 w-6 hover:text-primary" />
            </Link> */}
            <a
              href="/join-e-nyouta"
              className="text-pink-600 font-avalonN hidden lg:flex leading-none hover:underline"
            >
              Join E-Nyouta
              <br />
              Share Memories
            </a>
            <button
              onClick={toggleCart}
              className="flex items-center gap-1 relative"
            >
              <ShoppingBag size={27} className=" hover:text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 right-0 rounded-full bg-black px-2 py-1 text-[8px] text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("user")}
                className="flex items-center gap-1 rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2"
              >
                {user && Object.keys(user).length > 0 ? (
                  <div>
                    <img
                      src={user.avatar || "profile.jpeg"}
                      alt="profile-pic"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                ) : (
                  <>
                    <User size={27} />
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
              {openDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-priBg py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  {!(user && Object.keys(user).length > 0) ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Drawer Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu size={27} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ opacity: 0.8, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.8, x: 300 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
            >
              <div className="absolute right-0 h-full w-64  bg-white p-4">
                <button
                  className="mb-4 text-right"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X />
                </button>
                <ul className="">
                  {navItems.map((item) => (
                    <li key={item} className="flex flex-col gap-2 font-avalonN">
                      <Link
                        onClick={() => setIsDrawerOpen(false)}
                        to={item.url}
                        className="py-2 text-lg hover:text-brown-600 flex items-center gap-1"
                      >
                        {item.label}{" "}
                        <span>
                          <ArrowRight size={20} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden lg:flex py-2 justify-center ">
        <ul className="flex gap-10 justify-center items-center text-md font-avalonN">
          {navItems.map((item, index) => {
            const isLastTwoItems = index >= navItems.length - 2;
            return (
              <li
                key={index}
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveChildDropdown(null);
                }}
                className="relative py-2"
              >
                <Link
                  to={item.url}
                  className="hover:text-primary hover:border-b-2 border-primary hover:font-semibold flex items-center gap-3"
                >
                  {item.label}
                </Link>
                <AnimatePresence>
                  {item.children && activeDropdown === index && (
                    <div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-8 left-0 mt-2 bg-priBg rounded-lg border-b-2 border-primary min-w-[250px] py-3 px-4 shadow-lg"
                    >
                      <ul className="space-y-2">
                        {item.children.map((child, childIndex) => (
                          <li
                            key={childIndex}
                            // variants={gridVariants}
                            // initial="hidden"
                            // animate="visible"
                            custom={childIndex}
                            onMouseEnter={() =>
                              setActiveChildDropdown(childIndex)
                            }
                            onMouseLeave={() => setActiveChildDropdown(null)}
                            className="relative"
                          >
                            <Link
                              to={
                                item.url === "/nav/planner books" &&
                                child.label != "Free Printable"
                                  ? `e${item.url}/Planner%20Books/${child.label}`
                                  : `${item.url}/${child.label}`
                              }
                              className="flex items-center gap-1 text-md hover:text-primary hover:border-b-2 border-primary pb-1 transition-colors"
                            >
                              {child.label}
                              {console.log(item.url)}
                            </Link>
                            <AnimatePresence>
                              {child.Filters &&
                                activeChildDropdown === childIndex && (
                                  <div
                                    className={`absolute top-0 ${
                                      isLastTwoItems
                                        ? "right-full "
                                        : "left-full ml-2"
                                    } bg-priBg rounded-lg border-b-2 border-primary min-w-[200px] py-3 px-3 shadow-lg`}
                                  >
                                    <ul className="space-y-2">
                                      {child.Filters.map(
                                        (filter, filterIndex) => (
                                          <li
                                            key={filterIndex}
                                            // variants={gridVariants}
                                            // initial="hidden"
                                            // animate="visible"
                                            custom={filterIndex}
                                          >
                                            <Link
                                              to={`e${item.url}/${child.label}/${filter.a}`}
                                              className="block text-md hover:text-primary hover:border-b-2 border-primary pb-1 transition-colors whitespace-nowrap"
                                            >
                                              {filter.a}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </AnimatePresence>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile drawer code remains the same */}
    </header>
  );
}
