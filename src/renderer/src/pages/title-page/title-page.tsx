import { Button } from '@renderer/components/ui/button';
import { Card, CardContent } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';

export default function TitlePage(): React.JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card>
        <CardContent className="flex flex-col gap-2">
          <Button>Sorters</Button>
          <Button>Viewers</Button>
          <ButtonLink linkHref="./changelogs">Changelogs</ButtonLink>
          <ButtonLink linkHref="./settings">Settings</ButtonLink>
        </CardContent>
      </Card>
    </div>
  );
}
