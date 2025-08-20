import { Card, CardContent } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';

export default function TitlePage(): React.JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="bg-secondary w-1/2">
        <CardContent className="flex flex-col gap-y-4 justify-center items-center">
          <ButtonLink linkHref="./sorters">Sorters</ButtonLink>
          <ButtonLink linkHref="./viewers">Viewers</ButtonLink>
          <ButtonLink linkHref="./changelogs">Changelogs</ButtonLink>
          <ButtonLink linkHref="./settings">Settings</ButtonLink>
        </CardContent>
      </Card>
    </div>
  );
}
