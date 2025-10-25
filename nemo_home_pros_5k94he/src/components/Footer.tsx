import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { contractorTypes } from '../constants/contractorTypes';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-yellow-400" />
              <div>
                <h4 className="text-xl font-bold">NEMO Home Pros</h4>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting Northeast Missouri homeowners with trusted professionals for all their home improvement needs.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              {contractorTypes.map((type) => (
                <li key={type.id}>
                  <Link to={`/search/${type.id}`} className="hover:text-yellow-400 transition-colors">
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">About Us</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors">Who we are</Link></li>
              <li><Link to="/list-business" className="hover:text-yellow-400 transition-colors">List your business</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 NEMO Home Pros. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
