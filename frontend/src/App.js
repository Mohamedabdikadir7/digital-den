import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Abdi from './components/Abdi'; // Hero Section Component
import Laptop from './components/Laptop';
import Acc from './components/Acc';
import Phones from './components/Phones';
import GamingPCs from './components/GamingPCs'; // Gaming PCs Component
import MacBooks from './components/MacBooks'; // MacBooks Component
import Login from './components/Login'; // Login Component
import Log from './components/Log'; // Login Component
import FeaturedAndOffers from './components/FeaturedAndOffers'; // Featured and Offer sections
import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Navbar cart={cart} />
        {/* Hero Section added directly to the home page */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Abdi /> {/* Hero Section displayed on the home page */}
                <FeaturedAndOffers setCart={setCart} /> {/* Pass setCart to Featured and Offers sections */}
                <Products setCart={setCart} /> {/* Product list displayed after sections */}
              </>
            }
          />
          <Route path="/login" element={<Login />} /> {/* Login Component */}
          <Route path="/log" element={<Log />} /> {/* Login Component */}
          <Route path="/laptop" element={<Laptop setCart={setCart} />} />
          <Route path="/phones" element={<Phones setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/acc" element={<Acc setCart={setCart} />} />
          <Route path="/gaming-pcs" element={<GamingPCs setCart={setCart} />} />
          <Route path="/macbooks" element={<MacBooks setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
