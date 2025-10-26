import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Contractor } from '../types';
import { contractorTypes } from '../constants/contractorTypes';
import { regions } from '../data/regions';
import ContractorCard from '../components/ContractorCard';
import { Loader, AlertCircle, ArrowLeft, Search } from 'lucide-react';

const ContractorSearchPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [searchParams] = useSearchParams();
  const serviceAreaId = searchParams.get('service_area');
  const contractorNameQuery = searchParams.get('name'); // NEW: Get name query

  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = contractorTypes.find(s => s.id === serviceId);
  const region = regions.find(r => r.id === serviceAreaId);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/contractors.json');
        if (!response.ok) {
          throw new Error('Failed to fetch contractor data.');
        }
        const data: Contractor[] = await response.json();
        setContractors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchContractors();
  }, []);

  useEffect(() => {
    if (contractors.length > 0 && service && region) {
      const serviceName = service.name.replace(/s$/, ''); // e.g., Electricians -> Electrician
      const regionName = region.name;

      let filtered = contractors.filter(c => 
        c.type.toLowerCase() === serviceName.toLowerCase() &&
        c.service_area.some(area => area.toLowerCase() === regionName.toLowerCase())
      );
      
      // Apply name filtering if query is present
      if (contractorNameQuery) {
        const nameSearchTerm = contractorNameQuery.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(nameSearchTerm)
        );
      }

      setFilteredContractors(filtered);
    }
  }, [contractors, service, region, contractorNameQuery]);

  const pageTitle = service && region ? `${service.name} in ${region.name}` : 'Contractor Search';
  
  const subtitle = loading 
    ? 'Searching for the best pros...' 
    : `Found ${filteredContractors.length} trusted professionals${contractorNameQuery ? ` matching "${contractorNameQuery}"` : ''}.`;


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>New Search</span>
          </Link>
          <h1 className="text-4xl font-bold text-black">{pageTitle}</h1>
          <p className="mt-2 text-lg text-gray-600">
            {subtitle}
          </p>
          
          {contractorNameQuery && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center space-x-2">
              <Search className="h-5 w-5 text-yellow-700" />
              <p className="text-sm text-yellow-800 font-medium">
                Filtering by name: <strong>{contractorNameQuery}</strong>
              </p>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader className="h-12 w-12 text-yellow-500 animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-800">Error</h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredContractors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredContractors.map(contractor => (
                  <ContractorCard key={contractor.id} contractor={contractor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-black">No Results Found</h2>
                <p className="mt-4 text-gray-600 max-w-md mx-auto">
                  We couldn't find any {service?.name.toLowerCase()} in {region?.name}{contractorNameQuery ? ` matching "${contractorNameQuery}"` : ''}. Try a different service or area.
                </p>
                <Link 
                  to="/"
                  className="mt-8 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Start a New Search
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContractorSearchPage;
