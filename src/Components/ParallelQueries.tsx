import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchHeros = () => {
  return axios.get('http://localhost:4000/heros');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

function ParallelQueries() {
  const { data: superheros } = useQuery({
    queryKey: ['heros'],
    queryFn: fetchHeros,
  });

  console.log(superheros);

  const { data: herosfriends } = useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriends,
  });

  console.log(herosfriends);

  return <div>Parellel Quaries</div>;
}

export default ParallelQueries;
