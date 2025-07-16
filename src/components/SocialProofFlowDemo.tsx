import React, { useState, useEffect } from 'react';
import { PurchaseNotification } from './PurchaseNotification';

const sampleCustomers = [
  {
    id: '1',
    name: 'Katherine Moss',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'KM'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'SJ'
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: '',
    initials: 'MC'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    initials: 'EW'
  }
];

const sampleReviews = [
  {
    rating: 5,
    text: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it."
  },
  {
    rating: 5,
    text: "Absolutely fantastic product! The user experience is seamless and the features are exactly what we needed."
  },
  {
    rating: 4,
    text: "Great value for money. The interface is intuitive and the customer service team is very responsive."
  },
  {
    rating: 5,
    text: "This has transformed how we work. Highly recommend to anyone looking for a reliable solution."
  }
];

const sampleProductImages = [
  "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
  "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
  "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
  "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
];

interface ActiveNotification {
  id: string;
  customer: typeof sampleCustomers[0];
  review: typeof sampleReviews[0];
  productImage: string;
  position: string;
}

export const SocialProofFlowDemo: React.FC = () => {
  const [notifications, setNotifications] = useState<ActiveNotification[]>([]);
  const [notificationCounter, setNotificationCounter] = useState(0);

  const positions = [
    'bottom-6 left-6',
    'bottom-6 right-6',
    'top-20 left-6',
    'top-20 right-6',
    'bottom-32 left-6'
  ];

  const addNotification = () => {
    const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
    const review = sampleReviews[Math.floor(Math.random() * sampleReviews.length)];
    const productImage = sampleProductImages[Math.floor(Math.random() * sampleProductImages.length)];
    const position = positions[notifications.length % positions.length];
    
    const newNotification: ActiveNotification = {
      id: `notification-${notificationCounter}`,
      customer,
      review,
      productImage,
      position
    };

    setNotifications(prev => [...prev, newNotification]);
    setNotificationCounter(prev => prev + 1);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    // Auto-generate notifications every 5 seconds
    const interval = setInterval(() => {
      if (notifications.length < 3) {
        addNotification();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Social Proof Flow Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Interactive purchase notifications with expandable reviews
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={addNotification}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Add Notification
            </button>
            <button
              onClick={clearAllNotifications}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">
              Active Notifications: <span className="font-semibold text-teal-600">{notifications.length}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Widget Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Initial purchase notification</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Expandable review on CTA click</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Smooth transition animations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Star rating display</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Multiple positioning options</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Customer avatar support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Customizable content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700">Production-ready TypeScript</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">How it works:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Initial notification appears with customer info and CTA button</li>
              <li>2. Click "Check Feedback Now" to expand and show the review</li>
              <li>3. Review includes star rating and customer testimonial</li>
              <li>4. Close button available at any stage</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Active Notifications */}
      {notifications.map((notification) => (
        <PurchaseNotification
          key={notification.id}
          customer={notification.customer}
          productName="Premium Plan"
          productImage={notification.productImage}
          companyName="Good4Me"
          review={notification.review}
          onClose={() => removeNotification(notification.id)}
          onFeedbackClick={() => console.log('Feedback clicked for:', notification.customer.name)}
          className={notification.position}
        />
      ))}
    </div>
  );
};

export default SocialProofFlowDemo;