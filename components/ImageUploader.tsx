import React, { useState, useCallback } from 'react';
import { PhotoUploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const fileToDataUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (files && files[0]) {
      const imageDataUrl = await fileToDataUrl(files[0]);
      onImageUpload(imageDataUrl);
    }
  }, [onImageUpload]);

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  }, []);
  
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await handleFileChange(e.dataTransfer.files);
    }
  }, [handleDragEvents, handleFileChange]);

  return (
    <div
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`h-full flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-all duration-300 ease-in-out relative overflow-hidden ${
        isDragging
          ? 'bg-purple-900/20'
          : 'bg-slate-800/50'
      }`}
    >
      <div className={`absolute inset-0 border-2 border-dashed rounded-2xl transition-all duration-300 pointer-events-none ${isDragging ? 'border-purple-400 scale-105 opacity-100' : 'border-slate-700 opacity-70'}`}></div>

      <div className="relative z-10 flex flex-col items-center">
        <PhotoUploadIcon className={`w-24 h-24 transition-all duration-300 ${isDragging ? 'text-purple-300 scale-110' : 'text-slate-600'}`} />
        
        <p className={`text-lg font-semibold mt-4 transition-colors duration-300 ${isDragging ? 'text-white' : 'text-slate-300'}`}>
          {isDragging ? "Drop your image to begin" : "Add Your Image"}
        </p>
        <p className="text-sm text-slate-400 max-w-xs mt-1">
          Drag and drop a file here, or click the button below to get started.
        </p>

        <label
          htmlFor="file-upload"
          className="btn-press mt-6 cursor-pointer font-bold text-white bg-gradient-to-br from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-purple-900/40"
        >
          Browse Files
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
