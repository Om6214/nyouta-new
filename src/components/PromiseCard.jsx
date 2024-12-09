import { BookHeart, SmilePlus } from 'lucide-react'
import React from 'react'
import trustIcon from "../assets/images/trustedicon.png";
import personIcon from "../assets/images/person.png";
import happyIcon from "../assets/images/happy.png";

const promises = [
    {
        title: 'Personalized Your Way',
        description: 'Each Nyouta product is crafted to be personalized for you and by you. At Nyouta, you will love to personalize 100+ products, your way!',
        icon: personIcon
    },
    {
        title: '100% Happiness Guarantee',
        description: 'We strive to give you 100% Happiness. Our hardworking team ensures the highest quality available, the fastest delivery times possible and at the fairest prices.',
        icon: happyIcon
    },
    {
        title: 'Trusted Quality',
        description: 'We have invested in a state-of-the-art Print & Production Centre so that no matter which corner of India you order from, the quality is always the best.',
        icon: trustIcon
    },
]

const PromiseCard = () => {
  return (
    <div className='bg-priBg py-8'>
        <h1 className='text-center text-primary font-primaryFont text-4xl lg:text-6xl font-bold pt-8'>Our Promise to Customers</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-16 px-2 py-10'>
            {promises.map((prom, index) => (
                <div key={index} className='bg-gradient-to-r from-primary to-secondary flex flex-col items-center gap-4 py-10 px-4 rounded-lg hover:-translate-y-3 duration-300 ease-in cursor-pointer'>
                    <img className='w-[75px]' src={prom.icon} alt="" />
                    <h1 className='text-3xl font-semibold'>{prom.title}</h1>
                    <h3 className='text-center'>{prom.description}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PromiseCard