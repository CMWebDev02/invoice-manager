import { Button } from '@renderer/components/ui/button';

interface ChangeLogProps {
  triggerChangeLog: () => void;
}

export default function ChangeLog({ triggerChangeLog }: ChangeLogProps): React.JSX.Element {
  return (
    <div className="w-full h-1/12 flex flex-row justify-between items-center border border-foreground">
      <Button onClick={triggerChangeLog} className="w-1/6 h-full border border-foreground rounded-none hover:bg-secondary/50 hover:text-accent">
        ^
      </Button>
      <div className="w-4/6 h-full border border-foreground flex items-center p-1">
        <p className="text-foreground">Change</p>
      </div>
      <Button className="w-1/6 h-full border border-foreground rounded-none hover:bg-secondary/50 hover:text-accent">{'<'}</Button>
    </div>
  );
}
