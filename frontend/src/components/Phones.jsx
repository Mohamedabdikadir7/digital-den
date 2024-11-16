import React, { useEffect, useState } from 'react';

const Phones = ({ setCart }) => {
  const [phones, setPhones] = useState([]);

  // Fetching phone data from the server
  const fetchPhones = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/phones'); // Update this URL with your API endpoint
      const data = await response.json();

      // Validate and add fallback for missing IDs
      const validatedData = data.map((item, index) => ({
        ...item,
        id: item.id || `temp-id-${index}`, // Assign temporary ID if missing
      }));

      console.log('Fetched Phones:', validatedData);
      setPhones(validatedData);
    } catch (error) {
      console.error('Error fetching phone data:', error);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  // Adding product to the cart
  const addToCart = (phone) => {
    if (!phone || !phone.id) {
      console.error('Invalid phone:', phone);
      alert('Failed to add product to cart.');
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === phone.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...phone, quantity: 1 }];
      }
    });

    alert(`${phone.name} has been added to the cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 text-left">
        <h2 className="text-3xl font-bold mb-2">Phones</h2>
        <hr className="border-t-4 border-gray-300" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phones.map(phone => (
          <div key={phone.id} className="border rounded-md p-4 shadow-md">
            <img
              src={phone.img_url || '/placeholder.jpg'}
              alt={phone.name || 'Unnamed Phone'}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold">{phone.name || 'Unnamed Phone'}</h3>
            <p>{phone.description || 'No description available.'}</p>
            <p className="text-blue-500">${phone.price || '0.00'}</p>
            <button
              onClick={() => addToCart(phone)}
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

export default Phones;
