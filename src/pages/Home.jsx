import React from 'react'
import HeroSlider from '../components/HeroSlider'
import FeaturedProducts from '../components/FeaturedProducts'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import InviteSection from '../components/InviteSection'
import HomeSlider from '../components/HomeSlider'
import CategoryCard from '../components/CategoryCard'
import VideoCard from '../components/VideoCard'
import PromiseCard from '../components/PromiseCard'
import BlogsCard from '../components/BlogsCard'
import WeddingPlan from '../components/WeddingPlan'
import CategoryFeat from '../components/CategoryFeat'
import Trending from '../components/Trending'
import MemoryCard from '../components/MemoryCard'
import SurpriseCard from '../components/SurpriseCard'
import RewardCard from '../components/RewardCard'
import CouponCard from '../components/CouponCard'

const Home = () => {
  return (
    <div className='bg-white'>
      <HeroSlider/>
      {/* <HeroBanner/> */}
      <CategoryCard/>
      <FeaturedProducts/>
      <HomeSlider/>
      <WeddingPlan/>
      <CategoryFeat/>
      <MemoryCard/>
      <Trending/>
      <VideoCard/>
      <SurpriseCard/>
      <About/>
      <CouponCard/>
      <Testimonials/>
      <BlogsCard/>
      <PromiseCard/>
      <RewardCard/>
    </div>
  )
}

export default Home
