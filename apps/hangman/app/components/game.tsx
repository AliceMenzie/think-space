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

import React from 'react';
import CurrentGameBanner from './current-game-banner/current-game-banner';
import { useHangmanContext } from '../hooks/useHangmanContext';
import Keyboard from './keyboard/keyboard';
import StartBanner from './start-banner/start-banner';
import GameBoard from './game-board/game-board';

interface GameProps {
  data: any;
}

export default function Game({ data }: GameProps) {
  const { handleKeyDown, RenderLooseStreakMessage } = useHangmanContext();

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="h-full flex-1 flex-col space-y-8 sm:p-8 flex"
    >
      <RenderLooseStreakMessage />
      <CurrentGameBanner />
      <GameBoard />
      <StartBanner />
      <Keyboard data={data} />
    </div>
  );
}
