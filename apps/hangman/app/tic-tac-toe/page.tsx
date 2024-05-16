'use client';
import { cn } from '@nx-next-shadcn-ui-starter/ui-kit/util';
import React, { useEffect, useRef, useState } from 'react';

const checkScore = (game: string[][]) => {
  // Check rows and columns
  for (let i = 0; i < game.length; i++) {
    const rowValue = game[i][0];
    const colValue = game[0][i];

    // Check row
    if (rowValue !== '' && game[i].every((cell) => cell === rowValue)) {
      return rowValue;
    }

    // Check column
    if (colValue !== '' && game.every((row) => row[i] === colValue)) {
      return colValue;
    }
  }

  // Check main diagonal
  const mainDiagonalValue = game[0][0];
  if (
    mainDiagonalValue !== '' &&
    game.every((row, index) => row[index] === mainDiagonalValue)
  ) {
    return mainDiagonalValue;
  }

  // Check anti-diagonal
  const antiDiagonalValue = game[0][game.length - 1];
  if (
    antiDiagonalValue !== '' &&
    game.every(
      (row, index) => row[game.length - 1 - index] === antiDiagonalValue
    )
  ) {
    return antiDiagonalValue;
  }

  // Check for draw
  if (game.flat().every((cell) => cell !== '')) {
    return 'draw';
  }

  // Game is still pending
  return 'Pending';
};

const Page = () => {
  const [board, setBoard] = useState<any>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currTurn, setCurrTurn] = useState<'o' | 'x'>('o');
  const [currWinner, setCurrWinner] = useState<'o' | 'x' | null | 'draw'>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvent = (
      event:
        | React.MouseEvent<HTMLDivElement, MouseEvent>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (currWinner) {
        if (
          event.type === 'click' ||
          (event.type === 'keydown' &&
            (event as React.KeyboardEvent<HTMLInputElement>).code === 'Space')
        ) {
          // Your logic here
          console.log('Event triggered:', event.type);
          setCurrWinner(null);
          setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ]);
        }
      }
    };

    const currentBoard = boardRef.current;

    currentBoard?.addEventListener('click', handleEvent as any);
    document.addEventListener('click', handleEvent as any);
    document.addEventListener('keydown', handleEvent as any);

    // Clean up
    return () => {
      currentBoard?.removeEventListener('click', handleEvent as any);
      document.removeEventListener('click', handleEvent as any);
      document.removeEventListener('keydown', handleEvent as any);
    };
  }, [currWinner]);

  const handleTurn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexRow: number,
    indexCol: number
  ) => {
    e.preventDefault();

    if (board[indexRow][indexCol] !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[indexRow][indexCol] = currTurn;

    setBoard(newBoard);

    const result = checkScore(newBoard);
    console.log('result', result);
    if (result === 'o' || result === 'x') {
      setCurrWinner(result);
    }
    if (result === 'draw') {
      setCurrWinner(result);
    }

    setCurrTurn(currTurn === 'o' ? 'x' : 'o');
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {currWinner ? (
        <h1 className="text-2xl pt-4">
          {currWinner === 'draw'
            ? 'DRAW'
            : `🎉🎉🎉 ${currWinner.toUpperCase()} wins! 🎉🎉🎉`}
        </h1>
      ) : (
        <h1 className="text-2xl pt-4">player ({currTurn.toUpperCase()})</h1>
      )}
      <div className="relative">
        <div
          ref={boardRef}
          className={cn(
            ' flex flex-1 w-full h-full flex-col  top-0 left-0',
            `${currWinner ? 'absolute' : 'hidden'}`
          )}
        ></div>
        <div
          className={cn(
            'w-[360px] h-[360px] flex flex-col mt-12 border-2 border-black divide-y-2 divide-black',
            `${currWinner && 'border-zinc-300 divide-zinc-300'}`
          )}
        >
          {board.map((row: any[], indexRow: number) => (
            <div
              key={indexRow}
              className={cn(
                'flex flex-1  divide-x-2  divide-black',
                `${currWinner && 'border-zinc-300 divide-zinc-300'}`
              )}
            >
              {row.map((item, indexCol) => (
                <button
                  disabled={currWinner ? true : false}
                  key={indexCol}
                  onClick={(e) => handleTurn(e, indexRow, indexCol)}
                  className={cn(
                    'flex flex-1 justify-center items-center text-8xl text-center ',
                    `${currWinner && 'border-zinc-300'}`
                  )}
                >
                  <p className={cn('pb-4', `${currWinner && 'text-zinc-300'}`)}>
                    {item}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
