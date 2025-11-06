import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onClose, 300); // Corresponds to animation duration
      return () => clearTimeout(exitTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`fixed bottom-8 right-8 bg-slate-800 border border-purple-500 text-slate-200 py-3 px-5 rounded-lg shadow-2xl shadow-black/50 z-50 ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;
