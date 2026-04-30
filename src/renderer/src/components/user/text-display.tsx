import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface TextDisplayProps {
  text: string;
  className?: string;
}

export default function TextDisplay({ text, className }: TextDisplayProps): React.JSX.Element {
  return (
    <Tooltip>
      <TooltipTrigger className={className}>{text}</TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
