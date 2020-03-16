import React, { FC, useEffect, useState } from 'react';
import { getStyledComponentThemeProperty, useThemeState } from '../context/themeState';

import { StyledComponentThemeProp } from '../constants/theme';
import styled from 'styled-components';
import { useGameState } from '../context/gameState';
import { useWindowSize } from '../helpers/useWindowSize';

const Grid = styled.div<{ rowSize: number }>`
  display: grid;
  grid-template-columns: repeat(${({ rowSize }) => rowSize}, 1fr);
  grid-auto-rows: 1fr;
  width: 100vw;
`;

const Cell = styled.div<StyledComponentThemeProp & { opacity: number }>`
  align-self: center;
  justify-self: center;
  transition: color ${getStyledComponentThemeProperty('fastTransition')};
  opacity: ${({ opacity }) => opacity};
`;

const PlaceholderDot = styled.div<StyledComponentThemeProp>`
  background-color: ${getStyledComponentThemeProperty('digitBackgroundColor')};
  border-radius: 50%;
  height: min(max(1.4vw, 12px), 18px);
  width: min(max(1.4vw, 12px), 18px);
  transition: background ${getStyledComponentThemeProperty('fastTransition')};
`;

/** The minimum number of digits to appear in a row */
const MINIMUM_ROW_SIZE = 20;
/** The minimum size of a digit cell that makes up a row */
const MINIMUM_CELL_WIDTH = 24;

/**
 * Hook that computes a reasonable number of digits to appear in each row given the window size
 */
const useRowSize = () => {
  const [rowSize, setRowSize] = useState(20);

  const windowSize = useWindowSize();

  useEffect(() => {
    const newRowSize = windowSize.width
      ? Math.max(MINIMUM_ROW_SIZE, Math.ceil(windowSize.width / MINIMUM_CELL_WIDTH))
      : MINIMUM_ROW_SIZE;
    setRowSize(newRowSize);
  }, [windowSize]);

  return rowSize;
};

/**
 * Computes a relative opacity given the row number such that the earlier the row in pi, the
 * lighter it appears in color
 *
 * @param currentRow the row for which to compute the opacity
 * @param totalRows the total number of rows, which determines the relative opacity for the
 *    current row
 */
const getOpacity = (currentRow: number, totalRows: number) => (currentRow + 0.5) / totalRows;

const RecordedDigits: FC = () => {
  const { recordedDigits } = useGameState();
  const { theme } = useThemeState();
  // Split the recorded digits into an array whose first item is the leading "3." of pi
  const recordedDigitsArray = ['3.'].concat(recordedDigits.split(''));

  // Get the number of digits to show per row
  const rowSize = useRowSize();

  /**
   * Builds a 2D array of Cells for the given list of digits, splitting digits into rows of
   * Cells according to the number of digits to show row size
   *
   * @param digits the pi digits to map across
   */
  const mapDigitsToCells = (digits: string[]): ReturnType<typeof Cell>[][] => {
    const digitsSplitToRows: string[][] = [];
    // Breaks single digits array into 2D array of arrays of size `rowSize`
    while (digits.length > 0) digitsSplitToRows.push(digits.splice(0, rowSize));
    // Remember the total number of digits rows
    const totalRows = digitsSplitToRows.length;
    // Map each row of digits to a row of Cells
    return digitsSplitToRows.map((digitsRow, index) => mapRowToCells(digitsRow, index, totalRows));
  };

  /**
   * Fills a full (size `rowSize`) array of Cells for the given list of digits
   *
   * @param digits the row of pi digits to map across
   * @param rowNumber the current row number in the grid of pi digits
   * @param totalRows the total number of rows of pi digits in the grid
   */
  const mapRowToCells = (
    digits: string[],
    rowNumber: number,
    totalRows: number,
  ): ReturnType<typeof Cell>[] =>
    digits
      .map((digit, index) => (
        <Cell currentTheme={theme} key={index} opacity={getOpacity(rowNumber, totalRows)}>
          {digit}
        </Cell>
      ))
      // Fill the rest of the row with empty Cells
      .concat(fillRowRemainingCells((rowSize - digits.length) % rowSize, rowNumber, totalRows));

  /**
   * Builds an array of placeholder Cells to fill in gaps in a row of digits
   *
   * @param numberOfCells the number of Cells needed to fill a row of digits
   * @param rowNumber the current row number in the grid of pi digits
   * @param totalRows the total number of rows of pi digits in the grid
   */
  const fillRowRemainingCells = (
    numberOfCells: number,
    rowNumber: number,
    totalRows: number,
  ): ReturnType<typeof Cell>[] =>
    Array(numberOfCells)
      .fill('')
      .map((_cell, index) => (
        <Cell
          currentTheme={theme}
          key={`${rowNumber}.${index}`}
          opacity={getOpacity(rowNumber, totalRows)}
        >
          <PlaceholderDot currentTheme={theme} />
        </Cell>
      ));

  return <Grid rowSize={rowSize}>{mapDigitsToCells(recordedDigitsArray)}</Grid>;
};

export default RecordedDigits;
