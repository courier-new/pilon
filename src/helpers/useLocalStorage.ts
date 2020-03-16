import { useState } from 'react';

/**
 * Hook to keep and save app state to local storage
 *
 * Loosely based on https://usehooks.com/useLocalStorage/
 *
 * @param key the key under which to store the app state in local storage
 * @param defaultValue the value to use if no app state is found in local storage yet
 * @param isState type guard to validate the form of app state found in local storage
 */
export function useLocalStorage<State>(
  key: string,
  defaultValue: State,
  isState: (state: State) => state is State,
): [State, (newState: State) => void] {
  // State to store app state
  // Pass initial state function to useState so logic is only executed once
  const [storedState, setStoredState] = useState(() => {
    try {
      // Look for state in local storage
      const rawLocalState = localStorage.getItem(key);
      const localState = rawLocalState ? JSON.parse(rawLocalState) : {};
      // If we have local app state, use that
      if (isState(localState)) return localState;
      // Otherwise use the initial state
      return defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  // Wrap useState to also persist state to local storage
  const saveState = (newState: State) => {
    setStoredState(newState);
    // Also save to local storage
    localStorage.setItem(key, JSON.stringify(newState));
  };

  return [storedState, saveState];
}
