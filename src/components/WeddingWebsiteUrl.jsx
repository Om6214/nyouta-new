import React from 'react'
import wedBg from "../assets/images/weddingbg.webp";
const WeddingWebsiteUrl = () => {
  return (
    <div>
        <div className='lg:mx-24 mx-4 mt-2'>
            <div>
                <img className='h-[350px]' src={wedBg} alt="" />
            </div>
            <div className='flex font-heroFont gap-2 text-gray-600 font-semibold items-center justify-center border-t-2 border-b-2 my-2 border-gray-600'>
                <h1>Sort By</h1>
                <select name="" id="" className='border-none'>
                    <option value="">Trending</option>
                    <option value="">Best Sellers</option>
                    <option value="">New</option>
                    <option value="">Hot</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default WeddingWebsiteUrl