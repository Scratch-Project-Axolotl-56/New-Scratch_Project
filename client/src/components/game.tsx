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

  const wordLength = level + 3;
  // test
  useEffect(() => {
    const wordList = wordsByLength[wordLength];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord.toLowerCase());
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
  }, [level, wordLength]);

  const handleKey = (key: string) => {
    if (isGameOver) return;

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
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < wordLength) {
      setCurrentGuess(currentGuess + key.toUpperCase());
    }
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
      <Keyboard onKeyPress={handleKey} />
      {isGameOver && (
        <div>
          <p>
            {currentGuess === targetWord ? '✅ LEVEL COMPLETE' : '💀 GAME OVER'}
          </p>
          <button onClick={() => setLevel(0)}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
