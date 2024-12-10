import { SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const VideoCard = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='lg:px-16 px-4 py-8 lg:py-16 bg-priBg flex flex-col lg:flex-row gap-8 justify-around'>
            <div>
            <iframe className='rounded-lg object-cover w-[410px] lg:w-[650px]' width="650" height="400" src="https://www.youtube.com/embed/GVBTLJ6Fqys?si=MnaWRogQwnaYNcCD" title="Nyouta, where memories are brought to life!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div className='flex flex-col lg:gap-12 lg:px-10 gap-6 items-start justify-center'>
                <h1 className='lg:text-6xl text-4xl text-primary font-primaryFont font-bold'>Print, Preserve & Cherish</h1>
                <h3 className='text-lg'>Explore specially curated personalized Gifts, tasteful Décor and meaningful keepsakes with us. Let our range of specially curated personalized goodies tell your life’s story and elevate your art of gifting. Now capture life’s fondest memories & make them live forever. Experience the Nyouta promise today!</h3>
                <button className='flex items-center gap-2 bg-gradient-to-br from-primary to-secondary rounded-lg text-white hover:bg-gradient-to-r hover:from-amber-900 hover:to-amber-700 px-8 py-2 shadow-xl lg:text-xl transition duration-300 ease-in' onClick={() => navigate('/products')}>Shop Now <span><SquareArrowOutUpRight /></span></button>
            </div>
        </div>
    </div>
  )
}

export default VideoCard