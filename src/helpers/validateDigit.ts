import { PiDigit } from './piDigits';
import pi from '../constants/pi';

/**
 * Validates if the digit provided is the correct digit at the index provided in pi
 *
 * #### Examples:
 *
 * `validateDigit('1', 0)` => true (the '1' in '3.14')
 *
 * `validateDigit('4', 1)` => true (the '4' in '3.14')
 *
 * `validateDigit('2', 0)` => false
 *
 * @param digit the digit to check against pi
 * @param index the index of the digit to check in pi
 */
export const validateDigit = (digit: PiDigit, index: number) => pi.charAt(index) === digit;
