import React from 'react';
import { Link } from 'react-router-dom';
import { Contractor } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface ContractorCardProps {
  contractor: Contractor;
}

const ContractorCard: React.FC<ContractorCardProps> = ({ contractor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          className="h-48 w-full object-cover" 
          src={contractor.image_url} 
          alt={`${contractor.name} work example`} 
        />
        {/* Removed NEMO Certified Badge */}
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">{contractor.type}</p>
        <h3 className="text-xl font-bold text-black mt-1 truncate">{contractor.name}</h3>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-4 w-4 mr-2 shrink-0" />
          <span className="text-sm">{contractor.location}</span>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {contractor.sub_types.slice(0, 3).map((subType, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {subType}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Link 
            to={`/contractor/${contractor.id}`}
            className="w-full inline-flex items-center justify-center space-x-2 bg-gray-800 hover:bg-black text-white font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200"
          >
            <span>View Profile</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContractorCard;
