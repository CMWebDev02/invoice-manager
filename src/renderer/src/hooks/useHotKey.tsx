import { useEffect } from 'react';

interface useHotKeyProps {
  triggerKey: 'Enter';
  action: () => void | undefined;
  isHotKeyEnabled: boolean;
}

/**
 * @component Initializes a global keyboard hotkey that can be triggered by pressing the Enter key.
 * @prams {string} triggerKey - Keyboard key that will trigger the action function.
 * @prams {Function} action - Function that will trigger once the triggerKey is pressed, must return void or undefined.
 * @prams {boolean} isHotKeyEnabled - Array of variables that will be check for a truthy value, if any of the variables are truthy, the action Function is not executed.
 * @returns {void}
 */
export default function useHotKey({ triggerKey, action, isHotKeyEnabled }: useHotKeyProps): void {
  // Creates the keyboard shortcut based on the passed in triggerKey.
  useEffect(() => {
    function activateShortCut(e: KeyboardEvent): void {
      // Checks if any key pressed is the triggerKey
      // and if the hotkey's triggering is valid
      if (e.code === triggerKey && !isHotKeyEnabled) {
        action();
        e.preventDefault();
      }
    }

    // Creates the global event listener
    addEventListener('keydown', activateShortCut);

    // Removes the event listener upon clean up
    return () => {
      removeEventListener('keydown', activateShortCut);
    };
  }, [action, triggerKey, isHotKeyEnabled]);
}
