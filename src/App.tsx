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

const App: FC = () => (
  <CombinedProvider>
    <Container>
      <Background>
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
    </Container>
  </CombinedProvider>
);

const Container: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { theme } = useThemeState();

  return <StyledContainer currentTheme={theme}>{children}</StyledContainer>;
};

const StyledContainer = styled.div<StyledComponentThemeProp>`
  text-align: center;
  background-color: ${getStyledComponentThemeProperty('backgroundColor')};
  min-height: 100vh;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 0fr 1fr;
  grid-gap: 2vmin;
  font-size: ${getStyledComponentThemeProperty('bodyFontSize')};
  color: ${getStyledComponentThemeProperty('textColor')};
  transition: background ${getStyledComponentThemeProperty('slowTransition')},
    color ${getStyledComponentThemeProperty('slowTransition')};

  * {
    font-family: ${getStyledComponentThemeProperty('bodyFont')};
  }
`;

const Background = styled.div`
  position: absolute;
  height: 100vh;
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
