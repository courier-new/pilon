import { FeedbackType, useFeedbackState } from '../context/feedbackState';
import React, { FC } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from '../context/themeState';

import { StyledComponentThemeProp } from '../constants/theme';
import styled from 'styled-components';

const Feedback: FC = () => {
  const { theme } = useThemeState();
  const feedback = useFeedbackState();

  const FEEDBACK_COLORS: { [type in FeedbackType]: string } = {
    [FeedbackType.Encouragement]: theme.colors.primaryAccentColor,
    [FeedbackType.Error]: theme.colors.errorColor,
    [FeedbackType.Info]: theme.colors.borderColor,
  };

  if (feedback) {
    const { message, type } = feedback;
    const feedbackColor = FEEDBACK_COLORS[type];
    return (
      <>
        <FeedbackCaret backgroundColor={feedbackColor} currentTheme={theme} />
        <FeedbackBox backgroundColor={feedbackColor} currentTheme={theme}>
          {message}
        </FeedbackBox>
      </>
    );
  } else {
    return null;
  }
};

const FeedbackBox = styled.div<StyledComponentThemeProp & { backgroundColor: string }>`
  color: ${getStyledComponentThemeProperty('backgroundColor')};
  border-radius: 1vw;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: ${getStyledComponentThemeProperty('noteFontSize')};
  padding: ${getStyledComponentThemeProperty('blockPadding')};
  text-align: left;
  z-index: 2;

  @media (max-width: 800px) {
    font-size: ${getStyledComponentThemeProperty('mobileLabelFontSize')};
  }
`;

const FeedbackCaret = styled.div<StyledComponentThemeProp & { backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 20px;
  margin-bottom: 0.5vh;
  transform: rotate(45deg) skew(-20deg, -20deg);
  position: absolute;
  bottom: 0.2vh;
  left: -5px;
  width: 20px;
`;

export default Feedback;
