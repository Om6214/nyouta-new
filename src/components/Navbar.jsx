import * as React from "react";
import { Link } from "react-router-dom";
import { Heart, Search, ShoppingBag, User, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "../CartContext"; // Import your cart context

export default function MainNav() {
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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto">
        {/* Top Navigation */}
        <div className="flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">ई-न्यौता</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex w-full flex-1 items-center gap-2 px-4">
            <ul className="flex w-full space-x-8 items-center justify-end">
              {["About", "Products", "Categories", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="py-2 hover:text-brown-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section for Icons */}
          <div className="flex items-center gap-4">
            <Link className="pr-4">
              <Search className="h-6 w-6" />
            </Link>
            <Link to="/wishlist" className="flex items-center gap-1">
              <Heart className="h-6 w-6" />
              <span className="relative -top-3 right-2 rounded-full bg-black px-2 py-1 text-[8px] text-white">
                0
              </span>
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
