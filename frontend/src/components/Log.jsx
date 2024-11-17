import React, { useState } from 'react';

const Log = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Attempt buyer login first
      const buyerResponse = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (buyerResponse.ok) {
        const buyerData = await buyerResponse.json();
        setUser({ name: buyerData.name, role: 'buyer' });
        setErrorMessage('');
        setSuccessMessage(`Welcome ${buyerData.name}, you are logged in as a buyer.`);
        return;
      }

      // If buyer login fails, try seller login
      const sellerResponse = await fetch('http://127.0.0.1:5000/register_seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (sellerResponse.ok) {
        const sellerData = await sellerResponse.json();
        setUser({ name: sellerData.name, role: 'seller' });
        setErrorMessage('');
        setSuccessMessage(`Welcome ${sellerData.name}, you are logged in as a seller.`);
        return;
      }

      // If both fail, set an error message
      setErrorMessage('Invalid credentials for both buyer and seller. Please try again.');
      setSuccessMessage('');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-4 w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-4 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Log;
