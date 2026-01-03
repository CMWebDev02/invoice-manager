import { Button } from '@renderer/components/ui/button';
import { Input } from '@renderer/components/ui/input';

export default function DirectoryNavigation(): React.JSX.Element {
  return (
    <div className="w-1/3">
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <h2 className="w-1/3">Search:</h2>
        <Input placeholder="Search..." />
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
