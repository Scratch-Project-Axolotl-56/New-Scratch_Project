import React from 'react';

type GridProps = {
  guesses: string[];
  currentGuess: string;
  wordLength: number;
  targetWord: string;
};

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
}) => {
  const safeGuess = guesses || [];
  const rows = [];

  // console.log('target word:', targetWord);

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
    typeof currentGuess === 'string' &&
    currentGuess.length <= wordLength &&
    !safeGuess.includes(currentGuess)
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

  // Fill remaining empty rows
  const remainingRows =
    wordLength + 3 + safeGuess.length < 5 + wordLength
      ? 5 + wordLength - safeGuess.length - 1
      : 0;

  for (let i = 0; i < remainingRows; i++) {
    rows.push(
      <div key={`empty-${i}`} className='row'>
        {Array.from({ length: wordLength }).map((_, j) => (
          <div key={j} className='tile'></div>
        ))}
      </div>
    );
  }

  return <div>{rows}</div>;
};

export default Grid;
