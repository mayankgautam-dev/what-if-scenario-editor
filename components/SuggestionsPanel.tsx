import React from 'react';
import { Suggestion } from '../types';
import { RefreshIcon } from './icons';

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  onSuggestionClick: (prompt: string) => void;
  isLoading: boolean;
  onRefreshSuggestions: () => void;
}

const SuggestionSkeleton: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="w-full h-24 bg-slate-800 rounded-lg"></div>
        <div className="w-full h-24 bg-slate-800 rounded-lg"></div>
        <div className="w-full h-24 bg-slate-800 rounded-lg"></div>
    </div>
);


const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ suggestions, onSuggestionClick, isLoading, onRefreshSuggestions }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-200">Suggestions</h2>
          <button
              onClick={onRefreshSuggestions}
              disabled={isLoading}
              className="p-1 text-slate-400 rounded-full hover:bg-slate-700 hover:text-purple-400 disabled:opacity-50 disabled:cursor-wait transition-colors"
              aria-label="Refresh suggestions"
          >
              <RefreshIcon />
          </button>
      </div>
      {isLoading ? (
        <SuggestionSkeleton />
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="w-full text-left p-4 bg-slate-800/70 rounded-lg hover:bg-slate-700/80 hover:border-purple-500 border border-slate-700/80 transition-all duration-200"
            >
              <p className="font-semibold text-slate-200">{suggestion.title}</p>
              <p className="text-sm text-slate-400 mt-1">{suggestion.prompt}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionsPanel;