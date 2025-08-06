import React, { useEffect } from 'react';

type keyboardProps = {
  onKeyDown: (key: string) => void;
  letters: string[][];
};
// new change

//onKeyPress is now deprecated because
// it does not work for all keys (like CTRL, SHIFT, and ALT)
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
