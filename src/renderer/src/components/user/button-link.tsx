import { Link } from 'react-router';
import { Button } from '../ui/button';

interface ButtonLinkProps {
  children: string;
  linkHref: string;
}

export default function ButtonLink({ linkHref, children }: ButtonLinkProps): React.JSX.Element {
  return (
    <Link to={linkHref}>
      <Button className="cursor-pointer ">{children}</Button>
    </Link>
  );
}
