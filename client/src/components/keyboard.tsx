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
    <div className='mt-6 space-y-2'>
      {KEYS.map((row, i) => (
        <div key={i} className='flex justify-center gap-1'>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className='bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 text-sm w-10'
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
