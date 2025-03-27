import React from 'react';
import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Products from './components/Product/Products';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './components/Layout/NotFound';
import Home from './components/Home/Home';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css';

// ✅ Routes séparées dans le même fichier
const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/mac" element={<Products />} />
      <Route path="/iphone" element={<Products />} />
      <Route path="/ipad" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ✅ Emballage dans Router
const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1" style={{ backgroundColor: 'var(--primary-bg)' }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
