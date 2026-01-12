import { Button } from '@renderer/components/ui/button';

interface ChangeLogProps {
  triggerChangeLog: () => void;
}

export default function ChangeLog({ triggerChangeLog }: ChangeLogProps): React.JSX.Element {
  return (
    <div className="w-full h-1/12 flex flex-row justify-between items-center">
      <Button onClick={triggerChangeLog}>^</Button>
      <p>Change</p>
      <Button>{'<'}-</Button>
    </div>
  );
}
