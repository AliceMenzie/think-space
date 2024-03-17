'use client';

// TODOS
// FIX TYPES :(
// bug - lord of ring, on streak new  game not clearing 100%
// bug - rerenders
// fix - inline arrow functions
// fix? - focus on tab when guessing letter keyboard
// refactor to cleaner composition context
// --- make custom components in ui lib
// two player? timer ? more categories
// add a casual and daily mode
//  add levels (kids - hints and version where you see image practice spelling ?)

import { useEffect, useState } from 'react';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  LetterBadge,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import React from 'react';

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
  const [triggerAlert, setTriggerAlert] = useState({
    state: false,
    selection: '',
  });
  const [isStreak, setIsStreak] = useState<null | number>(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const [hiddenWord, setHiddenWord] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([' ']);
  const [livesCount, setLivesCount] = useState(5);
  const lives = Array.from({ length: livesCount }, (_, index) => index + 1);

  const handleSelectedCategory = (category: any, keepStreak = false) => {
    if (category === null) {
      setIsGuessed(false);
      setGuessedLetters([' ']);
      setHiddenWord([]);
      setSelectedCategory(null);
      setLivesCount(5);

      return;
    }

    if (!keepStreak) {
      setIsStreak(null);
      setSelectedCategory(null);
    }

    if (!isGuessed) {
      if (keepStreak && hiddenWord.length >= 1 && livesCount !== 0) {
        setTriggerAlert({ state: true, selection: category });
        return;
      }
      setIsGuessed(false);
      setGuessedLetters([' ']);
      setHiddenWord([]);
      setSelectedCategory(category);
      setLivesCount(5);

      const currentCategory = category.toLowerCase();

      const currentSelection = data.categories[currentCategory];

      const randomIndex = Math.floor(
        Math.random() * data.categories[currentCategory].length
      );

      const newWord: string[] = currentSelection[randomIndex]
        .toUpperCase()
        .split('');

      setHiddenWord(newWord);
    }

    if (isGuessed) {
      setIsGuessed(false);
      setGuessedLetters([' ']);
      setHiddenWord([]);
      setSelectedCategory(category);
      setLivesCount(5);

      const currentCategory = category.toLowerCase();

      const currentSelection = data.categories[currentCategory];

      const randomIndex = Math.floor(
        Math.random() * data.categories[currentCategory].length
      );

      const newWord: string[] = currentSelection[randomIndex]
        .toUpperCase()
        .split('');

      setHiddenWord(newWord);
    }
  };

  const handleContinueAlert = () => {
    handleSelectedCategory(triggerAlert.selection, false);
  };

  const renderLooseStreakMessage = () => {
    return (
      <AlertDialog
        open={triggerAlert.state}
        onOpenChange={() =>
          setTriggerAlert({ state: !triggerAlert.state, selection: '' })
        }
      >
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              🔥 Continuing will delete your streak.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your current streak is{' '}
              <span className="font-bold">{isStreak} 🔥</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueAlert}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  useEffect(() => {
    if (hiddenWord.length > 1) {
      const wordIsGuessed = hiddenWord
        .filter((letter) => /[a-zA-Z]/.test(letter))
        .every((letter) => guessedLetters.includes(letter) || letter === ' ');

      setIsGuessed(wordIsGuessed);
      if (wordIsGuessed) {
        setIsStreak((prevNumber) => (prevNumber != null ? prevNumber + 1 : 1));
        // setSelectedCategory(null);
      }
    } else {
      setIsGuessed(false);
    }
  }, [guessedLetters, hiddenWord]);

  const handleKeyDown = (event: any) => {
    if (event.key.match(/^[a-z]$/)) {
      return handleGuess(event.key.toUpperCase());
    } else {
      return;
    }
  };

  const handleGuess = (
    letter: any // => ()
  ) => {
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
    return guessedLetters.includes(letter.toUpperCase());
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="h-full flex-1 flex-col space-y-8 p-8 flex"
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 md:justify-between md:flex-row flex-1 md:place-items-center">
          {renderLooseStreakMessage()}
          <h1 className="text-2xl font-bold tracking-tight">Hangman</h1>

          {isStreak && <p className="font-bold text-xl">{isStreak} 🔥</p>}

          <ul className="min-w-[180px] flex  gap-3">
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
          {!isGuessed && selectedCategory && (
            <Button
              onClick={
                isStreak && livesCount !== 0
                  ? () => {
                      setTriggerAlert({
                        state: true,
                        selection: selectedCategory,
                      });
                      // setIsStreak(null);
                    }
                  : () => handleSelectedCategory(selectedCategory, false)
              }
            >
              Restart
            </Button>
          )}
          {isGuessed && (
            <Button
              variant={'outline'}
              disabled={!isGuessed}
              onClick={() => handleSelectedCategory(null, true)}
            >
              New Game
            </Button>
          )}
        </div>
      </div>
      <Tabs
        // @ts-ignore
        value={selectedCategory}
        activationMode="manual"
      >
        <TabsList>
          {CATEGORIES.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() =>
                handleSelectedCategory(
                  category,
                  isStreak === null || livesCount === 0 ? false : true
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
                    className="border md:border-none flex flex-wrap md:flex-no-wrap gap-1 sm:gap-3 sm:gap-x-5 px-4"
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
                  <div key={word} className="border md:border-none flex flex-wrap md:flex-no-wrap gap-1 sm:gap-3 sm:gap-x-5 px-4">
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
      <ul className="flex flex-col gap-5 place-content-center max-w-[800px] self-center">
        {data.keyboard.keys.map((row: any) => (
          <div
            className="flex flex-row flex-wrap gap-3 self-center min-w-[300px]"
            key={row.row}
          >
            {' '}
            {row.key.map((key: any) => (
              <li key={key.label}>
                <Button
                  disabled={
                    !selectedCategory || handleIsGuessed(key.label) || isGuessed
                  }
                  onClick={() => handleGuess(key.label.toUpperCase())}
                >
                  {key.label}
                </Button>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
