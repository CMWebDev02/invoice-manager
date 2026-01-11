import { useQuery } from '@tanstack/react-query';

type UseFetchData<UpdateType> = {
  fetchData: UpdateType | undefined;
  isLoading: boolean;
  error: Error | null;
  triggerRefetching: () => void;
};

interface UseFetchDataProps<PropType, ReturnType> {
  asyncFunction: (asyncFunctionProp: PropType) => Promise<ReturnType | null>;
  asyncFunctionProp: PropType;
  asyncFunctionKey: string;
}

export default function useFetchData<PropType, ReturnType>({ asyncFunction, asyncFunctionProp, asyncFunctionKey }: UseFetchDataProps<PropType, ReturnType>): UseFetchData<ReturnType> {
  const { data, error, isLoading, refetch } = useQuery({ queryKey: [asyncFunctionKey], queryFn: getData });

  async function getData(): Promise<Awaited<ReturnType>> {
    const result = await asyncFunction(asyncFunctionProp);
    if (result === null) throw new Error('Failed to fetch data!');
    return result;
  }

  return { fetchData: data, isLoading, error, triggerRefetching: refetch };
}
