import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@renderer/components/ui/combobox';
import { useMemo } from 'react';

interface YearSelectorProps {
  disabled: boolean;
  currentYear: string;
  updateCurrentYear: React.Dispatch<React.SetStateAction<string>>;
  updateUserFocusBool: React.Dispatch<React.SetStateAction<boolean>>;
  autoSelectText: boolean;
  id?: string;
  className?: string;
}

export default function YearSelector({ disabled, currentYear, updateCurrentYear, updateUserFocusBool, autoSelectText, id, className }: YearSelectorProps): React.JSX.Element {
  function changeYear(value: string | null): void {
    // Updates the current year if the value is not null
    if (value) {
      updateCurrentYear(value);
    } else {
      // Else clears the current year
      updateCurrentYear('');
    }
  }

  function setUserFocus(e: React.SyntheticEvent<HTMLInputElement, Event>): void {
    // Checks if all text should be selected based on the UserSetting
    if (autoSelectText) {
      // Selects all text in the text box upon entering it
      e.currentTarget.select();
    }

    // Updates the bool to indicate that the user has entered the textbox
    updateUserFocusBool(true);
  }

  function removeUserFocus(): void {
    // Updates the bool to indicate that the user has left the textbox
    updateUserFocusBool(false);
  }

  // Creates the year selector options upon first rendering the component
  // Failing to have this component lead to rerendering issues that triggered anytime another component updated
  const Years = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const years: string[] = [];

    for (let i = -10; year + i <= year + 10; i++) {
      years.push((year - i).toString());
    }

    return years;
  }, []);

  return (
    <>
      <Combobox items={Years} disabled={disabled} value={currentYear} onValueChange={changeYear}>
        <ComboboxInput className={className} placeholder="XXXX" id={id} onFocus={setUserFocus} onBlur={removeUserFocus} />
        <ComboboxContent className="bg-secondary border border-accent">
          <ComboboxEmpty>Invalid Year</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
