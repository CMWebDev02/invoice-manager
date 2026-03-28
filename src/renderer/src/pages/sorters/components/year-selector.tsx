import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@renderer/components/ui/select';
import { useMemo } from 'react';

interface YearSelectorProps {
  disabled: boolean;
  updateCurrentYear: React.Dispatch<React.SetStateAction<string>>;
}

export default function YearSelector({ disabled, updateCurrentYear }: YearSelectorProps): React.JSX.Element {
  // Creates the year selector options upon first rendering the component
  // Failing to have this component lead to rerendering issues that triggered anytime another component updated
  const YearsItems = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const years: number[] = [];

    for (let i = -10; year + i <= year + 10; i++) {
      years.push(year - i);
    }
    const YearsItems = years.map((year) => (
      <SelectItem key={year} value={year.toString()}>
        {year}
      </SelectItem>
    ));
    return YearsItems;
  }, []);

  return (
    <>
      <Select onValueChange={updateCurrentYear} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="XXXX" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{YearsItems}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
