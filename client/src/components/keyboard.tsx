import React from 'react';

type keyboardProps = {
  onKeyPress: (key: string) => void;
};
// new change
const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

const Keyboard: React.FC<keyboardProps> = ({ onKeyPress }) => {
  const handleClick = (key: string) => {
    onKeyPress(key);
  };

  return (
    <div className='keyboard'>
      {KEYS.map((row, i) => (
        <div key={i}>
          {row.map((key) => (
            <button key={key} onClick={() => handleClick(key)}>
              {key === 'Backspace' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
