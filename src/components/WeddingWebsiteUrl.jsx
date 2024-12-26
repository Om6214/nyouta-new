import React from 'react'
import wedBg from "../assets/images/weddingbg.webp";
import camera from "../assets/images/camera.svg";
import cocktail from "../assets/images/cocktail.svg";
import envelope from "../assets/images/envelope.svg";
import wed1 from "../assets/images/wed1.webp";
import wed2 from "../assets/images/wed2.jpg";
import wed3 from "../assets/images/wed3.webp";

const items = [
    {
        title: 'Include the juicy details',
        des: 'Share your excitement with your guests and include juicy details about your day.',
        imgUrl: cocktail
    },
    {
        title: 'Receive and manage RSVPs',
        des: 'When your guests RSVP they sync automatically with your guest list.',
        imgUrl: envelope
    },
    {
        title: 'Your wedding album',
        des: 'Create your WedShoots album and link it to your wedding website.',
        imgUrl: camera
    },
]
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
        <section className='mx-2 lg:mx-16 my-4 font-heroFont'>
            <h1 className='text-xl lg:text-2xl text-center font-semibold'>A Simple, beautiful wedding websites just for you</h1>
            <h2 className='lg:text-xl text-lg text-center'>All you need to do is choose your favourite template and include your celebration details.</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 my-2'>
                {items.map((item) => (
                    <div className='flex flex-col items-center gap-3'>
                        <img className='w-28' src={item.imgUrl} alt="" />
                        <h1 className='text-xl font-semibold'>{item.title}</h1>
                        <p className='text-center'>{item.des}</p>
                    </div>
                ))}
            </div>
        </section>
        <section className='mx-2 lg:mx-24 my-12 font-heroFont'>
                <div className='flex flex-col lg:flex-row gap-2 justify-between my-4'>
                    <div className='w-full lg:w-[50%]'>
                        <img className='w-[500px]' src={wed1} alt="" />
                    </div>
                    <div className='flex flex-col w-full lg:w-[50%] items-start justify-center gap-2'>
                        <h1 className='lg:text-3xl text-xl font-semibold'>Build your site easily</h1>
                        <p className='text-lg'>Create your own wedding website with all your most important details. Make it yours with your own design and wedding colours.</p>
                        <a href="" className='text-pink-700 font-semibold text-xl'>GET YOUR WEBSITE URL</a>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row-reverse gap-2 justify-between my-4'>
                    <div className='w-full lg:w-[50%] flex justify-end overflow-hidden'>
                        <img className='w-[500px] h-[350px]' src={wed2} alt="" />
                    </div>
                    <div className='flex flex-col w-full lg:w-[50%] items-start justify-center gap-2'>
                        <h1 className='lg:text-3xl text-xl font-semibold'>Share your website with everyone</h1>
                        <p className='text-lg'>Receive RSVPs and menu selections through your wedding website. You can even help guests find accommodation and organise transportation.</p>
                        <a href="" className='text-pink-700 font-semibold text-xl'>Share Your Wedding Website</a>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-2 justify-between my-4'>
                    <div className='w-full lg:w-[50%]'>
                        <img className='w-[500px]' src={wed3} alt="" />
                    </div>
                    <div className='flex flex-col w-full lg:w-[50%] items-start justify-center gap-2'>
                        <h1 className='lg:text-3xl text-xl font-semibold'>Easily personalise your website</h1>
                        <p className='text-lg'>Make your website reflect your wedding style and colour palette. Include your own photos and any other relevant or interesting wedding details.</p>
                        <a href="" className='text-pink-700 font-semibold text-xl'>Choose your design</a>
                    </div>
                </div>

        </section>
    </div>
  )
}

export default WeddingWebsiteUrl