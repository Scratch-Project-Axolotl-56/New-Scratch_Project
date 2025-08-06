import React, { useState, useEffect, useCallback } from 'react';
import wordsByLength from '../../words.json';
import Grid from './grid';
import Keyboard from './keyboard';

const MAX_LEVEL = 11; // 3 to 13 letters (index 0 = 3-letter)

const App: React.FC = () => {
  const [level, setLevel] = useState(0); // 0 = 3-letter, 10 = 13-letter
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const letters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ];

  const wordLength = level + 3;

  console.log('currentGuess', currentGuess);

  const handleAlphabetical = (key: string) => {
    setCurrentGuess((currentGuess) => {
      const currentWordArray = currentGuess.split('');
      currentWordArray.push(key);
      const newWord = currentWordArray.join('');

      return newWord;
    });
    setGuessedLetters((prevLetters) => [...prevLetters, key]);
  };

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!isGameOver) {
        if (key === 'Enter') {
          if (currentGuess.length === wordLength) {
            setGuesses([...guesses, currentGuess]);
            if (currentGuess.toLowerCase() === targetWord) {
              if (level < MAX_LEVEL) {
                setTimeout(() => setLevel(level + 1), 1000);
              } else {
                setIsGameOver(true);
              }
            } else if (guesses.length >= 5 + level) {
              setIsGameOver(true);
            }

            setCurrentGuess('');
          } else {
            console.log('word length too short');
          }
        } else if (key === 'Backspace') {
          if (currentGuess.length === 0) {
            return;
          }
          setCurrentGuess(currentGuess.slice(0, -1));
          setGuessedLetters([
            ...guessedLetters.slice(0, guessedLetters.length - 1),
          ]);
        } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < wordLength) {
          handleAlphabetical(key.toUpperCase());
        } else {
          // handling any other keys
          return;
        }
      }
      return;
    },
    [
      currentGuess,
      guesses,
      level,
      targetWord,
      isGameOver,
      wordLength,
      guessedLetters,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //To-Do: restrict pressing more keys than length of target word
      handleKeyPress(e.key);
    };
    document.addEventListener('keydown', handleKeyDown);

    if (isGameOver) {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOver, handleKeyPress]);

  useEffect(() => {
    // const wordList = wordsByLength[wordLength];
    const randomWord =
      wordsByLength[level][Math.floor(Math.random() * wordsByLength.length)];

    setTargetWord(randomWord.toLowerCase());
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
  }, [level, wordLength]);

  return (
    <div>
      <h1>Wordlotl</h1>
      <h2>LEVEL {level + 1}</h2>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        wordLength={wordLength}
        targetWord={targetWord}
      />
      <Keyboard onKeyDown={handleKeyPress} letters={letters} />
      {isGameOver && (
        <div>
          <p>
            {currentGuess === targetWord ? '✅ LEVEL COMPLETE' : '🚨 GAME OVER'}
          </p>
          <button onClick={() => setLevel(0)}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
