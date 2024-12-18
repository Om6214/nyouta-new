import { BookHeart, SmilePlus } from 'lucide-react'
import React from 'react'
import trustIcon from "../assets/images/trustedicon.png";
import personIcon from "../assets/images/person.png";
import happyIcon from "../assets/images/happy.png";
import bgImg from "../assets/images/mahal5.png";
import img1 from "../assets/images/promise/1.png";
import img2 from "../assets/images/promise/2.png";
import img3 from "../assets/images/promise/3.png";
import img4 from "../assets/images/promise/4.png";
import img5 from "../assets/images/promise/5.png";
import img6 from "../assets/images/promise/6.png";
import img7 from "../assets/images/promise/7.png";
import img8 from "../assets/images/promise/8.png";

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
    <div className=' py-4 flex-col flex gap-8'>
        <h1 className='text-center text-primary font-heroFont text-2xl lg:text-4xl font-semibold pt-8'>Our Promise : Quality, Personalization, and a Heartfelt Experience</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-6 lg:px-16 px-2 py-1'>
            {promises.map((prom, index) => (
                <div key={index} className=' relative flex flex-col items-center gap-2 px-4 rounded-lg hover:-translate-y-3 duration-300 ease-in cursor-pointer'>
                    <img src={bgImg} className=' ' alt="" />
                    <div className='absolute flex flex-col items-center gap-4 pt-4 text-white font-heroFont'>
                    <img className='w-[75px]' src={prom.icon} alt="" />
                    <h1 className='lg:text-3xl text-xl font-semibold text-center'>{prom.title}</h1>
                    <h3 className='text-center px-12 font-semibold'>{prom.description}</h3>
                    </div>
                </div>
            ))}
        </div>
        <div className='mx-4'>
            <div className='grid grid-cols-4 lg:grid-cols-8 gap-4'>
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img1} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img2} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img3} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img4} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img5} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img6} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img7} alt="" />
                <img className='hover:scale-110 duration-300 ease-out cursor-pointer' src={img8} alt="" />
            </div>
        </div>
    </div>
  )
}

export default PromiseCard