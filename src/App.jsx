import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductCategories from './components/ProductCategories';
import Category from './pages/Category';
import ContactUs from './pages/ContactUs';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoriesPage from './pages/CategoriesPage';
import About from './components/About';
=======
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
>>>>>>> ef42b3499a705c2b90af146d35fb0edff01db263
import ProductsCategory from './pages/ProductsCategory';
import Cart from './components/Cart';
import { CartProvider } from './CartContext';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Cart />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Category />} />
<<<<<<< HEAD
          <Route path='/contact us' element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/about' element={<About />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path="/product/:id" element={<ProductPage />} />
=======
          <Route path='/contact us' element={<ContactUs/>}/>
          <Route path="/product/:id" element={<ProductPage/>} /> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/categories' element={<CategoriesPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="/products/:category" element={<ProductsCategory/>} />
      
>>>>>>> ef42b3499a705c2b90af146d35fb0edff01db263
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
