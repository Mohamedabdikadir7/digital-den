import React, { useEffect, useState } from 'react';

const Products = ({ setCart, searchQuery }) => {
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

      if (responses.some(res => !res.ok)) {
        throw new Error('Network response was not ok');
      }

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
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} has been added to the cart!`); // Optional: alert message
  };

  // Filter products based on the search query
  const filterProducts = (items) => {
    if (!searchQuery) return items; // Return all items if no search query
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(products).map(([category, items]) => {
        const filteredItems = filterProducts(items); // Filter items based on the search query
        return (
          <div key={category} className="mb-6">
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <hr className="border-t-4 border-gray-300 mb-4" />
            </div>
            {filteredItems.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredItems.map(item => (
                  <div key={item.id} className="border rounded-md p-3 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <img
                      src={item.img_url}
                      alt={item.name}
                      className="w-full h-40 object-contain mb-2"
                      style={{ width: '100%', height: '200px', objectFit: 'contain' }}
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Products;
