// src/components/Acc.js
import React, { useEffect, useState } from 'react';

const Acc = ({ setCart }) => {
  const [accessories, setAccessories] = useState([]);

  // Fetching accessory data from the server
  const fetchAccessories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/accessories'); // Ensure this URL points to your accessories API
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error('Error fetching accessory data:', error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  // Adding product to the cart
  const addToCart = (accessory) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === accessory.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === accessory.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...accessory, quantity: 1 }];
      }
    });
    alert(`${accessory.name} has been added to the cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-2xl font-bold mb-4">Accessories</h1> */}
       <div className="mb-6 text-left">
  <h2 className="text-3xl font-bold mb-2">Accessories</h2>
  <hr className="border-t-4 border-gray-300" /> {/* Increased border thickness */}
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accessories.map(accessory => (
          <div key={accessory.id} className="border rounded-md p-4 shadow-md">
            <img
              src={accessory.img_url}
              alt={accessory.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold">{accessory.name}</h3>
            <p>{accessory.description}</p>
            <p className="text-blue-500">${accessory.price}</p>
            <button
              onClick={() => addToCart(accessory)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acc;
