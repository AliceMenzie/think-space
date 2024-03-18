import { useContext } from "react";
import { HangmanContext } from "../context/hangman-context";

export function useHangmanContext() {
    const context = useContext(HangmanContext);
  
    if (!context) {
      throw new Error("useHangmanContext must be used within a HangmanContextProvider");
    }
  
    return context;
  }