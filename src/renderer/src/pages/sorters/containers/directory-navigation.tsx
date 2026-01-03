import { Button } from '@renderer/components/ui/button';
import { Input } from '@renderer/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@renderer/components/ui/select';

export default function DirectoryNavigation(): React.JSX.Element {
  return (
    <div className="w-1/3">
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <Input placeholder="Search..." />
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
      </div>
      <div className="flex flex-col w-full h-[calc(100%-3rem)] overflow-y-scroll bg-secondary">
        <div className="w-full">
          <Button className="w-5/6">Directory</Button>
          <Button className="w-1/6">-{'>'}</Button>
        </div>
      </div>
    </div>
  );
}
