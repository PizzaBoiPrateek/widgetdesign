import React, { useState } from 'react';
import { X, Zap, Users } from 'lucide-react';
import { CouponSuccessModal } from './CouponSuccessModal';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckNow: () => void;
  onGetCoupon?: () => void;
  onCouponSuccess?: () => void;
  title?: string;
  description?: string;
  discount?: string;
  companyName?: string;
  friends?: Friend[];
  showFriends?: boolean;
  className?: string;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({
  isOpen,
  onClose,
  onCheckNow,
  onGetCoupon,
  onCouponSuccess,
  title = "Get 20% Off When You Spot a Friend!",
  description = "See which of your friends have already shopped at Sleepy Owl and unlock your exclusive 20% discount.",
  discount = "20%",
  companyName = "Sleepy Owl",
  friends = [],
  showFriends = false,
  className = ""
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  const handleCheckNow = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onCheckNow();
      setIsAnimating(false);
    }, 300);
  };

  const handleGetCoupon = () => {
    setShowSuccessModal(true);
    onGetCoupon?.();
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose(); // Close the main modal too
    onCouponSuccess?.();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const renderFriendsList = () => {
    if (!showFriends || friends.length === 0) return null;

    return (
      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-3 gap-3">
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
          <p className="text-sm text-gray-500 text-center">
            +{friends.length - 9} more friends
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
          ${className}
        `}
        style={{
          backgroundImage: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200 z-10"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Icon and Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {title}
            </h2>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Friends List */}
          {renderFriendsList()}

          {/* Friends Found Message */}
          {showFriends && friends.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-gray-800">
                Found <span className="text-orange-600">{friends.length}</span> of your friends have bought from {companyName}!
              </p>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-8">
            {showFriends && friends.length > 0 ? (
              <button
                onClick={handleGetCoupon}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Get coupon now
              </button>
            ) : (
              <button
                onClick={handleCheckNow}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Check now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CouponSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        discount={discount}
        customerName="favourite customer"
      />
    </div>
  );
};

export default DiscountModal;