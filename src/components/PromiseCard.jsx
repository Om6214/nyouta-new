import { BookHeart, SmilePlus } from 'lucide-react'
import React from 'react'
import trustIcon from "../assets/images/trustedicon.png";
import personIcon from "../assets/images/person.png";
import happyIcon from "../assets/images/happy.png";
import bgImg from "../assets/images/20.png";

const promises = [
    {
        title: 'Personalized Your Way',
        description: 'Each Nyouta product is crafted to be personalized for you.',
        icon: personIcon
    },
    {
        title: '100% Happiness Guarantee',
        description: 'We strive to give you 100% Happiness.',
        icon: happyIcon
    },
    {
        title: 'Trusted Quality',
        description: 'We have invested in a state-of-the-art Print & Production Centre.',
        icon: trustIcon
    },
]

const PromiseCard = () => {
  return (
    <div className='bg-priBg py-8'>
        <h1 className='text-center text-primary font-heroFont text-2xl lg:text-4xl font-semibold pt-8'>Our Promise : Quality, Personalization, and a Heartfelt Experience</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:px-16 px-2 py-10'>
            {promises.map((prom, index) => (
                <div key={index} className=' relative flex flex-col items-center gap-2 py-10 px-4 rounded-lg hover:-translate-y-3 duration-300 ease-in cursor-pointer'>
                    <img src={bgImg} className='absolute lg:top-[-60px] top-[-45px] w-[500px]' alt="" />
                    <img className='w-[75px] z-20 filter invert' src={prom.icon} alt="" />
                    <h1 className='lg:text-3xl text-xl font-semibold z-20 text-center'>{prom.title}</h1>
                    <h3 className='text-center z-20'>{prom.description}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PromiseCard