import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@renderer/components/ui/select';

interface YearSelectorProps {
  updateCurrentYear: React.Dispatch<React.SetStateAction<string>>;
}

export default function YearSelector({ updateCurrentYear }: YearSelectorProps): React.JSX.Element {
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

  return (
    <>
      <Select onValueChange={updateCurrentYear}>
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
