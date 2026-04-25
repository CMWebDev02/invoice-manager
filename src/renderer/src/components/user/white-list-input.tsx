import { KeyboardEvent } from 'react';
import { Input } from '../ui/input';

interface WhiteListInputProps {
  regexBlackList: RegExp;
}

export default function WhiteListInput({ regexBlackList, ...props }: WhiteListInputProps & React.ComponentProps<'input'>): React.JSX.Element {
  function validateInput(e: KeyboardEvent<HTMLInputElement>): void {
    // Checks if the key entered is within the black list
    if (regexBlackList.test(e.key)) {
      // Prevents the key from being entered
      e.preventDefault();
    }
  }

  return <Input onKeyDownCapture={validateInput} {...props} />;
}
