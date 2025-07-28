import { Card, CardFooter, CardTitle } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';

export default function ViewersPage(): React.JSX.Element {
  return (
    <Card>
      <CardTitle>This is the Viewers Page</CardTitle>

      <CardFooter>
        <ButtonLink linkHref="/">Return</ButtonLink>
      </CardFooter>
    </Card>
  );
}
