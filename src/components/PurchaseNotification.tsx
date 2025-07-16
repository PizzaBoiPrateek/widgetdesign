import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

interface Review {
  rating: number;
  text: string;
}

interface PurchaseNotificationProps {
  customer: Customer;
  productName: string;
  productImage?: string;
  companyName: string;
  review?: Review;
  onClose?: () => void;
  onFeedbackClick?: () => void;
  className?: string;
}

export const PurchaseNotification: React.FC<PurchaseNotificationProps> = ({
  customer,
  productName,
  productImage,
  companyName,
  review,
  onClose,
  onFeedbackClick,
  className = ""
}) => {
  const [showReview, setShowReview] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFeedbackClick = () => {
    if (review) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowReview(true);
        setIsAnimating(false);
      }, 200);
    }
    onFeedbackClick?.();
  };

  const handleClose = () => {
    setShowReview(false);
    onClose?.();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`fixed z-50 ${className}`}>
      <div
        className={`
          relative bg-white rounded-xl shadow-lg border border-gray-200 
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
          ${showReview ? 'w-80' : 'w-72'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
        >
          <X size={16} />
        </button>

        {!showReview ? (
          /* Initial Notification */
          <div className="p-4 pr-8 space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                {customer.avatar ? (
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {customer.initials}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold text-teal-600">
                    {customer.name}
                  </span>
                  <span className="text-gray-700">
                    {' '}recently bought from{' '}
                  </span>
                  <span className="font-medium text-gray-800">
                    {companyName}
                  </span>
                </p>
              </div>
            </div>

            {productImage && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Product purchased
                  </p>
                </div>
              </div>
            )}

            {review && (
              <button
                onClick={handleFeedbackClick}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                Check Feedback Now
              </button>
            )}
          </div>
        ) : (
          /* Expanded Review */
          <div className="p-4 pr-8 animate-fade-in space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                {customer.avatar ? (
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {customer.initials}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold text-teal-600">
                    {customer.name}
                  </span>
                  <span className="text-gray-700">
                    {' '}recently bought from{' '}
                  </span>
                  <span className="font-medium text-gray-800">
                    {companyName}
                  </span>
                </p>
              </div>
            </div>

            {productImage && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Product purchased
                  </p>
                </div>
              </div>
            )}

            {review && (
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                
                <blockquote className="text-sm text-gray-700 leading-relaxed">
                  "{review.text}"
                </blockquote>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseNotification;