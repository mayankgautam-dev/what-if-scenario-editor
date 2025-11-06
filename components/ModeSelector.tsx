

import React from 'react';
import { Mode } from '../types';
import { MODES } from '../constants';

interface ModeSelectorProps {
  onModeSelect: (mode: Mode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect }) => {
  const title = "What If";
  const ellipsis = "...";
  
  const dreamMode = MODES.find((mode) => mode.id === 'dream');
  const otherModes = MODES.filter((mode) => mode.id !== 'dream');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="flex items-baseline justify-center text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-center mb-4 tracking-tighter">
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <span
            className="animate-fade-in animate-pulse-text"
            style={{ animationDelay: `${title.length * 0.05}s` }}
        >
            {ellipsis}
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-slate-400 text-center mb-10 sm:mb-14 max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
        Choose a scenario to begin your creative journey. Upload a photo and let AI spark your imagination.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {otherModes.map((mode, index) => (
          <button
            key={mode.id}
            onClick={() => onModeSelect(mode)}
            className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-left flex flex-col items-start hover:bg-slate-800/80 hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50 animate-fade-in"
            style={{ animationDelay: `${0.5 + index * 0.05}s` }}
          >
            <div className="mb-4 bg-slate-900 p-3 rounded-full border border-slate-700 group-hover:border-purple-500/50 transition-colors">
              {/* FIX: Removed unnecessary and incorrect type cast that was causing a type error. */}
              {React.cloneElement(mode.icon, { className: "w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" })}
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">{mode.title}</h2>
            <p className="text-slate-400 flex-grow">{mode.description}</p>
          </button>
        ))}
        {dreamMode && (
           <button
            key={dreamMode.id}
            onClick={() => onModeSelect(dreamMode)}
            className="group col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 backdrop-blur-sm border border-purple-800 rounded-2xl p-8 text-left flex flex-col sm:flex-row items-center gap-6 hover:border-yellow-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-2xl shadow-purple-900/40 animate-fade-in"
            style={{ animationDelay: `${0.5 + otherModes.length * 0.05}s` }}
          >
            <div className="flex-shrink-0 bg-slate-900 p-4 rounded-full border border-purple-700 group-hover:border-yellow-500/50 transition-colors">
              {/* FIX: Removed unnecessary and incorrect type cast that was causing a type error. */}
              {React.cloneElement(dreamMode.icon, { className: "w-12 h-12 text-yellow-400" })}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">{dreamMode.title}</h2>
              <p className="text-slate-300 text-lg">{dreamMode.description}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;