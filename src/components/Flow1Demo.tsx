import React, { useState } from 'react';
import { SocialProofWidget } from './SocialProofWidget';
import { PurchaseNotification } from './PurchaseNotification';

const sampleUsers = [
  {
    id: '1',
    name: 'Anay',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'AN'
  },
  {
    id: '2',
    name: 'Nishant',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'NS'
  },
  {
    id: '3',
    name: 'Priya',
    avatar: '',
    initials: 'PR'
  },
  {
    id: '4',
    name: 'Rahul',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'RH'
  }
];

const sampleCustomer = {
  id: '1',
  name: 'Katherine Moss',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  initials: 'KM'
};

const sampleReview = {
  rating: 5,
  text: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it."
};

const sampleProductImage = "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1";

export const Flow1Demo: React.FC = () => {
  const [activeWidgets, setActiveWidgets] = useState<{
    socialProof: boolean;
    purchaseNotification: boolean;
  }>({
    socialProof: false,
    purchaseNotification: false
  });

  const toggleWidget = (widgetType: keyof typeof activeWidgets) => {
    setActiveWidgets(prev => ({
      ...prev,
      [widgetType]: !prev[widgetType]
    }));
  };

  const closeWidget = (widgetType: keyof typeof activeWidgets) => {
    setActiveWidgets(prev => ({
      ...prev,
      [widgetType]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Flow 1: Basic Social Proof
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Simple social proof notifications and purchase confirmations
          </p>
        </div>

        {/* Demo Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Social Proof Widget
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows users who vouched for the product with stacked avatars
            </p>
            <button
              onClick={() => toggleWidget('socialProof')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.socialProof
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {activeWidgets.socialProof ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Purchase Notification
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Purchase notification that expands to show customer review
            </p>
            <button
              onClick={() => toggleWidget('purchaseNotification')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.purchaseNotification
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {activeWidgets.purchaseNotification ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flow 1 Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Social Proof Widget</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Stacked avatar display</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">User count with overflow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Hover animations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Click handlers</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Purchase Notification</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Customer information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Product details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Expandable reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Star ratings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Use Cases:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Show social validation when users land on product pages</li>
              <li>• Display recent purchase activity to create urgency</li>
              <li>• Expand to show detailed reviews and ratings</li>
              <li>• Build trust through authentic customer feedback</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Active Widgets */}
      {activeWidgets.socialProof && (
        <SocialProofWidget
          users={sampleUsers}
          additionalCount={2}
          productName="this product"
          onClose={() => closeWidget('socialProof')}
          onClick={() => console.log('Social proof clicked')}
        />
      )}

      {activeWidgets.purchaseNotification && (
        <PurchaseNotification
          customer={sampleCustomer}
          productName="Premium Plan"
          productImage={sampleProductImage}
          companyName="Good4Me"
          review={sampleReview}
          onClose={() => closeWidget('purchaseNotification')}
          onFeedbackClick={() => console.log('Feedback clicked')}
          className="bottom-6 right-6"
        />
      )}
    </div>
  );
};

export default Flow1Demo;