import React, { useState } from 'react';

const Login = () => {
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, secondname, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registration successful!');
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
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={handleRegister}>
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
                        Register
                    </button>
                </form>

                {/* Display success or error message */}
                {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
