import React from 'react'
import HeroSlider from '../components/HeroSlider'
import TopCategories from '../components/TopCategories'
import FeaturedProducts from '../components/FeaturedProducts'
import HeroBanner from '../components/HeroBanner'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import InviteSection from '../components/InviteSection'

const Home = () => {
  return (
    <div className='bg-white'>
      {/* <HeroSlider/> */}
      <HeroBanner/>
      <TopCategories/>
      <InviteSection/>
      <FeaturedProducts/>
      <About/>
      <Testimonials/>
    </div>
  )
}

export default Home
