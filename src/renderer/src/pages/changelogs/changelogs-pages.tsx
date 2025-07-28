import { Card, CardFooter, CardTitle } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';

export default function ChangeLogsPage(): React.JSX.Element {
  return (
    <Card>
      <CardTitle>This is the Changelogs Page</CardTitle>
      <CardFooter>
        <ButtonLink linkHref="/">Return</ButtonLink>
      </CardFooter>
    </Card>
  );
}
