export type Theme = {
  colors: ThemeColors;
  variables: ThemeVariables;
};

export type ThemeProperty = keyof ThemeColors | keyof ThemeVariables;

/** Color scheme used within the app */
enum Color {
  DarkBlue = '#2176FF',
  DarkGray = '#31393C',
  DarkYellow = '#E5AA22',
  LightBlue = '#33A1FD',
  LightGray = '#ECEDED',
  LightYellow = '#FDCA40',
  MediumGray = '#B8B8B8',
  MediumDarkGray = '#414C50',
  MediumLightGray = '#D0D1D1',
  Red = '#DE3F2C',
  SuperDarkGray = '#1D2123',
}

/** Color theme for dark mode */
export const DARK_THEME_COLORS = {
  backgroundColor: Color.DarkGray,
  borderColor: Color.SuperDarkGray,
  digitBackgroundColor: Color.MediumDarkGray,
  errorColor: Color.Red,
  primaryAccentColor: Color.DarkBlue,
  secondaryAccentColor: Color.LightYellow,
  textColor: Color.LightGray,
};

type ThemeColors = typeof DARK_THEME_COLORS;

/** Color theme for light mode */
export const LIGHT_THEME_COLORS: ThemeColors = {
  backgroundColor: Color.LightGray,
  borderColor: Color.MediumGray,
  digitBackgroundColor: Color.MediumLightGray,
  errorColor: Color.Red,
  primaryAccentColor: Color.LightBlue,
  secondaryAccentColor: Color.DarkYellow,
  textColor: Color.DarkGray,
};

/** Other design system variables used within the app */
export const THEME_VARIABLES = {
  blockHorizontalPadding: '1.5vh',
  blockMargin: '1vh',
  blockPadding: '1vh 1.5vh',
  blockVerticalPadding: '1vh',
  bodyFont: `'Baloo 2', cursive`,
  bodyFontSize: 'calc(10px + 2vh)',
  buttonFontSize: 'max(1.8vh, 14px)',
  fastTransition: '0.1s',
  headerFont: `'Abril Fatface'`,
  inputFontSize: '14vh',
  inputHeight: '18vh',
  labelFontSize: '1.5vh',
  mobileInputFontSize: '18vh',
  mobileInputHeight: '23vh',
  mobileLabelFontSize: '2vh',
  noteFontSize: '2.5vh',
  slowTransition: '0.8s',
};

export type ThemeVariables = typeof THEME_VARIABLES;

export type StyledComponentThemeProp = { currentTheme: Theme };
