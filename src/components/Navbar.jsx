import * as React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "../CartContext"; // Import your cart context
import logo from "../assets/images/nyouta-logo2.jpg";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    label: "Print Invitations",
    url: "/print-invitations",
    children: [
      { label: "Wedding Invitations" },
      { label: "Party Invitation" },
      { label: "Pooja Invitation" },
      { label: "Ceremony Invitation" },
    ],
  },
  {
    label: "E Invitation",
    url: "/e-invitations",
    children: [
      { label: "Wedding Invitations" },
      { label: "Party Invitation" },
      { label: "Pooja Invitation" },
      { label: "Ceremony Invitation" },
      { label: "Short Invitation - Free" },
      { label: "Matrimonial Biodata" },
    ],
  },
  {
    label: "Photo Books",
    url: "/photo-books",
    children: [
      { label: "Soft Cover Photobook" },
      { label: "Hard Cover Photobook" },
      { label: "Spiral Photobook" },
      { label: "Photo Folder" },
      { label: "Digital Photobook" },
    ],
  },
  {
    label: "Itinerary",
    url: "/itinerary",
    children: [
      { label: "Wedding Itinerary" },
      { label: "Stickers" },
      { label: "Tags/Badges" },
      { label: "Welcome Signages" },
      { label: "Accessories" },
      { label: "Games" },
    ],
  },
  {
    label: "Calendars 2025",
    url: "/calendars",
    children: [
      { label: "Mini Desktop Calendar" },
      { label: "Wall Calendar - Potrait" },
      { label: "Wall Calendar - Landscape" },
      { label: "Desktop Calendar" },
      { label: "Table Tent Calendar" },
      { label: "Poster Calendar" },
    ],
  },
  {
    label: "Free Greetings",
    url: "/free-greetings",
    children: [
      { label: "Wishes Greeting" },
      { label: "Thanks Greeting" },
      { label: "Feeling Greeting" },
      { label: "Funny Greeting" },
    ],
  },
  {
    label: "Guest Surprising",
    url: "/guest-surprising",
    children: [{ label: "Newspaper" }, { label: "Magazines" }],
  },
  {
    label: "Planner Books",
    url: "/planner-books",
    children: [{ label: "Planner Books" }, { label: "Free Printables" }],
  },
  {
    label: "E-Shop",
    url: "/e-shop",
    children: [
      { label: "Shagun Envelop" },
      { label: "Photo Magnet" },
      { label: "Gifts" },
      { label: "Essentials" },
    ],
  },
];
export default function MainNav() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { cartItems, toggleCart } = useCart(); // Access cartItems and toggleCart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isHoveringDropdown, setIsHoveringDropdown] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (index) => {
    setIsDropdownOpen(index)
  };

  const handleMouseLeave = () => {
   if (!isHoveringDropdown) {
    setIsDropdownOpen(null)
   }
  };

  // React.useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  const gridVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2, // Staggered animation for each item
      },
    }),
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
          <Link to="/" className="flex items-center pt-4 lg:pl-12 gap-2">
            <img className="lg:w-56 w-36" src={logo} alt="logo-imgh" />
            {/* <span className="text-xl font-bold">न्यौता</span> */}
          </Link>
          <div className="lg:flex hidden">
            <input className="rounded-l-lg" type="search" name="search" id="search" placeholder="I'm shopping for"/>
            <button className="bg-secondary py-2 px-6 rounded-r-lg hover:bg-primary font-semibold text-white font-heroFont">Search</button>
          </div>

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex w-full flex-1 items-center gap-2 px-4">
            <ul className="flex w-full space-x-8 items-center justify-end font-heroFont">
              {navItems.map((item) => (
                <li key={item} onMouseOut={() => setIsDropdownOpen(false)}>
                  {item.children ? (
                    <Link to={item.url} onMouseOver={() => setIsDropdownOpen(true)} className="py-2 hover:text-primary hover:border-b-2 border-primary hover:font-semibold">
                    {item.label}
                  </Link>
                  ) : (
                    <Link to={item.url} className="py-2 hover:text-primary hover:border-b-2 border-primary hover:font-semibold">
                    {item.label}
                  </Link>
                  )}
                  {item.children && isDropdownOpen && (
                    <motion.ul initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}} transition={{duration: 1.0}} className="grid grid-cols-4 gap-x-36 gap-y-8 absolute mt-2 right-20 p-8 bg-priBg rounded-lg" onMouseOver={() => setIsDropdownOpen(true)}>
                      {item.children.map((child, childIndex) => (
                        <motion.li 
                        initial="hidden"
                        animate="visible"
                        variants={gridVariants} key={childIndex}>
                          <a href="" className="text-md hover:text-primary hover:border-b-2 border-primary pb-[1px]">{child.label}</a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </div> */}

          {/* Right Section for Icons */}
          <div className="flex items-center gap-4">
            {/* <Link className="pr-4">
              <Search className="h-6 w-6 hover:text-primary" />
            </Link> */}
            <a href="" className="text-pink-600 font-heroFont hidden lg:flex text-right leading-none underline">Create Personal <br />Wedding Website</a>
            <button
              onClick={toggleCart}
              className="flex items-center gap-1 relative"
            >
              <ShoppingBag size={30} className=" hover:text-primary" />
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
                <User size={30} />
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-priBg py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Drawer Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden transition-all duration-500">
            <div className="absolute right-0 h-full w-64 bg-white p-4">
              <button
                className="mb-4 text-right"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X />
              </button>
              <ul className="">
                {["About", "Products", "Categories", "Contact Us"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className="py-2 hover:text-brown-600"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:flex py-2 justify-center">
        <ul className="flex gap-12 justify-center  items-center text-md font-heroFont">
          {navItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <a
                href={item.url}
                className="hover:text-primary hover:border-b-2 border-primary hover:font-semibold"
              >
                {item.label}
              </a>
              <AnimatePresence>
              {item.children && isDropdownOpen === index && (
                <motion.ul
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.0 }}
                  className="flex flex-col z-10 border-b-2 border-primary min-w-[200px] absolute p-2 gap-2 left-2 bg-priBg rounded-lg"
                  onMouseEnter={() => setIsHoveringDropdown(true)}
                  onMouseLeave={() => {
                    // setIsHoveringDropdown(false);
                    setIsDropdownOpen(false)
                  }}
                >
                  {item.children.map((child, childIndex) => (
                    <motion.li
                      initial="hidden"
                      animate="visible"
                      variants={gridVariants}
                      key={childIndex}
                    >
                      <a
                        href=""
                        className="text-md block hover:text-primary hover:border-b-2 border-primary pb-[1px]"
                      >
                        {child.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
