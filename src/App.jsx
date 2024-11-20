import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Footer from './components/Footer'
import ProductCategories from './components/ProductCategories'
import Category from './pages/Category'
import ContactUs from './pages/ContactUs'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import Register from './pages/Register'
import CategoriesPage from './pages/CategoriesPage'
import About from './components/About'
import { useState } from 'react';
import Checkout from './pages/Checkout';

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Category />} />
          <Route path='/contact us' element={<ContactUs/>}/>
          <Route path="/product/:id" element={<ProductPage/>} /> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/categories' element={<CategoriesPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/checkout' element={<Checkout/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
