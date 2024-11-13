"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { Heart, Search, ShoppingBag, User, ChevronDown, Menu } from "lucide-react"

export default function MainNav() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

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
            <span className="text-xl font-bold">ई-न्यौता</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex max-w-2xl flex-1 items-center justify-center gap-2 px-4">
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
          </div>

          {/* Mobile Drawer Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Right Section for Icons */}
          <div className="flex items-center gap-4">
            <Link className="pr-4">
              <Search className="h-6 w-6"/>
            </Link>
            <Link href="/wishlist" className="flex items-center gap-1">
              <Heart className="h-6 w-6" />
              <span className="relative -top-3 right-2 rounded-full bg-black px-2 py-1 text-[8px] text-white">0</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-1">
              <ShoppingBag className="h-6 w-6" />
              <span className="relative -top-3 right-2 rounded-full bg-black px-2 py-1 text-[8px] text-white">0</span>
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

        {/* Mobile Drawer Menu */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="absolute right-0 h-full w-64 bg-white p-4">
              <button
                className="mb-4 text-right"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close
              </button>
              <ul className="space-y-4">
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
                      <Link href="#" className="py-2 hover:text-brown-600 block">
                        {item}
                      </Link>
                    )}
                    {["E-Invite", "Special 4 U", "New Trendz"].includes(item) && openDropdown === item && (
                      <div className="mt-2 rounded-md bg-gray-100 py-1">
                        {item === "E-Invite" && (
                          <>
                            <Link
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Wedding Cards
                            </Link>
                            <Link
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Birthday Cards
                            </Link>
                          </>
                        )}
                        {item === "Special 4 U" && (
                          <>
                            <Link
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Today's Deals
                            </Link>
                            <Link
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Clearance Sale
                            </Link>
                          </>
                        )}
                        {item === "New Trendz" && (
                          <>
                            <Link
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                              Latest Fashion
                            </Link>
                            <Link
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
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
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
