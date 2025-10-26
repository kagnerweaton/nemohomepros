import React from 'react';
import { Contractor } from '../types';
import ContractorCard from './ContractorCard';

interface ContractorCarouselProps {
  contractors: Contractor[];
}

/**
 * Simple horizontal scrolling carousel for featured contractors.
 */
const ContractorCarousel: React.FC<ContractorCarouselProps> = ({ contractors }) => {
  if (contractors.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-100 rounded-xl text-gray-600">
        No featured contractors available right now.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex space-x-6 min-w-max">
        {contractors.map((contractor) => (
          <div key={contractor.id} className="w-80 flex-shrink-0">
            <ContractorCard contractor={contractor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractorCarousel;
