'use client';

// TODOS
// bug - lord of ring, on streak new  game not clearing 100%
// bug - rerenders
// fix - inline arrow functions
// fix - category switching
// fix - can select letters when game not started
// add warning on ui when resetting
// change new game button position and conditionally render
// refactor to cleaner composition context
// --- make custom components in ui lib
// add - keyboard, key events
// two player? timer ? more categories
//  add kids - hints and version where you see image practice spelling ?

import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  // LetterBadge
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import React from 'react';
import LetterBadge from '@nx-next-shadcn-ui-starter/ui-kit/ui/lib/ui/letterBadge';

interface GameProps {
  data: any;
}

const CATEGORIES = [
  'Animals',
  'Movies',
  'Countries',
  'Foods',
  'Sports',
  'Music',
  'Literature',
  'Science',
  'Pokemon',
  // 'Famous Landmarks',
  // 'Historical Figures',
  // 'Cartoons/Animations',
  // 'Occupations',
  // 'Holidays',
  // 'Technology',
  // 'Body Parts',
  // 'Colors',
  // 'Transportation',
  // 'Games',
  // 'Weather',
  // 'Celebrities',
];

export default function Game({ data }: GameProps) {
  const ALPHABET = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  }, []);
  const [isStreak, setIsStreak] = useState<null | number>(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const [hiddenWord, setHiddenWord] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Animals');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([' ']);
  const [livesCount, setLivesCount] = useState(5);
  const lives = Array.from({ length: livesCount }, (_, index) => index + 1);

  const handleSelectedCategory = (category: any, keepStreak = false) => {
    if (!keepStreak) {
      setIsStreak(null);
    }
    setIsGuessed(false);
    setGuessedLetters([' ']);
    setHiddenWord([]);
    setSelectedCategory(category);
    setLivesCount(5);

    const currentCategory = category.toLowerCase();

    const currentSelection = data[currentCategory];

    const randomIndex = Math.floor(
      Math.random() * data[currentCategory].length
    );

    const newWord: string[] = currentSelection[randomIndex]
      .toUpperCase()
      .split('');

    setHiddenWord(newWord);
  };

  useEffect(() => {
    if (hiddenWord.length > 1) {
      console.log('inside if');
      const wordIsGuessed = hiddenWord
        .filter((letter) => /[a-zA-Z]/.test(letter))
        .every((letter) => guessedLetters.includes(letter) || letter === ' ');

      setIsGuessed(wordIsGuessed);
      if (wordIsGuessed) {
        setIsStreak((prevNumber) => (prevNumber != null ? prevNumber + 1 : 1));
      }
    } else {
      setIsGuessed(false);
    }
  }, [guessedLetters, hiddenWord]);

  useEffect(() => {
    console.log('component rerendered');
    console.log('hiddenWord ', hiddenWord);
    console.log('guessedLetters ', guessedLetters);
    console.log('isGuessed ', isGuessed);
  });

  const handleGuess = (letter: any) => () => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
    if (!hiddenWord.includes(letter)) {
      setLivesCount((prevNumber) => prevNumber - 1);
    }
  };

  const handleIsGuessed = (letter: any): boolean | undefined => {
    if (livesCount === 0) {
      return true;
    }
    return guessedLetters.includes(letter);
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 md:justify-between md:flex-row flex-1 md:place-items-center">
          <h1 className="text-2xl font-bold tracking-tight">Hangman</h1>

          {isStreak && <p className="font-bold text-xl">{isStreak} 🔥</p>}

          <ul className="flex gap-3">
            {!isGuessed &&
              lives.map((count) => (
                <li
                  className="scroll-m-20 text-xl font-semibold tracking-wider flex gap-5 items-center"
                  key={count}
                >
                  ❤️
                </li>
              ))}
            {livesCount === 0 && (
              <li className="scroll-m-20 text-xl font-semibold tracking-wider flex gap-5 items-center">
                💀 💀 💀
              </li>
            )}
            {isGuessed && hiddenWord.length !== 0 && (
              <li className="scroll-m-20 text-xl font-semibold tracking-wider flex gap-5 items-center">
                🎉 🎉 🎉 🎉 🎉
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col flex-1 gap-3 place-items-end">
          <Button onClick={() => handleSelectedCategory(selectedCategory)}>
            Reset
          </Button>
          <Button
            variant={'outline'}
            disabled={!isGuessed}
            onClick={() => handleSelectedCategory(selectedCategory, true)}
          >
            New Game
          </Button>
        </div>
      </div>
      <Tabs>
        <TabsList>
          {CATEGORIES.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() =>
                // TODO change this to either trigger reset or new game depending on conditions
                // only switch category once before triggers reset
                // condition - add warnning on trigger reset
                handleSelectedCategory(
                  category,
                  isStreak === null ? false : true
                )
              }
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
                    className="border md:border-none flex flex-wrap md:flex-no-wrap gap-3 gap-x-5 px-4"
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
                  <div key={word} className="flex gap-3 gap-x-5 px-4">
                    {word.split('').map((letter, index) => (
                      <React.Fragment key={index}>
                        <LetterBadge
                          letter={letter}
                          className="border-red-400"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex self-center">
        {hiddenWord.length == 0 && (
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-wider flex gap-5">
            Select a category to begin!
          </h3>
        )}
      </div>
      <ul className="flex flex-row gap-5 place-content-evenly flex-wrap max-w-[800px] self-center">
        {ALPHABET.map((letter) => (
          <li key={letter}>
            <Button
              disabled={handleIsGuessed(letter)}
              onClick={handleGuess(letter)}
            >
              {letter}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
