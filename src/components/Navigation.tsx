import React from 'react';
import { ArrowLeft, Home, Users, Gift, Share2, CreditCard } from 'lucide-react';

interface NavigationProps {
  currentFlow: string;
  onNavigate: (flow: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentFlow, onNavigate }) => {
  const flows = [
    { id: 'home', name: 'All Flows', icon: Home },
    { id: 'flow1', name: 'Flow 1: Basic Social Proof', icon: Users },
    { id: 'flow2', name: 'Flow 2: Friends Vouched', icon: Users },
    { id: 'flow3', name: 'Flow 3: Discount Modal', icon: Gift },
    { id: 'flow4', name: 'Flow 4: Post-Purchase', icon: CreditCard },
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Social Proof Widgets</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {flows.map((flow) => {
              const Icon = flow.icon;
              const isActive = currentFlow === flow.id;
              
              return (
                <button
                  key={flow.id}
                  onClick={() => onNavigate(flow.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'bg-teal-100 text-teal-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{flow.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              value={currentFlow}
              onChange={(e) => onNavigate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {flows.map((flow) => (
                <option key={flow.id} value={flow.id}>
                  {flow.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;