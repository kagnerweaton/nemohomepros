import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Contractor } from '../types/contractor';
import ContractorCard from './ContractorCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ContractorCarouselProps {
  contractors: Contractor[];
}

const ContractorCarousel: React.FC<ContractorCarouselProps> = ({ contractors }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!contractors || contractors.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {contractors.map((contractor) => (
            <div key={contractor.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-4">
              <ContractorCard contractor={contractor} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 pointer-events-none">
         <button
          onClick={scrollPrev}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md pointer-events-auto -ml-8"
          aria-label="Previous contractor"
        >
          <ArrowLeft className="h-6 w-6 text-black" />
        </button>
        <button
          onClick={scrollNext}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md pointer-events-auto -mr-8"
          aria-label="Next contractor"
        >
          <ArrowRight className="h-6 w-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default ContractorCarousel;
