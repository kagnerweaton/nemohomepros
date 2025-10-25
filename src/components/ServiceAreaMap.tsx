import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { regions, Region } from '../data/regions';

interface ServiceAreaMapProps {
  selectedAreas: string[];
  onSelectionChange: (areas: string[]) => void;
}

const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ selectedAreas, onSelectionChange }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleRegionClick = (regionName: string) => {
    const newSelection = selectedAreas.includes(regionName)
      ? selectedAreas.filter(a => a !== regionName)
      : [...selectedAreas, regionName];
    onSelectionChange(newSelection);
  };

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-center p-4 rounded-2xl border border-gray-300">
        <div className="text-gray-600">
          <h3 className="font-bold text-lg mb-2">Map Configuration Needed</h3>
          <p>The Google Maps API Key is missing.</p>
          <p className="mt-2 text-sm">
            Please add your key to the <code>VITE_GOOGLE_MAPS_API_KEY</code> variable in the <code>.env</code> file.
          </p>
        </div>
      </div>
    );
  }

  const mapCenter = '39.8519384,-92.3834544';
  const mapZoom = 8;
  const mapSize = '640x480'; // Standard size for good resolution
  const mapStyles = [
    'style=feature:administrative|visibility:off',
    'style=feature:poi|visibility:off',
    'style=feature:road.highway|element:labels|visibility:off',
    'style=feature:transit|visibility:off',
    'style=element:labels.icon|visibility:off',
    'style=feature:landscape|color:0xf7f7f7',
    'style=feature:road|color:0xdcdcdc',
    'style=feature:water|color:0xa2d3f0',
    'style=feature:administrative.locality|element:labels.text.fill|color:0x888888',
    'style=feature:administrative.locality|element:labels.text.stroke|visibility:off',
  ].join('&');

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter}&zoom=${mapZoom}&size=${mapSize}&maptype=roadmap&${mapStyles}&key=${apiKey}`;

  return (
    <div className="w-full mx-auto">
      <div className="relative shadow-inner border border-gray-200 rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={mapUrl}
          alt="Map of Northeast Missouri service areas"
          className="w-full h-auto object-cover"
        />

        {regions.map((region: Region) => {
          const isSelected = selectedAreas.includes(region.name);
          const isHovered = hoveredRegion === region.id;

          return (
            <div
              key={region.id}
              onClick={() => handleRegionClick(region.name)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className="absolute flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ease-in-out group"
              style={{
                top: region.coords.top,
                left: region.coords.left,
                width: '30%', // Increased size for better touch targets
                height: '0',
                paddingBottom: '30%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out animate-pulse-slow group-hover:scale-105"
                style={{
                  backgroundColor: isHovered ? region.hoverColor : region.color,
                  borderColor: region.borderColor,
                  borderWidth: isSelected ? '4px' : '2px',
                  animationPlayState: isHovered ? 'paused' : 'running',
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>

              <div className="relative z-10 text-center text-black pointer-events-none">
                <span className="font-bold text-xs sm:text-sm md:text-base bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                  {region.name}
                </span>
              </div>

              {isSelected && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-20 bg-white rounded-full p-0.5 shadow-lg">
                  <CheckCircle
                    className="text-green-500 w-5 h-5 sm:w-6 sm:h-6"
                    strokeWidth={3}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceAreaMap;
