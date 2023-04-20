import { useQueryOnClick } from '../CustomHooks/useHerosDataOnClick';

function ClickToFetchData() {
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { data, isLoading, isError, refetch, error, isFetching }: any =
    useQueryOnClick(onSuccess, onError);

  if (isLoading || isFetching)
    return <button onClick={refetch}>Refetch</button>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Click to fetch Custom Hook</h2>
      {data.map((name: string, index: number) => (
        <div key={index}>{name}</div>
      ))}
      <button onClick={refetch}>Refetch</button>
    </>
  );
}

export default ClickToFetchData;
