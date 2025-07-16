import React, { useState } from 'react';
import { DiscountModal } from './DiscountModal';

const sampleFriends = [
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

export const Flow3Demo: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    showFriends: boolean;
  }>({
    isOpen: false,
    showFriends: false
  });

  const openInitialModal = () => {
    setModalState({
      isOpen: true,
      showFriends: false
    });
  };

  const openFriendsModal = () => {
    setModalState({
      isOpen: true,
      showFriends: true
    });
  };

  const handleCheckNow = () => {
    setModalState({
      isOpen: true,
      showFriends: true
    });
  };

  const handleGetCoupon = () => {
    // The success modal will handle closing the main modal
    console.log('Coupon success flow initiated!');
  };

  const handleCouponSuccess = () => {
    console.log('Coupon successfully claimed and modals closed!');
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      showFriends: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Flow 3: Discount Modal System
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Interactive modal popups with friend discovery and discount offers
          </p>
        </div>

        {/* Demo Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Initial Discount Modal
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows the discount offer with "Check now" CTA to discover friends
            </p>
            <button
              onClick={openInitialModal}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Show Initial Modal
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Friends Found Modal
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows discovered friends with "Get coupon now" CTA
            </p>
            <button
              onClick={openFriendsModal}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Show Friends Modal
            </button>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flow 3 Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Modal Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Full-screen modal overlay</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Beautiful gradient backgrounds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Smooth open/close animations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Backdrop click to close</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Content Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Friend discovery grid layout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Dynamic friend count display</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Customizable discount offers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Progressive disclosure flow</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Flow Sequence:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Initial modal shows discount offer with "Check now" button</li>
              <li>2. Click "Check now" to discover friends who have purchased</li>
              <li>3. Friends modal shows grid of discovered friends</li>
              <li>4. "Get coupon now" button to claim the discount</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Modal */}
      <DiscountModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onCheckNow={handleCheckNow}
        onGetCoupon={handleGetCoupon}
        onCouponSuccess={handleCouponSuccess}
        friends={sampleFriends}
        showFriends={modalState.showFriends}
        title="🎉 Get 20% Off When You Spot a Friend!"
        description="See which of your friends have already shopped at Sleepy Owl and unlock your exclusive 20% discount."
        companyName="Sleepy Owl"
      />
    </div>
  );
};

export default Flow3Demo;