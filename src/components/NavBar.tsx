import { useState } from "react";
import { Menu } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl flex items-center justify-between p-3 border border-[#175050] rounded-full bg-[#051b1b] text-white shadow-lg transition-all duration-300 ease-in-out z-100">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#175050] rounded-full flex items-center justify-center">
          <span className="text-lg font-bold">T</span>
        </div>
        <span className="text-lg font-semibold">ticz</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-300">
        <a href="#" className="hover:text-white transition duration-300">Events</a>
        <a href="#" className="hover:text-white transition duration-300">My Tickets</a>
        <a href="#" className="hover:text-white transition duration-300">About</a>
      </div>

      {/* Button */}
      <button className="hidden md:block bg-white text-black font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
        MY TICKETS →
      </button>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={26} />
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-44 bg-[#051b1b] rounded-lg shadow-lg p-4 flex flex-col space-y-3 md:hidden">
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">Events</a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">My Tickets</a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">About</a>
          <button className="mt-2 bg-white text-black font-semibold px-3 py-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
            MY TICKETS →
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
