import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

interface FriendsVouchedWidgetProps {
  friends: Friend[];
  productName?: string;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
}

export const FriendsVouchedWidget: React.FC<FriendsVouchedWidgetProps> = ({
  friends,
  productName = "this product",
  onClose,
  onClick,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsExpanded(true);
      setIsAnimating(false);
    }, 200);
    onClick?.();
  };

  const handleClose = () => {
    setIsExpanded(false);
    onClose?.();
  };

  const displayedFriends = friends.slice(0, 3);
  const remainingCount = Math.max(0, friends.length - 3);

  const formatFriendNames = () => {
    if (friends.length === 0) return '';
    
    const names = displayedFriends.map(friend => friend.name);
    
    if (names.length === 1) {
      return names[0];
    } else if (names.length === 2) {
      return `${names[0]} & ${names[1]}`;
    } else {
      return `${names[0]}, ${names[1]} & ${names[2]}`;
    }
  };

  return (
    <div className={`fixed z-50 ${className}`}>
      <div
        className={`
          relative bg-white rounded-xl shadow-lg border border-gray-200 
          transform transition-all duration-300 ease-out cursor-pointer
          ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
          ${isExpanded ? 'w-96 cursor-default' : 'w-80 hover:scale-105 hover:shadow-xl'}
        `}
        onClick={!isExpanded ? handleClick : undefined}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
        >
          <X size={16} />
        </button>

        {!isExpanded ? (
          /* Compact Notification */
          <div className="p-4 pr-8">
            <div className="flex items-center space-x-3">
              {/* Avatar Stack */}
              <div className="flex items-center -space-x-2">
                {displayedFriends.map((friend, index) => (
                  <div
                    key={friend.id}
                    className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    style={{ zIndex: displayedFriends.length - index }}
                  >
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                        {friend.initials}
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
                {friends.length > 0 ? (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Your <span className="font-semibold text-teal-600">{friends.length} friends</span>
                    <span className="text-gray-700"> have vouched for {productName}</span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    <span className="font-semibold text-teal-600">
                      {formatFriendNames()}
                      {remainingCount > 0 && ` & ${remainingCount} others`}
                    </span>
                    <span className="text-gray-700"> vouched for {productName}...</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Expanded State */
          <div className="p-6 pr-8 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              {/* Avatar Stack */}
              <div className="flex items-center -space-x-2">
                {displayedFriends.slice(0, 2).map((friend, index) => (
                  <div
                    key={friend.id}
                    className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    style={{ zIndex: 2 - index }}
                  >
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {friend.initials}
                      </div>
                    )}
                  </div>
                ))}
                
                {remainingCount > 0 && (
                  <div className="relative w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                    +{remainingCount}
                  </div>
                )}
              </div>
            </div>

            {friends.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Check which of <span className="text-teal-600">your Friends</span> vouched for this product...
                </h3>
              </div>
            ) : (
              <div className="border-2 border-dashed border-teal-200 rounded-lg p-6 bg-teal-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center -space-x-2">
                    <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        +2
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Friends Found! <span className="text-teal-600">Be the First to explore without any risk</span>
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsVouchedWidget;