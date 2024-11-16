import React from 'react';

const Cart = ({ cart, setCart }) => {
  // Increase quantity for a product
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity for a product
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => {
    // Ensure item has a valid price and quantity
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map(item => (
            <div key={item.id || `fallback-${Math.random()}`} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img
                  src={item.img_url || '/placeholder.jpg'}
                  alt={item.name || 'Unnamed Product'}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">{item.name || 'Unnamed Product'}</h3>
                  <p>{item.description || 'No description available'}</p>
                  <p className="text-blue-500">${parseFloat(item.price).toFixed(2) || '0.00'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 px-2 py-1 rounded-md">-</button>
                <span className="mx-2">{item.quantity || 1}</span>
                <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 px-2 py-1 rounded-md">+</button>
                <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-4">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <h2 className="text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-gray-500">Your cart is empty. Start shopping!</p>
      )}
    </div>
  );
};

export default Cart;
