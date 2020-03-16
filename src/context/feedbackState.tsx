import { Action, Dispatch } from '../action';
import React, { createContext, useReducer } from 'react';

import useDefinedContext from '../hooks/useDefinedContext';

export enum FeedbackType {
  Encouragement = '@feedback-type/encouragement',
  Error = '@feedback-type/error',
  Info = '@feedback-type/info',
}

type FeedbackAction =
  | Action<'@feedback-state/set-feedback', { message: string; type: FeedbackType }>
  | Action<'@feedback-state/clear-feedback'>;
type FeedbackDispatch = Dispatch<FeedbackAction>;
type FeedbackState = null | {
  message: string;
  type: FeedbackType;
};

const FeedbackStateContext = createContext<FeedbackState | undefined>(undefined);
const FeedbackDispatchContext = createContext<FeedbackDispatch | undefined>(undefined);

export const useFeedbackState = () => useDefinedContext(FeedbackStateContext);
export const useFeedbackDispatch = () => useDefinedContext(FeedbackDispatchContext);

const feedbackReducer = (state: FeedbackState, action: FeedbackAction): FeedbackState => {
  switch (action.type) {
    case '@feedback-state/set-feedback': {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    }
    case '@feedback-state/clear-feedback': {
      return null;
    }
    default:
      return state;
  }
};

export const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(feedbackReducer, null);
  return (
    <FeedbackStateContext.Provider value={state}>
      <FeedbackDispatchContext.Provider value={dispatch}>
        {children}
      </FeedbackDispatchContext.Provider>
    </FeedbackStateContext.Provider>
  );
};
