import React from 'react';

interface HistoryPanelProps {
  history: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  isDreamMode?: boolean;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, currentIndex, onSelect }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className={`flex-shrink-0 text-sm font-bold text-center text-slate-400 p-2 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg`}>
        History
      </h3>
      <div className="flex flex-col items-center gap-2 p-2 overflow-y-auto">
        {history.map((imageSrc, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`rounded-md overflow-hidden w-20 h-20 flex-shrink-0 transition-all duration-200 relative group ${
              index === currentIndex ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-500' : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to history state ${index + 1}`}
          >
            <img src={imageSrc} alt={`History ${index + 1}`} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;