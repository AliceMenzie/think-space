'use client';

import {
  Button,
  Keyboard as KeyboardUI,
  KeyboardRow,
  Key,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { useHangmanContext } from '../../hooks/useHangmanContext';
import { Data, KeyboardKey, TKeyboardRow } from '../../types';

interface KeyboardProps {
  data: Data;
}

function Keyboard({ data }: KeyboardProps) {
  const { isGuessed, selectedCategory, handleIsGuessed, handleGuess } =
    useHangmanContext();

  return (
    <KeyboardUI>
      {data.keyboard.keys.map((row: TKeyboardRow) => (
        <KeyboardRow key={row.row}>
          {row.key.map((key: KeyboardKey) => (
            <Key key={key.label}>
              <Button
                size={'responsive'}
                disabled={
                  !selectedCategory || handleIsGuessed(key.label) || isGuessed
                }
                onClick={() => handleGuess(key.label.toUpperCase())}
              >
                {key.label}
              </Button>
            </Key>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardUI>
  );
}
export default Keyboard;
