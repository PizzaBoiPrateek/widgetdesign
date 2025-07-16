import React, { useState } from 'react';
import { X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

interface SocialProofWidgetProps {
  users: User[];
  additionalCount?: number;
  productName?: string;
  onClose?: () => void;
  onClick?: () => void;
}

export const SocialProofWidget: React.FC<SocialProofWidgetProps> = ({
  users,
  additionalCount = 0,
  productName = "this product",
  onClose,
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleClick = () => {
    onClick?.();
  };

  const displayedUsers = users.slice(0, 3);
  const remainingCount = Math.max(0, users.length - 3 + additionalCount);

  const formatUserNames = () => {
    if (displayedUsers.length === 0) return '';
    
    const names = displayedUsers.map(user => user.name);
    
    if (names.length === 1) {
      return names[0];
    } else if (names.length === 2) {
      return `${names[0]} & ${names[1]}`;
    } else {
      return `${names[0]}, ${names[1]} & ${names[2]}`;
    }
  };

  const getAdditionalText = () => {
    if (remainingCount > 0) {
      return ` & ${remainingCount} other${remainingCount > 1 ? 's' : ''}`;
    }
    return '';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-in">
      <div
        className={`
          relative bg-white rounded-xl shadow-lg border border-gray-200 p-4 pr-12 max-w-sm
          transform transition-all duration-300 ease-out cursor-pointer
          ${isHovered ? 'scale-105 shadow-xl' : 'scale-100'}
          hover:shadow-xl
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="flex items-center space-x-3">
          {/* Avatar Stack */}
          <div className="flex items-center -space-x-2">
            {displayedUsers.map((user, index) => (
              <div
                key={user.id}
                className={`
                  relative w-8 h-8 rounded-full border-2 border-white overflow-hidden
                  transform transition-all duration-300 ease-out
                  ${isHovered ? 'scale-110' : 'scale-100'}
                `}
                style={{
                  zIndex: displayedUsers.length - index,
                  animationDelay: `${index * 100}ms`
                }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                    {user.initials}
                  </div>
                )}
              </div>
            ))}
            
            {remainingCount > 0 && (
              <div className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                +{remainingCount}
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="font-semibold text-teal-600">
                {formatUserNames()}
                {getAdditionalText()}
              </span>
              {' '}
              <span className="text-gray-700">
                vouched for {productName}...
              </span>
            </p>
          </div>
        </div>

        {/* Pulse Animation Indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SocialProofWidget;