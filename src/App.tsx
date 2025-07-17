import React from 'react';
import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { FlowBasedWidgetsDemo } from './components/FlowBasedWidgets';
import { Flow1Demo } from './components/Flow1Demo';
import { Flow2Demo } from './components/Flow2Demo';
import { Flow3Demo } from './components/Flow3Demo';
import { Flow4Demo } from './components/Flow4Demo';

function App() {
  const [currentFlow, setCurrentFlow] = useState('home');

  const renderCurrentFlow = () => {
    switch (currentFlow) {
      case 'flow1':
        return <Flow1Demo />;
      case 'flow2':
        return <Flow2Demo />;
      case 'flow3':
        return <Flow3Demo />;
      case 'flow4':
        return <Flow4Demo />;
      default:
        return <FlowBasedWidgetsDemo />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentFlow={currentFlow} onNavigate={setCurrentFlow} />
      {renderCurrentFlow()}
    </div>
  );
}

export default App;