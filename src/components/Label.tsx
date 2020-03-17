import React, { FC } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from '../context/themeState';

import { StyledComponentThemeProp } from '../constants/theme';
import styled from 'styled-components';

const StyledLabel = styled.label<StyledComponentThemeProp>`
  display: block;
  font-size: ${getStyledComponentThemeProperty('labelFontSize')};

  @media (max-width: 800px) {
    font-size: ${getStyledComponentThemeProperty('mobileLabelFontSize')};
  }
`;

const Label: FC<React.ButtonHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => {
  const { theme } = useThemeState();

  return (
    <StyledLabel currentTheme={theme} htmlFor="pi digit" {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;
