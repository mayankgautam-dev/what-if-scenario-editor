import React from 'react';

export interface Mode {
  id: string;
  title: string;
  description: string;
  // FIX: Changed icon type to be more specific to a React element that accepts a className prop.
  // This resolves type errors when using React.cloneElement to override styles.
  icon: React.ReactElement<{ className?: string }>;
  analysisPrompt: string;
  placeholderPrompt: string;
  aboutText?: string;
  exampleImages?: {
    before: string;
  };
  examplePrompt?: string;
}

export interface Suggestion {
  title: string;
  prompt: string;
}
