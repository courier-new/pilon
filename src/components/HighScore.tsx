import React, { FC } from 'react';

import Label from './Label';
import { useGameState } from '../context/gameState';
import { useThemeState } from '../context/themeState';

const HighScore: FC = () => {
  const { highScore } = useGameState();
  const { theme } = useThemeState();

  return (
    <Label color={theme.colors.secondaryAccentColor}>
      Your high score is{' '}
      <span style={{ color: theme.colors.secondaryAccentColor, fontWeight: 'bold' }}>
        {highScore}
      </span>
      .
    </Label>
  );
};

export default HighScore;
