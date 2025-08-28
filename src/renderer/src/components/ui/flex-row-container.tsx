interface FlexRowContainerProps {
  children: React.ReactNode;
  additionalClasses?: string;
}

export default function FlexRowContainer({ children, additionalClasses }: FlexRowContainerProps): React.JSX.Element {
  return <div className={"flex flex-row w-full " + additionalClasses}>{children}</div>;
}
