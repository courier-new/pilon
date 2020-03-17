import React, { FC, useEffect, useRef, useState } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from '../context/themeState';

import { StyledComponentThemeProp } from '../constants/theme';
import styled from 'styled-components';

const StyledInput = styled.input<StyledComponentThemeProp>`
  background: ${getStyledComponentThemeProperty('textColor')};
  border: none;
  border-bottom: 14px solid ${getStyledComponentThemeProperty('borderColor')};
  caret-color: ${getStyledComponentThemeProperty('primaryAccentColor')};
  color: ${getStyledComponentThemeProperty('backgroundColor')};
  font-size: ${getStyledComponentThemeProperty('inputFontSize')};
  height: ${getStyledComponentThemeProperty('inputHeight')};
  margin-bottom: 14px;
  max-width: 160px;
  text-align: center;
  transition: background ${getStyledComponentThemeProperty('fastTransition')},
    border ${getStyledComponentThemeProperty('fastTransition')};

  @media (max-width: 800px) {
    font-size: ${getStyledComponentThemeProperty('mobileInputFontSize')};
    height: ${getStyledComponentThemeProperty('mobileInputHeight')};
    max-width: 180px;
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
      currentTheme={theme}
      inputMode="numeric"
      onBlur={onBlur}
      onChange={setInput}
      ref={inputRef}
      size={1}
      value={currentValue}
    />
  );
};

export default Input;
