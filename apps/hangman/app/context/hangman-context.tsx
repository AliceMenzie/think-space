'use client';

import { createContext, useEffect, useState } from 'react';
import { Data, Categories } from '../types';

interface HangmanContextProviderProps {
  data: Data;
  children: React.ReactNode;
}

interface IHangmanContext {
  handleSelectedCategory: (
    category: keyof Categories | null,
    keepStreak?: boolean
  ) => void;
  handleGuess: (letter: string) => void;
  handleIsGuessed: (letter: string) => boolean | undefined;
  handleTriggerAlert: () => void;
  handleContinueAlert: () => void;
  isGuessed: boolean;
  hiddenWord: string[];
  livesCount: number;
  isStreak: number | null;
  selectedCategory: string | null;
  guessedLetters: string[];
  triggerAlert: {
    state: boolean;
    selection: string | null;
  };
}

export const HangmanContext = createContext<IHangmanContext | null>(null);

export default function HangmanContextProvider({
  data,
  children,
}: HangmanContextProviderProps) {
  const [isStreak, setIsStreak] = useState<null | number>(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const [hiddenWord, setHiddenWord] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    keyof Categories | null
  >(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([' ']);
  const [livesCount, setLivesCount] = useState(5);
  const [triggerAlert, setTriggerAlert] = useState<{
    state: boolean;
    selection: keyof Categories | null;
  }>({
    state: false,
    selection: null,
  });

  const resetState = () => {
    setIsGuessed(false);
    setGuessedLetters([' ']);
    setHiddenWord([]);
    setLivesCount(5);
  };

  const selectConvertWord = (category: keyof Categories) => {
    const currentCategory = category.toLowerCase() as keyof Categories;

    const currentSelection = data.categories[currentCategory];

    const randomIndex = Math.floor(
      Math.random() * data.categories[currentCategory].length
    );

    const newWord: string[] = currentSelection[randomIndex]
      .toUpperCase()
      .split('');

    setHiddenWord(newWord);
  };

  const handleSelectedCategory = (
    category: keyof Categories | null,
    keepStreak = false
  ) => {
    if (category === null) {
      resetState();
      setSelectedCategory(null);
      return;
    }

    if (!keepStreak) {
      setIsStreak(null);
      setSelectedCategory(null);
    }

    if (
      !isGuessed &&
      keepStreak &&
      hiddenWord.length >= 1 &&
      livesCount !== 0
    ) {
      setTriggerAlert({ state: true, selection: category });
      return;
    }

    resetState();
    setSelectedCategory(category);
    selectConvertWord(category);
  };

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
    if (!hiddenWord.includes(letter)) {
      setLivesCount((prevNumber) => prevNumber - 1);
    }
  };

  const handleIsGuessed = (letter: string): boolean | undefined => {
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
      }
    } else {
      setIsGuessed(false);
    }
  }, [guessedLetters, hiddenWord]);

  const handleTriggerAlert = () => {
    setTriggerAlert({
      state: !triggerAlert.state,
      selection: selectedCategory,
    });
  };

  const handleContinueAlert = () => {
    handleSelectedCategory(triggerAlert.selection, false);
  };

  return (
    <HangmanContext.Provider
      value={{
        handleSelectedCategory,
        handleGuess,
        handleIsGuessed,
        handleTriggerAlert,
        handleContinueAlert,
        isGuessed,
        hiddenWord,
        livesCount,
        isStreak,
        selectedCategory,
        guessedLetters,
        triggerAlert,
      }}
    >
      {children}
    </HangmanContext.Provider>
  );
}
