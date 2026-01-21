import { useQuery } from '@tanstack/react-query';

type UseFetchData<UpdateType> = {
  fetchData: UpdateType | undefined;
  isLoading: boolean;
  error: Error | null;
  triggerRefetching: () => void;
};

interface UseFetchDataProps<PropType, ReturnType> {
  asyncFunction: (asyncFunctionProp: PropType) => Promise<ReturnType>;
  asyncFunctionProp: PropType;
  asyncFunctionKey: string;
}

export default function useFetchData<PropType, ReturnType>({ asyncFunction, asyncFunctionProp, asyncFunctionKey }: UseFetchDataProps<PropType, ReturnType>): UseFetchData<ReturnType | null> {
  const { data, error, isLoading, refetch } = useQuery({ queryKey: [asyncFunctionKey], queryFn: getData, retry: false });

  async function getData(): Promise<Awaited<ReturnType>> {
    const result = await asyncFunction(asyncFunctionProp);
    return result;
  }

  return { fetchData: data, isLoading, error, triggerRefetching: refetch };
}
