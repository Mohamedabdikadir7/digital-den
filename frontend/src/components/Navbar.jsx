import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Navbar({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Safeguard for undefined cart
  const cartCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <header className="bg-white shadow-md text-blue sticky top-0 w-full z-50">
      <div className="container flex items-center justify-between py-2 px-4 md:px-6">
        <Link to="/" className="font-bold text-xl">Digital Den</Link>
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-4 hidden md:block">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-md bg-gray-200 pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Icons: Cart and Account */}
        <div className="flex items-center gap-4">
          {/* Shopping Cart Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full px-3 py-1 bg-blue-500 text-white hover:bg-blue-700 relative"
            aria-label="Shopping Cart"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-white" />
            {/* Cart Count */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
          {/* Account Button */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-label="Account"
            >
              <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8" />
              <span className="hidden md:block">Account</span>
              <FontAwesomeIcon icon={accountMenuOpen ? faChevronUp : faChevronDown} className="w-5 h-5" />
            </button>
            {accountMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                <Link to="/signin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign In</Link>
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
              </div>
            )}
          </div>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="block md:hidden text-blue-600 hover:text-blue-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`md:flex md:items-center ${menuOpen ? "block" : "hidden"} bg-gray-100 md:bg-transparent`}>
        <div className="container flex flex-col md:flex-row items-center justify-center py-3 px-4 md:px-6 space-y-2 md:space-y-0 md:space-x-6">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link to="/laptops" className="hover:text-blue-500 px-2 py-1 rounded-md text-gray-800">Laptops</Link>
            </li>
            <li>
              <Link to="/appliances" className="hover:text-blue-500 px-2 py-1 rounded-md text-gray-800">Accessories</Link>
            </li>
            <li>
              <Link to="/phones" className="hover:text-blue-500 px-2 py-1 rounded-md text-gray-800">Phones</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 px-2 py-1 rounded-md text-gray-800">Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

// Inline SVGs for icons (same as before)
function MenuIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );
}

export default Navbar;
