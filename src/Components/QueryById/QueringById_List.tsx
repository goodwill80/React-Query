import { useHeroDataQuerying } from '../../CustomHooks/useHeroDataById';
import { Link } from 'react-router-dom';

type heroType = {
  id: number;
  name: string;
  alterEgo: string;
};

function QueringByIdList() {
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { data, isLoading, isFetching, isError, error, refetch }: any =
    useHeroDataQuerying(onSuccess, onError);

  if (isLoading || isFetching) return <div>Loading....</div>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>Query by ID - List</h2>
      <button onClick={refetch}>Fetch Heros</button>
      {data?.data.map((hero: heroType, index: number) => (
        <div key={index}>
          <Link to={`/querybyid/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
}

export default QueringByIdList;
