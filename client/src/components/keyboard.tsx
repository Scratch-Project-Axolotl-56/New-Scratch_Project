import React, { useEffect, useState } from 'react';

type keyboardProps = {
  onKeyDown: (key: string) => void;
  guesses: string[];
  targetWord: string;
};

const Keyboard: React.FC<keyboardProps> = ({
  onKeyDown,
  guesses,
  targetWord,
}) => {
  const letters: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ];
  interface MyDynamicObject {
    [key: string]: string; // Allows any string as a key, and values are strings
  }
  const [keyStates, setKeyStates] = useState<MyDynamicObject>({
    Q: 'default',
    W: 'default',
    E: 'default',
    R: 'default',
    T: 'default',
    Y: 'default',
    U: 'default',
    I: 'default',
    O: 'default',
    P: 'default',
    A: 'default',
    S: 'default',
    D: 'default',
    F: 'default',
    G: 'default',
    H: 'default',
    J: 'default',
    K: 'default',
    L: 'default',
    Z: 'default',
    X: 'default',
    C: 'default',
    V: 'default',
    B: 'default',
    N: 'default',
    M: 'default',
  });

  const handleClick = (key: string): void => {
    onKeyDown(key);
  };

  useEffect(() => {
    const handleLetterUpdate = (
      guessLetters: string[],
      stautsArr: string[]
    ): void => {
      const newKeyStates = { ...keyStates };
      guessLetters.forEach((key, i) => {
        newKeyStates[key] = stautsArr[i];
      });

      setKeyStates(newKeyStates);
    };

    const handleKeyboardReset = (): void => {
      const newKeyStates = Object.keys(keyStates).reduce((acc, key) => {
        acc[key] = 'default';
        return acc;
      }, {} as MyDynamicObject);
      setKeyStates(newKeyStates);
    };

    if (guesses.length) {
      const guessLetters: string[] = guesses[guesses.length - 1].split('');
      const statusArr: string[] = [];
      guessLetters.map((letter, i) => {
        if (targetWord[i] === letter.toLowerCase()) {
          statusArr.push('correct');
        } else if (targetWord.includes(letter.toLowerCase())) {
          statusArr.push('present');
        } else {
          statusArr.push('attempted');
        }
      });
      handleLetterUpdate(guessLetters, statusArr);
    } else {
      handleKeyboardReset();
      return;
    }
  }, [
    guesses,
    targetWord,
  ]); /* Note: adding keyStates to the dependency array will create an infinite loop */

  return (
    <div className='keyboard'>
      {letters.map((row, rowindex) => (
        <div key={rowindex}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`test ${keyStates[key]}`}
            >
              {key === 'Backspace' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
