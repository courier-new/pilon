import React, { FC } from 'react';

import Label from './Label';
import { useGameState } from '../context/gameState';

const DigitCount: FC = () => {
  const { digitIndex } = useGameState();

  return (
    <Label>
      {`You're on digit `}
      <span style={{ fontWeight: 'bold' }}>{digitIndex}</span>.
    </Label>
  );
};

export default DigitCount;
