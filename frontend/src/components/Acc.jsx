import React, { useEffect, useState } from 'react';

const Acc = ({ setCart }) => {
  const [accessories, setAccessories] = useState([]);

  // Fetching accessory data from the server
  const fetchAccessories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/accessories'); // Ensure this URL points to your accessories API
      const data = await response.json();

      // Validate and add fallback for missing IDs
      const validatedData = data.map((item, index) => ({
        ...item,
        id: item.id || `temp-id-${index}`, // Assign temporary ID if missing
      }));

      console.log('Fetched Accessories:', validatedData);
      setAccessories(validatedData);
    } catch (error) {
      console.error('Error fetching accessory data:', error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  // Adding product to the cart
  const addToCart = (accessory) => {
    if (!accessory || !accessory.id) {
      console.error('Invalid accessory:', accessory);
      alert('Failed to add product to cart.');
      return;
    }

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
      <div className="mb-6 text-left">
        <h2 className="text-3xl font-bold mb-2">Accessories</h2>
        <hr className="border-t-4 border-gray-300" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="border rounded-md p-4 shadow-md">
            <img
              src={accessory.img_url || '/placeholder.jpg'}
              alt={accessory.name || 'Unnamed Accessory'}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold">{accessory.name || 'Unnamed Accessory'}</h3>
            <p>{accessory.description || 'No description available.'}</p>
            <p className="text-blue-500">${accessory.price || '0.00'}</p>
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
