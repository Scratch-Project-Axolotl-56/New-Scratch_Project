import React from 'react';

type GridProps = {
  guesses: string[];
  currentGuess: string;
  wordLength: number;
  targetWord: string;
  isGameOver: boolean;
};

const totalRows = 6;

const getLetterStatus = (letter: string, index: number, targetWord: string) => {
  if (targetWord[index] === letter.toLowerCase()) return 'correct';
  if (targetWord.includes(letter.toLowerCase())) return 'present';
  return 'absent';
};

const Grid: React.FC<GridProps> = ({
  guesses,
  currentGuess,
  wordLength,
  targetWord,
  isGameOver,
}) => {
  const safeGuess = guesses || [];
  const rows = [];

  console.log('🎯 target word:', targetWord);

  // Show guesses already made
  safeGuess.forEach((guess, rowIndex) => {
    const letters = guess.split('');
    rows.push(
      <div key={`row-${rowIndex}`} className='row'>
        {letters.map((letter, i) => {
          const status = getLetterStatus(letter, i, targetWord);
          const bgColor =
            status === 'correct'
              ? 'correct'
              : status === 'present'
              ? 'present'
              : 'attempted';
          return (
            <div key={i} className={`tile ${bgColor}`}>
              {letter}
            </div>
          );
        })}
      </div>
    );
  });

  // Show current guess (in progress)
  if (
    !isGameOver &&
    rows.length < totalRows &&
    currentGuess.length <= wordLength &&
    !guesses.includes(currentGuess)
  ) {
    const letters = currentGuess.split('');
    rows.push(
      <div key='current' className='row'>
        {Array.from({ length: wordLength }).map((_, i) => (
          <div key={i} className='tile'>
            {letters[i] || ''}
          </div>
        ))}
      </div>
    );
  }

  while (rows.length < totalRows) {
    rows.push(
      <div key={`empty-${rows.length}`} className='row'>
        {Array.from({ length: wordLength }).map((_, j) => (
          <div key={j} className='tile'></div>
        ))}
      </div>
    );
  }
  return <div className='gridContainer'>{rows}</div>;
};

export default Grid;
