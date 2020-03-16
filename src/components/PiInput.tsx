import { FeedbackType, useFeedbackDispatch } from '../context/feedbackState';
import { PiDigit, isPiDigit } from '../helpers/piDigits';
import React, { FC } from 'react';
import { getEncouragementMessage, shouldSendEncouragement } from '../helpers/messages';
import { useGameDispatch, useGameState } from '../context/gameState';

import Input from './Input';
import { getTryAgainMessage } from '../helpers/messages';
import { validateDigit } from '../helpers/validateDigit';

const PiInput: FC = () => {
  const { digitIndex } = useGameState();
  const dispatchPi = useGameDispatch();
  const dispatchFeedback = useFeedbackDispatch();

  /** Clear the current feedback message */
  const clearFeedback = () => dispatchFeedback({ type: '@feedback-state/clear-feedback' });

  /** Set a feedback error message */
  const setError = (message: string) =>
    dispatchFeedback({
      payload: { message, type: FeedbackType.Error },
      type: '@feedback-state/set-feedback',
    });

  /** Set a feedback encouragement message */
  const setEncouragement = (message: string) =>
    dispatchFeedback({
      payload: { message, type: FeedbackType.Encouragement },
      type: '@feedback-state/set-feedback',
    });

  /** Record a new (correct) digit of pi and save progress to local storage */
  const recordDigit = (newDigit: PiDigit) => {
    dispatchPi({ payload: { newDigit }, type: '@game-state/record-digit' });
  };

  /** Record a new high score and congr */

  /** Handles next digit input, checking for errors, and returns whether or not the next digit
   * should be committed
   */
  const shouldCommitInput = (nextDigit: string) => {
    // Clear out existing error
    clearFeedback();

    // If nextDigit is not a PiDigit (e.g. inputting 'a')
    if (!isPiDigit(nextDigit)) {
      setError(`That's not a number!`);
      // Do not accept a non-digit as input
      return false;
    }

    // If the next digit isn't the right digit
    if (!validateDigit(nextDigit, digitIndex)) {
      setError(getTryAgainMessage());
      // Even if nextDigit is not the correct digit, we still accept it as input
      return true;
    }

    // Digit is correct
    // Maybe send encouragement
    if (shouldSendEncouragement(digitIndex)) {
      setEncouragement(getEncouragementMessage(digitIndex));
    }
    // Record the correct nextDigit and accept it as input
    recordDigit(nextDigit);
    return true;
  };

  return <Input onBlur={clearFeedback} shouldCommitInput={shouldCommitInput} />;
};

export default PiInput;
