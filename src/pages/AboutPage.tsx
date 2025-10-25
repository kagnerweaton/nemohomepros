import React from 'react';
import { Users, HardHat, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Connecting You with Northeast Missouri's Best-Kept Secret
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            The most skilled contractors are often the busiest. We bring them to you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-black mb-6">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              In Northeast Missouri, there are hundreds of quality contractors who are masters of their craft. They're busy laying foundations, wiring homes, and ensuring pipes don't burst. They're dedicated to doing exceptional work for their clients, which often leaves little time for building a web presence, marketing, or search engine optimization.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              That's where NEMO Home Pros comes in. We saw a gap between these incredible, hard-working professionals and the homeowners who need them. Our platform was born from a simple idea: create a single, reliable place where residents of Northeast Missouri can find trusted, local contractors without endless searching. We handle the digital side, so they can keep doing what they do best—building, fixing, and creating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HardHat className="h-10 w-10 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-3">Focus on Craft</h4>
              <p className="text-gray-600">We feature contractors who prioritize quality workmanship over online marketing.</p>
            </div>
            <div className="p-6">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-3">Community Connection</h4>
              <p className="text-gray-600">Our goal is to strengthen the local economy by connecting neighbors with skilled local professionals.</p>
            </div>
            <div className="p-6">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-10 w-10 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-3">Bridging the Gap</h4>
              <p className="text-gray-600">We provide the online visibility, so you can easily find the right pro for your project.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
