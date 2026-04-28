import FlexRowContainer from '../ui/flex-row-container';

interface FileNameDisplayProps {
  fileName: string;
}

export default function FileNameDisplay({ fileName }: FileNameDisplayProps): React.JSX.Element {
  return (
    <FlexRowContainer className="w-full h-10 p-1 border border-foreground text-foreground bg-secondary lg:text-xl">
      <p className="w-20 lg:w-24 h-full select-none">File Name:</p>
      <p className="w-[calc(100%-5rem)] lg:w-[calc(100%-7rem)] h-full truncate">{fileName}</p>
    </FlexRowContainer>
  );
}
