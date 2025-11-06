import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Mode, Suggestion } from '../types';
import ImageUploader from './ImageUploader';
import SuggestionsPanel from './SuggestionsPanel';
import Toolbar from './Toolbar';
import { analyzeImage, editImage, generateImage } from '../services/geminiService';
import useEditHistory from '../hooks/useEditHistory';
import Spinner from './Spinner';
import HistoryPanel from './HistoryPanel';
import { DreamBuilderIcon, ChevronLeftIcon, ChevronRightIcon, SlidersIcon, HistoryIcon } from './icons';
import ModeIntroduction from './ModeIntroduction';
import Toast from './Toast';

interface WorkspaceProps {
  mode: Mode;
  onBack: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ mode, onBack }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const {
    currentImage,
    history,
    currentIndex,
    set: setHistory,
    undo: historyUndo,
    redo: historyRedo,
    goTo: historyGoTo,
    clear: clearHistory,
    canUndo,
    canRedo,
  } = useEditHistory<string>();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  
  const isDreamMode = mode.id === 'dream';

  const [leftPanelWidth, setLeftPanelWidth] = useState(384);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [rightPanelWidth, setRightPanelWidth] = useState(112);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const mainPanelRef = useRef<HTMLElement>(null);

  // --- Mobile State ---
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);


  const animateTransition = (action: () => void) => {
    if (currentImage) {
      setPreviousImage(currentImage);
      requestAnimationFrame(() => {
        action();
        setTimeout(() => setPreviousImage(null), 500);
      });
    } else {
      action();
    }
  };

  const set = (newImage: string) => animateTransition(() => setHistory(newImage));
  const undo = () => animateTransition(historyUndo);
  const redo = () => animateTransition(historyRedo);
  const goTo = (index: number) => animateTransition(() => historyGoTo(index));

  const handleImageUpload = useCallback((imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setHistory(imageDataUrl); // No animation on first upload
    setSuggestions([]);
    setError(null);
    setPreviousImage(null);
    setIsMobileControlsOpen(false); // Close mobile panel after upload
  }, [setHistory]);

  const getSuggestions = useCallback(async (imageToAnalyze: string) => {
    setIsLoading(true);
    setLoadingMessage('Analyzing image...');
    setError(null);
    try {
      const newSuggestions = await analyzeImage(imageToAnalyze, mode);
      setSuggestions(newSuggestions);
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    if (currentImage && !suggestions.length) {
      getSuggestions(currentImage);
    }
  }, [currentImage, suggestions.length, getSuggestions]);
  
  const handleRefreshSuggestions = useCallback(() => {
    if (currentImage) {
      getSuggestions(currentImage);
    }
  }, [currentImage, getSuggestions]);

  const generate = useCallback(async (prompt: string) => {
    if (!prompt) return;

    setIsLoading(true);
    setLoadingMessage('Generating your vision...');
    setError(null);
    setIsMobileControlsOpen(false); // Close panel on generation
    try {
      let result: { newImage: string | null; text?: string | null };
      
      if (currentImage) {
        result = await editImage(currentImage, prompt);
      } else if (mode.id === 'dream') {
        result = await generateImage(prompt);
      } else {
        setError('Please upload an image to get started.');
        setIsLoading(false);
        return;
      }
      
      if (result.newImage) {
        if (!originalImage) {
          setOriginalImage(result.newImage);
        }
        set(result.newImage);
        setSuggestions([]); 
      } else {
        throw new Error("No image was generated.");
      }
    } catch (err) {
      setError('Failed to generate image. Please try a different prompt.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentImage, mode.id, set, originalImage]);


  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      generate(customPrompt);
      setCustomPrompt('');
    }
  };
  
  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `what-if-${mode.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if(originalImage) {
      set(originalImage);
      setSuggestions([]);
    }
  };

  const handleDelete = () => {
    setOriginalImage(null);
    clearHistory();
    setSuggestions([]);
    setError(null);
  };
  
  const handleCopy = useCallback(async () => {
    if (!currentImage) return;
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      // @ts-ignore - ClipboardItem is not in all TS lib versions but supported by modern browsers
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
      setToastMessage('Image copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy image:', err);
      setError('Failed to copy image to clipboard. This feature may not be supported in your browser.');
    }
  }, [currentImage]);

  const startResizing = useCallback((e: React.MouseEvent<HTMLDivElement>, panel: 'left' | 'right') => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panel === 'left' ? leftPanelWidth : rightPanelWidth;

    const doDrag = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      let newWidth = panel === 'left' ? startWidth + delta : startWidth - delta;
      
      const mainPanelMinWidth = 300;
      const mainPanelCurrentWidth = mainPanelRef.current?.getBoundingClientRect().width || 0;
      
      if (panel === 'left') {
        const maxWidth = mainPanelCurrentWidth + leftPanelWidth - mainPanelMinWidth;
        newWidth = Math.max(280, Math.min(newWidth, maxWidth));
        setLeftPanelWidth(newWidth);
        if (isLeftPanelCollapsed) setIsLeftPanelCollapsed(false);
      } else {
        const maxWidth = mainPanelCurrentWidth + rightPanelWidth - mainPanelMinWidth;
        newWidth = Math.max(112, Math.min(newWidth, maxWidth));
        setRightPanelWidth(newWidth);
        if (isRightPanelCollapsed) setIsRightPanelCollapsed(false);
      }
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  }, [leftPanelWidth, rightPanelWidth, isLeftPanelCollapsed, isRightPanelCollapsed]);


  return (
    <div className="flex flex-col min-h-screen bg-slate-900/30 md:flex-row md:h-screen md:max-h-screen md:overflow-hidden">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      
      {/* --- Mobile Header --- */}
      <header className="md:hidden sticky top-0 flex-shrink-0 flex items-center justify-between p-3 bg-slate-900/70 backdrop-blur-xl border-b border-slate-700/50 z-30">
        <button onClick={onBack} className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-semibold">
          <ChevronLeftIcon className="w-5 h-5 mr-1" /> Back
        </button>
        <h1 className="text-lg font-bold truncate">{mode.title}</h1>
        <div className="flex items-center gap-2">
            <button
                onClick={() => setIsMobileControlsOpen(true)}
                className="p-2 text-slate-300 hover:text-purple-400"
                aria-label="Open controls"
            >
                <SlidersIcon className="w-6 h-6" />
            </button>
            {currentImage && (
                <button
                    onClick={() => setIsMobileHistoryOpen(true)}
                    className="p-2 text-slate-300 hover:text-purple-400"
                    aria-label="Open history"
                >
                    <HistoryIcon className="w-6 h-6" />
                </button>
            )}
        </div>
      </header>

      {/* --- Mobile Controls Drawer --- */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileControlsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileControlsOpen(false)}></div>
          <aside className={`absolute top-0 left-0 h-full w-full max-w-sm bg-slate-900 border-r border-slate-700/50 flex flex-col transition-transform duration-300 ease-in-out ${isMobileControlsOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex-shrink-0 p-6 border-b border-slate-700/50">
                  <h1 className={`text-2xl font-bold ${isDreamMode ? 'text-yellow-300' : 'text-slate-100'}`}>{mode.title}</h1>
                  <p className="text-slate-400 mt-1 text-sm">{mode.description}</p>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                {currentImage ? (
                  <SuggestionsPanel 
                    suggestions={suggestions} 
                    onSuggestionClick={generate}
                    isLoading={isLoading && loadingMessage === 'Analyzing image...'}
                    onRefreshSuggestions={handleRefreshSuggestions}
                  />
                ) : (
                  <ImageUploader onImageUpload={handleImageUpload} />
                )}
              </div>
          </aside>
      </div>

       {/* --- Mobile History Drawer --- */}
      {currentImage && (
          <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileHistoryOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileHistoryOpen(false)}></div>
              <aside className={`absolute top-0 right-0 h-full w-32 bg-slate-900 border-l border-slate-700/50 flex flex-col transition-transform duration-300 ease-in-out ${isMobileHistoryOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                  <HistoryPanel
                      history={history}
                      currentIndex={currentIndex}
                      onSelect={(index) => {
                          goTo(index);
                          setIsMobileHistoryOpen(false);
                      }}
                      isDreamMode={isDreamMode}
                  />
              </aside>
          </div>
      )}
      
      {/* --- Desktop Left Panel: Controls --- */}
      <aside 
        style={{ width: isLeftPanelCollapsed ? '0px' : `${leftPanelWidth}px`, paddingLeft: isLeftPanelCollapsed ? '0' : '', paddingRight: isLeftPanelCollapsed ? '0' : '' }}
        className="hidden md:flex flex-shrink-0 bg-slate-900/70 backdrop-blur-xl border-r border-slate-700/50 flex-col overflow-hidden transition-all duration-300 ease-in-out relative"
      >
        <div className="flex-shrink-0 p-6 border-b border-slate-700/50" style={{ visibility: isLeftPanelCollapsed ? 'hidden' : 'visible' }}>
          <button onClick={onBack} className="text-purple-400 hover:text-purple-300 mb-4 flex items-center text-sm font-semibold">
             &larr; Change Mode
          </button>
          <h1 className={`text-2xl font-bold ${isDreamMode ? 'text-yellow-300' : 'text-slate-100'}`}>{mode.title}</h1>
          <p className="text-slate-400 mt-1 text-sm">{mode.description}</p>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto" style={{ visibility: isLeftPanelCollapsed ? 'hidden' : 'visible' }}>
          {currentImage ? (
            <SuggestionsPanel 
              suggestions={suggestions} 
              onSuggestionClick={generate}
              isLoading={isLoading && loadingMessage === 'Analyzing image...'}
              onRefreshSuggestions={handleRefreshSuggestions}
            />
          ) : (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}
        </div>
      </aside>

      {/* Center Panel: Image Viewer & Controls */}
      <main ref={mainPanelRef} className="flex-1 flex flex-col p-4 md:p-6 relative min-w-0">
        {/* Left Resizer & Toggle */}
        <div className="hidden md:flex absolute top-0 left-0 h-full items-center z-20">
            <div className="panel-resizer -ml-1" onMouseDown={(e) => startResizing(e, 'left')} />
            <button 
                onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)} 
                className="absolute top-1/2 -translate-y-1/2 -ml-3 z-20 bg-slate-800 text-slate-400 hover:text-white hover:bg-purple-600 rounded-full w-6 h-10 flex items-center justify-center transition-all"
                aria-label={isLeftPanelCollapsed ? 'Expand left panel' : 'Collapse left panel'}
            >
                {isLeftPanelCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
            </button>
        </div>
        
        <div className="w-full flex items-center justify-center relative md:flex-1 md:min-h-0">
          <div className="image-container">
            {isLoading && loadingMessage !== 'Analyzing image...' && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 rounded-lg">
                <Spinner />
                <p className="text-lg mt-4 animate-pulse-text">{loadingMessage}</p>
              </div>
            )}
            {previousImage && (
              <img src={previousImage} alt="Previous preview" className="absolute z-0"/>
            )}
            {currentImage ? (
              <img src={currentImage} alt="Creative preview" key={currentImage} className="relative z-10 image-crossfade" />
            ) : isDreamMode ? (
              <div className="w-full max-w-3xl text-center flex flex-col items-center">
                  <DreamBuilderIcon className="w-24 h-24 text-yellow-400" />
                  <h2 className="text-4xl font-extrabold mb-2 mt-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">Dream Builder</h2>
                  <p className="text-lg text-slate-400 max-w-lg">
                    To begin, describe your vision in the box below, or open the controls panel to upload an image.
                  </p>
                </div>
            ) : (
              <ModeIntroduction mode={mode} />
            )}
          </div>
        </div>

        <div className="flex-shrink-0 w-full max-w-3xl mx-auto pt-4 md:pt-6">
            {error && <div className="mb-4 text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}
            {(currentImage || mode.id === 'dream') && (
              <>
                <div className="mb-4">
                    <h2 className="hidden md:block text-xl font-bold mb-4 text-center text-slate-300">
                      {currentImage ? 'Or Your Own Idea...' : 'Describe Your Vision'}
                    </h2>
                    <form onSubmit={handlePromptSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder={mode.placeholderPrompt}
                        className="flex-grow bg-slate-800/70 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                    <button
                        type="submit"
                        className="btn-press bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white font-bold py-3 px-5 rounded-lg hover:from-purple-600 hover:to-fuchsia-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/40"
                        disabled={!customPrompt.trim() || isLoading}
                    >
                        Go
                    </button>
                    </form>
                </div>
                {currentImage && (
                  <div className="flex justify-center">
                    <Toolbar 
                      onUndo={undo} 
                      canUndo={canUndo} 
                      onRedo={redo} 
                      canRedo={canRedo}
                      onDownload={handleDownload}
                      onReset={handleReset}
                      onDelete={handleDelete}
                      onCopy={handleCopy}
                    />
                  </div>
                )}
              </>
            )}
        </div>
      </main>

      {/* --- Desktop Right Panel: History --- */}
      {currentImage && (
        <aside 
          style={{ width: isRightPanelCollapsed ? '0px' : `${rightPanelWidth}px`, paddingLeft: isRightPanelCollapsed ? '0' : '', paddingRight: isRightPanelCollapsed ? '0' : '' }}
          className={`relative hidden md:flex flex-shrink-0 flex-col bg-slate-900/50 backdrop-blur-xl border-l ${
            isDreamMode 
              ? 'border-yellow-700/50' 
              : 'border-slate-700/50'
          } transition-all duration-300 ease-in-out`}
        >
          {!isRightPanelCollapsed && (
             <HistoryPanel
                history={history}
                currentIndex={currentIndex}
                onSelect={goTo}
                isDreamMode={isDreamMode}
              />
          )}
          {/* Right Resizer & Toggle */}
          <div className="absolute top-0 right-0 h-full flex items-center z-20">
              <div className="panel-resizer -mr-1" onMouseDown={(e) => startResizing(e, 'right')} />
              <button 
                  onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)} 
                  className="absolute top-1/2 -translate-y-1/2 -mr-3 z-20 bg-slate-800 text-slate-400 hover:text-white hover:bg-purple-600 rounded-full w-6 h-10 flex items-center justify-center transition-all"
                  aria-label={isRightPanelCollapsed ? 'Expand right panel' : 'Collapse right panel'}
              >
                  {isRightPanelCollapsed ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
              </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Workspace;