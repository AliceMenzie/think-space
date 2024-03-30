'use client';

import React from 'react';
import {
  Button,
  Keyboard as KeyboardUI,
  KeyboardRow,
  Key,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { Categories } from '../../types';
import { useHangmanContext } from '../../hooks/useHangmanContext';
import { Data, KeyboardKey, TKeyboardRow } from '../../types';

interface KeyboardProps {
  data: Data;
}

function Keyboard({ data }: KeyboardProps) {
  const {
    isGuessed,
    isStreak,
    selectedCategory,
    livesCount,
    handleTriggerAlert,
    handleIsGuessed,
    handleGuess,
    handleSelectedCategory,
  } = useHangmanContext();

  return (
    <KeyboardUI>
      {data.keyboard.keys.map((row: TKeyboardRow, index) => (
        <KeyboardRow key={row.row}>
          {row.key.map((key: KeyboardKey) => (
            <React.Fragment key={key.code}>
              <Button
                size={'responsive'}
                disabled={
                  !selectedCategory || handleIsGuessed(key.label) || isGuessed
                }
                onClick={() => handleGuess(key.label.toUpperCase())}
              >
                {key.label}
              </Button>
            </React.Fragment>
          ))}
          {index === 2 && (
            <div className="flex flex-col flex-1 gap-3 place-items-end">
              {!isGuessed && selectedCategory && (
                <Button
                  size={'responsive'}
                  className="px-2"
                  onClick={
                    isStreak && livesCount !== 0
                      ? handleTriggerAlert
                      : () =>
                          handleSelectedCategory(
                            selectedCategory as keyof Categories,
                            false
                          )
                  }
                >
                  Restart
                </Button>
              )}
              {isGuessed && (
                <Button
                  size={'responsive'}
                  className="p-4"
                  disabled={!isGuessed}
                  onClick={() => handleSelectedCategory(null, true)}
                >
                  New Game
                </Button>
              )}
            </div>
          )}
        </KeyboardRow>
      ))}
    </KeyboardUI>
  );
}
export default Keyboard;
