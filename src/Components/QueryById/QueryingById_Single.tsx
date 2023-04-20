import { useParams } from 'react-router-dom';
import { useHerosDataById } from '../../CustomHooks/useHeroDataById';

function QueryingByIdSingle() {
  const { heroId }: any = useParams();

  const { data, isLoading, isError, error }: any = useHerosDataById(heroId);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Single Hero Data</h2>
      <div>
        {data?.data.name} - {data?.data.alterEgo}
      </div>
    </>
  );
}

export default QueryingByIdSingle;
