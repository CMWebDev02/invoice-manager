import { Spinner } from '../ui/spinner';

export default function LoadingIndicator(): React.JSX.Element {
  return (
    <div className="relative w-full h-full">
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl select-none text-gray-500">Loading</h1>
      <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-50" color="grey" />
    </div>
  );
}
