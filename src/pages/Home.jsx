import React from 'react'
import HeroSlider from '../components/HeroSlider'
import TopCategories from '../components/TopCategories'
import FeaturedProducts from '../components/FeaturedProducts'

const Home = () => {
  return (
    <div>
      <HeroSlider/>
      <TopCategories/>
      <FeaturedProducts/>
    </div>
  )
}

export default Home
