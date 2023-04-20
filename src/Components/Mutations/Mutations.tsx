import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHerosData } from '../../CustomHooks/useHerosData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';

type stateType = {
  name: string;
  alterEgo: string;
};

type heroType = {
  id: number;
  name: string;
  alterEgo: string;
};

const addHero = (hero: heroType): Promise<any> => {
  return axios.post('http://localhost:4000/heros', hero);
};

function Mutations() {
  const [hero, setHero] = useState<stateType>({ name: '', alterEgo: '' });

  // Define a function that will be called on successful calling of data
  const onSuccess = (data: any) => {
    console.log('Perform side effect after data fetching', data);
  };
  // Define a function that will be called if there is an error
  const onError = (error: any) => {
    console.log('Perform side effect after encountering error', error);
  };

  // Query Data
  const { data, isLoading, isError, error } = useHerosData(onSuccess, onError);

  const queryClient = useQueryClient();

  // Initialise the mutation function to extract the mutate function
  const { mutate } = useMutation({
    mutationFn: addHero,
    onSuccess: () => {
      queryClient.invalidateQueries(['super-heros']);
    },
  });

  // call the mutate function inside the click handler function below
  const handleAddHeroClick = () => {
    const heroObj = {
      id: Math.random() * 100,
      name: hero.name,
      alterEgo: hero.alterEgo,
    };
    mutate(heroObj);
  };

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="multation">
      <h2>Multations</h2>
      <div>
        <input
          onChange={(e) =>
            setHero({ ...hero, [e.target.name]: e.target.value })
          }
          type="text"
          value={hero.name}
          name={'name'}
          placeholder="name"
        />
        <input
          onChange={(e) =>
            setHero({ ...hero, [e.target.name]: e.target.value })
          }
          type="text"
          value={hero.alterEgo}
          name={'alterEgo'}
          placeholder="Alter ego"
        />
        <button onClick={handleAddHeroClick}>Fetch Heroes</button>
        <div>
          <h2>List of heros:</h2>
          {data?.data.map((hero: heroType) => (
            <Link to={`/querybyid/${hero.id}`}>
              <div key={hero.id}>{hero.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mutations;
