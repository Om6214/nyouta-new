import {
  Briefcase,
  ChartColumnStacked,
  IndianRupee,
  ShoppingCart,
} from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">
          Welcome to Nyouta Admin Panel Dashboard
        </h1>

        <div className="bg-blue-400 px-4 py-6 mt-5 w-[1200px]">
          <div className="pb-4">
            <h1 className="text-2xl">Inventory Stats</h1>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4 items-center bg-black text-white py-1 px-6 rounded-3xl cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out">
              <Briefcase />
              <div>
                <h2>Total Products</h2>
                <h1>0</h1>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-black text-white py-1 px-6 rounded-3xl cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out">
              <IndianRupee />
              <div>
                <h2>Total Store Value</h2>
                <h1>$0.00</h1>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-black text-white py-1 px-6 rounded-3xl cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out">
              <ShoppingCart />
              <div>
                <h2>Out Of Stock</h2>
                <h1>0</h1>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-black text-white py-1 px-6 rounded-3xl cursor-pointer hover:-translate-y-2 transition duration-300 ease-in-out">
              <ChartColumnStacked />
              <div>
                <h2>All Categories</h2>
                <h1>0</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-400 border-t-2 border-gray-400 p-4">
            <h1 className="text-xl">Inventory Items:</h1>
            <p className="pt-4">No Items in the Inventory....!!!!</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
