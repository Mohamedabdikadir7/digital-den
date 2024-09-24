// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Abdi from './components/Abdi'; // Ensure this component is defined
import Laptop from './components/Laptop'; // Import the Laptop component
import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [cart, setCart] = useState(() => {
    // Get cart from localStorage or initialize it as an empty array
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
        <Abdi />
        <Routes>
          {/* <Route path="/abdi" element={<Abdi />} /> */}
          <Route path="/laptops" element={<Laptop setCart={setCart} />} />
          <Route path="/" element={<Products setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
