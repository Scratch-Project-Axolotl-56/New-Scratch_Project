import React from 'react';

type keyboardProps = {
  onKeyDown: (key: string) => void;
  letters: string[][];
};

const Keyboard: React.FC<keyboardProps> = ({ onKeyDown, letters }) => {
  const handleClick = (key: string) => {
    onKeyDown(key);
  };

  return (
    <div className='keyboard'>
      {letters.map((row, i) => (
        <div key={i}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`test`}
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
