import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, ShieldCheck, Briefcase, X, Zap, Lightbulb, Handshake } from 'lucide-react';
import { contractorTypes } from '../constants/contractorTypes';
import { regions } from '../data/regions';
import ContractorCarousel from '../components/ContractorCarousel';
import { Contractor } from '../types';

// Mock data for featured contractors (de-branded)
const MOCK_FEATURED_CONTRACTORS: Contractor[] = [
  {
    id: 'feat-1',
    name: 'Precision Plumbing Solutions',
    type: 'Plumber',
    location: 'Kirksville, MO',
    sub_types: ['Emergency Repair', 'Water Heater', 'Drain Cleaning'],
    image_url: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
  },
  {
    id: 'feat-2',
    name: 'A-1 Roofing & Siding',
    type: 'Roofer',
    location: 'Macon, MO',
    sub_types: ['Shingle Replacement', 'Gutter Installation', 'Commercial'],
    image_url: 'https://images.pexels.com/photos/162553/architecture-construction-work-building-162553.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
  },
  {
    id: 'feat-3',
    name: 'Northeast Electric Co.',
    type: 'Electrician',
    location: 'Hannibal, MO',
    sub_types: ['Panel Upgrades', 'Wiring', 'Lighting'],
    image_url: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
  },
];

const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<{ id: string; name: string; icon: React.ElementType } | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [contractorNameQuery, setContractorNameQuery] = useState('');
  
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  const navigate = useNavigate();
  
  const featuredContractors: Contractor[] = MOCK_FEATURED_CONTRACTORS as Contractor[];

  // Sort data to ensure alphabetical order as per requirements
  const sortedContractorTypes = useMemo(() => 
    [...contractorTypes].sort((a, b) => a.name.localeCompare(b.name)), 
  []);

  const sortedRegions = useMemo(() => 
    [...regions].sort((a, b) => a.name.localeCompare(b.name)), 
  []);

  const handleServiceSelect = (service: { id: string; name: string; icon: React.ElementType }) => {
    setSelectedService(service);
    setIsServiceDropdownOpen(false);
  };

  const handleAreaSelect = (areaName: string) => {
    setSelectedArea(areaName);
    setIsAreaDropdownOpen(false);
  };

  const handleFindPros = (
    service: typeof selectedService, 
    area: typeof selectedArea, 
    nameQuery: string = contractorNameQuery
  ) => {
    if (service && area) {
      const region = regions.find(r => r.name === area);
      if (region) {
        let path = `/contractors/${service.id}?service_area=${region.id}`;
        if (nameQuery.trim()) {
          path += `&name=${encodeURIComponent(nameQuery.trim())}`;
        }
        navigate(path);
      }
    }
  };

  const handleTopFindPros = () => {
    handleFindPros(selectedService, selectedArea, contractorNameQuery);
  };

  const handleBottomFindPros = () => {
    // Bottom search box excludes name search
    handleFindPros(selectedService, selectedArea, ''); 
  };

  useEffect(() => {
    const isModalOpen = isServiceDropdownOpen || isAreaDropdownOpen;
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isServiceDropdownOpen, isAreaDropdownOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg leading-tight">
            Find the right pro for the job.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            NEMO's most trusted contractors are just a few clicks away.
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl max-w-3xl mx-auto border border-white/20">
            <div className="flex flex-col items-center justify-center gap-y-6 gap-x-4 text-xl md:text-2xl font-medium text-white">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <span className="shrink-0">I need</span>
                {/* Service Dropdown Trigger */}
                <div className="relative w-full">
                  <button
                    onClick={() => setIsServiceDropdownOpen(true)}
                    className="w-full min-w-[240px] bg-yellow-500 text-black rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    {selectedService ? (
                      <div className="flex items-center space-x-2 font-semibold">
                        <selectedService.icon className="h-5 w-5" />
                        <span>{selectedService.name}</span>
                      </div>
                    ) : (
                      <span className="text-black/70">select a service...</span>
                    )}
                    <ChevronDown className={`h-5 w-5 text-black/80 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <span className="shrink-0">near</span>
                {/* Area Dropdown Trigger */}
                <div className="relative w-full">
                  <button
                    onClick={() => setIsAreaDropdownOpen(true)}
                    className="w-full min-w-[240px] bg-yellow-500 text-black rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    {selectedArea ? (
                      <span className="font-semibold">{selectedArea}</span>
                    ) : (
                      <span className="text-black/70">select an area...</span>
                    )}
                    <ChevronDown className={`h-5 w-5 text-black/80 transition-transform ${isAreaDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Contractor Name Search Input */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <span className="shrink-0">or find</span>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Contractor Name (Optional)"
                    value={contractorNameQuery}
                    onChange={(e) => setContractorNameQuery(e.target.value)}
                    className="w-full min-w-[240px] bg-white text-black rounded-lg px-4 py-3 text-left flex items-center justify-between transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-lg"
                  />
                  <Search className="h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            <button
              onClick={handleTopFindPros}
              disabled={!selectedService || !selectedArea}
              className="mt-8 w-full flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 border border-yellow-500 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 disabled:border-gray-500"
            >
              <Search className="h-6 w-6" />
              <span>Find Pros</span>
            </button>
          </div>
        </div>
      </section>

      {/* Removed: NEMO Certified Section */}

      {/* Featured Contractors Section (De-branded) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Featured Local Professionals
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              See the quality work of our top-rated, most trusted contractors this month.
            </p>
          </div>
          <ContractorCarousel contractors={featuredContractors} />
        </div>
      </section>

      {/* Brief Value Proposition Section (De-branded) */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
            Why NEMO Home Pros? We Cut the Noise.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-800 rounded-xl shadow-xl border border-yellow-500/50">
              <Zap className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Fluff, Just Pros</h3>
              <p className="text-gray-300">
                We only list contractors who are licensed, insured, and proven. Skip the endless Google search.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl shadow-xl border border-yellow-500/50">
              <Lightbulb className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-300">
                Every pro knows the unique challenges and needs of Northeast Missouri homes.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-xl shadow-xl border border-yellow-500/50">
              <Handshake className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trust Built In</h3>
              <p className="text-gray-300">
                We verify credentials and experience to ensure you hire with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Search Box */}
      <section className="py-16 sm:py-24 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-8">
            Ready to start your project?
          </h2>
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200">
            <div className="flex flex-col items-center justify-center gap-y-6 gap-x-4 text-xl md:text-2xl font-medium text-black">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <span className="shrink-0">I need</span>
                {/* Service Dropdown Trigger (Reusing state/handlers) */}
                <div className="relative w-full">
                  <button
                    onClick={() => setIsServiceDropdownOpen(true)}
                    className="w-full min-w-[240px] bg-gray-100 text-black rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {selectedService ? (
                      <div className="flex items-center space-x-2 font-semibold">
                        <selectedService.icon className="h-5 w-5" />
                        <span>{selectedService.name}</span>
                      </div>
                    ) : (
                      <span className="text-black/70">select a service...</span>
                    )}
                    <ChevronDown className={`h-5 w-5 text-black/80 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <span className="shrink-0">near</span>
                {/* Area Dropdown Trigger (Reusing state/handlers) */}
                <div className="relative w-full">
                  <button
                    onClick={() => setIsAreaDropdownOpen(true)}
                    className="w-full min-w-[240px] bg-gray-100 text-black rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {selectedArea ? (
                      <span className="font-semibold">{selectedArea}</span>
                    ) : (
                      <span className="text-black/70">select an area...</span>
                    )}
                    <ChevronDown className={`h-5 w-5 text-black/80 transition-transform ${isAreaDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleBottomFindPros}
              disabled={!selectedService || !selectedArea}
              className="mt-8 w-full flex items-center justify-center space-x-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100 disabled:text-gray-600"
            >
              <Search className="h-6 w-6" />
              <span>Search Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Service Selection Modal */}
      {isServiceDropdownOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsServiceDropdownOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Select a Service</h2>
              <button onClick={() => setIsServiceDropdownOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sortedContractorTypes.map((type) => (
                  <button 
                    key={type.id} 
                    onClick={() => handleServiceSelect(type)} 
                    className="w-full p-4 text-left text-gray-800 hover:bg-yellow-50 transition-all duration-200 flex items-center space-x-4 rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transform hover:-translate-y-1"
                  >
                    <type.icon className="h-8 w-8 text-yellow-500 shrink-0" />
                    <span className="font-semibold text-lg">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Area Selection Modal */}
      {isAreaDropdownOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsAreaDropdownOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Select an Area</h2>
              <button onClick={() => setIsAreaDropdownOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sortedRegions.map((region) => (
                  <button 
                    key={region.id} 
                    onClick={() => handleAreaSelect(region.name)} 
                    className="w-full p-4 text-left text-gray-800 hover:bg-yellow-50 transition-all duration-200 rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transform hover:-translate-y-1"
                  >
                    <span className="font-semibold text-lg">{region.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
