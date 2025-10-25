import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Award, ShieldCheck, Briefcase } from 'lucide-react';
import { contractorTypes } from '../constants/contractorTypes';
import { regions } from '../data/regions';

const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<{ id: string; name: string; icon: React.ElementType } | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const areaDropdownRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();

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

  const handleFindPros = () => {
    if (selectedService && selectedArea) {
      const region = regions.find(r => r.name === selectedArea);
      if (region) {
        navigate(`/contractors/${selectedService.id}?service_area=${region.id}`);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target as Node)) {
        setIsAreaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
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
                {/* Service Dropdown */}
                <div className="relative w-full" ref={serviceDropdownRef}>
                  <button
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
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
                  {isServiceDropdownOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                      {sortedContractorTypes.map((type) => (
                        <button key={type.id} onClick={() => handleServiceSelect(type)} className="w-full px-4 py-3 text-left text-gray-800 hover:bg-yellow-50 transition-colors flex items-center space-x-3">
                          <type.icon className="h-5 w-5 text-yellow-500" />
                          <span>{type.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <span className="shrink-0">services in</span>
                {/* Area Dropdown */}
                <div className="relative w-full" ref={areaDropdownRef}>
                  <button
                    onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                    className="w-full min-w-[240px] bg-yellow-500 text-black rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    {selectedArea ? (
                      <span className="font-semibold">{selectedArea}</span>
                    ) : (
                      <span className="text-black/70">select an area...</span>
                    )}
                    <ChevronDown className={`h-5 w-5 text-black/80 transition-transform ${isAreaDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isAreaDropdownOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                      {sortedRegions.map((region) => (
                        <button key={region.id} onClick={() => handleAreaSelect(region.name)} className="w-full px-4 py-3 text-left text-gray-800 hover:bg-yellow-50 transition-colors">
                          <span>{region.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                 <span className="shrink-0">.</span>
              </div>
            </div>
            
            <button
              onClick={handleFindPros}
              disabled={!selectedService || !selectedArea}
              className="mt-8 w-full flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 border border-yellow-500 text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 disabled:border-gray-500"
            >
              <Search className="h-6 w-6" />
              <span>Find Pros</span>
            </button>
          </div>
        </div>
      </section>

      {/* NEMO Certified Section */}
      <section className="py-16 sm:py-24 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              What it means to be NEMO Certified
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Our certification is a promise of quality, reliability, and professionalism. We only partner with the best.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <div className="bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">Verified & Vetted</h3>
              <p className="mt-2 text-gray-600">
                Every certified pro is fully licensed in Missouri and carries comprehensive insurance for your protection.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <div className="bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">Proven Experience</h3>
              <p className="mt-2 text-gray-600">
                We require a track record of success, including the completion of over 100 projects in their field.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <div className="bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">Transparent Portfolio</h3>
              <p className="mt-2 text-gray-600">
                Certified contractors showcase a portfolio of their work, so you can see their quality craftsmanship firsthand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
