import { Link } from 'react-router';
import { Button } from '../ui/button';

interface ButtonLinkProps {
  children: string;
  linkHref: string;
  className?: string;
}

export default function ButtonLink({ linkHref, children, className }: ButtonLinkProps): React.JSX.Element {
  return (
    <Link to={linkHref} className={className}>
      <Button className="w-full">{children}</Button>
    </Link>
  );
}
