'use client';

// TODOS
// types
// eslint - error in ide from os version maybe rosetta term stuffing it up
// bug - lord of ring, on streak new  game not clearing 100%
// rerenders
// review - inline functions
// fix? - focus on tab when guessing letter keyboard // blur key press
// two player? timer ? more categories
// add a casual and daily mode
//  add levels (kids - hints and version where you see image practice spelling ?)

import React, { useEffect } from 'react';
import CurrentGameBanner from './current-game-banner/current-game-banner';
import { useHangmanContext } from '../hooks/useHangmanContext';
import Keyboard from './keyboard/keyboard';
import StartBanner from './start-banner/start-banner';
import GameBoard from './game-board/game-board';
import StreakAlert from './streak-alert/streak-alert';
import { Data } from '../types';

interface GameProps {
  data: Data;
}

export default function Game({ data }: GameProps) {
  const { handleGuess, guessedLetters } = useHangmanContext();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const typedEvent = event as React.KeyboardEvent<Window>;
      if (typedEvent.key.match(/^[a-z]$/)) {
        return handleGuess(typedEvent.key.toUpperCase());
      } else {
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessedLetters, handleGuess]);

  return (
    <div
      data-testid="game-wrapper"
      className="h-full flex-1 flex-col space-y-8 sm:p-8 flex p-2 pb-10"
    >
      <StreakAlert />
      <CurrentGameBanner />
      <GameBoard />
      <StartBanner />
      <div className="flex max-w-md self-center min-w-full sm:min-w-[600px]">
        <Keyboard data={data} />
      </div>
    </div>
  );
}
