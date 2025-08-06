import React, { useState, useEffect, useCallback } from 'react';
import wordsByLength from '../../words.json';
import Grid from './grid';
import Keyboard from './keyboard';
import { supabase } from '../../supabaseClient';

const MAX_LEVEL = 11; // 3 to 13 letters (index 0 = 3-letter)
const MAX_ATTEMPTS = 6;

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


  useEffect(() => {
    const fetchWord = async () => {
      const { data, error } = await supabase
        .from('first_level')
        .select('words')
        .eq('length', wordLength);

      console.log('✅ Data:', data);
      console.log('❌ Error:', error);

      if (error) {
        console.error('❌ Supabase fetch error:', error);
        return;
      }

      if (!data || data.length === 0) {
        console.error('⚠️ Supabase returned empty data');
        return;
      }

      const randomWord = data[Math.floor(Math.random() * data.length)].words;
      setTargetWord(randomWord.toLowerCase());
    };

    fetchWord();
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
  }, [level, wordLength]);

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
            const newGuesses = [...guesses, currentGuess];
            setGuesses(newGuesses);
            if (currentGuess.toLowerCase() === targetWord) {
              if (level < MAX_LEVEL) {
                setTimeout(() => setLevel(level + 1), 1000);
              } else {
                setIsGameOver(true);
                alert('🚨 GAME OVER');
              }
            } else if (newGuesses.length >= MAX_ATTEMPTS) {
              setIsGameOver(true);
              alert('🚨 GAME OVER');
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

  const restartHelper = (lvl: number) => {
    setLevel(lvl);
    const list = wordsByLength[lvl];
    const word = list[Math.floor(Math.random() * list.length)].toLowerCase();
    setTargetWord(word);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
  };

  useEffect(() => {
    restartHelper(level);
  }, [level]);

  return (
    <div>
      <h1>Wordlotl</h1>
      <h2>LEVEL {level + 1}</h2>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        wordLength={wordLength}
        targetWord={targetWord}
        isGameOver={isGameOver}
      />
      <Keyboard onKeyDown={handleKeyPress} letters={letters} />
      {isGameOver && (
        <div>
          <p>
            {guesses[guesses.length - 1]?.toLowerCase() === targetWord
              ? '✅ LEVEL COMPLETE'
              : '🚨 GAME OVER'}
          </p>
          <button onClick={() => restartHelper(level)}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
