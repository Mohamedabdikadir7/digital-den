// Cart.js
import React from 'react';

const Cart = ({ cart, setCart }) => {
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img src={item.img_url} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="text-blue-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 px-2 py-1 rounded-md">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 px-2 py-1 rounded-md">+</button>
                <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-4">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
