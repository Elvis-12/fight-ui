import { Button } from "@/components/ui/Button";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-60 h-60 rounded-full bg-pink-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main content card */}
      <div className="relative max-w-md w-full p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 z-10">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-2 font-display">
          Flight <span className="text-blue-600">Booking</span> System
        </h1>

        <div className="w-16 h-1 bg-blue-500 mb-6 rounded-full"></div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Welcome to our flight booking platform. Discover the world with just a
          few clicks! Get the best deals on flights to your favorite
          destinations.
        </p>

        <div className="flex flex-wrap -mx-2 mb-6">
          <div className="px-2 w-1/3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-xs text-blue-600 font-semibold">FLIGHTS</p>
              <p className="text-2xl font-bold text-gray-800">500+</p>
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <p className="text-xs text-purple-600 font-semibold">CITIES</p>
              <p className="text-2xl font-bold text-gray-800">100+</p>
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className="bg-indigo-50 p-3 rounded-lg text-center">
              <p className="text-xs text-indigo-600 font-semibold">DISCOUNT</p>
              <p className="text-2xl font-bold text-gray-800">30%</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12H2M16 6l6 6-6 6"></path>
            </svg>
            Book a Flight
          </Button>

          <button className="px-4 py-3 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
