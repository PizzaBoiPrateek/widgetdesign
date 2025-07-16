import React, { useState } from 'react';
import { CashbackModal } from './CashbackModal';

interface Contact {
  id: string;
  name: string;
  phone: string;
  selected: boolean;
}

export const Flow4Demo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShareContacts = (contacts: Contact[]) => {
    console.log('Shared contacts:', contacts);
  };

  const handleSkip = () => {
    console.log('User skipped cashback offer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Flow 4: Post-Purchase Cashback
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Post-purchase popup offering cashback rewards for sharing contacts
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Show Post-Purchase Modal
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flow 4 Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Rating Step</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Interactive star rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Conditional cashback offer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Only shows for 4+ star ratings</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Contact Selection</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Scrollable contact list</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Progress bar indicator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Minimum contact requirement</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Success Confirmation</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Cashback confirmation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Timeline expectations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Clear next steps</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">User Experience</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Skip option available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Smooth step transitions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Mobile-responsive design</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Flow Sequence:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Post-purchase rating request appears</li>
              <li>2. If rating ≥ 4 stars, cashback offer is shown</li>
              <li>3. User selects required number of contacts</li>
              <li>4. Contacts are shared and cashback is confirmed</li>
              <li>5. Success message with timeline expectations</li>
            </ol>
          </div>
        </div>
      </div>

      <CashbackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onShareContacts={handleShareContacts}
        onSkip={handleSkip}
        productName="Premium Plan"
        cashbackAmount="₹200"
        requiredContacts={10}
      />
    </div>
  );
};

export default Flow4Demo;