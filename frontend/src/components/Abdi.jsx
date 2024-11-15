import React from 'react';
import { Link } from 'react-router-dom';

export default function Abdi() {  // Rename the component to Abdi (or Hero if you prefer)
  return (
    <section className="w-full min-h-screen py-12 md:py-24 lg:py-32 relative bg-gradient-to-r from-gray-100 to-white">
      <div className="container relative flex flex-col lg:flex-row items-center justify-between h-full px-4 md:px-6 z-10">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 flex flex-col justify-center text-left space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            The All-New MacBook Pro
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mt-2">
            Experience unparalleled performance with the new M1 chip, a stunning Retina display, and an ultra-sleek design. 
            Push the boundaries of what's possible with the ultimate laptop for professionals and creatives.
          </p>
          <p className="text-gray-500 text-lg md:text-xl">
            Lightweight. Powerful. Beautiful. Everything you need in a laptop.
          </p>
          <div className="flex gap-4 mt-6">
            <Link
              to="#"
              className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Shop Now
            </Link>
            <Link
              to="#"
              className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-transparent px-8 text-sm font-medium text-gray-700 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 h-96 lg:h-full flex-shrink-0 flex items-center justify-center">
          <img
            src="https://i.pinimg.com/236x/e9/9c/4b/e99c4b6f4899f2efdca0449d2c8781c6.jpg"
            alt="MacBook Pro"
            className="w-full h-auto object-cover lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
