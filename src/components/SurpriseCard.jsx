import React from 'react'
import buttonBg from "../assets/images/button.png";

const SurpriseCard = () => {
  return (
    <div className='mx-2 lg:mx-28 font-heroFont'>
        <div className='grid lg:grid-cols-3 gap-10 lg:gap-0 grid-cols-1'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl lg:text-2xl text-pink-600'>Wedding & Event</h1>
                <div className='relative flex flex-col items-center justify-center hover:translate-x-2 duration-300'>
                    <img className='h-14' src={buttonBg} alt="" />
                    <button className='absolute text-3xl lg:text-4xl font-bold text-white'>News E-Paper</button>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2  text-primary'>
                <h1 className='text-3xl lg:text-3xl font-bold'>Surprise your Guests !</h1>
                <h2 className='text-2xl text-center'>"Creative Impression with Story"</h2>
                <h2 className='text-xl'>SHARE THE MAGIC</h2>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl lg:text-2xl text-pink-600'>Wedding & Event</h1>
                <div className='relative flex flex-col items-center justify-center hover:translate-x-2 duration-300'>
                    <img className='h-14' src={buttonBg} alt="" />
                    <button className='absolute text-3xl lg:text-4xl font-bold text-white'>E-Magazines</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SurpriseCard