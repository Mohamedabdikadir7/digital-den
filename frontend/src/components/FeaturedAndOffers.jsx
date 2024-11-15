import React, { useEffect, useState } from 'react';

const FeaturedAndOffers = ({ setCart }) => {
  const [products, setProducts] = useState({
    laptops: [],
    accessories: [],
    gamingCPUs: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://127.0.0.1:5000/laptops'),
          fetch('http://127.0.0.1:5000/accessories'),
          fetch('http://127.0.0.1:5000/gaming_cpus'),
        ]);

        const [laptops, accessories, gamingCPUs] = await Promise.all(
          responses.map((res) => res.json())
        );

        setProducts({ laptops, accessories, gamingCPUs });
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const { laptops, accessories, gamingCPUs } = products;

  const featuredLaptop = laptops[0] || {};
  const featuredAccessory = accessories[0] || {};
  const featuredGamingCPU = gamingCPUs[0] || {};

  const offerLaptop = laptops[1] || {};
  const offerAccessory = accessories[1] || {};
  const offerGamingCPU = gamingCPUs[1] || {};

  // Function to add items to cart
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

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Featured Section */}
      <div className="mb-12">
        <div className="mb-6 text-left">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <hr className="border-t-4 border-gray-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative p-4 border rounded-lg shadow-md">
            <img
              src={featuredLaptop.img_url}
              alt={featuredLaptop.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-lg">{featuredLaptop.name}</h3>
            <p>{featuredLaptop.description}</p>
            <p className="text-blue-500 font-semibold">${featuredLaptop.price}</p>
            <button
              onClick={() => addToCart(featuredLaptop)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
          <div className="relative p-4 border rounded-lg shadow-md">
            <img
              src={featuredAccessory.img_url}
              alt={featuredAccessory.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-lg">{featuredAccessory.name}</h3>
            <p>{featuredAccessory.description}</p>
            <p className="text-blue-500 font-semibold">${featuredAccessory.price}</p>
            <button
              onClick={() => addToCart(featuredAccessory)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
          <div className="relative p-4 border rounded-lg shadow-md">
            <img
              src={featuredGamingCPU.img_url}
              alt={featuredGamingCPU.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-lg">{featuredGamingCPU.name}</h3>
            <p>{featuredGamingCPU.description}</p>
            <p className="text-blue-500 font-semibold">${featuredGamingCPU.price}</p>
            <button
              onClick={() => addToCart(featuredGamingCPU)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Items on Offer Section */}
      <div>
        <div className="mb-6 text-left">
          <h2 className="text-3xl font-bold mb-2">Items on Offer</h2>
          <hr className="border-t-4 border-gray-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Laptop Offer */}
          <div className="relative p-4 border rounded-lg shadow-md">
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
              30% Discount
            </span>
            <img
              src={offerLaptop.img_url}
              alt={offerLaptop.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-lg">{offerLaptop.name}</h3>
            <p>{offerLaptop.description}</p>
            <p className="text-gray-500 line-through">Original Price: $999</p>
            <p className="text-red-500 font-semibold">Offer Price: ${offerLaptop.price}</p>
            <button
              onClick={() => addToCart(offerLaptop)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>

          {/* Accessory Offer */}
          <div className="relative p-4 border rounded-lg shadow-md">
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
              30% Discount
            </span>
            <img
              src={offerAccessory.img_url}
              alt={offerAccessory.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-lg">{offerAccessory.name}</h3>
            <p>{offerAccessory.description}</p>
            <p className="text-gray-500 line-through">Original Price: $199</p>
            <p className="text-red-500 font-semibold">Offer Price: ${offerAccessory.price}</p>
            <button
              onClick={() => addToCart(offerAccessory)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>

          {/* Gaming CPU Offer */}
          <div className="relative p-4 border rounded-lg shadow-md">
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
              30% Discount
            </span>
            <img
              src={offerGamingCPU.img_url}
              alt={offerGamingCPU.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-bold text-lg">{offerGamingCPU.name}</h3>
            <p>{offerGamingCPU.description}</p>
            <p className="text-gray-500 line-through">Original Price: $799</p>
            <p className="text-red-500 font-semibold">Offer Price: ${offerGamingCPU.price}</p>
            <button
              onClick={() => addToCart(offerGamingCPU)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAndOffers;
