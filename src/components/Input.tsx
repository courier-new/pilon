import React, { FC, useEffect, useRef, useState } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from '../context/themeState';

import { StyledComponentThemeProp } from '../constants/theme';
import styled from 'styled-components';

const StyledInput = styled.input<StyledComponentThemeProp>`
  background: ${getStyledComponentThemeProperty('textColor')};
  border: none;
  border-bottom: 1.2vh solid ${getStyledComponentThemeProperty('borderColor')};
  caret-color: ${getStyledComponentThemeProperty('primaryAccentColor')};
  color: ${getStyledComponentThemeProperty('backgroundColor')};
  font-size: ${getStyledComponentThemeProperty('inputFontSize')};
  height: ${getStyledComponentThemeProperty('inputHeight')};
  margin-bottom: 1.2vh;
  text-align: center;
  transition: background ${getStyledComponentThemeProperty('fastTransition')},
    border ${getStyledComponentThemeProperty('fastTransition')};

  @media (max-width: 800px) {
    font-size: ${getStyledComponentThemeProperty('mobileInputFontSize')};
    height: ${getStyledComponentThemeProperty('mobileInputHeight')};
  }

  &:focus {
    border-color: ${getStyledComponentThemeProperty('primaryAccentColor')};
    outline: none;
  }
`;

type InputProps = {
  onBlur: () => void;
  /** Performs validation on input and returns true if input should be committed to state */
  shouldCommitInput: (input: string) => boolean;
};

const Input: FC<InputProps> = ({ onBlur, shouldCommitInput }) => {
  const [currentValue, setCurrentValue] = useState('');
  const { theme } = useThemeState();

  // Focus the input element on first render
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef?.current?.focus(), []);

  const setInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    // The next value input is the whole (combined) value minus the current value
    const nextValue = value.replace(currentValue, '');
    const shouldCommit = shouldCommitInput(nextValue);
    setCurrentValue(shouldCommit ? nextValue : '');
  };

  return (
    <StyledInput
      ref={inputRef}
      onChange={setInput}
      onBlur={onBlur}
      size={1}
      value={currentValue}
      currentTheme={theme}
    />
  );
};

export default Input;
