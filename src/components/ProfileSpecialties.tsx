import React from 'react';
import { Contractor } from '../types';
import { CheckCircle } from 'lucide-react';

interface ProfileSpecialtiesProps {
  contractor: Contractor;
}

const ProfileSpecialties: React.FC<ProfileSpecialtiesProps> = ({ contractor }) => {
  // Filter out empty strings and check if there are any specialties left
  const specialties = contractor.sub_types.filter(s => s.trim() !== '');

  if (specialties.length === 0) {
    return null; // Easily removable/conditional if no data exists
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-2 mb-4">Our Specialties</h3>
      <ul className="space-y-2">
        {specialties.map((specialty, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
            <span className="text-gray-700">{specialty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSpecialties;
