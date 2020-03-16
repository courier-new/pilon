import { FeedbackProvider } from './feedbackState';
import { GameProvider } from './gameState';
import React from 'react';
import { ThemeProvider } from './themeState';

const CombinedProvider = ({ children }: { children: React.ReactNode }) => (
  <FeedbackProvider>
    <GameProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </GameProvider>
  </FeedbackProvider>
);

export default CombinedProvider;
