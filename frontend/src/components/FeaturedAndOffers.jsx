import React, { useEffect, useState } from 'react';

const FeaturedAndOffers = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from multiple APIs
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

        const combinedProducts = [
          ...laptops.map((item) => ({ ...item, category: 'Laptop' })),
          ...accessories.map((item) => ({ ...item, category: 'Accessory' })),
          ...gamingCPUs.map((item) => ({ ...item, category: 'Gaming CPU' })),
        ];

        setProducts(combinedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add item to the cart
  const addToCart = (product) => {
    if (!product || !product.id) {
      alert('Invalid product. Cannot add to cart.');
      return;
    }

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

  // Render loading and error states
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Error</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Split products into featured and offer sections
  const featuredProducts = products.slice(0, 3);
  const offerProducts = products.slice(3, 6);

  // Render product card
  const renderProductCard = (product) => (
    <div key={product.id} className="relative p-4 border rounded-lg shadow-md">
      <img
        src={product.img_url || '/placeholder.jpg'}
        alt={product.name}
        className="w-full h-40 object-contain mb-2"
      />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-blue-500 font-semibold">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Banner */}
      <section className="hero bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Tech Haven</h1>
        <p className="text-lg mb-6">
          Discover top deals and the latest gadgets at unbeatable prices.
        </p>
        <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-100">
          Shop Now
        </button>
      </section>

      {/* Featured Section */}
      <section className="mb-12">
        <div className="mb-6 text-left">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <hr className="border-t-4 border-gray-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(renderProductCard)}
        </div>
      </section>

      {/* Items on Offer Section */}
      <section>
        <div className="mb-6 text-left">
          <h2 className="text-3xl font-bold mb-2">Items on Offer</h2>
          <hr className="border-t-4 border-gray-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerProducts.map((product) => (
            <div key={product.id} className="relative p-4 border rounded-lg shadow-md">
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                30% Off
              </span>
              <img
                src={product.img_url || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-gray-500 line-through">
                Original Price: ${(parseFloat(product.price) + 100).toFixed(2)}
              </p>
              <p className="text-red-500 font-semibold">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promotional-banner bg-yellow-100 p-6 rounded-lg mt-12 text-center">
        <h2 className="text-3xl font-bold text-yellow-700 mb-4">
          Exclusive Deals on Gaming Gear!
        </h2>
        <p className="text-yellow-600">
          Upgrade your gaming setup with up to 50% off on select items. Offer valid while stocks last.
        </p>
        <button className="bg-yellow-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-yellow-600">
          Browse Deals
        </button>
      </section>
    </div>
  );
};

export default FeaturedAndOffers;
