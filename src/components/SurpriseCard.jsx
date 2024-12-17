import React from 'react'

const SurpriseCard = () => {
  return (
    <div className='mx-2 lg:mx-28 font-heroFont'>
        <div className='grid lg:grid-cols-3 gap-10 lg:gap-0 grid-cols-1'>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl lg:text-2xl text-pink-600'>Wedding & Event</h1>
                <button className='bg-pink-600 text-3xl lg:text-4xl font-bold text-white px-6 rounded-2xl py-1 hover:bg-pink-800'>News E-Paper</button>
            </div>
            <div className='flex flex-col items-center gap-2  text-primary'>
                <h1 className='text-3xl lg:text-3xl font-bold'>Surprise your Guests !</h1>
                <h2 className='text-2xl text-center'>"Creative Impression with Story"</h2>
                <h2 className='text-xl'>SHARE THE MAGIC</h2>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl lg:text-2xl text-pink-600'>Wedding & Event</h1>
                <button className='bg-pink-600 text-3xl lg:text-4xl font-bold text-white px-6 rounded-2xl py-1 hover:bg-pink-800'>E-Magazine</button>
            </div>
        </div>
    </div>
  )
}

export default SurpriseCard