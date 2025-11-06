import React from 'react';
import { ResetIcon, TrashIcon, CopyIcon } from './icons';

interface ToolbarProps {
  onUndo: () => void;
  canUndo: boolean;
  onRedo: () => void;
  canRedo: boolean;
  onDownload: () => void;
  onReset: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

const ToolButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; label: string }> = ({ onClick, disabled, children, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className="btn-press flex flex-col items-center justify-center gap-1 w-16 h-16 sm:w-20 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    {children}
    <span className="text-xs tracking-wide">{label}</span>
  </button>
);

const Toolbar: React.FC<ToolbarProps> = ({ onUndo, canUndo, onRedo, canRedo, onDownload, onReset, onDelete, onCopy }) => {
  return (
    <div className="flex items-center justify-center gap-0 sm:gap-1 bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-1 sm:p-2 shadow-2xl shadow-black/30">
       <ToolButton onClick={onUndo} disabled={!canUndo} label="Undo">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </ToolButton>
      <ToolButton onClick={onRedo} disabled={!canRedo} label="Redo">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H3a6 6 0 0 0 0 12h3" />
        </svg>
      </ToolButton>
       <div className="w-px h-10 bg-slate-700 mx-1"></div>
      <ToolButton onClick={onReset} disabled={!canUndo} label="Reset">
        <ResetIcon />
      </ToolButton>
       <ToolButton onClick={onDelete} disabled={false} label="Delete">
        <TrashIcon />
      </ToolButton>
       <div className="w-px h-10 bg-slate-700 mx-1"></div>
      <ToolButton onClick={onDownload} disabled={false} label="Download">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </ToolButton>
      <ToolButton onClick={onCopy} disabled={false} label="Copy">
        <CopyIcon />
      </ToolButton>
    </div>
  );
};

export default Toolbar;