import { Button } from '@renderer/components/ui/button';
import { Link } from 'react-router';

interface TitleLinkProps {
  children: string;
  linkHref: string;
}

export default function TitleLink({ linkHref, children }: TitleLinkProps): React.JSX.Element {
  return (
    <Link to={linkHref} className="w-full h-fit">
      <Button
        className="w-full h-fit
      text-2xl p-2
      md:text-3xl
      lg:text-4xl
      "
      >
        {children}
      </Button>
    </Link>
  );
}
