import { KeyboardEvent } from 'react';
import { Input } from '../ui/input';

interface WhiteListInputProps {
  regexWhiteList: RegExp;
}

export default function WhiteListInput({ regexWhiteList, ...props }: WhiteListInputProps & React.ComponentProps<'input'>): React.JSX.Element {
  function validateInput(e: KeyboardEvent<HTMLInputElement>): void {
    // TODO: Have this allow all valid windows folder characters and space
    if (!regexWhiteList.test(e.key)) {
      e.preventDefault();
    }
  }

  return <Input onKeyDownCapture={validateInput} {...props} />;
}
