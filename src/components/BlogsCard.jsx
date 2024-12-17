import { SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'

const blogsTitle = [
    {
        title: '12 Benefits Of Using A Stainless Steel Water Bottle',
        description: 'A stainless steel bottle is a classic for its design and sleek look. And it is good for the environment. Let’s explore more of these benefits a stainless steel bottle offers us.',
        imgURL: 'https://images.zoomin.com/webresources/homeblog/personalized-insulated-bottles.jpg'
    },
    {
        title: 'Profile Picture Ideas to Make You Stand Out',
        description: 'To help you make the right impression, we’ve compiled some great picture ideas for both social media and professional use.',
        imgURL: 'https://images.zoomin.com/webresources/homeblog/profile-photo.jpg'
    },
    {
        title: '12 Tips For Using A Planner To Organize Your Life',
        description: 'In this blog, let’s read about how a planner organiser can help you organise everything and make the most of your time.',
        imgURL: 'https://images.zoomin.com/webresources/homeblog/2025-planner-with-name.jpg'
    },
    {
        title: 'Landscape vs Portrait: What is Different',
        description: 'Whether it’s portrait Instagram reels or landscape commercial flex, they fit different needs. What makes them unique?',
        imgURL: 'https://images.zoomin.com/webresources/homeblog/landcape-portrait.jpg'
    },
]

const BlogsCard = () => {
  return (
    <div className='px-4'>
        <h1 className='text-5xl lg:text-6xl font-semibold py-8 font-heroFont text-primary text-center'>Ideas and Inspiration</h1>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 font-heroFont'>
            {blogsTitle.map((blog, index) => (
                <div key={index} className='flex flex-col items-center border-2 border-secondary rounded-lg bg-priBg'>
                    <img className='lg:w-full object-cover lg:h-[300px] rounded-t-lg' src={blog.imgURL} alt="" />
                    <div className='flex flex-col h-1/2 items-start justify-between px-8 py-4 gap-3'>
                        <h1 className='text-2xl lg:text-2xl font-bold'>{blog.title}</h1>
                        <p>{blog.description}</p>
                        <a className='flex items-center gap-2 bg-primary hover:bg-secondary font-bold hover:text-white px-6 py-2 rounded-lg' href="#">Read More <span><SquareArrowOutUpRight /></span></a>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BlogsCard