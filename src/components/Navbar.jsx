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
import { useCart } from "../CartContext";
import logo from "../assets/images/nyouta-logo2.jpg";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    label: "Print Invitations",
    url: "/nav/print invitations",
    children: [
      { label: "Wedding Invitations",
        Filters:[
          {a:"Elegant Collection"},
          {a:"Vintage  Collection"},
          {a:"Royal Invitations"},
          {a:"Slider Invitations"},
          {a:"Passport Theme Invitations"},
          {a:"Newspaper Invitations"},
          {a:"Aadhar Card Invitations"},
          {a:"ATM Theme Invitations"}
        ]
       },
      { label: "Party Invitation",
        Filters: [
  { a: ' Birthday Party ' },
  { a: ' Kitty Party ' },
  { a: ' Retirement Party ' },
  { a: ' Halloween Party ' },
  { a: ' Lohri Party ' }
]

      },
      { label: "Pooja Invitations",Filters: [
  { a: ' Sawamani ' },
  { a: ' Griha Pravesh ' },
  { a: ' Shyam Jagran ' }
] },
      { label: "Ceremony Invitations",Filters: [
  { a: ' Engagement Ceremony ' },
  { a: ' Wedding Anniversary ' },
  { a: ' Opening Ceremony ' },
  { a: ' Kua Poojan ' }
] },
    ],                    
  },
  {
    label: "E Invitation",
    url: "/nav/e-invitations",
    children: [
      { label: "Wedding Invitations",Filters: [
  { a: ' Pre Invitations - Manuhar ' },
  { a: ' Save the Date ' },
  { a: ' Wedding Invitations ' },
  { a: ' Ceremony Invitations ' },
  { a: ' Wedding Timeline ' },
  { a: ' Royal Collection - NEW ' }
] },
      { label: "Party Invitations",Filters: [
  { a: ' Birthday Party ' },
  { a: ' Kitty Party ' },
  { a: ' Retirement Party ' },
  { a: ' Halloween Party ' },
  { a: ' Lohri Party ' }
]
 },
      { label: "Pooja Invitations",Filters: [
  { a: ' Sawamani ' },
  { a: ' Griha Pravesh ' },
  { a: ' Shyam Jagran ' }
] },
      { label: "Ceremony Invitations",Filters: [
  { a: ' Engagement Ceremony ' },
  { a: ' Wedding Anniversary ' },
  { a: ' Wedding Events ' },
  { a: ' Opening Ceremony ' },
  { a: ' Kua Poojan ' }
]
 },
      { label: "Short Invitation - Free",Filters: [
  { a: ' Wedding Invitations ' },
  { a: ' Party Invitations ' },
]
},
      { label: "Matrimonial Biodata" ,Filters: [
  { a: ' Marriage Biodata ' }
]
},
    ],
  },
  {
    label: "Photo Books",
    url: "/nav/photo books",
    children: [
      { label: "Soft Cover Photobook",Filters: [
  { a: ' Wedding Photobook ' },
  { a: ' Engagement Photobook ' },
  { a: ' Anniversary Photobook ' },
  { a: ' Birthday Photobook ' },
] },
      { label: "Hard Cover Photobook",Filters: [
  { a: ' Wedding Photobook ' },
  { a: ' Engagement Photobook ' },
  { a: ' Anniversary Photobook ' },
  { a: ' Birthday Photobook ' },
  
] },
      { label: "Spiral Photobook" ,Filters: [
  { a: ' Wedding Photobook ' },
  { a: ' Engagement Photobook ' },
  { a: ' Anniversary Photobook ' },
  { a: ' Birthday Photobook ' },
  
]},
      { label: "Photo Folder",Filters: [
  { a: ' Wedding Photobook ' },
  { a: ' Engagement Photobook ' },
  { a: ' Anniversary Photobook ' },
  { a: ' Birthday Photobook ' },
] },
      { label: "Digtial Photobook > Best Seller",Filters: [
  { a: ' Wedding Photobook ' },
  { a: ' Engagement Photobook ' },
  { a: ' Anniversary Photobook ' },
  { a: ' Birthday Photobook ' }
] },
    ],
  },
  {
    label: "Itinerary",
    url: "/nav/itinerary",
    children: [
      { label: "Wedding Itinerary" ,Filters: [
  { a: ' Room Itinerary ' },
  { a: ' Check-in Itinerary ' },
  { a: ' Room Key Enevelop ' },
  { a: ' Thank You Cards ' },
  { a: ' Wedding Menu ' },
  { a: ' Table Itinerary ' },
  { a: ' Dining Table Mats ' },
]},
      { label: "Stickers",Filters: [
  { a: ' Guest Name Stickers ' },
  { a: ' Gift Box Sticker ' },
  { a: ' Vehicle Stickers ' },
  { a: ' Designer Stickers ' },
  { a: ' Vintage Stickers ' },
] },
      { label: "Tags / Bedges",Filters: [
  { a: ' Luggage Tag ' },
  { a: ' Door Handle Tag ' },
  { a: ' Gift Tag ' },
  { a: ' Parking Tags ' },
  { a: ' Wedding Bedges ' },
] },
      { label: "Welcome Signages",Filters: [
  { a: ' Wedding Ceremony ' },
  { a: ' Haldi Ceremony ' },
  { a: ' Mehandi Ceremony ' },
  { a: ' Sangeet Ceremony ' },
  { a: ' Direction Signage ' },
  { a: ' Engagement Ceremony ' },
  { a: ' Anniversary Ceremony ' },
  { a: ' Lohri Party ' },
  { a: ' Halloween Party ' },
  { a: ' Birthday Party ' },
  { a: ' Celeration Party ' }
]},
      { label: "Accessories",Filters: [
  { a: ' Party Dangler ' },
  { a: ' Coasters ' },
  { a: ' Paper Napkins ' },
  { a: ' Event Banner ' },
  { a: ' Face Mask ' },
  { a: ' Funny Poster ' },
] },
      { label: "Games",Filters: [
  { a: ' Playing Cards ' },
  { a: ' Puzzle Games ' },
  { a: ' Fun Games ' }
] },
    ],
  },
  {
    label: "Calendars 2025",
    url: "/nav/calendars 2025",
    children: [
      { label: "Mini Desktop Calendar" },
      { label: "Wall Calendar - Portrait" },
      { label: "Wall Calendar - Landscape" },
      { label: "Desktop Calendar" },
      { label: "Table Tent Calendar" },
      { label: "Poster Calendar" },
    ],
  },
  {
    label: "Free Greetings",
    url: "/nav/free greetings",
    children: [
      { label: "Wishes Greeting" },
      { label: "Thanks Greeting" },
      { label: "Feeling Greetings" },
      { label: "Funny Greetings" },
    ],
  },
  {
    label: "Guest Surprising",
    url: "/nav/guest surprising",
    children: [{ label: "Newspapers" }, { label: "Magazine" }],
  },
  {
    label: "Planner Books",
    url: "/nav/planner books",
    children: [{ label: "Planner Books" }, { label: "Free Printable" }],
  },
  {
    label: "E-Shop",
    url: "/nav/e shop",
    children: [
      { label: "Shagun Envelop" },
      { label: "Photo Magnet" },
      { label: "Gifts" },
      { label: "Essentials" },
    ],
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

  // React.useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  // const gridVariants = {
  //   hidden: { opacity: 0, y: -50 },
  //   visible: (index) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       delay: index * 0.2, // Staggered animation for each item
  //     },
  //   }),
  // };
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
            <a href="/create-wedding-website" className="text-pink-600 font-heroFont hidden lg:flex text-right leading-none underline">Create Personal <br />Wedding Website</a>
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
        <ul className="flex gap-12 justify-center items-center text-md font-heroFont">
          {navItems.map((item, index) => (
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
                          onMouseEnter={() => setActiveChildDropdown(childIndex)}
                          onMouseLeave={() => setActiveChildDropdown(null)}
                          className="relative"
                        >
                          <Link
                            to={`${item.url}/${child.label}`}
                            className="block text-md hover:text-primary hover:border-b-2 border-primary pb-1 transition-colors"
                          >
                            {child.label}
                          </Link>
                          <AnimatePresence>
                            {child.Filters && activeChildDropdown === childIndex && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-0 left-full ml-2 bg-priBg rounded-lg border-b-2 border-primary min-w-[200px] py-3 px-4 shadow-lg"
                              >
                                <ul className="space-y-2">
                                  {child.Filters.map((filter, filterIndex) => (
                                    <motion.li
                                      key={filterIndex}
                                      variants={gridVariants}
                                      initial="hidden"
                                      animate="visible"
                                      custom={filterIndex}
                                    >
                                      <Link
                                        to={`e${item.url}/${filter.a}`}
                                        className="block text-md hover:text-primary hover:border-b-2 border-primary pb-1 transition-colors whitespace-nowrap"
                                      >
                                        {filter.a}
                                      </Link>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
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
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          {/* Your existing mobile drawer code */}
        </div>
      )}
    </header>
  

  );
}
