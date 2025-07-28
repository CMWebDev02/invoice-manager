import { Button } from '@renderer/components/ui/button';
import { Card, CardContent } from '@renderer/components/ui/card';

export default function TitlePage(): React.JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card>
        <CardContent className="flex flex-col gap-2">
          <Button>Sorters</Button>
          <Button>Viewers</Button>
          <Button>Changelogs</Button>
          <Button>Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
