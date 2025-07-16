import React, { useState } from 'react';
import { SocialProofWidget } from './SocialProofWidget';
import { PurchaseNotification } from './PurchaseNotification';
import { FriendsVouchedWidget } from './FriendsVouchedWidget';
import { DiscountModal } from './DiscountModal';

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

const sampleModalFriends = [
  { id: '1', name: 'Agarwal', avatar: '', initials: 'AG' },
  { id: '2', name: 'Prateek', avatar: '', initials: 'PR' },
  { id: '3', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' },
  { id: '4', name: 'Prateek', avatar: '', initials: 'PR' },
  { id: '5', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' },
  { id: '6', name: 'Agarwal', avatar: '', initials: 'AG' },
  { id: '7', name: 'Prateek', avatar: '', initials: 'PR' },
  { id: '8', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' },
  { id: '9', name: 'Prateek', avatar: '', initials: 'PR' },
  { id: '10', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' }
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
export const WidgetShowcase: React.FC = () => {
  const [activeWidgets, setActiveWidgets] = useState<{
    socialProof: boolean;
    purchaseNotification: boolean;
    friendsVouched: boolean;
    friendsVouchedEmpty: boolean;
    discountModal: boolean;
    discountModalWithFriends: boolean;
  }>({
    socialProof: false,
    purchaseNotification: false,
    friendsVouched: false,
    friendsVouchedEmpty: false,
    discountModal: false,
    discountModalWithFriends: false
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    showFriends: boolean;
  }>({
    isOpen: false,
    showFriends: false
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

  const openDiscountModal = (showFriends: boolean = false) => {
    setModalState({
      isOpen: true,
      showFriends
    });
  };

  const closeDiscountModal = () => {
    setModalState({
      isOpen: false,
      showFriends: false
    });
  };

  const handleCheckNow = () => {
    setModalState({
      isOpen: true,
      showFriends: true
    });
  };

  const handleGetCoupon = () => {
    // The success modal will handle closing
    console.log('Coupon success flow initiated!');
  };

  const handleCouponSuccess = () => {
    console.log('Coupon successfully claimed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Social Proof Widget Collection
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Interactive notification widgets with smooth animations and expandable states
          </p>
        </div>

        {/* Widget Controls */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Flow 1: Social Proof Widget */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Flow 1: Social Proof
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

          {/* Flow 1: Purchase Notification */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Flow 1: Purchase + Review
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

          {/* Flow 2: Friends Vouched */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Flow 2: Friends Vouched
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

          {/* Flow 2: No Friends Found */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Flow 2: No Friends
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

          {/* Flow 3: Discount Modal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Flow 3: Discount Modal
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Modal popup with friend discovery and discount offers
            </p>
            <div className="space-y-2">
              <button
                onClick={() => openDiscountModal(false)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                Show Initial Modal
              </button>
              <button
                onClick={() => openDiscountModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              >
                Show Friends Modal
              </button>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Widget Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Flow 1 Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Stacked avatar display</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Purchase notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Expandable reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Star ratings</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Flow 2 Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Friends vouched display</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Expandable friend details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Empty state handling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Risk-free exploration CTA</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Flow 3 Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Full-screen modal overlay</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Friend discovery grid</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Discount offers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Progressive disclosure</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Common Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Smooth animations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Hover effects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Click handlers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">TypeScript ready</span>
                </div>
              </div>
            </div>
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

      {/* Flow 3: Discount Modal */}
      <DiscountModal
        isOpen={modalState.isOpen}
        onClose={closeDiscountModal}
        onCheckNow={handleCheckNow}
        onGetCoupon={handleGetCoupon}
        onCouponSuccess={handleCouponSuccess}
        friends={sampleModalFriends}
        showFriends={modalState.showFriends}
        title="🎉 Get 20% Off When You Spot a Friend!"
        description="See which of your friends have already shopped at Sleepy Owl and unlock your exclusive 20% discount."
        companyName="Sleepy Owl"
      />
    </div>
  );
};

export default WidgetShowcase;