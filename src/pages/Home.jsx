import React from 'react'
import HeroSlider from '../components/HeroSlider'
import TopCategories from '../components/TopCategories'
import FeaturedProducts from '../components/FeaturedProducts'
import HeroBanner from '../components/HeroBanner'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import InviteSection from '../components/InviteSection'
import HomeSlider from '../components/HomeSlider'
import CategoryCard from '../components/CategoryCard'
import VideoCard from '../components/VideoCard'
import PromiseCard from '../components/PromiseCard'
import DiscountOffer from '../components/DiscountOffer'
import BlogsCard from '../components/BlogsCard'
import ProductCard from '../components/ProductCard'
import WeddingPlan from '../components/WeddingPlan'
import CategoryFeat from '../components/CategoryFeat'
import Trending from '../components/Trending'
import MemoryCard from '../components/MemoryCard'
import SurpriseCard from '../components/SurpriseCard'
import RewardCard from '../components/RewardCard'

const Home = () => {
  return (
    <div className='bg-white'>
      <HeroSlider/>
      {/* <HeroBanner/> */}
      <CategoryCard/>
      {/* <TopCategories/> */}
      <FeaturedProducts/>
      <HomeSlider/>
      <WeddingPlan/>
      <CategoryFeat/>
      <MemoryCard/>
      <Trending/>
      <VideoCard/>
      <SurpriseCard/>
      {/* <ProductCard/> */}
      <About/>
      <Testimonials/>
      <BlogsCard/>
      <PromiseCard/>
      <RewardCard/>
    </div>
  )
}

export default Home
