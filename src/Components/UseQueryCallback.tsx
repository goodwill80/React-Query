// Sometimes, you might want to trigger some actions when the data fetching completes
// such as opening a modal or navigating to a different page
// We can make use of useQuery callbacks

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type heroType = {
  id: number;
  name: string;
  alterEgo: string;
};

const fetchHeros = async (): Promise<any> => {
  return await axios.get('http://localhost:4000/heros');
};

function UseQueryCallback() {
  // Define a function that will be called on successful calling of data
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };
  // Define a function that will be called if there is an error
  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };
  // Define the functions in useQuery main
  const { isLoading, data, isError, error, isFetching }: any = useQuery({
    queryKey: ['super-heros'],
    queryFn: fetchHeros,
    onSuccess: onSuccess,
    onError: onError,
  });

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Callbacks</h2>
      {data?.data.map((hero: heroType) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
}

export default UseQueryCallback;
