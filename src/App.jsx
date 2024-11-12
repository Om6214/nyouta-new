import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Footer from './components/Footer'
import ProductCategories from './components/ProductCategories'
import Category from './pages/Category'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<Category />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
