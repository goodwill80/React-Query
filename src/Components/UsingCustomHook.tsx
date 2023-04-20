import { useHerosDataNames } from '../CustomHooks/useHerosData';

function UsingCustomHook() {
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { data, isLoading, isFetching, isError, error } = useHerosDataNames(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) return <div>Loading....</div>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Custom Hook</h2>
      {data.map((name: string, index: number) => (
        <div key={index}>{name}</div>
      ))}
    </>
  );
}

export default UsingCustomHook;
