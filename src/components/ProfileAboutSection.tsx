import React from 'react';
import { Contractor } from '../types';

interface ProfileAboutSectionProps {
  contractor: Contractor;
}

const ProfileAboutSection: React.FC<ProfileAboutSectionProps> = ({ contractor }) => {
  // Placeholder description logic remains the same for now
  const description = `With years of dedicated service in the ${contractor.location} area, ${contractor.name} has established itself as a leader in the ${contractor.type.toLowerCase()} industry. We pride ourselves on quality craftsmanship, reliable service, and transparent pricing. Our team of certified professionals is equipped to handle projects of any scale, ensuring every job is completed to the highest standards.`;

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-black border-b border-gray-200 pb-2 mb-4">About {contractor.name}</h2>
      <p className="text-gray-700">
        {/* This is placeholder text. In a real app, this would come from the contractor's data. */}
        {description}
      </p>
    </div>
  );
};

export default ProfileAboutSection;
