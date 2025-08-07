import { it, expect, describe, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Keyboard from '../keyboard';
import '@testing-library/jest-dom/vitest'; //getting custom matchers

describe('Unit testing Keyboard component', () => {
  describe('Set KeyboardProps', () => {
    // let component;
    const props = {
      targetWord: 'cat',
      guesses: [],
      onKeyDown: function (key) {
        console.log(key);
      },
    };

    beforeAll(() => {
      const component = render(<Keyboard {...props} />);
    });

    it('should render a button for each letter, plus enter and delete', async () => {
      //   screen.debug();
      const buttons = await screen.findAllByRole('button');
      expect(buttons.length).toBe(28);
      expect(buttons[0]).toHaveTextContent(/Q/);
      expect(buttons[27]).toHaveTextContent(/⌫/);
    });
  });
});
