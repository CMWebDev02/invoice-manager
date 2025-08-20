import { Card, CardContent } from '@renderer/components/ui/card';
import TitleLink from './components/title-link';

export default function TitlePage(): React.JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="bg-secondary w-1/2">
        <CardContent className="flex flex-col gap-y-4 justify-center items-center">
          <TitleLink linkHref="./sorters">Sorters</TitleLink>
          <TitleLink linkHref="./viewers">Viewers</TitleLink>
          <TitleLink linkHref="./changelogs">Changelogs</TitleLink>
          <TitleLink linkHref="./settings">Settings</TitleLink>
        </CardContent>
      </Card>
    </div>
  );
}
