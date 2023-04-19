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

function Heros() {
  const { isLoading, data, isError, error, isFetching }: any = useQuery({
    queryKey: ['super-heros'],
    queryFn: fetchHeros,
    // cacheTime: 5000, data in cache will be garbage collected after 5 secs then it will reload again
    // staleTime: 10000, to pause the background refetch for a period.
    // refetchOnMount: true, -- othere options (false, 'always')fetch data whenever component mounts - same as useEffect
    // refetchInterval: 2000, --- fetch data every 2 secs, very useful for cryto data or stocks data. This refetching is palse if u are not at the page
    // refetchIntervalInBackground: true, -- this will refetch data even if you not at at the page
  });
  // isLoading will not change if there is a background refetch
  // isFetching will update whenever there is a fetch
  // RQ will auto fetch whenever there is a change in db that is different from cache
  //   console.log(isLoading, isFetching);

  // HOW TO FETCH ON CLICK OF A BUTTON

  // 1. Set enabled to false, and destructure then extract the refetch function

  //   const {data, refetch}: any = useQuery({
  //     queryKey: ['super-heros'],
  //     queryFn: fetchHeros,
  //     enabled: false, To disabled auto
  //   });

  // 2. Put it as an onClick in a button

  //   <button onClick={refetch}>Fetch Data</button>;

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Super Heros Page</h2>
      {data?.data.map((hero: heroType) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
}

export default Heros;
