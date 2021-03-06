import './fonts.css';

import React, { FC, PropsWithChildren } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from './context/themeState';

import CombinedProvider from './context/index';
import DigitCount from './components/DigitCount';
import Feedback from './components/Feedback';
import HighScore from './components/HighScore';
import PiInput from './components/PiInput';
import RecordedDigits from './components/RecordedDigits';
import RestartButton from './components/RestartButton';
import { StyledComponentThemeProp } from './constants/theme';
import ThemeToggle from './components/ThemeToggle';
import styled from 'styled-components';
import { useWindowSize } from './helpers/useWindowSize';

const App: FC = () => (
  <CombinedProvider>
    <AppContainer />
  </CombinedProvider>
);

const AppContainer: FC = () => {
  const { theme } = useThemeState();
  const { height } = useWindowSize();

  return (
    <StyledContainer currentTheme={theme} windowHeight={height}>
      <Background windowHeight={height}>
        <RecordedDigits />
      </Background>
      <StyledHeader />
      <StyledLeft />
      <StyledCenter>
        <PiInput />
        <DigitCount />
        <HighScore />
      </StyledCenter>
      <StyledRight>
        <Feedback />
      </StyledRight>
      <StyledFooter>
        <ThemeToggle />
        <RestartButton />
      </StyledFooter>
    </StyledContainer>
  );
};

type WindowHeightProp = { windowHeight?: number };
const getWindowHeight = ({ windowHeight }: WindowHeightProp) => windowHeight + 'px' || '100vh';

const StyledContainer = styled.div<StyledComponentThemeProp & WindowHeightProp>`
  text-align: center;
  background-color: ${getStyledComponentThemeProperty('backgroundColor')};
  min-height: ${getWindowHeight};
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  grid-gap: 2vmin;
  font-size: ${getStyledComponentThemeProperty('bodyFontSize')};
  color: ${getStyledComponentThemeProperty('textColor')};
  transition: background ${getStyledComponentThemeProperty('slowTransition')},
    color ${getStyledComponentThemeProperty('slowTransition')};
  }

  * {
    font-family: ${getStyledComponentThemeProperty('bodyFont')};
  }
`;

const Background = styled.div<WindowHeightProp>`
  position: absolute;
  min-height: ${getWindowHeight};
  width: 100vw;
`;

const StyledHeader = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1 / 1;
  margin-top: 2vh;
  z-index: 1;
`;

const StyledFooter = styled.div`
  align-self: end;
  grid-column: 1 / span 3;
  grid-row: 3 / 3;
  margin-bottom: 2vh;
  z-index: 1;
`;

const StyledCenter = styled.div`
  align-self: center;
  grid-column: 2 / 2;
  grid-row: 2 / 2;
  z-index: 1;
`;

const StyledLeft = styled.div`
  align-self: center;
  justify-self: end;
  grid-column: 1 / 1;
  grid-row: 2 / 2;
  margin: 0 2vh;
  z-index: 1;
`;

const StyledRight = styled.div`
  align-items: flex-end;
  align-self: center;
  display: flex;
  justify-self: start;
  flex-direction: row;
  grid-column: 3 / 3;
  grid-row: 2 / 2;
  margin: 0 2vh;
  position: relative;
  z-index: 1;
`;

export default App;
