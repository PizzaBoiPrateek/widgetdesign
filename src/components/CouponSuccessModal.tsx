import React from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

interface CouponSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  discount?: string;
  customerName?: string;
  className?: string;
}

export const CouponSuccessModal: React.FC<CouponSuccessModalProps> = ({
  isOpen,
  onClose,
  discount = "20%",
  customerName = "favourite customer",
  className = ""
}) => {
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />
      
      {/* Modal */}
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4
          transform transition-all duration-300 ease-out scale-100 opacity-100
          ${className}
        `}
        style={{
          backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #f59e0b 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-200 z-10"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 pt-12 text-center">
          {/* Success Icon with Animation */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
            {/* Sparkle Effects */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Wohooo! 🎉
            </h2>
            
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-orange-600 text-xl">{discount} off</span> for our {customerName}
              </p>
              <p className="text-base text-gray-700">
                across everything on the store!
              </p>
            </div>
          </div>

          {/* Discount Code Section */}
          <div className="bg-white bg-opacity-80 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your discount code:</p>
            <div className="bg-gray-100 rounded-lg px-4 py-2 font-mono text-lg font-bold text-gray-800 border-2 border-dashed border-gray-300">
              FRIEND{discount.replace('%', '')}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Code automatically applied at checkout
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Start Shopping
          </button>

          {/* Fine Print */}
          <p className="text-xs text-gray-600 mt-4 opacity-75">
            Valid for 24 hours • Cannot be combined with other offers
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponSuccessModal;