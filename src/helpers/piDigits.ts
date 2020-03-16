/** PiDigits is a string of digits of any length representing digits of pi */
export type PiDigits = string & { _brand: '@brand/pi-digits' };
/** PiDigit is a PiDigits of length 1 representing a single digit of pi */
export type PiDigit = PiDigits & { _brand: '@brand/pi-digits' };

const DIGITS_REGEX = /^\d+$/;

/**
 * Turns a known PiDigits string into a PiDigits type
 *
 * @param digits the (string) digits to cast to PiDigits
 */
export const asPiDigits = (digits: string) => digits as PiDigits;

/**
 * Type guard for PiDigits; returns true if the provided string could represent digits of pi
 *
 * #### Examples:
 *
 * `isPiDigits('')` => true
 *
 * `isPiDigits('1')` => true
 *
 * `isPiDigits('1234')` => true
 *
 * `isPiDigits('abc')` => false
 *
 * `isPiDigits('a123b`) => false
 *
 * @param digits the (string) digits to check
 */
export const isPiDigits = (digits: string): digits is PiDigits => {
  return digits.replace(DIGITS_REGEX, '') === '';
};

/**
 * Type guard for PiDigit; returns true if the provided string is a single digit of PiDigits
 *
 * #### Examples:
 *
 * `isPiDigit('1')` => true
 *
 * `isPiDigit('a')` => false
 *
 * `isPiDigit('1234')` => false
 *
 * @param digit the (string) digit to check
 */
export const isPiDigit = (digit: string): digit is PiDigit => {
  return digit.length === 1 && isPiDigits(digit);
};
