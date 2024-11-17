import React, { useState } from 'react';
import SellerRegister from './SellerRegister'; // Import SellerRegister Component
import BuyerRegister from './BuyerRegister'; // Import BuyerRegister Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStore } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Login = () => {
  const [role, setRole] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-green-400 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        {!role ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              What type of user are you?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              This will help us provide you with a more relevant experience.
            </p>
            <div className="grid grid-cols-1 gap-6">
              <button
                onClick={() => setRole('buyer')}
                className="flex items-center gap-4 bg-blue-600 text-white py-3 px-4 rounded-lg text-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
                Register as Buyer
              </button>
              <button
                onClick={() => setRole('seller')}
                className="flex items-center gap-4 bg-green-600 text-white py-3 px-4 rounded-lg text-lg shadow-md hover:bg-green-700 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faStore} className="w-6 h-6" />
                Register as Seller
              </button>
            </div>
          </>
        ) : role === 'buyer' ? (
          <BuyerRegister setRole={setRole} />
        ) : (
          <SellerRegister setRole={setRole} />
        )}
        {role && (
          <button
            onClick={() => setRole('')}
            className="mt-6 text-gray-600 underline text-sm hover:text-gray-800 transition"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
