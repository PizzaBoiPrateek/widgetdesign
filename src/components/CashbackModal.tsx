import React, { useState } from 'react';
import { X, Gift, Users, Star, ArrowRight } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  selected: boolean;
}

interface CashbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareContacts?: (contacts: Contact[]) => void;
  onSkip?: () => void;
  productName?: string;
  cashbackAmount?: string;
  requiredContacts?: number;
  className?: string;
}

export const CashbackModal: React.FC<CashbackModalProps> = ({
  isOpen,
  onClose,
  onShareContacts,
  onSkip,
  productName = "Premium Plan",
  cashbackAmount = "₹200",
  requiredContacts = 10,
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState<'rating' | 'contacts' | 'success'>('rating');
  const [rating, setRating] = useState(0);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Johnson', phone: '+1 234-567-8901', selected: false },
    { id: '2', name: 'Mike Chen', phone: '+1 234-567-8902', selected: false },
    { id: '3', name: 'Emma Wilson', phone: '+1 234-567-8903', selected: false },
    { id: '4', name: 'David Brown', phone: '+1 234-567-8904', selected: false },
    { id: '5', name: 'Lisa Garcia', phone: '+1 234-567-8905', selected: false },
    { id: '6', name: 'Tom Anderson', phone: '+1 234-567-8906', selected: false },
    { id: '7', name: 'Anna Martinez', phone: '+1 234-567-8907', selected: false },
    { id: '8', name: 'John Taylor', phone: '+1 234-567-8908', selected: false },
    { id: '9', name: 'Maria Rodriguez', phone: '+1 234-567-8909', selected: false },
    { id: '10', name: 'Chris Lee', phone: '+1 234-567-8910', selected: false },
    { id: '11', name: 'Jessica White', phone: '+1 234-567-8911', selected: false },
    { id: '12', name: 'Ryan Davis', phone: '+1 234-567-8912', selected: false },
  ]);

  if (!isOpen) return null;

  const selectedContacts = contacts.filter(contact => contact.selected);
  const canProceed = selectedContacts.length >= requiredContacts;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRatingSubmit = () => {
    if (rating >= 4) {
      setCurrentStep('contacts');
    } else {
      // If rating is low, just close or show different flow
      onClose();
    }
  };

  const handleContactToggle = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, selected: !contact.selected }
        : contact
    ));
  };

  const handleShareContacts = () => {
    onShareContacts?.(selectedContacts);
    setCurrentStep('success');
  };

  const handleSkip = () => {
    onSkip?.();
    onClose();
  };

  const renderStars = (currentRating: number, onStarClick: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        onClick={() => onStarClick(index + 1)}
        className="transition-colors duration-200 hover:scale-110"
      >
        <Star
          size={32}
          className={`${
            index < currentRating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300 hover:text-yellow-300'
          }`}
        />
      </button>
    ));
  };

  const renderRatingStep = () => (
    <div className="p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
        <Gift className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        How was your experience with {productName}?
      </h2>
      
      <p className="text-gray-600 mb-8">
        We'd love to hear your feedback!
      </p>

      <div className="flex justify-center space-x-2 mb-8">
        {renderStars(rating, setRating)}
      </div>

      {rating > 0 && (
        <div className="space-y-4">
          {rating >= 4 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">
                🎉 Great! Since you loved it, earn {cashbackAmount} cashback by sharing with {requiredContacts} friends!
              </p>
            </div>
          )}
          
          <button
            onClick={handleRatingSubmit}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {rating >= 4 ? 'Continue to Earn Cashback' : 'Submit Feedback'}
          </button>
        </div>
      )}
    </div>
  );

  const renderContactsStep = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Earn {cashbackAmount} Cashback!
        </h2>
        
        <p className="text-sm text-gray-600">
          Select {requiredContacts} contacts to share {productName} and earn cashback
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>Selected: {selectedContacts.length}/{requiredContacts}</span>
          <span className={canProceed ? 'text-green-600 font-medium' : ''}>
            {canProceed ? 'Ready to earn!' : `${requiredContacts - selectedContacts.length} more needed`}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              canProceed ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min((selectedContacts.length / requiredContacts) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto mb-6 border border-gray-200 rounded-lg">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-3 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors duration-200 ${
              contact.selected ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleContactToggle(contact.id)}
          >
            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors duration-200 ${
              contact.selected 
                ? 'bg-blue-500 border-blue-500' 
                : 'border-gray-300'
            }`}>
              {contact.selected && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-gray-800">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleShareContacts}
          disabled={!canProceed}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
            canProceed
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Share & Earn {cashbackAmount} Cashback
        </button>
        
        <button
          onClick={handleSkip}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Skip for now
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
        <Gift className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Wohooo! 🎉
      </h2>
      
      <div className="space-y-2 mb-6">
        <p className="text-lg font-semibold text-green-600">
          {cashbackAmount} Cashback Earned!
        </p>
        <p className="text-gray-600">
          Your contacts will receive an invite to try {productName}
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
          Cashback will be credited to your account within 24 hours after your friends make their first purchase.
        </p>
      </div>

      <button
        onClick={handleClose}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />
      
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4
          transform transition-all duration-300 ease-out scale-100 opacity-100
          ${className}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
        >
          <X size={20} />
        </button>

        {currentStep === 'rating' && renderRatingStep()}
        {currentStep === 'contacts' && renderContactsStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
};

export default CashbackModal;