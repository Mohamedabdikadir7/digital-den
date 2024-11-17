import React, { useState } from 'react';

const BuyerRegister = ({ setRole }) => {
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, secondname, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Buyer registration successful!');
        setErrorMessage('');
        setFirstname('');
        setSecondname('');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2 className="text-2xl font-bold text-center mb-4">Customer details</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <input
        type="text"
        placeholder="Second Name"
        value={secondname}
        onChange={(e) => setSecondname(e.target.value)}
        required
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
        Register as Buyer
      </button>
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      <button onClick={() => setRole('')} className="mt-4 underline text-blue-500 text-sm">
        Go Back
      </button>
    </form>
  );
};

export default BuyerRegister;
