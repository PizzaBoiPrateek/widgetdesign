import React, { useState, useEffect } from 'react';
import { SocialProofWidget } from './SocialProofWidget';

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

export const SocialProofDemo: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Simulate periodic notifications
    const interval = setInterval(() => {
      setNotificationCount(prev => prev + 1);
      setShowWidget(true);
    }, 8000);

    // Show first notification after 2 seconds
    const timeout = setTimeout(() => {
      setShowWidget(true);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleClose = () => {
    setShowWidget(false);
  };

  const handleClick = () => {
    console.log('Social proof widget clicked!');
    // Add your click handling logic here
  };

  const getRandomUsers = () => {
    const shuffled = [...sampleUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2 + Math.floor(Math.random() * 2));
  };

  const getRandomAdditionalCount = () => {
    return Math.floor(Math.random() * 8) + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Social Proof Widget Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Interactive notification widget with smooth animations and hover effects
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowWidget(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Show Widget
            </button>
            <button
              onClick={() => setShowWidget(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Hide Widget
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Smooth animations and transitions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Hover effects and scaling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Stacked avatar display</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Customizable user data</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Click and close handlers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Responsive design</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Production-ready code</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">TypeScript support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Widget */}
      {showWidget && (
        <SocialProofWidget
          users={getRandomUsers()}
          additionalCount={getRandomAdditionalCount()}
          productName="this amazing product"
          onClose={handleClose}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default SocialProofDemo;