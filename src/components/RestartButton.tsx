import React, { FC } from 'react';

import Button from './Button';
import { useGameDispatch } from '../context/gameState';
import { useThemeState } from '../context/themeState';

const RestartButton: FC = () => {
  const { theme } = useThemeState();
  const dispatch = useGameDispatch();

  const onClick = () => dispatch({ type: '@game-state/restart-game' });

  return (
    <Button color={theme.colors.errorColor} onClick={onClick}>
      Restart
    </Button>
  );
};

export default RestartButton;
