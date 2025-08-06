import React, { useState, useEffect } from 'react';
import wordsByLength from '../../words.json'; // Adjust the path as necessary
// Assuming you have a JSON file with words categorized by length
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
  console.log('guessed letters', guessedLetters);
  console.log('currentGuess', currentGuess);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e);
      //restrict pressing more keys than length of target word
      handleKeyPress(e.key);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // const wordList = wordsByLength[wordLength];
    const randomWord =
      wordsByLength[Math.floor(Math.random() * wordsByLength.length)];

    setTargetWord(randomWord.toLowerCase());
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
  }, [level, wordLength]);

  const handleKeyPress = (key: string) => {
    console.log('key', key);
    if (!isGameOver) {
      if (key === 'Enter') {
        handleEnter();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < wordLength) {
        handleAlphabetical(key);
      } else {
        //any other keys
        return;
      }
    }
    return;
  };

  const handleAlphabetical = (key: string) => {
    console.log('in handle alphabetical');
    // setCurrentGuess(currentGuess + key.toUpperCase());

    setCurrentGuess((currentGuess) => {
      const currentWordArray = currentGuess.split('');
      console.log('currentWordArray', currentWordArray);
      currentWordArray.push(key.toUpperCase());

      const newWord = currentWordArray.join('');
      console.log('newword', newWord, newWord.length);
      return newWord;
    });
    setGuessedLetters((prevLetters) => [...prevLetters, key]);
  };

  const handleEnter = () => {
    console.log(currentGuess, currentGuess.length, wordLength);
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
  };

  const handleBackspace = () => {
    if (currentGuess.length === 0) {
      return;
    }
    setCurrentGuess(currentGuess.slice(0, -1));
  };

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
