import { Action, Dispatch } from '../action';
import { PiDigit, PiDigits, asPiDigits } from '../helpers/piDigits';
import React, { createContext, useEffect, useReducer } from 'react';

import useDefinedContext from '../hooks/useDefinedContext';
import { useLocalStorage } from '../helpers/useLocalStorage';

type GameAction =
  | Action<'@game-state/record-digit', { newDigit: PiDigit }>
  | Action<'@game-state/restart-game'>;
// | Action<'@game-state/record-high-score', { newHighScore: number }>;
type GameDispatch = Dispatch<GameAction>;
type GameState = {
  digitIndex: number;
  highScore?: number;
  recordedDigits: PiDigits;
};

const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<GameDispatch | undefined>(undefined);

export const useGameState = () => useDefinedContext(GameStateContext);
export const useGameDispatch = () => useDefinedContext(GameDispatchContext);

const INITIAL_STATE: GameState = {
  digitIndex: 0,
  recordedDigits: asPiDigits(''),
};

const isHighScore = (currentScore: number, state: GameState): boolean => {
  if (state.highScore) return currentScore > state.highScore;
  return true;
};

const checkHighScore = (currentScore: number, state: GameState): GameState => {
  if (isHighScore(currentScore, state) && currentScore > 2) {
    return { ...state, highScore: currentScore };
  } else return state;
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case '@game-state/record-digit': {
      // Increment digit index
      const newDigitIndex = state.digitIndex + 1;

      const stateWithUpdatedHighScore = checkHighScore(newDigitIndex, state);
      console.log(stateWithUpdatedHighScore.highScore);

      return {
        ...stateWithUpdatedHighScore,
        digitIndex: newDigitIndex,
        recordedDigits: asPiDigits(state.recordedDigits + action.payload.newDigit),
      };
    }
    case '@game-state/restart-game': {
      return {
        ...INITIAL_STATE,
        highScore: state.highScore,
      };
    }
    default:
      return state;
  }
};

/**
 * Typeguard for GameState; returns true if the provided state is a GameState
 *
 * @param state the state to verify
 */
const isGameState = (state?: {}): state is GameState => {
  const keys = Object.keys(state || {});
  return keys.includes('digitIndex') && keys.includes('recordedDigits');
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Look for pi in local storage first
  const [initialState, saveStateToLocalStorage] = useLocalStorage('pi', INITIAL_STATE, isGameState);

  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => saveStateToLocalStorage(state), [state]);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
