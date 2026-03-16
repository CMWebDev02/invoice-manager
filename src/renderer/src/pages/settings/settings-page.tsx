import LoadingIndicator from '@renderer/components/pages/loading-indicator';
import { Card, CardContent, CardFooter, CardTitle } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';

export default function SettingsPage(): React.JSX.Element {
  return (
    <Card className="w-full h-full">
      <CardTitle className="w-full h-1/6">This is the Settings Page</CardTitle>
      <CardContent className="w-full h-4/6">
        <LoadingIndicator />
      </CardContent>
      <CardFooter className="w-full h-1/6">
        <ButtonLink linkHref="/">Return</ButtonLink>
      </CardFooter>
    </Card>
  );
}
