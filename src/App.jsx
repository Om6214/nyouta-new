import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Footer from './components/Footer';
import Category from './pages/Category';
import ContactUs from './pages/ContactUs';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoriesPage from './pages/CategoriesPage';
import About from './components/About';
import Checkout from './pages/Checkout';
import ProductsCategory from './pages/ProductsCategory';
import Cart from './components/Cart';
import { CartProvider } from './CartContext';
import DigitalCardEditPage from './pages/DigitalCardEditPage';
import PhysicalCardEditPage from './pages/PhysicalCardEditPage';
import WeddingWebsite from './pages/WeddingWebsite';
import WeddingWebsiteTemplates from './pages/WeddingWebsiteTemplates';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { googleSignup } from './Store/slices/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import CategoriesNavBar from './components/CategoriesNavBar';
import CategoryLabel from './components/CategoryLabel';

import WeddingWebsiteUrl from './pages/WeddingWebsiteUrl';
import LoginRegister from './pages/LoginRegister';

import CategoryFilterLabel from './components/CategoryFilterLabel';
import Terms from "./pages/Terms";
import JoinNyouta from './components/JoinNyouta';
import PdfGenerator from './pages/PdfGenerator';
import PdfGeneratorWaterMark from './pages/PdfGeneratorWaterMark';
import PhotoBook from './components/PhotoBook';
import ItineraryCompo from './components/ItineraryCompo';
import DesignEdit from './components/DesignEdit';
import FreeGreetingsFilter from "./components/FreeGreetingFilter"


// gaganluthrasirji

function App() {
  // useEffect(()=>{...}) // Your previous effect logic
  return (
    <CartProvider>
      <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Category />} />
          <Route path="/weds/:slug" element={<WeddingWebsite />} />
          <Route path='/create-wedding-website' element={<WeddingWebsiteUrl/>}/>
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/:id/edit-digital-card" element={<DigitalCardEditPage />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path='/join-e-nyouta' element={<JoinNyouta/>}/>
          <Route path="/nav/:pageName" element={<CategoriesNavBar />} />
          <Route path="/nav/:pageName/*" element={<CategoryLabel />} />
          <Route path="/e/nav/:pageName/:pagid/*" element={<CategoryFilterLabel />} />
          <Route path="/e/navbar/:pageName/:pagid/*" element={<FreeGreetingsFilter />} />
          <Route path='/edit/PhotoBook/:id' element={<PhotoBook />} />
          <Route path='/edit/Itinerary/:id' element={<ItineraryCompo />} />
          <Route path='/edit/Planner Books/:pageid' element={<DesignEdit />} />
          <Route path='/edit/free greetings/:pageid' element={<DesignEdit />} />


          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
         
          <Route path="/product/:id/edit-physical-card" element={<PhysicalCardEditPage />} />
        
        </Routes>

      <Cart />
        {/* Conditionally render Footer */}
        <ConditionalFooter />
      </BrowserRouter>
    </CartProvider>
  );
}

// A component to conditionally render the Navbar based on the route
function ConditionalNavbar() {
  const location = useLocation();

  // Check if the current route matches the path for the wedding website or the physical/digital card edit pages
  if (location.pathname.includes('/weds') || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-physical-card')) || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-digital-card'))) {
    return null;
  }

  return <Navbar />;
}

// A component to conditionally render the Footer based on the route
function ConditionalFooter() {
  const location = useLocation();

  // Check if the current route matches the path for the wedding website or the physical/digital card edit pages
  if (location.pathname.includes('/weds') || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-physical-card')) || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-digital-card'))) {
    return null;
  }

  return <Footer />;
}


export default App;
