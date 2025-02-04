import React from 'react';

const ShimmerSkeleton = () => {
  return (
    <div className="container mx-auto md:bg-gradient-to-br">
      {/* Header Skeleton */}
      <div className="w-full text-center flex justify-between items-center bg-gray-100 shadow-md p-4">
        <div className="animate-pulse bg-gray-300 h-8 w-24 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-8 w-48 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-8 w-24 rounded"></div>
      </div>

      <hr className="border-gray-300 w-full my-4" />

      <div className="flex w-full relative">
        <div className="hidden md:block absolute top-0 bottom-0 border-l-2 border-gray-300"></div>

        {/* Sidebar Skeleton */}
        <div className=" md:block w-48 lg:w-56 flex flex-col gap-6 md:p-4 lg:p-6 h-screen overflow-y-auto bg-gray-100 border-r border-gray-300 shadow-md">
          <h2 className="animate-pulse bg-gray-300 h-8 w-32 rounded mb-4"></h2>
          <div className="animate-pulse bg-gray-300 h-24 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-24 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-24 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-24 rounded"></div>
        </div>

        {/* Main Editing Area Skeleton */}
        <div className="flex flex-col ml-64 w-full relative ">
          <div className="relative md:w-3/5 lg:w-80 lg:h-3/4 flex items-center mr-8 rounded-lg shadow-md border border-gray-200 bg-gray-50 overflow-hidden">
            <div className="animate-pulse bg-gray-300 w-full h-full rounded"></div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <div className="animate-pulse bg-gray-300 h-10 w-10 rounded-full"></div>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="animate-pulse bg-gray-300 h-10 w-10 rounded-full"></div>
            </div>
          </div>

          {/* Buttons Below the Image */}
          <div className="flex lg:gap-4 md:mt-4 lg:mt-1 gap-4 sm:mt-4 mt-10">
            <div className="animate-pulse bg-gray-300 h-10 w-36 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-10 w-36 rounded"></div>
          </div>
        </div>

        <div className=" lg:gap-4 md:mt-4 lg:mt-1 gap-4 sm:mt-4 mt-10">
            <div className="animate-pulse bg-gray-300 h-10 w-36 rounded mt-10"></div>
            <div className="animate-pulse bg-gray-300 h-10 w-36 rounded mt-10"></div>
            <div className="animate-pulse bg-gray-300 h-10 w-36 rounded mt-10"></div>
          </div>
      </div>
    </div>
  );
};

export default ShimmerSkeleton;