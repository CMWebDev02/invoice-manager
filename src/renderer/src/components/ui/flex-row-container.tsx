import { cn } from '@renderer/lib/utils';

interface FlexRowContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function FlexRowContainer({ children, className }: FlexRowContainerProps): React.JSX.Element {
  return <div className={cn('flex flex-row', className)}>{children}</div>;
}
