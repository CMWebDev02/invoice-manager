import { Card, CardContent } from '@renderer/components/ui/card';
import TitleLink from './components/title-link';

export default function TitlePage(): React.JSX.Element {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card
        className="container bg-secondary 
      w-78
      md:w-86
      lg:w-96
      "
      >
        <CardContent
          className="flex flex-col justify-center items-center 
        gap-y-4
        md:gap-y-8
        "
        >
          <TitleLink linkHref="./sorters">Sorters</TitleLink>
          <TitleLink linkHref="./viewers">Viewers</TitleLink>
          <TitleLink linkHref="./changelogs">Changelogs</TitleLink>
          <TitleLink linkHref="./settings">Settings</TitleLink>
        </CardContent>
      </Card>
    </div>
  );
}
