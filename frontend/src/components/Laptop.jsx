import React, { useEffect, useState } from 'react';

const Laptop = ({ setCart }) => {
  const [laptops, setLaptops] = useState([]);

  // Fetching laptop data from the server
  const fetchLaptops = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/laptops'); // Update this URL with your API endpoint
      const data = await response.json();

      // Validate and add fallback for missing IDs
      const validatedData = data.map((item, index) => ({
        ...item,
        id: item.id || `temp-id-${index}`, // Assign temporary ID if missing
      }));

      console.log('Fetched Laptops:', validatedData);
      setLaptops(validatedData);
    } catch (error) {
      console.error('Error fetching laptop data:', error);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  // Adding product to the cart
  const addToCart = (laptop) => {
    if (!laptop || !laptop.id) {
      console.error('Invalid laptop:', laptop);
      alert('Failed to add product to cart.');
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === laptop.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === laptop.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...laptop, quantity: 1 }];
      }
    });

    alert(`${laptop.name} has been added to the cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 text-left">
        <h2 className="text-3xl font-bold mb-2">Laptops</h2>
        <hr className="border-t-4 border-gray-300" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {laptops.map(laptop => (
          <div key={laptop.id} className="border rounded-md p-4 shadow-md">
            <img
              src={laptop.img_url || '/placeholder.jpg'}
              alt={laptop.name || 'Unnamed Laptop'}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold">{laptop.name || 'Unnamed Laptop'}</h3>
            <p>{laptop.description || 'No description available.'}</p>
            <p className="text-blue-500">${laptop.price || '0.00'}</p>
            <button
              onClick={() => addToCart(laptop)}
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

export default Laptop;
