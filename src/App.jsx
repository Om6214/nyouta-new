import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// gaganluthrasir

function App() {
  return (
    <CartProvider> 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Category />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/:id/edit-digital-card" element={<DigitalCardEditPage />} />
          <Route path="/product/:id/edit-physical-card" element={<PhysicalCardEditPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:category" element={<ProductsCategory />} />
          <Route path='/admin/dashboard' element={<DashboardLayout />}>
              <Route index path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/dashboard/add-product' element={<AddProduct />} />
          </Route>
          <Route path="/editor" element={<WeddingCardEditor />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
