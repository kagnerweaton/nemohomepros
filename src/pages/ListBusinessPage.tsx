import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building, CheckCircle, Star, Upload, MapPin, Phone, AlertCircle, X } from 'lucide-react';
import { contractorTypes } from '../constants/contractorTypes';
import { supabase } from '../lib/supabase';

const serviceAreas = ['Kirksville', 'Moberly', 'Hannibal'];

const ListBusinessPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    services: [] as string[],
    phone: '',
    email: '',
    website: '',
    serviceAreas: [] as string[],
    description: '',
    specialties: [''],
    yearsExperience: '',
    completedProjects: '',
    licensed: false,
    insured: false,
    specializedTraining: [''],
    images: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'services' | 'serviceAreas') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentValues = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      }
    });
  };

  const handleArrayInputChange = (index: number, value: string, field: 'specialties' | 'specializedTraining') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field: 'specialties' | 'specializedTraining') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (index: number, field: 'specialties' | 'specializedTraining') => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...Array.from(files)] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(file => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `contractor-images/${fileName}`;
      return supabase.storage.from('contractor-images').upload(filePath, file);
    });

    const uploadResults = await Promise.all(uploadPromises);

    const urls: string[] = [];
    for (const result of uploadResults) {
      if (result.error) {
        console.error('Error uploading image:', result.error);
        throw new Error(`Failed to upload an image: ${result.error.message}`);
      }
      if (result.data) {
        const { data } = supabase.storage.from('contractor-images').getPublicUrl(result.data.path);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.services.length === 0) {
      setError('Please select at least one service you offer.');
      return;
    }
    if (formData.serviceAreas.length === 0) {
      setError('Please select at least one service area.');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrls: string[] = [];
      if (formData.images.length > 0) {
        imageUrls = await uploadImages(formData.images);
      }

      const filteredSpecialties = formData.specialties.filter(s => s.trim() !== '');
      const filteredTraining = formData.specializedTraining.filter(t => t.trim() !== '');

      const applicationData = {
        name: formData.name,
        contact_name: formData.contactName,
        services: formData.services,
        phone: formData.phone,
        email: formData.email,
        website: formData.website || null,
        service_areas: formData.serviceAreas,
        description: formData.description,
        specialties: filteredSpecialties,
        years_experience: parseInt(formData.yearsExperience),
        completed_projects: parseInt(formData.completedProjects),
        licensed: formData.licensed,
        insured: formData.insured,
        specialized_training: filteredTraining,
        image_urls: imageUrls.length > 0 ? imageUrls : null,
        status: 'pending' as const,
        nemo_certified: false
      };

      const { error: insertError } = await supabase
        .from('contractor_applications')
        .insert([applicationData]);

      if (insertError) {
        throw insertError;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">Application Submitted Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for your interest in joining NEMO Trades. We've received your application and will review it within 3-5 business days. 
              You'll receive an email confirmation shortly with next steps.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="font-semibold text-black mb-2">What happens next?</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• We'll verify your licensing and insurance information</li>
                <li>• Our team will review your qualifications for NEMO Certification</li>
                <li>• You'll receive login credentials to manage your listing</li>
                <li>• Your profile will go live within 5-7 business days</li>
              </ul>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Building className="h-12 w-12 text-yellow-500" />
              <h1 className="text-4xl font-bold text-black">List Your Business</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Northeast Missouri's premier directory of trusted professionals. 
              Reach more customers and grow your business as a NEMO Home Pro.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black text-center mb-8">Why List with NEMO Trades?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <MapPin className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Local Focus</h3>
              <p className="text-gray-600 text-sm">Connect with customers specifically in Northeast Missouri</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">NEMO Certification</h3>
              <p className="text-gray-600 text-sm">Qualify for our premium certification program</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <Phone className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Direct Leads</h3>
              <p className="text-gray-600 text-sm">Customers contact you directly for quotes and projects</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Business Information</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="e.g., John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services You Offer *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {contractorTypes.map(type => (
                    <label key={type.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={type.id}
                        checked={formData.services.includes(type.id)}
                        onChange={(e) => handleCheckboxChange(e, 'services')}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-400"
                      />
                      <span className="text-gray-700">{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="(660) 555-0123"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="info@yourbusiness.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://www.yourbusiness.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas You Service *
                  </label>
                  <div className="flex flex-col space-y-2">
                    {serviceAreas.map(area => (
                      <label key={area} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="serviceAreas"
                          value={area}
                          checked={formData.serviceAreas.includes(area)}
                          onChange={(e) => handleCheckboxChange(e, 'serviceAreas')}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-400"
                        />
                        <span className="text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Describe your business, services, and what makes you unique..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties *
                </label>
                {formData.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'specialties')}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., Kitchen Remodeling, Bathroom Renovation"
                      required={index === 0}
                    />
                    {formData.specialties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, 'specialties')}
                        className="text-red-600 hover:text-red-700 px-2 py-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('specialties')}
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  + Add Another Specialty
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    id="yearsExperience"
                    name="yearsExperience"
                    required
                    min="1"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label htmlFor="completedProjects" className="block text-sm font-medium text-gray-700 mb-2">
                    Completed Projects (Estimate) *
                  </label>
                  <input
                    type="number"
                    id="completedProjects"
                    name="completedProjects"
                    required
                    min="1"
                    value={formData.completedProjects}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="150"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Certifications & Credentials</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="licensed"
                      checked={formData.licensed}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="text-gray-700">Licensed in Missouri</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="insured"
                      checked={formData.insured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="text-gray-700">Fully Insured (General Liability & Workers' Comp)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialized Training & Certifications (Optional)
                </label>
                {formData.specializedTraining.map((training, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={training}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'specializedTraining')}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., OSHA 30-Hour, EPA Lead-Safe Certified"
                    />
                    {formData.specializedTraining.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, 'specializedTraining')}
                        className="text-red-600 hover:text-red-700 px-2 py-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('specializedTraining')}
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  + Add Another Certification
                </button>
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                  Photos of your work (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Upload photos of your work to create a portfolio</p>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Choose Files
                  </label>
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group bg-gray-50 p-2 rounded-lg">
                          <p className="text-sm text-green-600 truncate">✓ {file.name}</p>
                          <button 
                            type="button" 
                            onClick={() => removeImage(index)} 
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-semibold text-black">NEMO Certification Eligibility</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  NEMO Certified pros are those who are licensed and insured, have completed over 100 projects, and have a portfolio of their work on NEMO Home Pros for potential clients to view. We will verify your information upon submission.
                </p>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
                <p className="text-gray-500 text-sm mt-3">
                  By submitting, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListBusinessPage;
