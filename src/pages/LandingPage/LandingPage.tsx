// src/pages/LandingPage/LandingPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation Bar - Simplified */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-sm py-3" : "bg-black/70 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wider text-white"
            >
              FLYAIR
            </Link>
          </div>

          {/* Sign Up Button Only */}
          <div>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Width, Modern Design */}
      <section className="h-screen flex items-center relative overflow-hidden">
        {/* Background image with darker overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/airplane-dark.jpg"
            alt="Aircraft"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content - Left Aligned like Image 2 */}
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h5 className="text-lg md:text-xl font-light mb-3 text-white uppercase tracking-widest">
              EXPERIENCE LUXURY TRAVEL
            </h5>
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white leading-tight">
              Fly in Style.
              <br />
              <span className="text-blue-400">Beyond Ordinary.</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-2xl">
              Discover a new standard of air travel with our premium flight
              booking service.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Stats at Bottom like in Image 2 */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm py-6 z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  200+
                </h3>
                <p className="text-sm text-white/70">Destinations Worldwide</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  35+
                </h3>
                <p className="text-sm text-white/70">Premium Aircraft</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  150K+
                </h3>
                <p className="text-sm text-white/70">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span className="text-sm mt-1">Scroll Down</span>
        </div>
      </section>

      {/* Features Section - Modern Card Design */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h6 className="text-primary-600 font-semibold uppercase tracking-wider mb-2">
              Why Choose Us
            </h6>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Elevate Your Travel Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique advantages that make FLYAIR the preferred
              choice for modern travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Lightning Fast Booking",
                description:
                  "Book your flight in minutes with our streamlined, intuitive process designed for the modern traveler.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Smart Pricing",
                description:
                  "Advanced AI-powered pricing ensures you always get the best deals customized to your preferences.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "World-Class Security",
                description:
                  "Your personal information and payment details are protected with military-grade encryption.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section - Modern Grid with Hover Effects */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h6 className="text-primary-600 font-semibold uppercase tracking-wider mb-2">
              Top Choices
            </h6>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most sought-after destinations for your next adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dubai", tag: "Modern Luxury" },
              { name: "Paris", tag: "Romantic Getaway" },
              { name: "New York", tag: "Urban Experience" },
              { name: "Tokyo", tag: "Cultural Immersion" },
            ].map((city, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl h-96 shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <img
                  src={`/images/destination-${index + 1}.jpg`}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-4 py-1 bg-primary-500 text-white text-xs uppercase tracking-wider rounded-full mb-3">
                    {city.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {city.name}
                  </h3>
                  <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Discover amazing experiences tailored just for you
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-white font-medium border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    Explore More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Modern Design */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute -top-24 right-0 w-96 h-96 bg-primary-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-200 rounded-full opacity-50"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about
                exclusive deals, new destinations, and travel tips.
              </p>
            </div>

            <form className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-500 transition-colors shadow-md md:whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>

            <div className="mt-8 text-center text-gray-500 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern Design */}
      <footer className="py-16 px-6 md:px-12 bg-gray-900 text-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-800/20 to-transparent rounded-tl-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">FLYAIR</h3>
              <p className="text-gray-400 mb-6">
                Redefining the way you experience air travel with premium
                service and unmatched convenience.
              </p>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg
                    className="h-6 w-6 text-gray-400 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-400">info@flyair.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="h-6 w-6 text-gray-400 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-400">+1 (234) 567-8900</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg
                    className="h-6 w-6 text-gray-400 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-400">
                    123 Skyway St, Cloud City
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FLYAIR. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 text-sm"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
