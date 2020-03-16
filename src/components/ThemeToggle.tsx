import React, { FC } from 'react';
import { useThemeDispatch, useThemeState } from '../context/themeState';

import Button from './Button';

const ThemeToggle: FC = () => {
  const { mode, theme } = useThemeState();
  const dispatch = useThemeDispatch();

  const buttonModeText = mode === '@theme-state/dark' ? 'Light Mode' : 'Dark Mode';

  const onClick = () => dispatch({ type: '@theme-state/toggle-mode' });

  return (
    <Button color={theme.colors.primaryAccentColor} onClick={onClick}>
      Switch to {buttonModeText}
    </Button>
  );
};

export default ThemeToggle;
