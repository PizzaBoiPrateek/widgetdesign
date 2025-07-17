import React, { useState } from 'react';
import { X, Users, Gift, Share2, Sparkles } from 'lucide-react';

// Widget 1: Social Proof Notification (When user has friends who bought)
interface SocialProofNotificationProps {
  userName: string;
  friendName: string;
  productName: string;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

export const SocialProofNotification: React.FC<SocialProofNotificationProps> = ({
  userName,
  friendName,
  productName,
  onClose,
  onClick,
  className = "bottom-6 left-6"
}) => {
  return (
    <div className={`fixed z-50 ${className}`}>
      <div
        className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-4 pr-12 max-w-sm transform transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:shadow-xl animate-slide-in"
        onClick={onClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={16} />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
            {friendName.charAt(0)}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-green-600">Welcome {userName}!</span>
              <br />
              <span className="text-gray-700">{friendName} bought {productName} from here</span>
            </p>
          </div>
        </div>

        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

// Widget 2: First Time User Encouragement (When user has no friends who bought)
interface FirstTimeUserWidgetProps {
  userName: string;
  brandName: string;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

export const FirstTimeUserWidget: React.FC<FirstTimeUserWidgetProps> = ({
  userName,
  brandName,
  onClose,
  onClick,
  className = "bottom-6 left-6"
}) => {
  return (
    <div className={`fixed z-50 ${className}`}>
      <div
        className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-4 pr-12 max-w-sm transform transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:shadow-xl animate-slide-in"
        onClick={onClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={16} />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-blue-600">Welcome {userName}!</span>
              <br />
              <span className="text-gray-700">Be the first to try the new {brandName}</span>
            </p>
          </div>
        </div>

        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

// Widget 3: Friend Discovery Modal with Discount
interface FriendDiscoveryModalProps {
  isOpen: boolean;
  userName: string;
  discount: string;
  friends: Array<{ id: string; name: string; avatar?: string; initials: string }>;
  onClose: () => void;
  onGetPhoneNumber: () => void;
  className?: string;
}

export const FriendDiscoveryModal: React.FC<FriendDiscoveryModalProps> = ({
  isOpen,
  userName,
  discount,
  friends,
  onClose,
  onGetPhoneNumber,
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4
          transform transition-all duration-300 ease-out scale-100 opacity-100
          ${className}
        `}
        style={{
          backgroundImage: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200 z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 pt-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Hey {userName}! Check which friends bought from here
            </h2>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Get <span className="font-semibold text-orange-600">{discount} off</span> when you discover your friends!
            </p>
          </div>

          {friends.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {friends.slice(0, 9).map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                      {friend.avatar ? (
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                          {friend.initials}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-700 truncate">{friend.name}</span>
                  </div>
                ))}
              </div>
              
              {friends.length > 9 && (
                <p className="text-sm text-gray-500 text-center mb-4">
                  +{friends.length - 9} more friends found!
                </p>
              )}
            </div>
          )}

          <button
            onClick={onGetPhoneNumber}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Get Phone no. and Fingerprint it
          </button>
        </div>
      </div>
    </div>
  );
};

// Widget 4: Share Store Discount Widget
interface ShareDiscountWidgetProps {
  discount: string;
  storeName: string;
  onShare?: () => void;
  onClose?: () => void;
  className?: string;
}

export const ShareDiscountWidget: React.FC<ShareDiscountWidgetProps> = ({
  discount,
  storeName,
  onShare,
  onClose,
  className = "bottom-6 right-6"
}) => {
  return (
    <div className={`fixed z-50 ${className}`}>
      <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-4 pr-12 max-w-sm transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl animate-slide-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={16} />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
            <Share2 size={20} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <span className="font-semibold text-green-600">Share {storeName} Discount</span>
              <br />
              <span className="text-gray-700">Get {discount} off for you and your friends!</span>
            </p>
            
            <button
              onClick={onShare}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors duration-200"
            >
              Share Now
            </button>
          </div>
        </div>

        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

// Main Demo Component
export const FlowBasedWidgetsDemo: React.FC = () => {
  const [activeWidgets, setActiveWidgets] = useState<{
    socialProof: boolean;
    firstTime: boolean;
    friendDiscovery: boolean;
    shareDiscount: boolean;
  }>({
    socialProof: false,
    firstTime: false,
    friendDiscovery: false,
    shareDiscount: false
  });

  const sampleFriends = [
    { id: '1', name: 'Agarwal', avatar: '', initials: 'AG' },
    { id: '2', name: 'Prateek', avatar: '', initials: 'PR' },
    { id: '3', name: 'Harshvardhan', avatar: '', initials: 'HA' },
    { id: '4', name: 'Rohit', avatar: '', initials: 'RH' },
    { id: '5', name: 'Sneha', avatar: '', initials: 'SN' },
    { id: '6', name: 'Vikram', avatar: '', initials: 'VK' }
  ];

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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Flow-Based Social Proof Widgets
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Widgets based on user flow: Check DB → Has Friends → Show Appropriate Widget
          </p>
        </div>

        {/* Widget Controls */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Social Proof Notification */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Social Proof
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              "Welcome Prateek, XYZ bought from here"
            </p>
            <button
              onClick={() => toggleWidget('socialProof')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.socialProof
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {activeWidgets.socialProof ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>

          {/* First Time User */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              First Time User
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              "Be the first to try the new Brand"
            </p>
            <button
              onClick={() => toggleWidget('firstTime')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.firstTime
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {activeWidgets.firstTime ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>

          {/* Friend Discovery Modal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Friend Discovery
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              "Check which friends bought - 20% off"
            </p>
            <button
              onClick={() => toggleWidget('friendDiscovery')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.friendDiscovery
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {activeWidgets.friendDiscovery ? 'Hide Modal' : 'Show Modal'}
            </button>
          </div>

          {/* Share Discount */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Share Discount
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              "Share Store Discount" widget
            </p>
            <button
              onClick={() => toggleWidget('shareDiscount')}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                activeWidgets.shareDiscount
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {activeWidgets.shareDiscount ? 'Hide Widget' : 'Show Widget'}
            </button>
          </div>
        </div>

        {/* Flow Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Flow Logic</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">User Lands on Website</h3>
                <p className="text-sm text-gray-600">System checks if user exists in database</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Check User's Friends</h3>
                <p className="text-sm text-gray-600">If user exists, check if any friends have made purchases</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Show Appropriate Widget</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Has Friends:</strong> Show social proof notification</p>
                  <p><strong>No Friends:</strong> Show first-time user encouragement OR friend discovery modal</p>
                  <p><strong>After Purchase:</strong> Show share discount widget</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Widgets */}
      {activeWidgets.socialProof && (
        <SocialProofNotification
          userName="Prateek"
          friendName="Rohit"
          productName="Premium Plan"
          onClose={() => closeWidget('socialProof')}
          onClick={() => console.log('Social proof clicked')}
        />
      )}

      {activeWidgets.firstTime && (
        <FirstTimeUserWidget
          userName="Prateek"
          brandName="TechCorp"
          onClose={() => closeWidget('firstTime')}
          onClick={() => console.log('First time user clicked')}
        />
      )}

      {activeWidgets.shareDiscount && (
        <ShareDiscountWidget
          discount="20%"
          storeName="TechStore"
          onShare={() => console.log('Share discount clicked')}
          onClose={() => closeWidget('shareDiscount')}
        />
      )}

      {/* Friend Discovery Modal */}
      <FriendDiscoveryModal
        isOpen={activeWidgets.friendDiscovery}
        userName="Prateek"
        discount="20%"
        friends={sampleFriends}
        onClose={() => closeWidget('friendDiscovery')}
        onGetPhoneNumber={() => {
          console.log('Get phone number clicked');
          // This would trigger the phone number collection flow
        }}
      />
    </div>
  );
};

export default FlowBasedWidgetsDemo;