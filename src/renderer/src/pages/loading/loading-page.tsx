import { Spinner } from '../../components/ui/spinner';

export default function LoadingPage(): React.JSX.Element {
  return (
    <main className="h-screen w-screen bg-background">
      <div className="w-full h-full flex flex-row align-middle justify-center items-center">
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl select-none text-gray-500">Loading</h1>
        <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-50" color="grey" />
      </div>
    </main>
  );
}
