import * as React from "react";
import { Link } from "react-router-dom";
import { Heart, Search, ShoppingBag, User, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "../CartContext"; // Import your cart context
import logo from "../assets/images/nyouta-logo-1.jpg";
import { motion } from "framer-motion";


const navItems = [
  {
    label: 'About',
    url: '/about'
  },
  {
    label: 'Products',
    url: '/products',
    children: [
      { label: 'Wedding Invitations' },
      { label: 'Wedding Stationery' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
      { label: 'Wedding Decorations' },
    ]
  },
  {
    label: 'Categories',
    url:'/categories'
  },
  {
    label: 'Contact Us',
    url: '/contact-us'
  }
]
export default function MainNav() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
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
        delay: index * 0.2, // Staggered animation for each item
      },
    }),
  };
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto">
        {/* Top Navigation */}
        <div className="flex h-24 items-center justify-between px-4">
          <Link to="/" className="flex items-center pl-12 gap-2">
            <img className="w-20 rounded-[50%]" src={logo} alt="logo-imgh" />
            {/* <span className="text-xl font-bold">न्यौता</span> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex w-full flex-1 items-center gap-2 px-4">
            <ul className="flex w-full space-x-8 items-center justify-end">
              {navItems.map((item) => (
                <li key={item} onMouseOut={() => setIsDropdownOpen(false)}>
                  {item.children ? (
                    <Link to={item.url} onMouseOver={() => setIsDropdownOpen(true)} className="py-2 hover:text-red-500">
                    {item.label}
                  </Link>
                  ) : (
                    <Link to={item.url} className="py-2 hover:text-red-500">
                    {item.label}
                  </Link>
                  )}
                  {item.children && isDropdownOpen && (
                    <motion.ul initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}} transition={{duration: 1.0}} className="grid grid-cols-4 gap-x-36 gap-y-8 absolute mt-1 right-20 p-8 bg-gray-100 rounded-lg" onMouseOver={() => setIsDropdownOpen(true)}>
                      {item.children.map((child, childIndex) => (
                        <motion.li 
                        initial="hidden"
                        animate="visible"
                        variants={gridVariants} key={childIndex}>
                          <a href="" className="text-md hover:text-red-500 hover:translate-x-2 transition duration-300">{child.label}</a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section for Icons */}
          <div className="flex items-center gap-4">
            <Link className="pr-4">
              <Search className="h-6 w-6" />
            </Link>
            
            <button onClick={toggleCart} className="flex items-center gap-1 relative">
              <ShoppingBag className="h-6 w-6" />
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
                <User className="h-6 w-6" />
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
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
            <button className="md:hidden p-2" onClick={() => setIsDrawerOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden transition-all duration-500">
            <div className="absolute right-0 h-full w-64 bg-white p-4">
              <button className="mb-4 text-right" onClick={() => setIsDrawerOpen(false)}>
                <X />
              </button>
              <ul className="">
                {["About", "Products", "Categories", "Contact Us"].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="py-2 hover:text-brown-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
