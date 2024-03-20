'use client';

import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  LetterBadge,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { useHangmanContext } from '../../hooks/useHangmanContext';
import { Categories, CATEGORIES } from '../../types';

const GameBoard = () => {
  const {
    isStreak,
    isGuessed,
    hiddenWord,
    livesCount,
    selectedCategory,
    guessedLetters,
    handleSelectedCategory,
  } = useHangmanContext();

  return (
    <Tabs
      // @ts-ignore
      value={selectedCategory}
    >
      <TabsList>
        {CATEGORIES.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            onClick={() => {
              handleSelectedCategory(
                category as keyof Categories,
                isStreak === null || livesCount === 0 ? false : true
              );
            }}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      {CATEGORIES.map((category) => (
        <TabsContent key={category} value={category}>
          {livesCount !== 0 &&
            hiddenWord
              .join('')
              .split(' ')
              .map((word) => (
                <div
                  key={word}
                  className="border md:border-none flex flex-wrap md:flex-no-wrap gap-1 md:gap-3 md:gap-x-5 md:px-4 px-1"
                >
                  {word.split('').map((letter, index) => (
                    <React.Fragment key={index}>
                      {guessedLetters.includes(letter) ||
                      letter.match(/[^a-zA-Z]/g) ? (
                        <LetterBadge
                          letter={letter}
                          className={`${isGuessed && 'border-green-400'}`}
                        />
                      ) : (
                        <LetterBadge letter={' '} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
          {livesCount === 0 &&
            hiddenWord
              .join('')
              .split(' ')
              .map((word) => (
                <div
                  key={word}
                  className="border md:border-none flex flex-wrap md:flex-no-wrap gap-1 sm:gap-3 sm:gap-x-5 sm:px-4"
                >
                  {word.split('').map((letter, index) => (
                    <React.Fragment key={index}>
                      <LetterBadge letter={letter} className="border-red-400" />
                    </React.Fragment>
                  ))}
                </div>
              ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default GameBoard;
