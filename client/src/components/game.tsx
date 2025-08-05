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

  useEffect(() => {
    const wordList = wordsByLength[wordLength];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord.toLowerCase());
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
  }, [level]);

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
    <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-4'>Wordlotl - LEVEL {level + 1}</h1>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        wordLength={wordLength}
        targetWord={targetWord}
      />
      <Keyboard onKeyPress={handleKey} />
      {isGameOver && (
        <div className='mt-6 text-center'>
          <p className='text-xl'>
            {currentGuess === targetWord ? '✅ LEVEL COMPLETE' : '💀 GAME OVER'}
          </p>
          <button
            onClick={() => setLevel(0)}
            className='mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300'
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
