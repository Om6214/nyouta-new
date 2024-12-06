import React from 'react'
import HeroSlider from '../components/HeroSlider'
import TopCategories from '../components/TopCategories'
import FeaturedProducts from '../components/FeaturedProducts'
import HeroBanner from '../components/HeroBanner'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import InviteSection from '../components/InviteSection'
import HomeSlider from '../components/HomeSlider'
import CategorySlider from '../components/CategorySlider'
import CategoryCard from '../components/CategoryCard'
import VideoCard from '../components/VideoCard'

const Home = () => {
  return (
    <div className='bg-white'>
      {/* <HeroSlider/> */}
      <HeroBanner/>
      <CategoryCard/>
      {/* <TopCategories/> */}
      <HomeSlider/>
      <InviteSection/>
      {/* <CategorySlider/> */}
      <FeaturedProducts/>
      <VideoCard/>
      <About/>
      <Testimonials/>
    </div>
  )
}

export default Home
