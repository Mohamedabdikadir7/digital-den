// Products.js
import React, { useEffect, useState } from 'react';

const Products = ({ setCart }) => {
  const [products, setProducts] = useState({
    monitors: [],
    laptops: [],
    accessories: [],
    macbooks: [],
    gamingCPUs: [],
  });

  // Fetching product data from the server
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch('http://127.0.0.1:5000/monitors'),
        fetch('http://127.0.0.1:5000/laptops'),
        fetch('http://127.0.0.1:5000/accessories'),
        fetch('http://127.0.0.1:5000/macbooks'),
        fetch('http://127.0.0.1:5000/gaming_cpus'),
      ]);

      const [monitors, laptops, accessories, macbooks, gamingCPUs] = await Promise.all(
        responses.map(res => res.json())
      );

      setProducts({
        monitors,
        laptops,
        accessories,
        macbooks,
        gamingCPUs,
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Adding product to the cart
  const addToCart = (product) => {
    // Check if the item already exists in the cart
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // If it exists, just increase the quantity
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it doesn't exist, add it with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} has been added to the cart!`); // Optional: alert message
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {Object.entries(products).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mt-6">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <div key={item.id} className="border rounded-md p-4 shadow-md">
                <img
                  src={item.img_url}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2"
                />
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="text-blue-500">${item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
