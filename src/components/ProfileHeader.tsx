import React from 'react';
import { Contractor } from '../types';
import { MapPin } from 'lucide-react';

interface ProfileHeaderProps {
  contractor: Contractor;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ contractor }) => {
  return (
    <div className="relative h-64 md:h-80 bg-gray-800">
      <img 
        src={contractor.image_url} 
        alt={`${contractor.name} hero`} 
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <p className="text-yellow-400 font-semibold">{contractor.type}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">{contractor.name}</h1>
        <div className="flex items-center text-gray-200 mt-3">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{contractor.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
