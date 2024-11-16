import React, { useEffect, useState } from 'react';

const MacBooks = ({ setCart }) => {
  const [macBooks, setMacBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch MacBooks from the API
  useEffect(() => {
    const fetchMacBooks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/macbooks');
        const data = await response.json();
        setMacBooks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching MacBooks:', err);
        setError('Failed to load MacBooks. Please try again later.');
        setLoading(false);
      }
    };

    fetchMacBooks();
  }, []);

  // Add a MacBook to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    alert(`${product.name} has been added to the cart!`);
  };

  if (loading) {
    return <p>Loading MacBooks...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 text-left">
        <h2 className="text-3xl font-bold mb-2">MacBooks</h2>
        <hr className="border-t-4 border-gray-300" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {macBooks.map((macBook) => (
          <div key={macBook.id} className="border rounded-md p-4 shadow-md">
            <img
              src={macBook.img_url || '/placeholder.jpg'}
              alt={macBook.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold">{macBook.name}</h3>
            <p>{macBook.description}</p>
            <p className="text-blue-500">${macBook.price}</p>
            <button
              onClick={() => addToCart(macBook)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MacBooks;
