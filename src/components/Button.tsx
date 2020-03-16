import React, { FC } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from '../context/themeState';

import { StyledComponentThemeProp } from '../constants/theme';
import styled from 'styled-components';

type ColorProp = { color: string };

const StyledButton = styled.button<StyledComponentThemeProp & ColorProp>`
  background-color: ${({ color }) => color};
  border: 2px solid ${({ color }) => color};
  color: ${getStyledComponentThemeProperty('backgroundColor')};
  font-size: ${getStyledComponentThemeProperty('buttonFontSize')};
  font-weight: bold;
  border-radius: 1vh;
  padding: ${getStyledComponentThemeProperty('blockPadding')};
  margin: ${getStyledComponentThemeProperty('blockMargin')};
  transition: background ${getStyledComponentThemeProperty('fastTransition')};

  &:focus {
    outline: none;
    text-decoration: underline;
  }

  &:hover {
    background: ${getStyledComponentThemeProperty('textColor')};
    border-color: ${getStyledComponentThemeProperty('textColor')};
    color: ${({ color }) => color};
  }
`;

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ColorProp> = ({
  children,
  ...props
}) => {
  const { theme } = useThemeState();

  return (
    <StyledButton currentTheme={theme} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
