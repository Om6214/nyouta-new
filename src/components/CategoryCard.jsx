import React, { useState } from 'react'
import invitation from '../assets/images/placeholder.jpg'
import vinvite from '../assets/images/v-invite.webp'
import welcome from '../assets/images/welcome sign.webp'

const categories = [
    {
        title: 'Print Invitations',
        description: "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
        subCategory: [
            {
                subTitle: 'Wedding Invitation',
                imgUrl: invitation
            },
            {
                subTitle: 'Party Invitation',
                imgUrl: vinvite
            },
            {
                subTitle: 'Pooja Invitation',
                imgUrl: invitation
            },
            {
                subTitle: 'Ceremony Invitation',
                imgUrl: vinvite
            },
        ]
    },
    {
        title: 'E Invitations',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.',
        subCategory: [
            {
                subTitle: 'Wedding Invitation',
                imgUrl: ''
            },
            {
                subTitle: 'Party Invitation',
                imgUrl: ''
            },
            {
                subTitle: 'Pooja Invitation',
                imgUrl: ''
            },
            {
                subTitle: 'Ceremony Invitation',
                imgUrl: ''
            },
        ]
    },
    {
        title: 'Photo Books',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.',
        subCategory: [
            {
                subTitle: 'Soft Cover Photobook',
                imgUrl: ''
            },
            {
                subTitle: 'Hard Cover Photobook',
                imgUrl: ''
            },
            {
                subTitle: 'Spiral Photobook',
                imgUrl: ''
            },
            {
                subTitle: 'Photo Folder',
                imgUrl: ''
            },
            {
                subTitle: 'Digital Photobook',
                imgUrl: ''
            },
        ]
    },
    {
        title: 'Itinerary',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.',
        subCategory: [
            {
                subTitle: 'Wedding Itinerary',
                imgUrl: ''
            },
            {
                subTitle: 'Stickers',
                imgUrl: ''
            },
            {
                subTitle: 'Tags/Badges',
                imgUrl: ''
            },
            {
                subTitle: 'Welcome Signages',
                imgUrl: ''
            },
            {
                subTitle: 'Accessories',
                imgUrl: ''
            },
        ]
    },
    {
        title: 'Free Greetings',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, voluptatibus.',
        subCategory: [
            {
                subTitle: 'Wishes Greeting',
                imgUrl: ''
            },
            {
                subTitle: 'Thanks Greeting',
                imgUrl: ''
            },
            {
                subTitle: 'Feeling Greeting',
                imgUrl: ''
            },
            {
                subTitle: 'Funny Greeting',
                imgUrl: ''
            },
            {
                subTitle: 'Accessories',
                imgUrl: ''
            },
        ]
    },
    {
        title: 'Guest Surprising',
        description: "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
        subCategory: [
            {
                subTitle: 'Newspaper',
                imgUrl: welcome
            },
            {
                subTitle: 'Magazines',
                imgUrl: welcome
            },
        ]
    },
    {
        title: 'Calenders',
        description: "Nothing is more rewarding than going over pictures from the past, reflecting on the fun times you’ve had. With Zoomin you can make a stylish photo book that is a perfect way for displaying the pictures you've taken—of your loved ones, pets, family holidays, travels, and the little life moments that make you smile. Our huge collection of designer themes, customized layout options & cute stickers will leave you spoilt for choice!",
        subCategory: [
            {
                subTitle: 'Wedding Calender',
                imgUrl: welcome
            },
            {
                subTitle: 'Family Calender',
                imgUrl: welcome
            },
        ]
    },
]

const CategoryCard = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
  return (
    <div className=' mt-8 py-6 rounded-lg bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500'>
        <div>
            <h1 className='text-4xl pl-6 font-bold py-4'>Here are our product categories</h1>
        </div>
        <div className='p-4 '>
        <ul className='flex gap-4 bg-gradient-to-r from-amber-500 to-amber-500 px-2 py-2 rounded-lg'>
        {categories.map((cat, index) => (
                <li className={`text-lg cursor-pointer px-2 py-1 rounded-lg ${selectedCategory === cat ? 'bg-amber-600 font-semibold' : 'bg-transparent hover:bg-amber-300'}`} key={index} onClick={()=> setSelectedCategory(cat)}>{cat.title}</li>
            ))}
            </ul>
        </div>

        {selectedCategory && (
            <div className='flex gap-4 justify-around my-6'>
                <div className='flex flex-col items-center gap-10 w-[30%]'>
                <h1 className='text-4xl font-semibold'>{selectedCategory.title}</h1>
                <p className='text-gray-800 text-center text-lg'>{selectedCategory.description}</p>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {selectedCategory.subCategory.map((sub, index) => (
                        <div key={index} className=' bg-amber-400 shadow-2xl rounded-lg hover:border-2 hover:border-black'>
                            <img className='w-[220px] h-[250px] rounded-t-lg' src={sub.imgUrl} alt="" />
                            <h1 className='text-xl py-2 text-center'>{sub.subTitle}</h1>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default CategoryCard