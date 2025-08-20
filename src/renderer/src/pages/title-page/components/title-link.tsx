import { Button } from '@renderer/components/ui/button';
import { Link } from 'react-router';

interface TitleLinkProps {
  children: string;
  linkHref: string;
}

export default function TitleLink({ linkHref, children }: TitleLinkProps): React.JSX.Element {
  return (
    <Link to={linkHref} className="w-full">
      <Button className="w-full text-2xl">{children}</Button>
    </Link>
  );
}
