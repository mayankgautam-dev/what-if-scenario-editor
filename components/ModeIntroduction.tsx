import React, { useState, useEffect } from 'react';
import { Mode } from '../types';
import { RightArrowIcon } from './icons';
import { generateExampleImage } from '../services/geminiService';
import Spinner from './Spinner';

interface ModeIntroductionProps {
  mode: Mode;
}

const ModeIntroduction: React.FC<ModeIntroductionProps> = ({ mode }) => {
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generate = async () => {
      if (mode.exampleImages?.before && mode.examplePrompt) {
        setIsGenerating(true);
        setAfterImage(null);
        setError(null);
        try {
          const generatedImage = await generateExampleImage(mode.exampleImages.before, mode.examplePrompt);
          if (generatedImage) {
            setAfterImage(generatedImage);
          } else {
            throw new Error("AI failed to return an image.");
          }
        } catch (e) {
          console.error("Failed to generate example image:", e);
          setError("Could not load example.");
        } finally {
          setIsGenerating(false);
        }
      }
    };
    generate();
  }, [mode]);

  return (
    <div className="w-full max-w-3xl text-center flex flex-col items-center p-4 animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-slate-100">How to use {mode.title}</h2>
      <p className="text-lg text-slate-400 max-w-xl mb-8">
        {mode.aboutText}
      </p>

      {mode.exampleImages && (
        <div className="w-full mb-8">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">For Example:</h3>
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex-1 text-center">
              <p className="font-bold text-slate-300 mb-2">Before</p>
              <div className="rounded-lg shadow-lg w-full max-w-xs mx-auto bg-slate-800 border border-slate-700 aspect-square">
                <img 
                  src={mode.exampleImages.before} 
                  alt="Example before" 
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
            
            <RightArrowIcon className="w-8 h-8 sm:w-12 sm:h-12 text-slate-500 flex-shrink-0" />
            
            <div className="flex-1 text-center">
              <p className="font-bold text-slate-300 mb-2">After</p>
              <div className="rounded-lg shadow-lg w-full max-w-xs mx-auto bg-slate-800 border border-slate-700 aspect-square flex items-center justify-center">
                {isGenerating && <Spinner />}
                {error && <p className="text-red-400 text-sm p-2">{error}</p>}
                {afterImage && !isGenerating && !error && (
                  <img 
                    src={afterImage} 
                    alt="Example after" 
                    className="rounded-lg w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
          {mode.examplePrompt && (
            <div className="mt-6 text-center max-w-lg mx-auto">
              <p className="text-sm text-slate-400 mb-2 font-semibold">Example Prompt:</p>
              <blockquote className="bg-slate-800/50 border-l-4 border-purple-500 text-slate-300 p-4 rounded-r-lg text-left italic shadow-inner">
                {mode.examplePrompt}
              </blockquote>
            </div>
          )}
        </div>
      )}

      <p className="text-lg text-slate-300 mt-4 font-semibold">
        &larr; Upload an image on the left to get started!
      </p>
    </div>
  );
};

export default ModeIntroduction;
