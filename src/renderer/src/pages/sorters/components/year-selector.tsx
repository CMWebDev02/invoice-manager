import { buttonVariants } from '@renderer/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@renderer/components/ui/select';
import { cn } from '@renderer/lib/utils';
import { useMemo } from 'react';

interface YearSelectorProps {
  disabled: boolean;
  updateCurrentYear: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export default function YearSelector({ disabled, updateCurrentYear, className }: YearSelectorProps): React.JSX.Element {
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
      <SelectItem key={year} value={year.toString()} className="focus:bg-foreground focus:text-white">
        {year}
      </SelectItem>
    ));
    return YearsItems;
  }, []);

  return (
    <>
      <Select onValueChange={updateCurrentYear} disabled={disabled}>
        <SelectTrigger className={buttonVariants({ variant: 'action', className: className })}>
          <SelectValue placeholder="XXXX" className="text-foreground" />
        </SelectTrigger>
        <SelectContent className="bg-secondary border border-accent">
          <SelectGroup className="outline-none">{YearsItems}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
