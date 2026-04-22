import { cn } from '@renderer/lib/utils';

interface FlexColContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function FlexColContainer({ children, className }: FlexColContainerProps): React.JSX.Element {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}
