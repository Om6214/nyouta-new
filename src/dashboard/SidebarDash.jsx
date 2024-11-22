import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import logo from "../assets/images/nyouta-logo.jpg";

const SidebarDash = () => {
  const location = useLocation();

  // Function to check if a path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };
  return (
    <div>
      <Sidebar
        aria-label="Default sidebar example"
        className="bg-red-400 border-r-2 border-t-2 border-gray-400"
      >
        <Sidebar.Logo href="/" img={logo} imgAlt="Nyouta Logo">
          Nyouta
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/admin/dashboard"
              className={`hover:translate-x-1 duration-300 ease-out ${
                isActivePath("/admin/dashboard")
                  ? "bg-gray-400 font-bold border-r-2 border-black"
                  : ""
              }`}
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/admin/dashboard/add-product"
              className={`hover:translate-x-1 duration-300 ease-out ${
                isActivePath("/admin/dashboard/add-product")
                  ? "bg-gray-400 font-bold border-r-2 border-black"
                  : ""
              }`}
              icon={HiShoppingBag}
            >
              Add Product
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={`hover:translate-x-1 duration-300 ease-out ${
                isActivePath('/inbox') 
                  ? 'bg-white bg-opacity-20 font-bold' 
                  : ''
              }`}
              icon={HiInbox}
              label="3"
            >
              Inbox
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={`hover:translate-x-1 duration-300 ease-out ${
                isActivePath('/users') 
                  ? 'bg-white bg-opacity-20 font-bold' 
                  : ''
              }`}
              icon={HiUser}
            >
              Users
            </Sidebar.Item>

            <Sidebar.Item href="#" className={`${
              isActivePath('/signin') 
                ? 'bg-white bg-opacity-20 font-bold' 
                : ''
            }`} icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarDash;
