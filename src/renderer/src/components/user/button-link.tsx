import { Link } from 'react-router';
import { Button } from '../ui/button';
import { cn } from '@renderer/lib/utils';

interface ButtonLinkProps {
  children: string;
  linkHref: string;
  className?: string;
}

export default function ButtonLink({ linkHref, children, className }: ButtonLinkProps): React.JSX.Element {
  return (
    <Button className={className}>
      <Link to={linkHref} className="w-full">
        {children}
      </Link>
    </Button>
  );
}
