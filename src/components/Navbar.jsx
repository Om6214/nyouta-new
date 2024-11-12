"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { Heart, Search, ShoppingBag, User, ChevronDown } from "lucide-react"

export default function MainNav() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto">
        {/* Top Navigation */}
        <div className="flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            {/* <Elephant className="h-10 w-10 text-brown-600" /> */}
            <span className="text-xl font-bold">enyouta.com</span>
          </Link>
          <div className="flex max-w-2xl flex-1 items-center gap-2 px-4">
            <div className="relative">
              <select className="appearance-none rounded-l-md border border-gray-300 bg-white px-4 py-2 pr-8 focus:border-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500">
                <option>All</option>
                <option>Clothing</option>
                <option>Accessories</option>
                <option>Electronics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-1 items-center">
              <input
                className="w-full rounded-r-none rounded-l-md border border-r-0 border-gray-300 px-4 py-2 focus:border-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500"
                placeholder="I'm shopping for..."
                type="search"
              />
              <button className="rounded-r-md bg-orange-950 px-4 py-[11px] text-white hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2">
                <Search className="h-5 w-8" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="flex items-center gap-1">
              <Heart className="h-6 w-6" />
              <span className="rounded-full bg-brown-600 px-2 py-1 text-xs text-white">0</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-1">
              <ShoppingBag className="h-6 w-6" />
              <span className="rounded-full bg-brown-600 px-2 py-1 text-xs text-white">0</span>
            </Link>
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
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="border-t border-b px-4 py-2">
          <ul className="flex space-x-4 items-center">
            {["E-Invite", "Special 4 U", "New Trendz", "Join E Nyouta", "V-Invite"].map((item) => (
              <li key={item} className="relative">
                {["E-Invite", "Special 4 U", "New Trendz"].includes(item) ? (
                  <button
                    onClick={() => handleDropdownToggle(item)}
                    className="flex items-center gap-1 py-2 hover:text-brown-600 focus:outline-none"
                  >
                    {item}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link href="#" className="py-2 hover:text-brown-600">
                    {item}
                  </Link>
                )}
                {["E-Invite", "Special 4 U", "New Trendz"].includes(item) && openDropdown === item && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    {item === "E-Invite" && (
                      <>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Wedding Cards
                        </Link>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Birthday Cards
                        </Link>
                      </>
                    )}
                    {item === "Special 4 U" && (
                      <>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Today's Deals
                        </Link>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Clearance Sale
                        </Link>
                      </>
                    )}
                    {item === "New Trendz" && (
                      <>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Latest Fashion
                        </Link>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Popular Items
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}