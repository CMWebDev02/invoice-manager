import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexRowContainer from '../ui/flex-row-container';
import FlexColContainer from '../ui/flex-col-container';
import ButtonLink from '../user/button-link';

interface ErrorPageProps {
  errors: Error[];
}

export default function ErrorPage({ errors }: ErrorPageProps): React.JSX.Element {
  const errorElements = errors.map((error) => {
    return (
      <p key={error.name}>
        {error.name}
        <br />
        {error.message}
      </p>
    );
  });

  return (
    <main className="h-[calc(100vh-2.5rem)] w-screen bg-background">
      <FlexRowContainer className="w-full h-1/6">
        <FontAwesomeIcon icon={faTriangleExclamation} size="lg" />
        <h1>An Error has Occurred!</h1>
        <ButtonLink linkHref="/">Return Home</ButtonLink>
      </FlexRowContainer>
      <FlexColContainer className="w-full h-5/6">{errorElements}</FlexColContainer>
    </main>
  );
}
