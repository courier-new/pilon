import { Action, Dispatch } from '../action';
import {
  DARK_THEME_COLORS,
  LIGHT_THEME_COLORS,
  THEME_VARIABLES,
  Theme,
  ThemeProperty,
} from '../constants/theme';
import React, { createContext, useReducer } from 'react';

import useDefinedContext from '../hooks/useDefinedContext';

type ThemeAction = Action<'@theme-state/toggle-mode'>;
type ThemeDispatch = Dispatch<ThemeAction>;

type ThemeMode = '@theme-state/dark' | '@theme-state/light';
type ThemeState = {
  mode: ThemeMode;
  theme: Theme;
};

const ThemeStateContext = createContext<ThemeState | undefined>(undefined);
const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(undefined);

export const useThemeState = () => useDefinedContext(ThemeStateContext);
export const useThemeDispatch = () => useDefinedContext(ThemeDispatchContext);

/**
 * Returns the toggled theme mode (light or dark)
 *
 * @param theme the current theme mode (dark or light)
 */
const toggleThemeMode = (theme: ThemeMode): ThemeMode =>
  theme === '@theme-state/dark' ? '@theme-state/light' : '@theme-state/dark';

/**
 * Returns the theme with toggled colors
 *
 * @param theme the current theme mode (dark or light)
 */
const toggleTheme = (theme: ThemeMode): Theme => ({
  colors: theme === '@theme-state/dark' ? LIGHT_THEME_COLORS : DARK_THEME_COLORS,
  variables: THEME_VARIABLES,
});

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case '@theme-state/toggle-mode':
      return {
        ...state,
        mode: toggleThemeMode(state.mode),
        theme: toggleTheme(state.mode),
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: '@theme-state/light',
    theme: {
      colors: LIGHT_THEME_COLORS,
      variables: THEME_VARIABLES,
    },
  });
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

/**
 * Type guard for object key presence; returns true if the key is present as a field on the object
 *
 * #### Examples:
 *
 * `isKeyOf('name', { name: 'Kelli' })` => true
 *
 * `isKeyOf('name', { firstName: 'Kelli', lastName: 'Rockwell' })` => false
 *
 * @param key the key to check for in the object
 * @param object the object for which to check the key field
 */
function isKeyOf<Obj>(key: string | number | symbol, object: Obj): key is keyof Obj {
  return Object.keys(object).includes(key.toString());
}

/**
 * Helper to quickly get the value for a Theme property
 *
 * @param theme the Theme
 * @param key the property of the Theme to get
 */
const getThemeProperty = (theme: Theme, property: ThemeProperty) =>
  isKeyOf(property, theme.colors) ? theme.colors[property] : theme.variables[property];

/**
 * Composed helper to apply in styled-components to quickly get the value for a Theme
 * property
 *
 * @param property the property of the Theme to get for composition in a styled-component
 */
export const getStyledComponentThemeProperty = (property: ThemeProperty) => ({
  currentTheme,
}: {
  currentTheme: Theme;
}) => getThemeProperty(currentTheme, property);
