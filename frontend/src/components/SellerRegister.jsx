import React, { useState } from 'react';

const SellerRegister = ({ setRole }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/register_seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone_number: phoneNumber, id_number: idNumber, business_type: businessType }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Seller registration successful!');
        setErrorMessage('');
        setName('');
        setEmail('');
        setPhoneNumber('');
        setIdNumber('');
        setBusinessType('');
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
      <h2 className="text-2xl font-bold text-center mb-4">Seller Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <input
        type="text"
        placeholder="ID Number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        required
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <input
        type="text"
        placeholder="Business Type"
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
        required
        className="border border-gray-300 p-2 mb-4 w-full rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition">
        Register as Seller
      </button>
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      <button onClick={() => setRole('')} className="mt-4 underline text-green-500 text-sm">
        Go Back
      </button>
    </form>
  );
};

export default SellerRegister;
