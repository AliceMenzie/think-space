'use client';

import { createContext, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';

interface HangmanContextProviderProps {
  data: any;
  children: React.ReactNode;
}

interface IHangmanContext {
  handleSelectedCategory: (category: any, keepStreak?: boolean) => void;
  handleGuess: (letter: any) => void;
  handleKeyDown: (event: any) => void;
  handleIsGuessed: (letter: any) => boolean | undefined;
  RenderLooseStreakMessage: () => JSX.Element;
  handleTriggerAlert: () => void;
  isGuessed: boolean;
  hiddenWord: string[];
  livesCount: number;
  isStreak: number | null;
  selectedCategory: string | null;
  guessedLetters: string[];
}

export const HangmanContext = createContext<IHangmanContext | null>(null);

export default function HangmanContextProvider({
  data,
  children,
}: HangmanContextProviderProps) {
  const [isStreak, setIsStreak] = useState<null | number>(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const [hiddenWord, setHiddenWord] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([' ']);
  const [livesCount, setLivesCount] = useState(5);
  const [triggerAlert, setTriggerAlert] = useState<{
    state: boolean;
    selection: string | null;
  }>({
    state: false,
    selection: null,
  });

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

  const handleContinueAlert = () => {
    handleSelectedCategory(triggerAlert.selection, false);
  };

  const RenderLooseStreakMessage = () => {
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

  const handleTriggerAlert = () => {
    setTriggerAlert({
      state: true,
      selection: selectedCategory,
    });
  };

  return (
    <HangmanContext.Provider
      value={{
        handleSelectedCategory,
        handleGuess,
        handleIsGuessed,
        handleKeyDown,
        RenderLooseStreakMessage,
        handleTriggerAlert,
        isGuessed,
        hiddenWord,
        livesCount,
        isStreak,
        selectedCategory,
        guessedLetters,
      }}
    >
      {children}
    </HangmanContext.Provider>
  );
}
