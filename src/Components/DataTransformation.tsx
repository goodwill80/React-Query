// Data Transformation
// When you need to manupulate data upon fetching it
// We can use the "select" function to change the fetched data

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

function DataTransformation() {
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  // using select - which takes in data from the response
  const { isLoading, data, isError, error }: any = useQuery({
    queryKey: ['super-heros'],
    queryFn: fetchHeros,
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const herosNames = data.data.map((hero: heroType) => hero.alterEgo);
      return herosNames;
    },
  });

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>Data Transformation</h2>
      {data.map((name: string, index: number) => (
        <div key={index}>{name}</div>
      ))}
    </>
  );
}

export default DataTransformation;
