import React, { useState } from 'react';
import { FriendsVouchedWidget } from './FriendsVouchedWidget';

const sampleFriends = [
  {
    id: '1',
    name: 'Sarah',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'SR'
  },
  {
    id: '2',
    name: 'Mike',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'MK'
  },
  {
    id: '3',
    name: 'Emma',
    avatar: '',
    initials: 'EM'
  }
];

export const Flow2Demo: React.FC = () => {
  const [activeWidgets, setActiveWidgets] = useState<{
    friendsVouched: boolean;
    friendsVouchedEmpty: boolean;
  }>({
    friendsVouched: false,
    friendsVouchedEmpty: false
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
            Flow 2: Friends-Based Social Proof
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Widgets that show friend connections and vouching behavior
          </p>
        </div>

        {/* Demo Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Friends Vouched Widget
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows friends who vouched, expands to show friend details
            </p>
            <button
              onClick={() => toggleWidget('friendsVouched')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.friendsVouched
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {activeWidgets.friendsVouched ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              No Friends Found
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows "no friends found" state with CTA to explore
            </p>
            <button
              onClick={() => toggleWidget('friendsVouchedEmpty')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.friendsVouchedEmpty
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {activeWidgets.friendsVouchedEmpty ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flow 2 Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">With Friends</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Friend avatar display</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Expandable friend details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Friend count display</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Click to expand</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">No Friends State</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Empty state handling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Encouraging messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Risk-free exploration CTA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">First-mover advantage</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Use Cases:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Show when user's friends have already purchased</li>
              <li>• Encourage first-time users when no friends found</li>
              <li>• Create FOMO through friend activity</li>
              <li>• Build trust through personal connections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Active Widgets */}
      {activeWidgets.friendsVouched && (
        <FriendsVouchedWidget
          friends={sampleFriends}
          productName="this product"
          onClose={() => closeWidget('friendsVouched')}
          onClick={() => console.log('Friends vouched clicked')}
          className="top-20 left-6"
        />
      )}

      {activeWidgets.friendsVouchedEmpty && (
        <FriendsVouchedWidget
          friends={[]}
          productName="this product"
          onClose={() => closeWidget('friendsVouchedEmpty')}
          onClick={() => console.log('No friends clicked')}
          className="top-20 right-6"
        />
      )}
    </div>
  );
};

export default Flow2Demo;