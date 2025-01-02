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
import DashboardLayout from './dashboard/DashboardLayout';
import Dashboard from './dashboard/Dashboard';
import AddProduct from './dashboard/AddProduct';
import DigitalCardEditPage from './pages/DigitalCardEditPage';
import PhysicalCardEditPage from './pages/PhysicalCardEditPage';
import WeddingCardEditor from './pages/WeddingCardEditor';
import WeddingWebsite from './pages/WeddingWebsite';
import WeddingWebsiteTemplates from './pages/WeddingWebsiteTemplates';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { googleSignup } from './Store/slices/authSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import CategoriesNavBar from './components/CategoriesNavBar';
import CategoryLabel from './components/CategoryLabel';

import WeddingWebsiteUrl from './components/WeddingWebsiteUrl';
import LoginRegister from './pages/LoginRegister';
import CategoryFilterLabel from './components/CategoryFilterLabel';


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
          <Route path="/wedding-website/:slug" element={<WeddingWebsite />} />
          <Route path="/wedding-website-templates" element={<WeddingWebsiteTemplates />} />
          <Route path='/create-wedding-website' element={<WeddingWebsiteUrl/>}/>
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/:id/edit-digital-card" element={<DigitalCardEditPage />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />

          <Route path="/nav/:pageName" element={<CategoriesNavBar />} />
          <Route path="/nav/:pageName/*" element={<CategoryLabel />} />
          <Route path="/e/nav/:pageName/*" element={<CategoryFilterLabel />} />
          

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path='/admin/dashboard' element={<DashboardLayout />}>
            <Route index path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/dashboard/add-product' element={<AddProduct />} />
          </Route>
          <Route path="/editor" element={<WeddingCardEditor />} />
          <Route path="/product/:id/edit-physical-card" element={<PhysicalCardEditPage />} />
        </Routes>

        {/* Conditionally render Footer */}
        <ConditionalFooter />
      </BrowserRouter>
      <Cart />
    </CartProvider>
  );
}

// A component to conditionally render the Navbar based on the route
function ConditionalNavbar() {
  const location = useLocation();

  // Check if the current route matches the path for the wedding website or the physical/digital card edit pages
  if (location.pathname.includes('/wedding-website') || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-physical-card')) || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-digital-card'))) {
    return null;  // Don't render Navbar for these routes
  }

  return <Navbar />;  // Render Navbar for all other routes
}

// A component to conditionally render the Footer based on the route
function ConditionalFooter() {
  const location = useLocation();

  // Check if the current route matches the path for the wedding website or the physical/digital card edit pages
  if (location.pathname.includes('/wedding-website') || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-physical-card')) || 
      (location.pathname.includes('/product/') && location.pathname.includes('edit-digital-card'))) {
    return null;  // Don't render Footer for these routes
  }

  return <Footer />;  // Render Footer for all other routes
}

export default App;
