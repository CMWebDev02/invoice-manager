import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@renderer/components/ui/select';

interface YearSelectorProps {}

export default function YearSelector({}: YearSelectorProps): React.JSX.Element {
  return (
    <Select defaultValue="2026">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          <SelectItem value="2026">2026</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
