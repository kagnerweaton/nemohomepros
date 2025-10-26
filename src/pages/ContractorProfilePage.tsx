import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Contractor } from '../types';
import { Loader, AlertCircle, ArrowLeft } from 'lucide-react';

// Import new modular components
import ProfileHeader from '../components/ProfileHeader';
import ProfileAboutSection from '../components/ProfileAboutSection';
import ProfileSpecialties from '../components/ProfileSpecialties';
import ProfileContactBox from '../components/ProfileContactBox';
// Removed: import NemoCertifiedBadge from '../components/NemoCertifiedBadge'; 

const ContractorProfilePage: React.FC = () => {
  const { contractorId } = useParams<{ contractorId: string }>();
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        setLoading(true);
        const response = await fetch('/contractors.json');
        if (!response.ok) {
          throw new Error('Failed to fetch contractor data.');
        }
        const data: Contractor[] = await response.json();
        const foundContractor = data.find(c => c.id === contractorId);
        if (foundContractor) {
          setContractor(foundContractor);
        } else {
          setError('Contractor not found.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchContractor();
  }, [contractorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader className="h-16 w-16 text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (error || !contractor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-800">An Error Occurred</h1>
          <p className="text-red-700 mt-2">{error || 'Could not load contractor profile.'}</p>
          <Link 
            to="/"
            className="mt-6 inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section (Modularized) */}
      <ProfileHeader contractor={contractor} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2">
            {/* About Section (Modularized) */}
            <ProfileAboutSection contractor={contractor} />
            
            {/* Removed: NEMO Certified Badge conditional rendering */}

            {/* Specialties Section (Modularized and conditional) */}
            <ProfileSpecialties contractor={contractor} />
          </div>

          {/* Right Column (Contact & Info) (Modularized and conditional) */}
          <ProfileContactBox contractor={contractor} />
          
        </div>
      </div>
    </div>
  );
};

export default ContractorProfilePage;
