'use client';

import {
  Button,
  Keyboard as KeyboardUI,
  KeyboardRow,
  Key,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { useHangmanContext } from '../../hooks/useHangmanContext';

function Keyboard({ data }: any) {
  const { isGuessed, selectedCategory, handleIsGuessed, handleGuess } =
    useHangmanContext();

  return (
    <KeyboardUI>
      {data.keyboard.keys.map((row: any) => (
        <KeyboardRow key={row.row}>
          {row.key.map((key: any) => (
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
