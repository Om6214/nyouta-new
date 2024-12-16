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
import PromiseCard from '../components/PromiseCard'
import DiscountOffer from '../components/DiscountOffer'
import BlogsCard from '../components/BlogsCard'
import ProductCard from '../components/ProductCard'

const Home = () => {
  return (
    <div className='bg-white'>
      <HeroSlider/>
      {/* <HeroBanner/> */}
      <CategoryCard/>
      {/* <TopCategories/> */}
      <HomeSlider/>
      <InviteSection/>
      {/* <DiscountOffer/> */}
      {/* <CategorySlider/> */}
      <FeaturedProducts/>
      <VideoCard/>
      <ProductCard/>
      <About/>
      <BlogsCard/>
      <PromiseCard/>
      <Testimonials/>
    </div>
  )
}

export default Home
