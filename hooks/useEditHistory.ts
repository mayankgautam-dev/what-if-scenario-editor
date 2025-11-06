import { useState, useCallback } from 'react';

interface EditHistory<T> {
  currentImage: T | null;
  history: T[];
  currentIndex: number;
  set: (data: T) => void;
  undo: () => void;
  redo: () => void;
  goTo: (index: number) => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const useEditHistory = <T,>(): EditHistory<T> => {
  const [history, setHistory] = useState<T[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const currentImage = history[currentIndex] ?? null;
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const set = useCallback((data: T) => {
    // When a new edit is made, clear any "future" states
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [currentIndex, history]);

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [canUndo, currentIndex]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [canRedo, currentIndex]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < history.length) {
      setCurrentIndex(index);
    }
  }, [history.length]);

  const clear = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);


  return { currentImage, history, currentIndex, set, undo, redo, goTo, clear, canUndo, canRedo };
};

export default useEditHistory;