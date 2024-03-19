'use client';

// TODOS
// FIX TYPES :(
// bug - lord of ring, on streak new  game not clearing 100%
// bug - rerenders
// fix - inline arrow functions
// fix? - focus on tab when guessing letter keyboard
// refactor context? add hooks?
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

interface GameProps {
  data: any;
}

export default function Game({ data }: GameProps) {
  const { handleGuess, hiddenWord } = useHangmanContext();

  const handleKeyDown = (event: any) => {
    if (event.key.match(/^[a-z]$/)) {
      return handleGuess(event.key.toUpperCase());
    } else {
      return;
    }
  };

  return (
    <div
      data-testid="game-wrapper"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="h-full flex-1 flex-col space-y-8 sm:p-8 flex"
    >
      <StreakAlert />
      <CurrentGameBanner />
      <GameBoard />
      <StartBanner />
      <Keyboard data={data} />
    </div>
  );
}
