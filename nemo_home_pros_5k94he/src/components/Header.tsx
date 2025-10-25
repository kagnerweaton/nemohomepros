import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X, Rss } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Home className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold">NEMO Home Pros</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/blog" className="hover:text-yellow-400 transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link>
            <Link 
              to="/list-business"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              List your business
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black bg-opacity-95 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="flex flex-col items-center space-y-6 py-8">
          <Link to="/blog" onClick={closeMenu} className="text-lg hover:text-yellow-400 transition-colors">Blog</Link>
          <Link to="/about" onClick={closeMenu} className="text-lg hover:text-yellow-400 transition-colors">About</Link>
          <Link to="/contact" onClick={closeMenu} className="text-lg hover:text-yellow-400 transition-colors">Contact Us</Link>
          <Link
            to="/list-business"
            onClick={closeMenu}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mt-4"
          >
            List your business
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
