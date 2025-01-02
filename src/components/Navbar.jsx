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
  ArrowRight,
} from "lucide-react";
import { useCart } from "../CartContext";
import logo from "../assets/images/nyouta-logo2.jpg";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    label: "Print Invitations",
    url: "/nav/print-invitations",
    children: [
      { label: "Wedding Invitations" },
      { label: "Party Invitation" },
      { label: "Pooja Invitations" },
      { label: "Ceremony Invitations" },
    ],
  },
  {
    label: "E Invitation",
    url: "/nav/e-invitations",
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
    url: "/nav/photo-books",
    children: [
      { label: "Soft Cover Photobook" },
      { label: "Hard Cover Photobook" },
      { label: "Spiral Photobook" },
      { label: "Photo Folder" },
      { label: "Digtial Photobook > Best Seller" },
    ],
  },
  {
    label: "Itinerary",
    url: "/nav/itinerary",
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
    url: "/nav/calendars-2025",
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
    url: "/nav/free-greetings",
    children: [
      { label: "Wishes Greeting" },
      { label: "Thanks Greeting" },
      { label: "Feeling Greeting" },
      { label: "Funny Greeting" },
    ],
  },
  {
    label: "Guest Surprising !!!",
    url: "/nav/guest-surprising",
    children: [{ label: "Newspapers" }, { label: "Magazine" }],
  },
  {
    label: "Planner Books",
    url: "/nav/planner-books",
    children: [{ label: "Planner Books" }, { label: "Free Printables" }],
  },
  {
    label: "E-Shop",
    url: "/nav/e-shop",
    children: [
      { label: "Shagun Envelop" },
      { label: "Photo Magnet" },
      { label: "Gifts" },
      { label: "Essentials" },
    ],
  },
  {
    label: "Wedding Website",
    url: '/create-wedding-website'
  }
];
export default function MainNav() {
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { cartItems, toggleCart } = useCart(); // Access cartItems and toggleCart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
            <select name="" id="" className="!pr-8 border-r-0 rounded-l-lg w-[80px]">
              <option value="">All</option>
              {navItems.map((item) => (
                <option value="">{item.label}</option>
              ))}
            </select>
            <input className="" type="search" name="search" id="search" placeholder="I'm shopping for"/>
            <button className="bg-secondary py-2 px-6 rounded-r-lg hover:bg-primary font-semibold text-white font-heroFont">Search</button>
          </div>

          {/* Right Section for Icons */}
          <div className="flex items-center gap-1 lg:gap-4">
            {/* <Link className="pr-4">
              <Search className="h-6 w-6 hover:text-primary" />
            </Link> */}
            <a href="/join-e-nyouta" className="text-pink-600 font-avalonN hidden lg:flex leading-none hover:underline">Join E-Nyouta<br />Share Memories</a>
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
                <User size={27} />
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-priBg py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <Link
                    to="/login" onClick={()=> setOpenDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register" onClick={()=> setOpenDropdown(null)}
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
              <Menu size={27} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden transition-all duration-300 ease-in-out">
            <div className="absolute right-0 h-full w-64 bg-white p-4 transition-all duration-300 ease-in-out">
              <button
                className="mb-4 text-right"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X />
              </button>
              <ul className="">
                {navItems.map(
                  (item) => (
                    <li key={item} className="flex flex-col gap-2 font-avalonN">
                      <Link onClick={() => setIsDrawerOpen(false)}
                        to={item.url}
                        className="py-2 text-lg hover:text-brown-600 flex items-center gap-1"
                      >
                        {item.label} <span><ArrowRight size={20}/></span>
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
        <ul className="flex gap-8 justify-center items-center text-md font-avalonB">
          {navItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
              className="relative py-2"
            >
              <Link
                to={item.url}
                className="hover:text-primary hover:border-b-2 border-primary hover:font-semibold"
              >
                {item.label}
              </Link>
              <AnimatePresence>
                {item.children && activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-priBg rounded-lg border-b-2 border-primary min-w-[200px] py-3 px-4 shadow-lg"
                  >
                    <ul className="space-y-2">
                      {item.children.map((child, childIndex) => (
                        <motion.li
                          key={childIndex}
                          variants={gridVariants}
                          initial="hidden"
                          animate="visible"
                          custom={childIndex}
                        >
                          <Link
                            to={`${item.url}/${child.label}`}
                            className="block text-md hover:text-primary hover:border-b-2 border-primary pb-1 transition-colors"
                          >
                            {child.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile drawer code remains the same */}
  
    </header>
  

  );
}
