
import React, { useState } from 'react';
import { Mode } from './types';
import ModeSelector from './components/ModeSelector';
import Workspace from './components/Workspace';

const App: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
  };

  const handleBackToModes = () => {
    setSelectedMode(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans">
      {selectedMode ? (
        <Workspace mode={selectedMode} onBack={handleBackToModes} />
      ) : (
        <ModeSelector onModeSelect={handleModeSelect} />
      )}
    </div>
  );
};

export default App;