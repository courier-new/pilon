const TRY_AGAIN_MESSAGES = [
  'Try again!',
  'Not quite!',
  `That doesn't look quite right.`,
  `Try a different number!`,
  `Hmm, nope!`,
];

/**
 * Returns a random 'Try again!' type of message
 */
export const getTryAgainMessage = () => {
  const index = Math.floor(Math.random() * TRY_AGAIN_MESSAGES.length);
  return TRY_AGAIN_MESSAGES[index];
};

/**
 * Returns true if the successful input of the current digit should prompt encouragement
 *
 * @param digitIndex the current digit being checked
 */
export const shouldSendEncouragement = (digitIndex: number) =>
  digitIndex !== 0 && (digitIndex + 1) % 10 === 0;

const DIGIT_INDEX_PLACEHOLDER = '#{index}';

const ENCOURAGEMENT_MESSAGES = [
  // Give extra weight to messages that feature the digits count
  `${DIGIT_INDEX_PLACEHOLDER} down, ∞ to go!`,
  `${DIGIT_INDEX_PLACEHOLDER} down, ∞ to go!`,
  `You're on a roll!`,
  `You're up to ${DIGIT_INDEX_PLACEHOLDER}!`,
  `You're up to ${DIGIT_INDEX_PLACEHOLDER}!`,
  `You're up to ${DIGIT_INDEX_PLACEHOLDER}!`,
  `You're up to ${DIGIT_INDEX_PLACEHOLDER}!`,
  'Keep it up!',
  `Wow, that's a lot of digits!`,
];

/**
 * Returns a random encouragement type of message
 *
 * @param digitIndex the current digit to be interpolated with the encouragement
 */
export const getEncouragementMessage = (digitIndex: number) => {
  const index = Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length);
  return ENCOURAGEMENT_MESSAGES[index].replace(
    DIGIT_INDEX_PLACEHOLDER,
    (digitIndex + 1).toString(),
  );
};
