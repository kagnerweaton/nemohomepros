import React from 'react';
import { Contractor } from '../types';
import { Phone, Mail, Globe } from 'lucide-react';

interface ProfileContactBoxProps {
  contractor: Contractor;
}

// Sub-component for Contact Links (Conditional based on data)
const ContactLinks: React.FC<{ contractor: Contractor }> = ({ contractor }) => {
  const hasContact = contractor.phone || contractor.email || contractor.website;
  
  if (!hasContact) return null;

  return (
    <>
      <h3 className="text-lg font-semibold text-black border-t border-yellow-300 pt-4 mb-4">Contact Information</h3>
      <div className="space-y-4">
        {contractor.phone && (
          <a href={`tel:${contractor.phone}`} className="flex items-center text-gray-800 hover:text-yellow-600 transition-colors group">
            <Phone className="h-5 w-5 mr-3 text-gray-500 group-hover:text-yellow-500" />
            <span className="font-medium">{contractor.phone}</span>
          </a>
        )}
        {contractor.email && (
          <a href={`mailto:${contractor.email}`} className="flex items-center text-gray-800 hover:text-yellow-600 transition-colors group">
            <Mail className="h-5 w-5 mr-3 text-gray-500 group-hover:text-yellow-500" />
            <span className="font-medium">{contractor.email}</span>
          </a>
        )}
        {contractor.website && (
          <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-800 hover:text-yellow-600 transition-colors group">
            <Globe className="h-5 w-5 mr-3 text-gray-500 group-hover:text-yellow-500" />
            <span className="font-medium">Visit Website</span>
          </a>
        )}
      </div>
    </>
  );
};

// Sub-component for Service Areas (Conditional based on data)
const ServiceAreas: React.FC<{ contractor: Contractor }> = ({ contractor }) => {
  if (!contractor.service_area || contractor.service_area.length === 0) return null;

  return (
    <>
      <h3 className="text-lg font-semibold text-black border-t border-yellow-300 pt-4 mt-6 mb-4">Service Areas</h3>
      <div className="flex flex-wrap gap-2">
        {contractor.service_area.map((area, index) => (
          <span key={index} className="bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full border border-yellow-300">
            {area}
          </span>
        ))}
      </div>
    </>
  );
};


const ProfileContactBox: React.FC<ProfileContactBoxProps> = ({ contractor }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 sticky top-8">
        
        {/* Contact Information Section (Hides if no phone, email, or website) */}
        <ContactLinks contractor={contractor} />

        {/* Service Areas Section (Hides if no service areas are listed) */}
        <ServiceAreas contractor={contractor} />
        
      </div>
    </div>
  );
};

export default ProfileContactBox;
